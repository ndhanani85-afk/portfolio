import { NextRequest, NextResponse } from "next/server";
import { createSession, getClearSessionCookie, validateSession, getSessionCookieName } from "@/lib/session";

export async function GET(req: NextRequest) {
  // Check if session is valid
  const token = req.cookies.get(getSessionCookieName())?.value;
  const isValid = await validateSession(token);
  return NextResponse.json({ authenticated: isValid });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const ADMIN_KEY = process.env.ADMIN_KEY;
    if (!ADMIN_KEY || password !== ADMIN_KEY) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator password" },
        { status: 401 }
      );
    }

    const { cookie, maxAge } = await createSession();
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout - clear session cookie
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
  response.headers.set("Set-Cookie", getClearSessionCookie());
  return response;
}
