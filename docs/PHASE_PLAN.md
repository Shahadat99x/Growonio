# Growonio — Phase Plan

## Overview

This document defines the full phase roadmap from foundation to launch.
Each phase has a clear goal, scope, and acceptance criteria.

---

## Phase 0 — Foundation & Alignment ✅

**Goal:** Confirm project direction, audit repo, and create planning documentation.

**Scope:**
- Read and align with all core docs
- Audit current repo state
- Create PHASE_PLAN.md, STACK_DECISIONS.md, IMPLEMENTATION_ORDER.md
- Update STATUS.md and NEXT_PHASE.md
- Commit everything cleanly

**Acceptance:** Planning docs exist, repo direction is unambiguous, next phase is ready to start.

---

## Phase 1 — Project Setup & Architecture

**Goal:** Initialize the Next.js project with full stack configuration.

**Scope:**
- Initialize Next.js app with TypeScript and Tailwind CSS
- Configure folder structure (app router, components, lib, types, locales)
- Set up next-intl for bilingual routing (ro default, /en secondary)
- Configure ESLint, Prettier, path aliases
- Set up Supabase project and connect env vars
- Set up Cloudinary account and env vars
- Set up Vercel project and deploy empty shell
- Create .env.example
- Create basic README.md

**Acceptance:** Project runs locally, deploys to Vercel, i18n routing works, Supabase connected.

---

## Phase 2 — Design System

**Goal:** Build the foundational UI system before any pages.

**Scope:**
- Define color palette, typography scale, spacing tokens in Tailwind config
- Set up global CSS baseline
- Install and configure shadcn/ui (select components only)
- Build core layout components: Header, Footer, Section wrapper
- Build reusable atoms: Button, Badge, Heading, Container
- Set up font loading (Google Fonts via next/font)

**Acceptance:** Design system is usable, layout shell renders in both languages, components are clean and documented minimally.

---

## Phase 3 — Homepage

**Goal:** Build the complete homepage in both Romanian and English.

**Scope:**
- Hero section (headline, sub, CTA)
- Services preview (cards linking to /servicii)
- Solutions by business type
- Selected work / demos section
- Process section
- Trust / credibility section
- CTA section (contact / quote request)
- Localized metadata (title, description, OG)

**Acceptance:** Homepage is live, bilingual, SEO-ready, and conversion-oriented.

---

## Phase 4 — Services & Pricing Pages

**Goal:** Build the services and pricing pages.

**Scope:**
- /servicii page (all services, outcome-focused copy)
- /preturi page (package-based pricing, starting prices)
- Localized versions /en/services and /en/pricing
- Metadata and structured data per page

**Acceptance:** Both pages live, bilingual, SEO-ready.

---

## Phase 5 — Work / Portfolio & Solutions Pages

**Goal:** Build the portfolio and solution focus pages.

**Scope:**
- /portofoliu page (project cards, filterable)
- /solutii page (industry segments: salons, clinics, consultants)
- Localized /en versions
- Connect portfolio to Supabase for data

**Acceptance:** Pages live, portfolio pulls from Supabase, bilingual.

---

## Phase 6 — About, FAQ & Contact Pages

**Goal:** Complete the trust and conversion support pages.

**Scope:**
- /despre page (company story, approach, values)
- /intrebari-frecvente page (FAQ with schema markup)
- /contact page (simple inquiry form, WhatsApp link)
- Contact form → Supabase leads table + Resend email notification
- Localized /en versions

**Acceptance:** All three pages live, form submits correctly, FAQ schema renders.

---

## Phase 7 — Admin Layer

**Goal:** Build the lightweight protected admin dashboard.

**Scope:**
- /admin route (protected, Supabase auth)
- Admin: services editor
- Admin: pricing editor
- Admin: portfolio manager (with Cloudinary image upload)
- Admin: testimonials manager
- Admin: FAQs editor
- Admin: company settings
- Admin: homepage text overrides

**Acceptance:** Non-dev can manage key content without touching code.

---

## Phase 8 — SEO Layer

**Goal:** Complete technical SEO implementation.

**Scope:**
- Dynamic metadata per page and locale
- Sitemap.xml (auto-generated)
- Robots.txt
- Canonical tags
- hreflang tags for ro/en
- Open Graph + Twitter card tags
- JSON-LD structured data (Organization, FAQ, Service)
- Image alt text audit
- Internal linking review

**Acceptance:** All technical SEO requirements from MASTER_CONTEXT met.

---

## Phase 9 — QA & Pre-launch Polish

**Goal:** Test, fix, and polish before public launch.

**Scope:**
- Mobile responsiveness check (all pages)
- Cross-browser check
- Lighthouse audit (performance, accessibility, SEO)
- Romanian copy review
- English copy review
- Broken link check
- Form submission test
- Admin smoke test
- Analytics setup (GA4 + Search Console)

**Acceptance:** Lighthouse scores acceptable, no major issues, analytics verified.

---

## Phase 10 — Launch

**Goal:** Go live.

**Scope:**
- Domain DNS configured to Vercel
- SSL active
- Google Search Console verified
- GA4 verified
- robots.txt allows indexing
- Sitemap submitted to Search Console
- Announce internally

**Acceptance:** Site is live, indexed, and trackable.

---

## Notes

- Blog / Insights page is optional, defer to post-launch if needed
- Book a Call page can be added later (Calendly or similar embed)
- Mobile App as a full service page can be added in a later phase
- Legal pages (Privacy, Terms, Cookies) should be created by Phase 9 at the latest
