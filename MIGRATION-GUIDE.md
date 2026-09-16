# Cloudflare Workers Migration Guide
# Zero-Downtime Migration from Vercel

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        DNS (Cloudflare)                      │
│                                                              │
│   nikunjdhanani.com ─────────┬─────────── api.nikunjdhanani.com │
│                              │                               │
│                    ┌─────────▼──────────┐                    │
│                    │  Vercel (Frontend)  │                    │
│                    │  Next.js Pages      │                    │
│                    └────────────────────┘                    │
│                              │                               │
│                    ┌─────────▼──────────┐                    │
│                    │  CF Worker (API)   │                    │
│                    │  /api/* routes     │                    │
│                    └─────────┬──────────┘                    │
│                              │                               │
│                    ┌─────────▼──────────┐                    │
│                    │  Cloudflare KV     │                    │
│                    │  - BOOKINGS_KV     │                    │
│                    │  - REVIEWS_KV      │                    │
│                    │  - SESSIONS_KV     │                    │
│                    └────────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

## Migration Strategy: Zero Downtime

### Phase 1: Prepare Cloudflare Worker (Current)

✅ **Completed:**
- Cloudflare Worker code created at `/cloudflare-worker/index.js`
- KV-backed storage replaces fs-based stores
- Session-based auth with httpOnly cookies
- Rate limiting using KV (distributed)
- All API routes replicated: bookings, reviews, admin/login

### Phase 2: Export Data from Vercel

```bash
# Set environment variables
export ADMIN_KEY="your-current-admin-key"
export VERCEL_URL="https://nikunjdhanani.com"

# Run export (dry run first)
node scripts/migrate-to-cf.js --dry-run

# Export for real
node scripts/migrate-to-cf.js
```

This creates:
- `migration-export/bookings.json`
- `migration-export/reviews.json`

### Phase 3: Create Cloudflare Resources

```bash
# Install wrangler if not done
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create KV namespaces
wrangler kv:namespace create BOOKINGS_KV
wrangler kv:namespace create REVIEWS_KV
wrangler kv:namespace create SESSIONS_KV

# Update wrangler.toml with the returned namespace IDs
# Replace REPLACE_WITH_*_KV_ID placeholders

# Import data
wrangler kv:key put --binding=BOOKINGS_KV "bookings:list" --path=migration-export/bookings.json
wrangler kv:key put --binding=REVIEWS_KV "reviews:list" --path=migration-export/reviews.json

# Set secrets
wrangler secret put ADMIN_KEY
wrangler secret put ADMIN_SESSION_SECRET
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

### Phase 4: Deploy Worker (Before DNS Cutover)

```bash
# Deploy to workers.dev subdomain first (no downtime)
wrangler deploy

# Test at https://ndhanani-portfolio-api.<subdomain>.workers.dev
curl https://ndhanani-portfolio-api.<subdomain>.workers.dev/api/bookings \
  -H "Cookie: dhanani_admin_session=<valid-token>"
```

### Phase 5: Custom Domain (API Subdomain)

1. Add `api.nikunjdhanani.com` CNAME in Cloudflare DNS:
   - Name: `api`
   - Target: `ndhanani-portfolio-api.<subdomain>.workers.dev`
   - Proxy: ON (orange cloud)

2. Update `wrangler.toml`:
   ```toml
   routes = [{ pattern = "api.nikunjdhanani.com/*", zone_name = "nikunjdhanani.com" }]
   ```

3. Redeploy: `wrangler deploy`

### Phase 6: Update Next.js Frontend

The Next.js frontend on Vercel needs to call `api.nikunjdhanani.com` instead of relative `/api/` paths.

**Option A: Environment-based API base URL**
```typescript
// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export async function fetchBookings() {
  return fetch(`${API_BASE}/api/bookings`, {
    credentials: 'include', // Send cookies
  });
}
```

**Option B: Proxy through Vercel rewrites**
```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://api.nikunjdhanani.com/api/:path*',
    },
  ];
}
```

> **Recommendation:** Option B requires zero code changes in the frontend. Just add the rewrite and all `/api/*` calls go to CF Worker.

### Phase 7: Verify & Monitor

```bash
# Test all endpoints
curl https://api.nikunjdhanani.com/api/reviews
curl -X POST https://api.nikunjdhanani.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"9999999999","serviceType":"Test"}'

# Check Cloudflare Worker logs
wrangler tail

# Monitor KV usage in Cloudflare Dashboard
```

### Phase 8: Decommission Vercel APIs

Once verified:
1. Delete or disable API routes in Vercel project
2. Or keep them as fallback (they won't receive new data if DNS points to CF)

## Security Improvements in CF Worker

| Feature | Vercel (Before) | CF Worker (After) |
|---------|-----------------|-------------------|
| Rate limiting | In-memory (per-instance) | KV-backed (distributed) |
| Session storage | localStorage (plaintext) | httpOnly cookie + KV |
| Admin auth | Header-based API key | HMAC-signed cookie |
| XSS risk | localStorage readable by JS | httpOnly cookie invisible to JS |
| Cold start rate limit reset | Yes (bypassed) | No (KV persists) |
| Global distribution | Regional | 300+ edge locations |

## Rollback Plan

If something goes wrong:
1. Revert DNS: Point `api.nikunjdhanani.com` back to Vercel
2. API routes on Vercel still work (if not deleted)
3. Data in KV remains intact for retry

## Cost Estimate

| Resource | Free Tier | Usage (1K users/day) |
|----------|-----------|---------------------|
| Worker requests | 100K/day | ~5K/day |
| KV reads | 100K/day | ~20K/day |
| KV writes | 1K/day | ~500/day |
| **Cost** | **$0** | **$0** |

## Post-Migration Checklist

- [ ] All API endpoints return correct data
- [ ] Admin login/logout works with session cookies
- [ ] Rate limiting triggers correctly
- [ ] CORS headers present for cross-origin requests
- [ ] Web3Forms email notifications still sending
- [ ] Google Calendar sync still working
- [ ] Session timeout after 7 days
- [ ] Error handling returns proper status codes
- [ ] No console errors in browser
- [ ] KV data backed up (export periodically)
