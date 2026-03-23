# SEO Hardening Notes

## What Was Implemented
- Localized metadata for the main public routes:
  - Home
  - Services
  - Pricing
  - Solutions
  - Work
  - About
  - FAQ
  - Contact
  - Insights listing
  - Insight articles
  - Legal pages
- Canonical and hreflang handling generated from the live `next-intl` routing configuration rather than a second hardcoded route map.
- `robots.txt` generation.
- `sitemap.xml` generation.
- Structured data on the pages where it adds clear value.
- Noindex protection for `/admin` and `/login`.

## Metadata Strategy
- Page metadata is centralized through `src/lib/seo.ts`.
- Core metadata fields covered:
  - `title`
  - `description`
  - canonical URL
  - locale alternates
  - Open Graph
  - Twitter card metadata
  - robots directives
- Article pages use article-level SEO fields where available:
  - `seo_title_*`
  - `seo_description_*`
  - `cover_image_*`
- Fallback order for article SEO:
  - title: `seo_title` -> `title`
  - description: `seo_description` -> `excerpt`
  - image: `cover_image_url` when present

## Structured Data
- Home:
  - `Organization`
  - `WebSite`
- Services:
  - `ItemList` of `Service`
- FAQ:
  - `FAQPage`
- Insights listing:
  - `Blog`
- Insight article:
  - `BlogPosting`
  - `BreadcrumbList`

Schema is intentionally practical. No fake reviews, fake addresses, or inflated business data were added.

## Sitemap and Robots
- `src/app/sitemap.ts` includes:
  - public marketing pages
  - legal public routes
  - published insight articles only
- Draft or future-dated articles are excluded.
- `src/app/robots.ts`:
  - allows public crawling in production
  - blocks admin, login, and API surfaces
  - disallows all crawling outside production-like environments

## Indexability Rules
- Admin routes: noindex
- Login route: noindex
- Draft articles: not publicly resolvable
- Future-dated articles: not publicly resolvable
- Only published, already-live articles enter the sitemap

## Public Data Access
- Public content reads now use a cookie-free server-side Supabase client.
- This keeps the public marketing and blog content layer cleaner for metadata, sitemap generation, and static optimization behavior.
- Authenticated admin operations still use the protected admin/client path.

## Local SEO Readiness
- Metadata and schema now consistently position Growonio as Romania-first.
- Contact/location references stay truthful:
  - Bucharest, Romania
  - available across Romania and internationally
- No city-spam landing pages were introduced.

## Remaining Launch Tasks
- Submit sitemap in Google Search Console.
- Verify indexed canonicals and hreflang behavior in Search Console after deployment.
- Add GA4/Search Console verification if not already live.
- Monitor published-article coverage after launch and confirm no draft leakage in Search Console.
