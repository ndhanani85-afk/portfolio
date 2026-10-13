# Roadmap: Online Quiz & Digital Certificate System

## Phase 1: Architecture & Data Layer
- Define data structures for Registrations, Payments, Quiz Attempts, and Certificates.
- Implement server-side storage and API endpoints with validation.

## Phase 2: Onboarding UI & Liquid Glass Design
- Build `/quiz-certification` page with onboarding step flow.
- Liquid glass / Glassmorphism design system with responsive layout.

## Phase 3: Quiz Engine & Timer
- 10 Child Psychology questions, 10-minute timer with auto-submit on expiry.
- Server-side answer evaluation and tamper-proof grading.

## Phase 4: Payment Sandbox & Gatekeeper
- Test sandbox payment simulation (Success, Failed, Cancelled) for ₹250.
- State lock preventing unpaid quiz access or certificate claims.

## Phase 5: Digital Certificate Preview & Security
- Black-and-gold certificate preview with watermark and legal disclaimer.
- Unique test ID generation (`TEST-CPD-XXXX`) and idempotency checks.

## Phase 6: Admin Dashboard Integration & Full E2E Test Suite
- Integrate test registry into `/admin` dashboard.
- Execute Test Scenarios A through G and 4 complete workflows.
- Produce comprehensive final testing report.
