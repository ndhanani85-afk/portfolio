# Graph Report - ndhanani_portfolio  (2026-10-12)

## Corpus Check
- 85 files · ~1,044,360 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 395 nodes · 645 edges · 34 communities (25 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f7de5735`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_useLanguage|useLanguage]]
- [[_COMMUNITY_index.ts|index.ts]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_route.ts|route.ts]]
- [[_COMMUNITY_devDependencies|devDependencies]]
- [[_COMMUNITY_route.ts|route.ts]]
- [[_COMMUNITY_JsonLdSchema.tsx|JsonLdSchema.tsx]]
- [[_COMMUNITY_📊 Comprehensive Instagram Growth & Content Architecture Guide|📊 Comprehensive Instagram Growth & Content Architecture Guide]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_Migration Strategy Zero Downtime|Migration Strategy: Zero Downtime]]
- [[_COMMUNITY_kvStorage.ts|kvStorage.ts]]
- [[_COMMUNITY_Nikunj Dhanani — Portfolio & Practice Master Document|Nikunj Dhanani — Portfolio & Practice Master Document]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_migrate-to-cf.js|migrate-to-cf.js]]
- [[_COMMUNITY_README|README.md]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_button.tsx|button.tsx]]
- [[_COMMUNITY_Booking.ts|Booking.ts]]
- [[_COMMUNITY_Review.ts|Review.ts]]
- [[_COMMUNITY_AGENTS|AGENTS.md]]
- [[_COMMUNITY_eslint.config.mjs|eslint.config.mjs]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 38 edges
2. `translations` - 17 edges
3. `compilerOptions` - 16 edges
4. `SupportedLanguage` - 12 edges
5. `📊 Comprehensive Instagram Growth & Content Architecture Guide` - 12 edges
6. `ScrollReveal()` - 10 edges
7. `TranslationDictionary` - 10 edges
8. `JsonLdSchema()` - 9 edges
9. `validateSession()` - 9 edges
10. `Migration Strategy: Zero Downtime` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ContactBookingContent()` --calls--> `useLanguage()`  [EXTRACTED]
  src/app/contact/page.tsx → src/context/LanguageContext.tsx
- `Header()` --calls--> `useLanguage()`  [EXTRACTED]
  src/components/Header.tsx → src/context/LanguageContext.tsx
- `AboutPage()` --calls--> `useLanguage()`  [EXTRACTED]
  src/app/about/page.tsx → src/context/LanguageContext.tsx
- `POST()` --calls--> `createSession()`  [EXTRACTED]
  src/app/api/admin/login/route.ts → src/lib/session.ts
- `getSessionToken()` --calls--> `getSessionCookieName()`  [EXTRACTED]
  src/app/api/bookings/route.ts → src/lib/session.ts

## Import Cycles
- None detected.

## Communities (34 total, 9 thin omitted)

### Community 0 - "useLanguage"
Cohesion: 0.09
Nodes (31): AboutPage(), FAQPage(), HomePage(), ResourcesPage(), CounsellingLifeCoachingPage(), ServicesHubPage(), ParentingCoachingPage(), RelationshipRepairPage() (+23 more)

### Community 1 - "index.ts"
Cohesion: 0.14
Nodes (20): Footer(), Header(), FirstVisitLanguageModal(), LanguageSelector(), WhatsAppBubble(), LanguageContext, LanguageContextType, LanguageOption (+12 more)

### Community 2 - "page.tsx"
Cohesion: 0.10
Nodes (24): confettiList, ContactBookingContent(), confettiList, ReviewSeed, metadata, AlertDialog(), AlertDialogAction(), AlertDialogCancel() (+16 more)

### Community 3 - "route.ts"
Cohesion: 0.14
Nodes (25): DELETE(), GET(), POST(), DELETE(), GET(), getSessionToken(), isAdmin(), POST() (+17 more)

### Community 4 - "devDependencies"
Cohesion: 0.07
Nodes (29): dependencies, lucide-react, mongoose, next, nodemailer, posthog-js, react, react-dom (+21 more)

### Community 5 - "route.ts"
Cohesion: 0.16
Nodes (24): DELETE(), extractDateAndSlot(), GET(), getBookedSlotsForDate(), getSessionToken(), isAdmin(), normalizeTime(), POST() (+16 more)

### Community 6 - "JsonLdSchema.tsx"
Cohesion: 0.10
Nodes (10): metadata, metadata, metadata, metadata, metadata, metadata, metadata, metadata (+2 more)

### Community 7 - "📊 Comprehensive Instagram Growth & Content Architecture Guide"
Cohesion: 0.08
Nodes (25): 10. Plug-and-Play AI Master Prompt (Copy & Paste to ChatGPT/Claude), 11. 12 Pre-Approved High-Converting Carousel Topics for Nikunj Dhanani, 1. Executive Summary & Brand Identity, 2. Niche & Content Pillars, 3. Targeted Audience Profile (Audience Personas), 4. Why Posts Go Viral: The Instagram Algorithm Economics, 5. What Kind of Posts Get Higher Reach & Views?, 6. The "Hook Bible": What Kind of Lines Create Massive Reach? (+17 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "Migration Strategy: Zero Downtime"
Cohesion: 0.12
Nodes (16): Architecture Overview, Cloudflare Workers Migration Guide, Cost Estimate, Migration Strategy: Zero Downtime, Phase 1: Prepare Cloudflare Worker (Current), Phase 2: Export Data from Vercel, Phase 3: Create Cloudflare Resources, Phase 4: Deploy Worker (Before DNS Cutover) (+8 more)

### Community 10 - "kvStorage.ts"
Cohesion: 0.18
Nodes (6): kvDelete(), kvGetJson(), kvGetText(), KVNamespace, kvPutJson(), kvPutText()

### Community 11 - "Nikunj Dhanani — Portfolio & Practice Master Document"
Cohesion: 0.14
Nodes (13): 1. Identity / Basic Info (ઓળખ અને પાયાની વિગતો), 2. Services / Programs (સેવાઓ અને કાર્યક્રમો), 3. Niche / Positioning (વિશિષ્ટ પોઝિશનિંગ), 4. Credibility (વિશ્વાસપાત્રતા અને પ્રમાણપત્રો), 5. Mission / Vision (મિશન અને વિઝન), 6. Contact & Presence (સંપર્ક અને વિગતો), 7. Target Leads (કયા પ્રકારના લીડ્સ ટાર્ગેટ છે?), Nikunj Dhanani — Portfolio & Practice Master Document (+5 more)

### Community 12 - "layout.tsx"
Cohesion: 0.18
Nodes (8): alexBrush, caveat, fraunces, inter, jsonLd, metadata, MainLayoutWrapper(), PostHogProvider()

### Community 13 - "migrate-to-cf.js"
Cohesion: 0.29
Nodes (7): DRY_RUN, fetchFromVercel(), fs, http, https, main(), path

### Community 14 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **155 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+150 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLanguage()` connect `useLanguage` to `index.ts`, `page.tsx`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `faqPageTranslations` connect `index.ts` to `JsonLdSchema.tsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _155 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.0858843537414966 - nodes in this community are weakly interconnected._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13949579831932774 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0962566844919786 - nodes in this community are weakly interconnected._
- **Should `route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13911290322580644 - nodes in this community are weakly interconnected._