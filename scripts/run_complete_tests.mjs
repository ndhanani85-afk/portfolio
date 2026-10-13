// scripts/run_complete_tests.mjs
// Comprehensive End-to-End Test Suite for Online Quiz and Digital Certificate System

const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("==================================================================");
  console.log("STARTING COMPLETE QUIZ & CERTIFICATE SYSTEM TEST SUITE");
  console.log("==================================================================\n");

  let totalPassed = 0;
  let totalFailed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      totalPassed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      totalFailed++;
    }
  }

  // ────────────────────────────────────────────────────────────────
  // STEP 2: COURSE CONFIGURATION VERIFICATION
  // ────────────────────────────────────────────────────────────────
  console.log("--- STEP 2: Verifying Course Configuration ---");
  const configRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`);
  const configData = await configRes.json();

  assert(configRes.ok, "Course API endpoint is accessible");
  assert(configData.course?.name === "Child Psychology & Development – Basic Awareness", "Course Name matches specification");
  assert(configData.course?.durationMinutes === 10, "Quiz Duration is 10 Minutes");
  assert(configData.course?.totalQuestions === 10, "Total Questions is 10");
  assert(configData.course?.marksPerCorrectAnswer === 1, "Marks per correct answer is 1");
  assert(configData.course?.totalMarks === 10, "Total Marks is 10");
  assert(configData.course?.passingScorePercentage === 50, "Passing Score is 50%");
  assert(configData.course?.minimumPassingMarks === 5, "Minimum Passing Marks is 5 out of 10");
  assert(configData.course?.courseFee === 250, "Course fee is ₹250");
  assert(configData.course?.disclaimer?.includes("non-formal educational awareness quiz"), "Non-formal educational disclaimer is configured");
  assert(Array.isArray(configData.questions) && configData.questions.length === 10, "Question bank returns exactly 10 questions");
  assert(configData.questions[0].correctAnswerIndex === undefined, "Security: Client question bank DOES NOT expose correct answer keys");

  // ────────────────────────────────────────────────────────────────
  // STEP 3: CANDIDATE REGISTRATION TESTING
  // ────────────────────────────────────────────────────────────────
  console.log("\n--- STEP 3: Testing User Registration & Validation ---");

  // 3.1 Invalid email validation
  const invalidEmailRes = await fetch(`${BASE_URL}/api/quiz-certificate/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-test-mode": "true" },
    body: JSON.stringify({
      fullName: "Test Candidate",
      email: "invalid-email-format",
      phone: "+919876543210",
      agreedToTerms: true,
    }),
  });
  assert(invalidEmailRes.status === 400, "Rejects invalid email format");

  // 3.2 Invalid phone validation
  const invalidPhoneRes = await fetch(`${BASE_URL}/api/quiz-certificate/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-test-mode": "true" },
    body: JSON.stringify({
      fullName: "Test Candidate",
      email: "valid@test.local",
      phone: "123", // too short
      agreedToTerms: true,
    }),
  });
  assert(invalidPhoneRes.status === 400, "Rejects invalid phone number (< 10 digits)");

  // 3.3 Missing terms agreement
  const missingTermsRes = await fetch(`${BASE_URL}/api/quiz-certificate/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-test-mode": "true" },
    body: JSON.stringify({
      fullName: "Test Candidate",
      email: "valid@test.local",
      phone: "+919876543210",
      agreedToTerms: false,
    }),
  });
  assert(missingTermsRes.status === 400, "Enforces terms and non-formal disclaimer agreement");

  // 3.4 Valid Registration
  const validRegRes = await fetch(`${BASE_URL}/api/quiz-certificate/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-test-mode": "true" },
    body: JSON.stringify({
      fullName: "TEST USER",
      email: "test.candidate80@fictional.local",
      phone: "+919876543210",
      agreedToTerms: true,
    }),
  });
  const validRegData = await validRegRes.json();
  assert(validRegRes.ok && validRegData.success, "Successful registration of fictional candidate");
  assert(!!validRegData.registration?.registrationId, "Generated unique registration ID");
  const testCandidateRegId = validRegData.registration?.registrationId;

  // 3.5 Duplicate Registration Handling
  const dupRegRes = await fetch(`${BASE_URL}/api/quiz-certificate/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-test-mode": "true" },
    body: JSON.stringify({
      fullName: "TEST USER",
      email: "test.candidate80@fictional.local",
      phone: "+919876543210",
      agreedToTerms: true,
    }),
  });
  const dupRegData = await dupRegRes.json();
  assert(dupRegRes.ok && dupRegData.isExisting === true, "Gracefully handles duplicate registration without crash");


  // ────────────────────────────────────────────────────────────────
  // STEP 5: PAYMENT FUNCTIONALITY TESTING (SANDBOX)
  // ────────────────────────────────────────────────────────────────
  console.log("\n--- STEP 5: Testing Payment Functionality (Sandbox) ---");

  // Create a brand new unpaid candidate
  const freshUnpaidPhone = "+91987" + Math.floor(1000000 + Math.random() * 9000000);
  const freshUnpaidEmail = `unpaid_${Date.now()}@test.local`;
  const freshRegRes = await fetch(`${BASE_URL}/api/quiz-certificate/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-test-mode": "true" },
    body: JSON.stringify({
      fullName: "Unpaid Test Candidate",
      email: freshUnpaidEmail,
      phone: freshUnpaidPhone,
      agreedToTerms: true,
    }),
  });
  const freshRegData = await freshRegRes.json();
  const unpaidCandidateRegId = freshRegData.registration.registrationId;

  // 5.1 Incorrect Amount
  const incorrectAmountRes = await fetch(`${BASE_URL}/api/quiz-certificate/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: unpaidCandidateRegId,
      amount: 100, // Expected 250
      simulationAction: "simulate_success",
    }),
  });
  assert(incorrectAmountRes.status === 400, "Rejects incorrect payment amount (expects ₹250)");

  // 5.2 Simulated Payment Failure
  const failPayRes = await fetch(`${BASE_URL}/api/quiz-certificate/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: unpaidCandidateRegId,
      amount: 250,
      simulationAction: "simulate_failure",
    }),
  });
  assert(failPayRes.status === 402, "Handles simulated payment failure / decline");

  // 5.3 Simulated Payment Cancellation
  const cancelPayRes = await fetch(`${BASE_URL}/api/quiz-certificate/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: unpaidCandidateRegId,
      amount: 250,
      simulationAction: "simulate_cancel",
    }),
  });
  assert(cancelPayRes.status === 402, "Handles simulated user cancellation");

  // 5.4 Quiz Submission Blocked Before Verified Payment
  const unverifiedQuizRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: unpaidCandidateRegId,
      answers: { 1: 1, 2: 2 },
    }),
  });
  assert(unverifiedQuizRes.status === 403, "Gating: Quiz submission is strictly locked if payment is unverified");

  // 5.5 Successful Sandbox Payment
  const successPayRes = await fetch(`${BASE_URL}/api/quiz-certificate/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: unpaidCandidateRegId,
      amount: 250,
      simulationAction: "simulate_success",
    }),
  });
  const successPayData = await successPayRes.json();
  assert(successPayRes.ok && successPayData.payment?.status === "verified", "Sandbox payment verified successfully");

  // 5.6 Duplicate Payment Notification Handling
  const dupPayRes = await fetch(`${BASE_URL}/api/quiz-certificate/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: unpaidCandidateRegId,
      amount: 250,
      simulationAction: "simulate_success",
    }),
  });
  const dupPayData = await dupPayRes.json();
  assert(dupPayRes.ok && dupPayData.alreadyVerified === true, "Handles duplicate payment notification idempotently");



  // ────────────────────────────────────────────────────────────────
  // STEP 4 & 12: ONLINE QUIZ SCENARIOS (A THROUGH G)
  // ────────────────────────────────────────────────────────────────
  console.log("\n--- STEP 4: Testing Online Quiz Scenarios (A through G) ---");

  // Server Answer Key for testing (covers all 30 pool questions):
  const ALL_CORRECT_ANSWERS = {
    1: 1, 2: 2, 3: 1, 4: 1, 5: 1, 6: 0, 7: 1, 8: 1, 9: 1, 10: 1,
    11: 2, 12: 1, 13: 0, 14: 2, 15: 1, 16: 1, 17: 2, 18: 1, 19: 0, 20: 1,
    21: 2, 22: 1, 23: 1, 24: 2, 25: 1, 26: 0, 27: 1, 28: 2, 29: 1, 30: 1
  };

  async function getCandidateQuestions(regId) {
    const qRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit?registrationId=${regId}`);
    const qData = await qRes.json();
    return qData.questions?.map((q) => q.id) || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  function buildAnswersForQuestions(questionIds, correctCount) {
    const answers = {};
    questionIds.forEach((qId, idx) => {
      const correctVal = ALL_CORRECT_ANSWERS[qId] ?? 0;
      if (idx < correctCount) {
        answers[qId] = correctVal;
      } else {
        answers[qId] = (correctVal + 1) % 4;
      }
    });
    return answers;
  }

  // Helper to create a paid candidate
  async function createPaidCandidate(name, email) {
    const randomPhone = "+91987" + Math.floor(1000000 + Math.random() * 9000000);
    const rRes = await fetch(`${BASE_URL}/api/quiz-certificate/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-test-mode": "true" },
      body: JSON.stringify({ fullName: name, email, phone: randomPhone, agreedToTerms: true }),
    });
    const rData = await rRes.json();
    const regId = rData.registration?.registrationId;
    if (!regId) {
      throw new Error(`Failed to create candidate ${name}: ${JSON.stringify(rData)}`);
    }
    await fetch(`${BASE_URL}/api/quiz-certificate/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId: regId, amount: 250, simulationAction: "simulate_success" }),
    });
    return regId;
  }


  // Test A: 10/10 = PASS
  const candA = await createPaidCandidate("Candidate Alpha", "alpha@test.local");
  const candAQuestions = await getCandidateQuestions(candA);
  const answers10 = buildAnswersForQuestions(candAQuestions, 10);
  const testARes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId: candA, answers: answers10 }),
  });
  const testAData = await testARes.json();
  assert(testAData.evaluation.scoreMarks === 10 && testAData.evaluation.passed === true, "Test A: 10/10 = 100% PASS");

  // Test B: 8/10 = PASS (Sample test user)
  await fetch(`${BASE_URL}/api/quiz-certificate/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId: testCandidateRegId, amount: 250, simulationAction: "simulate_success" }),
  });
  const testBQuestions = await getCandidateQuestions(testCandidateRegId);
  const answers8 = buildAnswersForQuestions(testBQuestions, 8);
  const testBRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId: testCandidateRegId, answers: answers8 }),
  });
  const testBData = await testBRes.json();
  assert(testBData.evaluation.scoreMarks === 8 && testBData.evaluation.passed === true, "Test B: 8/10 = 80% PASS");
  const testBAttemptId = testBData.attempt.attemptId;

  // Test C: 5/10 = PASS (Exact passing threshold)
  const candC = await createPaidCandidate("Candidate Gamma", "gamma@test.local");
  const candCQuestions = await getCandidateQuestions(candC);
  const answers5 = buildAnswersForQuestions(candCQuestions, 5);
  const testCRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId: candC, answers: answers5 }),
  });
  const testCData = await testCRes.json();
  assert(testCData.evaluation.scoreMarks === 5 && testCData.evaluation.passed === true, "Test C: 5/10 = 50% PASS (Boundary check)");

  // Test D: 4/10 = FAIL
  const candD = await createPaidCandidate("Candidate Delta", "delta@test.local");
  const candDQuestions = await getCandidateQuestions(candD);
  const answers4 = buildAnswersForQuestions(candDQuestions, 4);
  const testDRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId: candD, answers: answers4 }),
  });
  const testDData = await testDRes.json();
  assert(testDData.evaluation.scoreMarks === 4 && testDData.evaluation.passed === false, "Test D: 4/10 = 40% FAIL (Below threshold)");
  const testDAttemptId = testDData.attempt.attemptId;

  // Test E: 0/10 = FAIL
  const candE = await createPaidCandidate("Candidate Epsilon", "epsilon@test.local");
  const candEQuestions = await getCandidateQuestions(candE);
  const answers0 = buildAnswersForQuestions(candEQuestions, 0);
  const testERes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId: candE, answers: answers0 }),
  });
  const testEData = await testERes.json();
  assert(testEData.evaluation.scoreMarks === 0 && testEData.evaluation.passed === false, "Test E: 0/10 = 0% FAIL");

  // Test F: All unanswered = FAIL
  const candF = await createPaidCandidate("Candidate Zeta", "zeta@test.local");
  const testFRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId: candF, answers: {} }),
  });
  const testFData = await testFRes.json();
  assert(testFData.evaluation.scoreMarks === 0 && testFData.evaluation.passed === false, "Test F: All questions unanswered = 0/10 FAIL");

  // Test G: Time Expired before submission
  const candG = await createPaidCandidate("Candidate Eta", "eta@test.local");
  const candGQuestions = await getCandidateQuestions(candG);
  const candGAnswers8 = buildAnswersForQuestions(candGQuestions, 8);
  const testGRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: candG,
      answers: candGAnswers8,
      forceExpired: true,
      startedAt: new Date(Date.now() - 11 * 60 * 1000).toISOString(),
    }),
  });
  const testGData = await testGRes.json();
  assert(testGData.evaluation.timeExpired === true, "Test G: Session expiration flagged and handled per documented policy");

  // ────────────────────────────────────────────────────────────────
  // STEP 6, 7 & 8: CERTIFICATE ELIGIBILITY & PREVIEW GENERATION
  // ────────────────────────────────────────────────────────────────
  console.log("\n--- STEP 6 & 7 & 8: Testing Certificate Eligibility & Preview Generation ---");

  // 6.1 Failed Candidate (4/10) MUST NOT be eligible for Certificate
  const ineligibleCertRes = await fetch(`${BASE_URL}/api/quiz-certificate/certificate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attemptId: testDAttemptId }),
  });
  assert(ineligibleCertRes.status === 403, "Eligibility Gate: Candidate scoring 4/10 is strictly denied certificate issuance");

  // 7.1 Successful Candidate (8/10) Receives Test Certificate Preview
  const certRes = await fetch(`${BASE_URL}/api/quiz-certificate/certificate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      attemptId: testBAttemptId,
      candidateNameOverride: "TEST USER",
    }),
  });
  const certData = await certRes.json();

  assert(certRes.ok && certData.success, "Eligible candidate receives test certificate preview");
  assert(certData.certificate?.candidateName === "TEST USER", "Certificate Candidate Name: TEST USER");
  assert(certData.certificate?.courseName === "Child Psychology & Development – Basic Awareness", "Certificate Course Name displayed correctly");
  assert(certData.certificate?.scorePercentage === 80, "Certificate Quiz Score is 80%");
  assert(certData.certificate?.certificateId.startsWith("TEST-CPD-"), "Certificate ID follows format TEST-CPD-XXXX");
  assert(certData.certificate?.issueDate === "TEST DATE", "Issue Date is TEST DATE");
  assert(certData.certificate?.status === "TEST PREVIEW – NOT VALID FOR OFFICIAL USE", "Status is TEST PREVIEW – NOT VALID FOR OFFICIAL USE");
  assert(certData.certificate?.watermark === "TEST PREVIEW – NOT VALID FOR OFFICIAL USE", "Watermark: TEST PREVIEW – NOT VALID FOR OFFICIAL USE is present");
  assert(certData.certificate?.isTestPreview === true, "Separation: Marked as test preview (not official registry)");
  assert(certData.certificate?.disclaimer?.includes("non-formal educational awareness quiz"), "Mandatory non-formal disclaimer included on certificate");

  // 8.1 Duplicate Certificate Issuance Prevention
  const dupCertRes = await fetch(`${BASE_URL}/api/quiz-certificate/certificate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attemptId: testBAttemptId }),
  });
  const dupCertData = await dupCertRes.json();
  assert(dupCertRes.ok && dupCertData.isDuplicateRetrieval === true, "Prevents duplicate certificate issuance for same attempt");

  // ────────────────────────────────────────────────────────────────
  // STEP 9: SECURITY & ANTI-TAMPERING VERIFICATION
  // ────────────────────────────────────────────────────────────────
  console.log("\n--- STEP 9: Testing Security & Anti-Tampering ---");

  // Client attempts to spoof score by passing scoreMarks in request
  const spoofAttemptRes = await fetch(`${BASE_URL}/api/quiz-certificate/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: candE, // has 0 correct answers
      scoreMarks: 10, // Spoofed score injected by malicious client
      percentage: 100, // Spoofed percentage
      passed: true, // Spoofed passed
      answers: answers0, // actually 0 correct
    }),
  });
  const spoofData = await spoofAttemptRes.json();
  assert(spoofData.evaluation.scoreMarks === 0 && spoofData.evaluation.passed === false, "Anti-Tampering: Server grades answers directly; client injected scores are discarded");

  // ────────────────────────────────────────────────────────────────
  // STEP 11: ADMIN DASHBOARD AUDIT & REPORTING API
  // ────────────────────────────────────────────────────────────────
  console.log("\n--- STEP 11: Testing Admin Dashboard API ---");
  const adminRes = await fetch(`${BASE_URL}/api/quiz-certificate/admin`);
  const adminData = await adminRes.json();

  assert(adminRes.ok && adminData.success, "Admin audit API returns data");
  assert(adminData.stats.totalRegistrations > 0, "Admin can view total registrations");
  assert(adminData.stats.verifiedPayments > 0, "Admin can check payment statuses");
  assert(adminData.stats.totalAttempts > 0, "Admin can view quiz results");
  assert(adminData.stats.passedAttempts > 0, "Admin can identify passing candidates");
  assert(adminData.stats.failedAttempts > 0, "Admin can identify failing candidates");
  assert(adminData.stats.totalCertificates > 0, "Admin can preview eligible test certificates");
  assert(Array.isArray(adminData.certificates), "Admin can view certificate generation logs");

  console.log("\n==================================================================");
  console.log(`TEST SUITE COMPLETE: ${totalPassed} PASSED, ${totalFailed} FAILED`);
  console.log("==================================================================");

  if (totalFailed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution fatal error:", e);
  process.exit(1);
});
