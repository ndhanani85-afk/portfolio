import { NextResponse } from "next/server";

export async function POST() {
  // Rate limit / honeypot: no-op endpoint. Remove if a real data capture route is needed.
  return NextResponse.json(
    { success: false, message: "Endpoint not implemented" },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Endpoint not implemented" },
    { status: 501 }
  );
}
