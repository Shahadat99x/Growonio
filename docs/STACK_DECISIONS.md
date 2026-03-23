# Growonio — Stack Decisions

## Core Stack

### Next.js (App Router)
- Version: 14+ (App Router)
- Reason: SSR/SSG support is critical for SEO; App Router is the current standard; good i18n routing support
- Config: TypeScript, Tailwind, ESLint

### TypeScript
- Required across the entire project
- Reason: Better maintainability, stronger admin and form safety, cleaner AI handoff

### Tailwind CSS
- Version: v3 (stable)
- Reason: Utility-first, fast iteration, easy design token control via tailwind.config
- Custom theme tokens: colors, font sizes, spacing defined in config

### Supabase
- Use cases: database (services, pricing, portfolio, FAQs, testimonials, leads), auth (admin login), storage (optional)
- Reason: Hosted Postgres + auth + realtime in one service, free tier is sufficient for early stage
- Client: @supabase/ssr (server-side safe client)

### Cloudinary
- Use cases: image hosting, transformation, portfolio images, team photos
- Reason: CDN delivery, on-the-fly transforms, avoids self-hosting media
- Integration: next/image + Cloudinary loader, or direct URL building

### Vercel
- Use cases: deployment, edge functions, preview deployments per branch
- Reason: Native Next.js hosting, zero-config deployment, free tier sufficient early

---

## Supporting Libraries

### i18n — next-intl
- **Decision: next-intl**
- Reason: Best-in-class Next.js i18n with App Router support; middleware-based routing; locale-aware metadata; strong TypeScript support
- Routing: ro as default locale (no prefix or /ro), /en for English
- Message files: /locales/ro.json and /locales/en.json

### Forms — React Hook Form + Zod
- **Decision: React Hook Form + Zod**
- Reason: Industry standard pair; minimal re-renders; Zod gives schema validation reusable for backend too
- Use: Contact form, admin editors

### UI Components — shadcn/ui
- **Decision: shadcn/ui (selective install)**
- Reason: Not a full install — pick only what's needed (Button, Input, Dialog, Tabs, etc.); components are owned/copyable, not black-boxed; works cleanly with Tailwind
- Do not install the full library; install per component as needed

### Email — Resend
- **Decision: Resend (if needed)**
- Reason: Simple transactional email API; good Next.js integration; free tier sufficient for form notifications
- Use: Contact form submission → email notification to business owner
- Note: Business communication should use domain-based email, not free mail

### Analytics — Google Analytics 4
- **Decision: GA4 + Google Search Console**
- Implementation: next/script with GA4 measurement ID in environment variable
- Search Console: verify via DNS or HTML tag on Vercel
- No third-party analytics SaaS needed at this stage

### Auth (Admin) — Supabase Auth
- **Decision: Supabase Auth**
- Reason: Already in stack; simple email+password flow is sufficient for single-admin use case
- Protection: middleware-based route guard for /admin/**
- No NextAuth or third-party auth needed

---

## Decisions That Are Out of Scope

| Option | Decision |
|---|---|
| Contentful / Sanity / Prismic | No — Supabase-backed admin is sufficient |
| Prisma ORM | No — Supabase client is sufficient, no need for extra ORM |
| Redux / Zustand | No — Server components + Next.js cache sufficient; minimal client state |
| Docker | No — Vercel handles deployment; no need for local Docker setup |
| Storybook | No — Overhead not justified at current scale |
| Cypress / Playwright | No — Manual QA is fine at this stage; can add later |

---

## Environment Variables Required

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Resend (optional, for contact form emails)
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# App
NEXT_PUBLIC_SITE_URL=https://growonio.com
```
