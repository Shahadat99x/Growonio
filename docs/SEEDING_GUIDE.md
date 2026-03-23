# Growonio Local Database Seeding Guide

To instantiate the project on a fresh machine or immediately prior to a live launch, the staging data must be populated from our mock seeds.

## 1. Using Supabase Dashboard (Cloud)
If you are using a hosted Supabase project:
1. Open the Supabase SQL Editor.
2. Open the file `supabase/migrations/00001_phase5_core_entities.sql` entirely and run it.
3. Open the file `supabase/seed.sql` entirely and run it.
4. Go to `Project Settings -> API` and copy your URL and Anon public key into the `.env` file for the Next.js app.

## 2. Using Supabase Local CLI
If you run `supabase start` for local development:
1. The CLI will automatically detect `supabase/migrations/00001_phase5_core_entities.sql` and run it during startup.
2. The CLI will also execute `supabase/seed.sql` upon container startup.
3. Use the keys provided in the terminal out put inside your local `.env`. 

Your application is now hydrated with live SQL data instead of the static TypeScript mock boundaries.
