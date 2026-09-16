// Cloudflare Workers entry point for ndhanani_portfolio
// This handles API routes and serves static assets from R2 or next/standalone output

export interface Env {
  // KV Namespaces
  BOOKINGS_KV: KVNamespace;
  REVIEWS_KV: KVNamespace;
  SESSIONS_KV: KVNamespace;
  
  // Environment Variables
  ADMIN_KEY: string;
  ADMIN_SESSION_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  WEB3FORMS_ACCESS_KEY?: string;
  GOOGLE_SCRIPT_WEB_APP_URL?: string;
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
}

// Simple HMAC-SHA256 for session signing
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

// Parse cookies from request header
function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach(pair => {
    const [key, ...rest] = pair.split("=");
    if (key && rest.length > 0) {
      cookies[key.trim()] = rest.join("=").trim();
    }
  });
  return cookies;
}

// Session management
const SESSION_COOKIE = "dhanani_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function validateSession(token: string | null, secret: string): Promise<boolean> {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [sessionId, timestamp, signature] = parts;
    const payload = `${sessionId}.${timestamp}`;
    const expectedSignature = await sign(payload, secret);
    
    if (signature.length !== expectedSignature.length) return false;
    let result = 0;
    for (let i = 0; i < signature.length; i++) {
      result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
    }
    if (result !== 0) return false;
    
    const timestampNum = parseInt(timestamp, 10);
    if (isNaN(timestampNum)) return false;
    const age = Date.now() - timestampNum;
    if (age > SESSION_MAX_AGE * 1000) return false;
    
    return true;
  } catch {
    return false;
  }
}

async function createSession(secret: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  const timestamp = Date.now().toString();
  const payload = `${sessionId}.${timestamp}`;
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

// Rate limiting using KV
async function checkRateLimit(kv: KVNamespace, ip: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  const MAX_REQUESTS = 8;
  
  const key = `ratelimit:${ip}`;
  const now = Date.now();
  
  try {
    const data = await kv.get(key, { type: "json" }) as { count: number; resetAt: number } | null;
    
    if (!data || now > data.resetAt) {
      await kv.put(key, JSON.stringify({ count: 1, resetAt: now + WINDOW_MS }), { expirationTtl: 900 });
      return { allowed: true };
    }
    
    data.count += 1;
    await kv.put(key, JSON.stringify(data), { expirationTtl: Math.ceil((data.resetAt - now) / 1000) });
    
    if (data.count > MAX_REQUESTS) {
      return { allowed: false, retryAfter: Math.ceil((data.resetAt - now) / 1000) };
    }
    
    return { allowed: true };
  } catch {
    return { allowed: true }; // Allow on KV failure
  }
}

// Get client IP
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",").map(s => s.trim()).filter(Boolean)[0];
    if (firstIp) return firstIp;
  }
  return request.headers.get("x-real-ip") || "unknown";
}

// CORS headers
function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-key",
  };
}

