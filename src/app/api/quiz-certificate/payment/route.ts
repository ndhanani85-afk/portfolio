import { NextResponse } from "next/server";
import {
  COURSE_CONFIG,
  getQuizData,
  saveQuizData,
  PaymentRecord,
} from "@/lib/quizCertificateStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { registrationId, amount, simulationAction, transactionRef } = body;

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required." },
        { status: 400 }
      );
    }

    const data = getQuizData();
    const registration = data.registrations.find(
      (r) => r.registrationId === registrationId
    );

    if (!registration) {
      return NextResponse.json(
        { error: "Candidate registration not found." },
        { status: 404 }
      );
    }

    // Amount validation
    if (amount !== COURSE_CONFIG.courseFee) {
      return NextResponse.json(
        {
          error: `Incorrect payment amount. Expected ₹${COURSE_CONFIG.courseFee}, received ₹${amount || 0}.`,
          status: "failed",
        },
        { status: 400 }
      );
    }

    const payId = `PAY_SANDBOX_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const txRef = transactionRef || `TXN_TEST_${Date.now()}`;

    // Handle duplicate payment notifications check
    const existingVerified = data.payments.find(
      (p) => p.registrationId === registrationId && p.status === "verified"
    );

    if (existingVerified && simulationAction !== "simulate_refund") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified for this registration.",
        payment: existingVerified,
        alreadyVerified: true,
      });
    }

    // Determine status based on sandbox action
    let paymentStatus: "verified" | "failed" | "cancelled" | "pending" = "pending";
    let notes = "";

    if (simulationAction === "simulate_success") {
      paymentStatus = "verified";
      notes = "Test sandbox payment authorized successfully.";
      registration.status = "paid";
    } else if (simulationAction === "simulate_failure") {
      paymentStatus = "failed";
      notes = "Test sandbox payment declined (simulated insufficient funds / gateway error).";
    } else if (simulationAction === "simulate_cancel") {
      paymentStatus = "cancelled";
      notes = "Test sandbox payment cancelled by user.";
    } else if (simulationAction === "simulate_refund") {
      if (existingVerified) {
        existingVerified.status = "cancelled";
        existingVerified.notes = "Sandbox test payment refunded.";
        registration.status = "registered";
        saveQuizData(data);
        return NextResponse.json({
          success: true,
          message: "Sandbox test refund processed successfully.",
          payment: existingVerified,
        });
      }
      return NextResponse.json({ error: "No verified payment found to refund." }, { status: 400 });
    } else {
      paymentStatus = "pending";
      notes = "Payment awaiting gateway response.";
    }

    const newPayment: PaymentRecord = {
      paymentId: payId,
      registrationId,
      amount: COURSE_CONFIG.courseFee,
      currency: "INR",
      status: paymentStatus,
      transactionRef: txRef,
      paymentMode: "sandbox_test",
      paidAt: paymentStatus === "verified" ? new Date().toISOString() : undefined,
      notes,
    };

    data.payments.unshift(newPayment);
    saveQuizData(data);

    if (paymentStatus === "verified") {
      return NextResponse.json({
        success: true,
        message: "Sandbox payment verified. Quiz unlocked.",
        payment: newPayment,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: `Sandbox payment ${paymentStatus}: ${notes}`,
        payment: newPayment,
      }, { status: 402 }); // Payment Required / Failed
    }
  } catch (error: unknown) {
    console.error("[QuizPayment] Error:", error);
    return NextResponse.json(
      { error: "Internal server error during payment processing." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const registrationId = searchParams.get("registrationId");

  if (!registrationId) {
    return NextResponse.json({ error: "registrationId required" }, { status: 400 });
  }

  const data = getQuizData();
  const payment = data.payments.find(
    (p) => p.registrationId === registrationId && p.status === "verified"
  );

  return NextResponse.json({
    verified: !!payment,
    payment: payment || null,
  });
}
