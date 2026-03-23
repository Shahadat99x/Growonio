# Growonio — Implementation Order

## Build Sequence

This is the ordered list of what to build, in the sequence that minimizes rework.
Follow this order — later steps depend on earlier ones being correct.

---

### Step 1 — Project Initialization

```
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- Install next-intl and configure middleware for ro/en routing
- Set up /locales/ro.json and /locales/en.json with placeholder keys
- Configure tailwind.config with custom tokens (colors, fonts, spacing)
- Configure path aliases in tsconfig.json
- Add .env.local (from .env.example)
- Connect Supabase: install @supabase/ssr, create utils/supabase/client.ts and server.ts
- Set up Vercel project, link repo, deploy empty shell
- Confirm bilingual routing works (/en path resolves, / defaults to ro)

---

### Step 2 — Design System

- Define color palette in tailwind.config (primary, accent, neutral, surface)
- Set up global typography via next/font (Inter or similar)
- Set up globals.css baseline (resets, body defaults)
- Build layout atoms:
  - Container (max-width wrapper with padding)
  - Section (semantic section with vertical spacing)
  - Heading (h1/h2/h3 with consistent sizing)
  - Button (primary, secondary, ghost variants)
  - Badge
- Build layout shells:
  - Header (logo + nav + language switcher + CTA)
  - Footer (links, copyright, socials placeholder)
- Install only needed shadcn/ui components (Button, Input, Textarea, Dialog, Tabs)

---

### Step 3 — Site Shell

- Set up root layout with Header + Footer
- Add locale-aware metadata generation helper
- Add hreflang link generation to root layout
- Add robots.txt (static or dynamic)
- Add basic 404 page (localized)
- Confirm layout renders in both ro and en
- Deploy shell to Vercel

---

### Step 4 — Homepage

- Build all homepage sections (see PHASE_PLAN.md Phase 3 scope)
- Use placeholder/mock content where Supabase data is not yet live
- Localize all copy in ro.json / en.json
- Add localized metadata (title, description, OG image)
- Test mobile layout

---

### Step 5 — Services Page & Pricing Page

- /servicii and /en/services
- /preturi and /en/pricing
- Use hardcoded content initially (can make editable in Step 8 admin layer)
- Add page-level metadata and structured data (Service schema)

---

### Step 6 — Work / Portfolio Page

- /portofoliu and /en/work
- Connect to Supabase: create `portfolio_items` table
- Build project card component
- Build portfolio grid with optional filter
- Cloudinary for project images

---

### Step 7 — Solutions Page

- /solutii and /en/solutions
- Industry segment sections (salons, clinics, consultants, local businesses)
- Hardcoded layout, outcome-focused copy
- Internal links to relevant service pages

---

### Step 8 — About, FAQ & Contact Pages

- /despre and /en/about
- /intrebari-frecvente and /en/faq
  - Connect to Supabase: `faqs` table
  - Add FAQ JSON-LD schema
- /contact and /en/contact
  - Contact form (React Hook Form + Zod)
  - Submit to Supabase `leads` table
  - Send email via Resend API route
  - WhatsApp CTA link

---

### Step 9 — Legal Pages

- /politica-confidentialitate and /en/privacy-policy
- /termeni-si-conditii and /en/terms
- /politica-cookies and /en/cookies
- Use static content or simple MDX files

---

### Step 10 — Admin Layer

- /admin (protected route, Supabase auth middleware)
- Admin login page
- Admin dashboard shell (sidebar navigation)
- Editors: services, pricing, portfolio items, testimonials, FAQs, company settings, homepage overrides
- Image upload via Cloudinary in portfolio editor

---

### Step 11 — SEO Layer

- Dynamic metadata for all pages (generateMetadata in each layout/page)
- Sitemap.xml (app/sitemap.ts, auto-generated including /en routes)
- Canonical tags
- hreflang in root layout (all locales)
- Open Graph tags per page
- Twitter card tags
- JSON-LD: Organization, FAQPage, Service schemas
- Image alt text audit across all pages

---

### Step 12 — Analytics & Search Console

- Add GA4 via next/script in root layout
- Verify Google Search Console via DNS or HTML tag
- Submit sitemap to Search Console
- Test GA4 events (pageview, form submit)

---

### Step 13 — QA & Polish

- Full mobile responsiveness check
- Cross-browser check (Chrome, Firefox, Safari, Edge)
- Lighthouse audit target: Performance ≥ 90, SEO = 100, Accessibility ≥ 90
- Copy review (ro + en)
- Broken link check
- Admin smoke test (CRUD works, auth works)
- Form submission end-to-end test

---

### Step 14 — Launch

- Configure domain DNS → Vercel
- Confirm SSL active
- Set robots.txt to allow
- Submit sitemap
- Verify GA4 and Search Console live
- Announce

---

## Key Rules

- Always implement ro version first, then en (Romanian-first)
- Never build a page without metadata
- Never hard-code strings — use translation keys from day one
- Keep Supabase tables minimal — only what is actively used
- Do not use any library not listed in STACK_DECISIONS.md without documenting the reason
