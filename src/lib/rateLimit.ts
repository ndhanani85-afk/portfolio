// Simple in-memory rate limiter.
// On Vercel serverless (cold starts per function), this resets on each warm container
// and does NOT survive across concurrent instances. It is a best-effort throttle, not
// a distributed guarantee. For production rate limiting, use Vercel KV / Upstash Redis
// with a token-bucket or sliding-window algorithm.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const windows = new Map<string, RateLimitEntry>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 8; // per window per IP

function getClientIp(req: Request): string {
  // Vercel sets the client IP on the x-forwarded-for header (first value is the client)
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",").map((s) => s.trim()).filter(Boolean)[0];
    if (firstIp) return firstIp;
  }
  // Fallback: the connecting address isn't exposed in the standard Request object,
  // so fall back to a header or a placeholder. On Vercel the x-forwarded-for is reliable.
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "";
}

export function checkRateLimit(req: Request): {
  allowed: boolean;
  retryAfter?: number;
} {
  const ip = getClientIp(req);
  if (!ip) {
    // If we can't determine an IP (e.g. local dev without proxy headers), allow.
    return { allowed: true };
  }

  const now = Date.now();
  let entry = windows.get(ip);

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    windows.set(ip, entry);
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

export function resetRateLimitForIp(ip: string): void {
  windows.delete(ip);
}

// Best-effort cleanup: prune stale entries once per window to keep memory bounded.
let lastCleanup = 0;
export function maybeCleanupStaleEntries(): void {
  const now = Date.now();
  if (now - lastCleanup < WINDOW_MS) return;
  lastCleanup = now;
  for (const [ip, entry] of windows) {
    if (now > entry.resetAt) {
      windows.delete(ip);
    }
  }
}
