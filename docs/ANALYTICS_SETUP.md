# Analytics Setup

## Google Analytics
- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the deployment environment.
- The app loads GA through `src/components/analytics/GoogleAnalytics.tsx`.
- Page views are sent on route changes from the localized App Router layout.

## Google Search Console
- Set `GOOGLE_SITE_VERIFICATION` in the deployment environment.
- The token is exposed through the root metadata in `src/app/layout.tsx`.
- After deployment:
  - verify the domain/property in Search Console
  - submit `https://your-domain.com/sitemap.xml`
  - monitor canonical, hreflang, and crawl coverage

## Notes
- Analytics is intentionally minimal for launch. No heavy analytics abstraction or event taxonomy was added in this phase.
- If deeper event tracking is needed later, add only the events tied to real conversion decisions.