// API Route handlers
async function handleBookings(request: Request, env: Env): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }
  
  const ip = getClientIp(request);
  const rateResult = await checkRateLimit(env.BOOKINGS_KV, ip);
  if (!rateResult.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many submissions. Please wait a few minutes." }),
      { status: 429, headers: { ...corsHeaders(), "Retry-After": String(rateResult.retryAfter || 900) } }
    );
  }
  
  // POST: Create booking
  if (request.method === "POST") {
    try {
      const body = await request.json() as any;
      
      // Validation
      const rawName = typeof body.name === "string" ? body.name : "";
      const rawEmail = typeof body.email === "string" ? body.email : "";
      const rawPhone = typeof body.phone === "string" ? body.phone : "";
      const rawServiceType = typeof body.serviceType === "string" ? body.serviceType : "";
      const rawService = typeof body.service === "string" ? body.service : "";
      const rawMessage = typeof body.message === "string" ? body.message : "";
      const rawNotes = typeof body.notes === "string" ? body.notes : "";
      
      if (rawName.length > 200 || rawEmail.length > 254 || rawPhone.length > 20 || rawMessage.length > 5000) {
        return new Response(JSON.stringify({ error: "Input too long" }), { status: 400, headers: corsHeaders() });
      }
      
      const leadName = rawName.trim() || "Anonymous Visitor";
      const leadPhone = rawPhone.trim().replace(/[^\d+]/g, "");
      const leadEmail = rawEmail.trim().toLowerCase();
      const finalService = rawServiceType.trim() || rawService.trim() || "General Counseling Inquiry";
      const finalMessage = rawMessage.trim() || rawNotes.trim() || "Submitted via Website";
      
      if (leadEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
        return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: corsHeaders() });
      }
      
      if (!leadPhone && !leadEmail) {
        return new Response(JSON.stringify({ error: "Phone or email required" }), { status: 400, headers: corsHeaders() });
      }
      
      const bookingId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const newRecord = {
        _id: bookingId,
        name: leadName,
        email: leadEmail,
        phone: leadPhone,
        serviceType: finalService,
        message: finalMessage,
        createdAt: new Date().toISOString(),
      };
      
      // Save to KV
      const existing = await env.BOOKINGS_KV.get("bookings:list", { type: "json" }) as any[] || [];
      const updated = [newRecord, ...existing.filter((b: any) => b._id !== bookingId)];
      await env.BOOKINGS_KV.put("bookings:list", JSON.stringify(updated));
      
      // Background email (fire and forget)
      if (env.WEB3FORMS_ACCESS_KEY) {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: env.WEB3FORMS_ACCESS_KEY,
            name: leadName,
            email: leadEmail,
            phone: leadPhone,
            service: finalService,
            message: finalMessage,
            subject: `New Lead: ${finalService} from ${leadName}`,
          }),
        }).catch(() => {});
      }
      
      return new Response(
        JSON.stringify({ success: true, message: "Thank you! Your information has been received.", data: newRecord }),
        { status: 200, headers: corsHeaders() }
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders() });
    }
  }
  
  // GET: List bookings (admin only)
  if (request.method === "GET") {
    const cookies = parseCookies(request.headers.get("cookie"));
    const isAdmin = await validateSession(cookies[SESSION_COOKIE], env.ADMIN_SESSION_SECRET);
    
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders() });
    }
    
    const bookings = await env.BOOKINGS_KV.get("bookings:list", { type: "json" }) as any[] || [];
    return new Response(
      JSON.stringify({ success: true, source: "Lead Submission Channels", data: bookings }),
      { status: 200, headers: corsHeaders() }
    );
  }
  
  // DELETE: Remove booking (admin only)
  if (request.method === "DELETE") {
    const cookies = parseCookies(request.headers.get("cookie"));
    const isAdmin = await validateSession(cookies[SESSION_COOKIE], env.ADMIN_SESSION_SECRET);
    
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders() });
    }
    
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "ID required" }), { status: 400, headers: corsHeaders() });
    }
    
    const existing = await env.BOOKINGS_KV.get("bookings:list", { type: "json" }) as any[] || [];
    const updated = existing.filter((b: any) => b._id !== id);
    await env.BOOKINGS_KV.put("bookings:list", JSON.stringify(updated));
    
    return new Response(
      JSON.stringify({ success: true, message: "Lead deleted" }),
      { status: 200, headers: corsHeaders() }
    );
  }
  
  // PUT: Update booking (admin only)
  if (request.method === "PUT") {
    const cookies = parseCookies(request.headers.get("cookie"));
    const isAdmin = await validateSession(cookies[SESSION_COOKIE], env.ADMIN_SESSION_SECRET);
    
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders() });
    }
    
    try {
      const body = await request.json() as any;
      const { id, name, email, phone, serviceType, message } = body;
      
      if (!id) {
        return new Response(JSON.stringify({ error: "ID required" }), { status: 400, headers: corsHeaders() });
      }
      
      const existing = await env.BOOKINGS_KV.get("bookings:list", { type: "json" }) as any[] || [];
      const updated = existing.map((b: any) => b._id === id ? { ...b, name, email, phone, serviceType, message } : b);
      await env.BOOKINGS_KV.put("bookings:list", JSON.stringify(updated));
      
      return new Response(
        JSON.stringify({ success: true, message: "Lead updated" }),
        { status: 200, headers: corsHeaders() }
      );
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders() });
    }
  }
  
  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders() });
}

