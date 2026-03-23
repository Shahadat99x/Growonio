# Next Phase Plan: Phase 5
**Focus:** Live Supabase Integration & Authentication 

## Objective
Connect the established Phase 4 data layer (`src/lib/content.ts`) to a live Supabase PostgreSQL database and create the foundation for admin authentication.

## Key Tasks
- Execute the SQL from `docs/SUPABASE_SCHEMA_PLAN.md` into the active Supabase project.
- Implement `@supabase/ssr` or `@supabase/supabase-js` to replace the `mock.ts` seed data.
- Ensure all Row Level Security (RLS) policies are configured for public read access to active content.
- Implement an authentication gateway (`/login` or `/admin/login`) for firm staff.
- Ensure Edge Middleware correctly protects the `/admin` routing group.

## Constraints
- Do not build full CRUD dashboards yet; only configure read access for the public site and admin login access.
- Keep the `lib/content.ts` interface identical so the UI pages do not need refactoring.
