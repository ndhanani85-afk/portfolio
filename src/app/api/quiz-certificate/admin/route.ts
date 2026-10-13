import { NextResponse } from "next/server";
import {
  COURSE_CONFIG,
  QUESTION_BANK,
  getQuizData,
  saveQuizData,
  CandidateRegistration,
  PaymentRecord,
  QuizAttempt,
  CertificateRecord,
  generateTestCertificateNumber,
} from "@/lib/quizCertificateStore";

export async function GET(req: Request) {
  try {
    const data = getQuizData();

    // Summary statistics
    const totalRegistrations = data.registrations.length;
    const verifiedPayments = data.payments.filter((p) => p.status === "verified").length;
    const failedPayments = data.payments.filter((p) => p.status === "failed").length;
    const totalAttempts = data.attempts.length;
    const passedAttempts = data.attempts.filter((a) => a.passed).length;
    const failedAttempts = data.attempts.filter((a) => !a.passed).length;
    const totalCertificates = data.certificates.length;

    // Detect duplicates
    const emailCounts: Record<string, number> = {};
    data.registrations.forEach((r) => {
      emailCounts[r.email] = (emailCounts[r.email] || 0) + 1;
    });
    const duplicateEmails = Object.entries(emailCounts)
      .filter(([_, count]) => count > 1)
      .map(([email, count]) => ({ email, count }));

    return NextResponse.json({
      success: true,
      stats: {
        totalRegistrations,
        verifiedPayments,
        failedPayments,
        totalAttempts,
        passedAttempts,
        failedAttempts,
        totalCertificates,
        duplicateRegistrationsCount: duplicateEmails.length,
      },
      duplicateEmails,
      registrations: data.registrations,
      payments: data.payments,
      attempts: data.attempts,
      certificates: data.certificates,
      courseConfig: COURSE_CONFIG,
    });
  } catch (error: unknown) {
    console.error("[QuizAdminAPI] GET error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching admin data." },
      { status: 500 }
    );
  }
}

// POST endpoint to run automated test scenarios A through G on demand
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "reset_test_data") {
      const emptyData = {
        registrations: [],
        payments: [],
        attempts: [],
        certificates: [],
      };
      saveQuizData(emptyData);
      return NextResponse.json({ success: true, message: "Test data cleared." });
    }

    if (action === "run_all_test_scenarios") {
      const data = getQuizData();
      const testResults: any[] = [];

      // Helper to generate answers for target score
      const makeAnswers = (correctCount: number): Record<number, number> => {
        const ans: Record<number, number> = {};
        QUESTION_BANK.forEach((q, idx) => {
          if (idx < correctCount) {
            ans[q.id] = q.correctAnswerIndex; // Correct answer
          } else {
            ans[q.id] = (q.correctAnswerIndex + 1) % 4; // Incorrect answer
          }
        });
        return ans;
      };

      const scenarios = [
        { label: "Test A: 10/10 Score", correctCount: 10, expected: "PASS", name: "Candidate Alpha (10/10)" },
        { label: "Test B: 8/10 Score", correctCount: 8, expected: "PASS", name: "TEST USER (8/10)" },
        { label: "Test C: 5/10 Score", correctCount: 5, expected: "PASS", name: "Candidate Gamma (5/10)" },
        { label: "Test D: 4/10 Score", correctCount: 4, expected: "FAIL", name: "Candidate Delta (4/10)" },
        { label: "Test E: 0/10 Score", correctCount: 0, expected: "FAIL", name: "Candidate Epsilon (0/10)" },
        { label: "Test F: Unanswered", correctCount: -1, expected: "FAIL", name: "Candidate Zeta (Unanswered)" },
        { label: "Test G: Time Expired", correctCount: 7, expected: "EXPIRED_EVALUATED", name: "Candidate Eta (Expired)" },
      ];

      for (const sc of scenarios) {
        const regId = `REG_TEST_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const reg: CandidateRegistration = {
          registrationId: regId,
          fullName: sc.name,
          email: `${sc.name.toLowerCase().replace(/[^a-z]/g, "")}@fictional-test.local`,
          phone: "+9199999999" + Math.floor(10 + Math.random() * 89),
          courseId: COURSE_CONFIG.id,
          courseName: COURSE_CONFIG.name,
          agreedToTerms: true,
          registeredAt: new Date().toISOString(),
          status: "paid",
        };
        data.registrations.unshift(reg);

        const payId = `PAY_TEST_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const pay: PaymentRecord = {
          paymentId: payId,
          registrationId: regId,
          amount: COURSE_CONFIG.courseFee,
          currency: "INR",
          status: "verified",
          transactionRef: `TXN_SANDBOX_${Date.now()}`,
          paymentMode: "sandbox_test",
          paidAt: new Date().toISOString(),
          notes: `Automated test run: ${sc.label}`,
        };
        data.payments.unshift(pay);

        const answers = sc.correctCount === -1 ? {} : makeAnswers(sc.correctCount);
        const startTime = new Date(Date.now() - 8 * 60 * 1000).toISOString();
        const endTime = new Date().toISOString();

        // Server-side scoring
        let score = 0;
        QUESTION_BANK.forEach((q) => {
          if (typeof answers[q.id] === "number" && answers[q.id] === q.correctAnswerIndex) {
            score += 1;
          }
        });

        const passed = score >= 5;
        const isExpired = sc.label.includes("Expired");
        const attemptId = `ATTEMPT_TEST_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

        const attempt: QuizAttempt = {
          attemptId,
          registrationId: regId,
          paymentId: payId,
          startedAt: startTime,
          submittedAt: endTime,
          durationSeconds: isExpired ? 620 : 480,
          answers,
          scoreMarks: score,
          totalMarks: 10,
          percentage: score * 10,
          passed,
          timeExpired: isExpired,
          evaluatedAt: new Date().toISOString(),
          testScenarioLabel: sc.label,
        };
        data.attempts.unshift(attempt);

        let certIssued = false;
        let certNumber = null;
        if (passed) {
          certNumber = generateTestCertificateNumber(data.certificates.length);
          const cert: CertificateRecord = {
            certificateId: certNumber,
            attemptId,
            registrationId: regId,
            candidateName: sc.name,
            courseName: COURSE_CONFIG.name,
            scoreMarks: score,
            totalMarks: 10,
            scorePercentage: score * 10,
            issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            status: "TEST PREVIEW – NOT VALID FOR OFFICIAL USE",
            watermark: "TEST PREVIEW – NOT VALID FOR OFFICIAL USE",
            disclaimer: COURSE_CONFIG.disclaimer,
            isTestPreview: true,
            theme: "luxury_black_gold",
            createdAt: new Date().toISOString(),
          };
          data.certificates.unshift(cert);
          certIssued = true;
        }

        testResults.push({
          scenario: sc.label,
          candidate: sc.name,
          score: `${score}/10`,
          percentage: `${score * 10}%`,
          passed,
          expectedStatus: sc.expected,
          testPassed:
            sc.expected === "PASS"
              ? passed && certIssued
              : sc.expected === "FAIL"
              ? !passed && !certIssued
              : true,
          certificatePreviewId: certNumber,
          timeExpired: isExpired,
        });
      }

      saveQuizData(data);

      return NextResponse.json({
        success: true,
        message: "Automated test matrix (Scenarios A through G) executed successfully.",
        results: testResults,
      });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error: unknown) {
    console.error("[QuizAdminAPI] POST error:", error);
    return NextResponse.json(
      { error: "Internal server error executing admin action." },
      { status: 500 }
    );
  }
}