async function handleReviews(request: Request, env: Env): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }
  
  const ip = getClientIp(request);
  const rateResult = await checkRateLimit(env.REVIEWS_KV, ip);
  if (!rateResult.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many submissions. Please wait a few minutes." }),
      { status: 429, headers: { ...corsHeaders(), "Retry-After": String(rateResult.retryAfter || 900) } }
    );
  }
  
  // POST: Create review
  if (request.method === "POST") {
    try {
      const body = await request.json() as any;
      
      const rawName = typeof body.name === "string" ? body.name : "";
      const rawReviewText = typeof body.reviewText === "string" ? body.reviewText : "";
      const rawCategory = typeof body.category === "string" ? body.category : "";
      const rawSubType = typeof body.subType === "string" ? body.subType : "";
      const rawRating = Number(body.rating);
      
      if (!rawReviewText.trim()) {
        return new Response(JSON.stringify({ error: "Review text required" }), { status: 400, headers: corsHeaders() });
      }
      if (rawReviewText.length > 5000 || rawName.length > 200) {
        return new Response(JSON.stringify({ error: "Input too long" }), { status: 400, headers: corsHeaders() });
      }
      
      const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newRecord = {
        _id: reviewId,
        name: rawName.trim() || "Anonymous Client",
        rating: isNaN(rawRating) || rawRating < 1 ? 5 : Math.min(rawRating, 5),
        category: rawCategory.trim() || "General Counseling",
        subType: rawSubType.trim() || "General",
        reviewText: rawReviewText.trim(),
        isAIGenerated: Boolean(body.isAIGenerated),
        source: "site_storage",
        createdAt: new Date().toISOString(),
      };
      
      const existing = await env.REVIEWS_KV.get("reviews:list", { type: "json" }) as any[] || [];
      const updated = [newRecord, ...existing.filter((r: any) => r._id !== reviewId)];
      await env.REVIEWS_KV.put("reviews:list", JSON.stringify(updated));
      
      return new Response(
        JSON.stringify({ success: true, message: "Review saved.", data: newRecord }),
        { status: 200, headers: corsHeaders() }
      );
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders() });
    }
  }
  
  // GET: List reviews (public - excludes seeds)
  if (request.method === "GET") {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const seedsOnly = url.searchParams.get("seeds") === "true";
    
    const allReviews = await env.REVIEWS_KV.get("reviews:list", { type: "json" }) as any[] || [];
    
    if (seedsOnly) {
      const seeds = allReviews.filter((r: any) => r.source === "seed_storage");
      return new Response(JSON.stringify({ success: true, data: seeds }), { status: 200, headers: corsHeaders() });
    }
    
    let realReviews = allReviews.filter((r: any) => r.source !== "seed_storage");
    if (category && category !== "All" && category !== "all") {
      realReviews = realReviews.filter((r: any) => r.category.toLowerCase() === category.toLowerCase());
    }
    realReviews.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return new Response(
      JSON.stringify({ success: true, total: realReviews.length, data: realReviews }),
      { status: 200, headers: corsHeaders() }
    );
  }
  
  // DELETE: Remove review (admin only)
  if (request.method === "DELETE") {
    const cookies = parseCookies(request.headers.get("cookie"));
    const isAdmin = await validateSession(cookies[SESSION_COOKIE], env.ADMIN_SESSION_SECRET);
    
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders() });
    }
    
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "ID required" }), { status: 400, headers: corsHeaders() });
    }
    
    const existing = await env.REVIEWS_KV.get("reviews:list", { type: "json" }) as any[] || [];
    const updated = existing.filter((r: any) => r._id !== id);
    await env.REVIEWS_KV.put("reviews:list", JSON.stringify(updated));
    
    return new Response(
      JSON.stringify({ success: true, message: "Review deleted" }),
      { status: 200, headers: corsHeaders() }
    );
  }
  
  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders() });
}

async function handleAdminLogin(request: Request, env: Env): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }
  
  // GET: Check session
  if (request.method === "GET") {
    const cookies = parseCookies(request.headers.get("cookie"));
    const isAdmin = await validateSession(cookies[SESSION_COOKIE], env.ADMIN_SESSION_SECRET);
    return new Response(JSON.stringify({ authenticated: isAdmin }), { status: 200, headers: corsHeaders() });
  }
  
  // POST: Login
  if (request.method === "POST") {
    try {
      const body = await request.json() as any;
      const { password } = body;
      
      if (!password || password !== env.ADMIN_KEY) {
        return new Response(
          JSON.stringify({ success: false, message: "Invalid password" }),
          { status: 401, headers: corsHeaders() }
        );
      }
      
      const sessionToken = await createSession(env.ADMIN_SESSION_SECRET);
      const cookie = `${SESSION_COOKIE}=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_MAX_AGE}`;
      
      return new Response(
        JSON.stringify({ success: true, message: "Authenticated" }),
        { status: 200, headers: { ...corsHeaders(), "Set-Cookie": cookie } }
      );
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders() });
    }
  }
  
  // DELETE: Logout
  if (request.method === "DELETE") {
    const cookie = `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
    return new Response(
      JSON.stringify({ success: true, message: "Logged out" }),
      { status: 200, headers: { ...corsHeaders(), "Set-Cookie": cookie } }
    );
  }
  
  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders() });
}

// Main worker handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // API Routes
    if (path.startsWith("/api/")) {
      // Bookings API
      if (path === "/api/bookings") {
        return handleBookings(request, env);
      }
      
      // Reviews API
      if (path === "/api/reviews") {
        return handleReviews(request, env);
      }
      
      // Admin Login API
      if (path === "/api/admin/login") {
        return handleAdminLogin(request, env);
      }
      
      // Data API (no-op)
      if (path === "/api/data") {
        return new Response(
          JSON.stringify({ success: false, message: "Not implemented" }),
          { status: 501, headers: corsHeaders() }
        );
      }
      
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders() });
    }
    
    // For non-API routes, proxy to the Next.js origin (Vercel) or serve static
    // This allows gradual migration - API routes go to CF Worker, pages stay on Vercel
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: corsHeaders() }
    );
  },
};
