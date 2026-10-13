# PRD: Online Quiz and Digital Certificate System

## Task 1: Existing System Audit & Architectural Design
- Inspect existing codebase (pages, APIs, auth, storage, database).
- Document existing quiz structure and identify missing capabilities for certificates & payments.

## Task 2: Data Store & Backend APIs
- Implement data store for course registrations, payments, quiz attempts, and test certificates.
- Create secure API endpoints:
  - `/api/quiz-certificate/register`: Validate candidate details, course selection, disclaimers.
  - `/api/quiz-certificate/payment`: Test sandbox payment gateway (success, fail, cancel).
  - `/api/quiz-certificate/submit`: 100% server-side quiz evaluation, score calculation, timer enforcement.
  - `/api/quiz-certificate/certificate`: Strict eligibility gate, unique test ID generator, watermark metadata.
  - `/api/quiz-certificate/admin`: Admin querying, review, and report export.

## Task 3: Liquid Glass Onboarding Frontend
- Create new page `/quiz-certification/page.tsx` adhering to site aesthetics with liquid glass / glassmorphism styling.
- Multi-step onboarding flow:
  1. Course Introduction & Non-Formal Disclaimer
  2. Candidate Registration with field validations
  3. Sandbox Payment (₹250) with simulated states
  4. 10-Minute Timed Quiz with real-time countdown & question bank
  5. Result breakdown & Server-graded feedback
  6. Digital Test Certificate Preview with black-and-gold theme, watermark, and disclaimer
  7. Automated Test Suite Runner (Scenarios A through G)

## Task 4: Admin Dashboard Integration
- Extend `/admin` dashboard with a dedicated "Quiz & Certifications" tab.
- Allow admin to view candidates, payment statuses, scores, and preview eligible certificates.

## Task 5: End-to-End Testing & Verification
- Execute Test Scenarios A through G:
  - Test A: 10/10 PASS
  - Test B: 8/10 PASS
  - Test C: 5/10 PASS
  - Test D: 4/10 FAIL
  - Test E: 0/10 FAIL
  - Test F: Unanswered FAIL
  - Test G: Time Expired
- Run 4 Complete Workflows (Successful, Failed Quiz, Failed Payment, Duplicate Issuance Prevention).
- Verify zero real certificates are issued; all test records isolated.

## Task 6: Final Verification & Comprehensive Report
- Run Next.js lint / build checks.
- Produce 14-section comprehensive testing report and readiness assessment.
