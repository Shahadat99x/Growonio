# Supabase Integration Documentation

## Overview
Growonio uses **Supabase** via `@supabase/ssr` to power its bilingual dynamic content.
In Phase 5, we integrated the core structural models (Services, Pricing, Portfolios, FAQs).

## Hybrid Content Model
We do not store global app structures, navigation paths, or core design tokens in Supabase. Supabase exclusively manages business-facing entities.
- **Bilingual Structure:** We use a flat localization strategy (`_en` and `_ro` columns).
- **Access Pattern:** All Next.js pages strictly interact with `src/lib/content.ts`, which normalizes the SQL payloads into strictly typed, locale-resolved arrays that React components can consume trivially.

## Environment Architecture
Ensure the following variables are active in your deployment environment (Vercel):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If these keys are absent, the application is designed to degrade gracefully (displaying empty arrays/blank sections) rather than throwing `500 Internal Server Error`, thus preventing entire site outages in the event of database configuration errors.

## Future Admin (Phase 6)
In the next phase, the `/admin` routing group will be hooked up to `@supabase/ssr` using `SUPABASE_SERVICE_ROLE_KEY` (or standard Auth logic) to provide a localized GUI over these tables.
