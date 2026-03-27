# Project Status
**Current Phase:** Public Forms Delivery Restore Complete
**Date:** 2026-03-27

## Current Product State
- The public contact form and the public careers form now submit through their existing Next.js server actions and send notification emails through Resend to `growoniohq@gmail.com`.
- Both forms keep the current Growonio layout and now have stronger server-side validation, matching client-side constraints, honeypot preservation, and explicit success/error handling.
- Public business-email defaults are aligned with the current setup:
  - public email: `hello@growonio.ro`
  - sender default: `Growonio <hello@growonio.ro>`
  - notification inbox: `growoniohq@gmail.com`

## What The Issue Was
- Both forms already had server actions and a shared Resend helper, so the problem was not missing handlers.
- The shared helper required `RESEND_FROM_EMAIL` and `CONTACT_NOTIFICATION_EMAIL` to be set, but the active local setup only had `RESEND_API_KEY`.
- Because of that, both forms could skip email delivery entirely.
- The actions also treated a successful Supabase insert as a successful form submission, so users could see a success state even when no notification email was delivered.
- The project still had older `.com` fallback values for the public contact email and sender defaults, which no longer matched the live business setup.

## What Was Fixed
- Refactored the shared public-form helper to:
  - use `RESEND_API_KEY` as the required secret
  - apply safe defaults for sender and recipient based on the current Growonio setup
  - send structured HTML and plain-text notification emails
  - surface Resend failures instead of silently returning `false`
- Updated both server actions so a successful public submission now means Resend accepted the email notification.
- Kept Supabase lead storage as best-effort secondary behavior instead of the success criterion for the user-facing form.
- Strengthened validation for both forms:
  - trimmed inputs
  - required-field checks
  - email, phone, and URL validation where relevant
  - sensible minimum and maximum lengths
  - rejection of short low-signal submissions
- Updated both form UIs with matching client-side limits and `aria-busy` submission state while preserving the existing design.
- Updated fallback business-email defaults and public-facing hardcoded email references from `growonio.com` to `growonio.ro`.

## Verification
- `npm run lint`
- `npm run build`
- Executed both server actions directly with invalid payloads and confirmed error states are returned.
- Executed both server actions directly with valid payloads and confirmed success states are returned only after live Resend acceptance for:
  - contact form
  - careers form

## Current State Of Public Forms
- Contact form: working, validated, and emailing `growoniohq@gmail.com` via Resend.
- Careers form: working, validated, and emailing `growoniohq@gmail.com` via Resend.
- UX: loading, success, and failure states are present with accessible live regions.
- Remaining storage note: submissions still store into the existing `contact_leads` table only when that table/env path is available; email delivery is now the primary guaranteed outcome for this phase.
