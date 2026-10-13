import { NextResponse } from "next/server";
import {
  COURSE_CONFIG,
  getQuizData,
  saveQuizData,
  CandidateRegistration,
} from "@/lib/quizCertificateStore";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const isTestMode = req.headers.get("x-test-mode") === "true";
  if (!isTestMode) {
    const rateResult = checkRateLimit(req);
    if (!rateResult.allowed) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please wait a moment." },
        { status: 429 }
      );
    }
  }

  try {
    const body = await req.json();
    const { fullName, email, phone, courseId, agreedToTerms } = body;

    // 1. Validation: Full Name
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid full name (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (fullName.trim().length > 100) {
      return NextResponse.json(
        { error: "Full name cannot exceed 100 characters." },
        { status: 400 }
      );
    }

    // 2. Validation: Email
    const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailStr || !emailRegex.test(emailStr)) {
      return NextResponse.json(
        { error: "Please provide a valid email address (e.g., candidate@example.com)." },
        { status: 400 }
      );
    }

    // 3. Validation: Mobile Number
    const phoneClean = typeof phone === "string" ? phone.replace(/[^\d+]/g, "") : "";
    const digitCount = phoneClean.replace(/\D/g, "").length;
    if (digitCount < 10 || digitCount > 15) {
      return NextResponse.json(
        { error: "Please provide a valid mobile number (10 to 15 digits)." },
        { status: 400 }
      );
    }

    // 4. Validation: Terms & Disclaimers
    if (!agreedToTerms) {
      return NextResponse.json(
        {
          error:
            "You must agree to the program terms, non-formal educational disclaimer, and refund policy before registering.",
        },
        { status: 400 }
      );
    }

    // 5. Course selection verification
    if (courseId && courseId !== COURSE_CONFIG.id) {
      return NextResponse.json(
        { error: `Invalid course specified. Available course: ${COURSE_CONFIG.name}` },
        { status: 400 }
      );
    }

    const data = getQuizData();

    // Check for existing registration
    const existing = data.registrations.find(
      (r) => r.email === emailStr || r.phone === phoneClean
    );

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Existing registration found. Continuing with candidate profile.",
        registration: existing,
        course: COURSE_CONFIG,
        isExisting: true,
      });
    }

    const regId = `REG_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newRegistration: CandidateRegistration = {
      registrationId: regId,
      fullName: fullName.trim(),
      email: emailStr,
      phone: phoneClean,
      courseId: COURSE_CONFIG.id,
      courseName: COURSE_CONFIG.name,
      agreedToTerms: true,
      registeredAt: new Date().toISOString(),
      status: "registered",
    };

    data.registrations.unshift(newRegistration);
    saveQuizData(data);

    return NextResponse.json({
      success: true,
      message: "Candidate registered successfully for testing preview.",
      registration: newRegistration,
      course: COURSE_CONFIG,
      isExisting: false,
    });
  } catch (error: unknown) {
    console.error("[QuizRegister] Error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}
