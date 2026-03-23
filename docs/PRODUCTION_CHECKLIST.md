# Production Checklist

## Required Before Launch
- Set `NEXT_PUBLIC_SITE_URL` to the final primary domain.
- Set Supabase env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Set Cloudinary env vars:
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CLOUDINARY_WORK_ITEMS_FOLDER`
  - `CLOUDINARY_ARTICLES_FOLDER`
- Apply all required Supabase migrations, including `supabase/migrations/00004_contact_leads.sql`.
- Confirm at least one admin user exists in Supabase Auth.

## Recommended Before Launch
- Set `NEXT_PUBLIC_CONTACT_EMAIL`.
- Set `NEXT_PUBLIC_WHATSAPP_URL` if WhatsApp should appear as a lead channel.
- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Set `GOOGLE_SITE_VERIFICATION`.
- Set Resend env vars if contact notifications should be delivered by email.

## Verification
- `npm run lint`
- `npm run build`
- Visit:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/ro`
  - `/en`
  - `/ro/insights`
  - `/en/contact`
  - `/ro/login`
  - `/en/admin`
- Confirm:
  - localized navigation and footer links
  - admin login redirect behavior
  - article draft vs published visibility
  - work item image rendering
  - legal pages render real copy
  - contact page exposes a direct fallback contact method

## After Deployment
- Submit `sitemap.xml` to Google Search Console.
- Verify ownership with the Search Console token.
- Confirm GA4 page views are arriving.
- Publish one real article and verify:
  - public route resolves
  - OG image renders
  - sitemap entry exists
  - draft content is still hidden
