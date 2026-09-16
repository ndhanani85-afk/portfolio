// Server-side session management for admin authentication
// Uses HMAC-signed cookies for stateless session validation

const SESSION_COOKIE = "dhanani_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set and at least 32 characters");
  }
  return secret;
}

// Simple HMAC-SHA256 signing using Node crypto (available in Next.js server)
async function sign(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSession(): Promise<{ cookie: string; maxAge: number }> {
  const secret = getSessionSecret();
  const sessionId = crypto.randomUUID();
  const timestamp = Date.now().toString();
  const payload = `${sessionId}.${timestamp}`;
  const signature = await sign(payload, secret);
  const token = `${payload}.${signature}`;

  return {
    cookie: `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_MAX_AGE}`,
    maxAge: SESSION_MAX_AGE,
  };
}

export async function validateSession(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const secret = getSessionSecret();
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [sessionId, timestamp, signature] = parts;
    const payload = `${sessionId}.${timestamp}`;
    const expectedSignature = await sign(payload, secret);

    // Constant-time comparison
    if (signature.length !== expectedSignature.length) return false;
    let result = 0;
    for (let i = 0; i < signature.length; i++) {
      result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
    }
    if (result !== 0) return false;

    // Check expiration
    const timestampNum = parseInt(timestamp, 10);
    if (isNaN(timestampNum)) return false;
    const age = Date.now() - timestampNum;
    if (age > SESSION_MAX_AGE * 1000) return false;

    return true;
  } catch {
    return false;
  }
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getClearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}
