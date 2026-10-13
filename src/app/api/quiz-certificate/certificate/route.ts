import { NextResponse } from "next/server";
import {
  COURSE_CONFIG,
  getQuizData,
  saveQuizData,
  generateTestCertificateNumber,
  CertificateRecord,
} from "@/lib/quizCertificateStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { attemptId, candidateNameOverride } = body;

    if (!attemptId) {
      return NextResponse.json(
        { error: "Attempt ID is required to generate a certificate preview." },
        { status: 400 }
      );
    }

    const data = getQuizData();

    // ── CHECK 1: ATTEMPT EXISTS ──
    const attempt = data.attempts.find((a) => a.attemptId === attemptId);
    if (!attempt) {
      return NextResponse.json(
        { error: "Quiz attempt record not found." },
        { status: 404 }
      );
    }

    // ── CHECK 2: VALID CANDIDATE REGISTRATION ──
    const candidate = data.registrations.find(
      (r) => r.registrationId === attempt.registrationId
    );
    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate registration record not found or invalid." },
        { status: 404 }
      );
    }

    // ── CHECK 3: VERIFIED PAYMENT ──
    const payment = data.payments.find(
      (p) => p.registrationId === candidate.registrationId && p.status === "verified"
    );
    if (!payment) {
      return NextResponse.json(
        {
          error: "Eligibility Failed: Verified payment of ₹250 is required before certificate issuance.",
          code: "PAYMENT_NOT_VERIFIED",
        },
        { status: 403 }
      );
    }

    // ── CHECK 4: PASSING SCORE THRESHOLD (>= 50%, i.e., >= 5 / 10) ──
    if (attempt.scoreMarks < COURSE_CONFIG.minimumPassingMarks || !attempt.passed) {
      return NextResponse.json(
        {
          error: `Eligibility Failed: Score of ${attempt.scoreMarks}/${attempt.totalMarks} (${attempt.percentage}%) does not meet the passing threshold of ${COURSE_CONFIG.passingScorePercentage}%. Candidate must score at least 5 out of 10.`,
          code: "SCORE_INSUFFICIENT",
          scoreMarks: attempt.scoreMarks,
          totalMarks: attempt.totalMarks,
          percentage: attempt.percentage,
        },
        { status: 403 }
      );
    }

    // ── CHECK 5: DUPLICATE CERTIFICATE ISSUANCE PREVENTION ──
    const existingCert = data.certificates.find((c) => c.attemptId === attemptId);
    if (existingCert) {
      if (!existingCert.issueDate || existingCert.issueDate === "TEST DATE") {
        existingCert.issueDate = new Date(existingCert.createdAt || Date.now()).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        saveQuizData(data);
      }
      return NextResponse.json({
        success: true,
        message: "Existing test certificate preview retrieved (duplicate issuance prevented).",
        certificate: existingCert,
        isDuplicateRetrieval: true,
      });
    }

    // ── ISSUE UNIQUE TEST CERTIFICATE PREVIEW ──
    const certNumber = generateTestCertificateNumber(data.certificates.length);
    const finalCandidateName =
      candidateNameOverride?.trim() || candidate.fullName || "TEST USER";

    const testCertificate: CertificateRecord = {
      certificateId: certNumber,
      attemptId: attempt.attemptId,
      registrationId: candidate.registrationId,
      candidateName: finalCandidateName,
      courseName: COURSE_CONFIG.name,
      scoreMarks: attempt.scoreMarks,
      totalMarks: attempt.totalMarks,
      scorePercentage: attempt.percentage,
      issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "TEST PREVIEW – NOT VALID FOR OFFICIAL USE",
      watermark: "TEST PREVIEW – NOT VALID FOR OFFICIAL USE",
      disclaimer: COURSE_CONFIG.disclaimer,
      isTestPreview: true,
      theme: "luxury_black_gold",
      createdAt: new Date().toISOString(),
    };

    data.certificates.unshift(testCertificate);
    saveQuizData(data);

    return NextResponse.json({
      success: true,
      message: "Test certificate preview generated successfully.",
      certificate: testCertificate,
      isDuplicateRetrieval: false,
    });
  } catch (error: unknown) {
    console.error("[QuizCertificate] Generation error:", error);
    return NextResponse.json(
      { error: "Server error occurred during certificate preview generation." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const certId = searchParams.get("certId");
  const data = getQuizData();

  if (certId) {
    const cert = data.certificates.find((c) => c.certificateId === certId);
    if (!cert) {
      return NextResponse.json({ error: "Certificate record not found." }, { status: 404 });
    }
    // Return sanitized test certificate preview info
    return NextResponse.json({
      success: true,
      certificate: {
        certificateId: cert.certificateId,
        candidateName: cert.candidateName,
        courseName: cert.courseName,
        scorePercentage: cert.scorePercentage,
        issueDate: cert.issueDate,
        status: cert.status,
        watermark: cert.watermark,
        disclaimer: cert.disclaimer,
        isTestPreview: cert.isTestPreview,
      },
    });
  }

  return NextResponse.json({
    totalTestCertificates: data.certificates.length,
    certificates: data.certificates,
  });
}
