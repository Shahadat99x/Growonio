# Launch Readiness Notes

## What Was Hardened
- Replaced deprecated `src/middleware.ts` with `src/proxy.ts` to align with Next.js 16 and remove the deprecation warning from production builds.
- Added a real contact server action with:
  - required-field validation
  - email validation
  - honeypot bot protection
  - optional Resend notifications
  - direct email fallback when storage or email delivery is unavailable
- Replaced legal placeholder pages with bilingual baseline content for:
  - privacy
  - terms
  - cookies
- Added launch-facing app basics:
  - `src/app/icon.svg`
  - `src/app/manifest.ts`
  - localized `src/app/[locale]/not-found.tsx`
  - Google Search Console verification metadata hook
  - Google Analytics component hook
- Fixed Cloudinary upload signing so article uploads use the correct entity folder instead of always falling back to work items.
- Cleaned remaining admin/login lint issues and validated the repo with:
  - `npm run lint`
  - `npm run build`

## QA Performed
- Manual code audit across:
  - public pages
  - login/admin surfaces
  - blog/article flow
  - SEO routes
  - contact/legal/trust surfaces
- Live Supabase smoke test:
  - created a draft article and confirmed it did not appear in the published public query
  - published that article and confirmed it became publicly queryable
  - created an active work item and confirmed it became publicly queryable
  - probed the `contact_leads` table and confirmed it is not yet present in the currently connected Supabase schema

## Remaining Launch Dependencies
- Apply `supabase/migrations/00004_contact_leads.sql` to the live Supabase project if you want contact submissions stored in Supabase.
- Configure these production env vars before launch measurement:
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `GOOGLE_SITE_VERIFICATION`
- Configure these if you want contact email notifications:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `CONTACT_NOTIFICATION_EMAIL`

## Current Contact Behavior
- If Supabase lead storage is available, the form stores submissions in `contact_leads`.
- If Resend is configured, the form also sends an email notification.
- If neither path is available, the form returns a clear fallback message and the page exposes direct email contact.

## Non-Blocking Follow-Ups
- Replace the temporary app icon with final brand artwork if available.
- Run live-domain Search Console checks after deployment.
- Do a short first-week monitoring pass for form submissions, uploads, crawl errors, and admin auth stability.
