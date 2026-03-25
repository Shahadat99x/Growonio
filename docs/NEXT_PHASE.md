# Next Phase Plan: Launch Checklist / Deployment
**Focus:** Production configuration, deployment follow-through, and post-redesign launch checks

## Objective
Move the now launch-ready codebase through final production configuration, deployment, and post-launch validation so the public site is not only polished in code, but correctly wired in the live environment.

## Key Tasks
- Apply remaining live-environment requirements:
  - run `supabase/migrations/00004_contact_leads.sql` on the connected production project if contact leads should persist
  - configure Resend if email notifications should be sent from contact submissions
  - add the real GA4 measurement ID and Search Console verification token
- Run deployment-oriented checks:
  - verify public links, contact path, and legal pages in production
  - submit and validate `sitemap.xml`
  - confirm canonical/hreflang output in the live build
  - confirm analytics and contact flows work outside local development
- Finish remaining non-blocking brand/deployment polish:
  - replace the placeholder app icon if final brand artwork is available
  - optionally give legal pages the same premium shell treatment as the main public routes later

## Constraints
- Do not reopen broad redesign work unless a real production issue appears.
- Keep the bilingual architecture, SEO structure, and CMS boundaries intact.
- Prefer deployment correctness and live validation over more visual experimentation.
