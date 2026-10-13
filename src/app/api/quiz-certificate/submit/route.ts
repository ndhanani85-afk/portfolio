import { NextResponse } from "next/server";
import {
  COURSE_CONFIG,
  getClientQuestions,
  getRandomizedQuestions,
  evaluateQuiz,
  getQuizData,
  saveQuizData,
  QuizAttempt,
} from "@/lib/quizCertificateStore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const registrationId = searchParams.get("registrationId");
    const randomize = searchParams.get("randomize") === "true";

    const data = getQuizData();
    let questions;

    if (registrationId) {
      const candidate = data.registrations.find((r) => r.registrationId === registrationId);
      if (candidate) {
        if (randomize || !candidate.assignedQuestionIds || candidate.assignedQuestionIds.length === 0) {
          questions = getRandomizedQuestions(candidate.assignedQuestionIds || []);
          candidate.assignedQuestionIds = questions.map((q) => q.id);
          saveQuizData(data);
        } else {
          questions = getClientQuestions(candidate.assignedQuestionIds);
        }
      } else {
        questions = getClientQuestions();
      }
    } else {
      // Returns safe client question bank (no correct answers exposed)
      questions = getClientQuestions();
    }

    return NextResponse.json({
      course: COURSE_CONFIG,
      totalQuestions: questions.length,
      questions,
    });
  } catch (err) {
    const questions = getClientQuestions();
    return NextResponse.json({
      course: COURSE_CONFIG,
      totalQuestions: questions.length,
      questions,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      registrationId,
      answers,
      startedAt,
      submittedAt,
      testScenarioLabel,
      forceExpired,
    } = body;

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required to submit the quiz." },
        { status: 400 }
      );
    }

    const data = getQuizData();
    const candidate = data.registrations.find(
      (r) => r.registrationId === registrationId
    );

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate registration not found." },
        { status: 404 }
      );
    }

    // ── GATING CHECK: PAYMENT VERIFICATION ──
    const verifiedPayment = data.payments.find(
      (p) => p.registrationId === registrationId && p.status === "verified"
    );

    if (!verifiedPayment) {
      return NextResponse.json(
        {
          error:
            "Unauthorized: Verified payment (₹250) is required before quiz evaluation. Please complete course enrollment.",
          code: "PAYMENT_REQUIRED",
        },
        { status: 403 }
      );
    }

    const startISO = startedAt || new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const submitISO = submittedAt || new Date().toISOString();

    // ── SERVER-SIDE SCORING & INTEGRITY CHECK ──
    const safeAnswers = typeof answers === "object" && answers !== null ? answers : {};
    const evaluation = evaluateQuiz(
      safeAnswers,
      startISO,
      submitISO,
      candidate.assignedQuestionIds
    );

    // If test explicitly triggered forced expiration (Test G)
    if (forceExpired) {
      evaluation.timeExpired = true;
    }

    const attemptId = `ATTEMPT_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const durationSec = Math.max(
      0,
      Math.floor((new Date(submitISO).getTime() - new Date(startISO).getTime()) / 1000)
    );

    const attemptRecord: QuizAttempt = {
      attemptId,
      registrationId,
      paymentId: verifiedPayment.paymentId,
      startedAt: startISO,
      submittedAt: submitISO,
      durationSeconds: durationSec,
      answers: safeAnswers,
      scoreMarks: evaluation.scoreMarks,
      totalMarks: evaluation.totalMarks,
      percentage: evaluation.percentage,
      passed: evaluation.passed,
      timeExpired: evaluation.timeExpired,
      evaluatedAt: new Date().toISOString(),
      testScenarioLabel: testScenarioLabel || undefined,
      assignedQuestionIds: candidate.assignedQuestionIds,
    };

    data.attempts.unshift(attemptRecord);
    if (evaluation.passed) {
      candidate.status = "completed";
    }
    saveQuizData(data);

    return NextResponse.json({
      success: true,
      message: evaluation.passed
        ? "Congratulations! You have successfully passed the assessment."
        : "Assessment evaluated. Your score did not meet the passing threshold (50%).",
      attempt: attemptRecord,
      evaluation: {
        scoreMarks: evaluation.scoreMarks,
        totalMarks: evaluation.totalMarks,
        percentage: evaluation.percentage,
        passed: evaluation.passed,
        timeExpired: evaluation.timeExpired,
        breakdown: evaluation.breakdown,
      },
      passingThreshold: COURSE_CONFIG.passingScorePercentage,
      minimumPassingMarks: COURSE_CONFIG.minimumPassingMarks,
    });
  } catch (error: unknown) {
    console.error("[QuizSubmit] Evaluation error:", error);
    return NextResponse.json(
      { error: "Server error occurred during quiz evaluation." },
      { status: 500 }
    );
  }
}
