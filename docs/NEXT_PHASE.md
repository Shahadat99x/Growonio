# Next Phase Plan: Phase 4
**Focus:** CMS Integration & Data Hydration Setup

## Objective
Connect the frontend marketing shell to a real data source (e.g., Supabase/Sanity) or local `.mdx` files to allow content management for dynamic sections like Portfolio, Blog, or Services.

## Key Tasks
- Define the content schema.
- Integrate the backend client (Supabase SSR or MDX parsing logic).
- Hydrate the `/work` page with dynamic project data instead of hardcoded arrays.
- Implement dynamic routing for single case studies (e.g., `/work/[slug]`).
- Configure SEO metadata generation (`generateMetadata`) across routes.

## Constraints
- Do not build complex user authentication yet.
- Focus strictly on content delivery optimization.
