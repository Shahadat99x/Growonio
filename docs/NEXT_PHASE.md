# Growonio — Next Phase

## Current Phase

**Phase 1 — Project Setup & Architecture**

---

## Main Goal

Initialize the Next.js project with the full confirmed stack, configure i18n routing, connect Supabase, set up Cloudinary env vars, and deploy an empty shell to Vercel.

By the end of this phase, the project should run locally and be deployed — even if it shows nothing visually. The architecture must be correct before anything is built on top of it.

---

## Tasks

### 1. Initialize Next.js App

```
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- Use App Router (not Pages Router)
- Use TypeScript
- Use Tailwind CSS
- Use ESLint

### 2. Install and Configure next-intl

- Install `next-intl`
- Create `/src/middleware.ts` with locale routing config
- Set default locale to `ro`, secondary to `en`
- Create `/locales/ro.json` and `/locales/en.json` with placeholder keys
- Test that `/` resolves to Romanian and `/en` to English

### 3. Configure Supabase

- Install `@supabase/ssr` and `@supabase/supabase-js`
- Create `/src/utils/supabase/client.ts` (browser client)
- Create `/src/utils/supabase/server.ts` (server component client)
- Add env vars to `.env.local`
- Create `.env.example` with all required variable names

### 4. Set Up Cloudinary

- Add Cloudinary env vars to `.env.local` and `.env.example`
- No Cloudinary code needed yet — env setup is enough for Phase 1

### 5. Configure Tailwind Tokens

- Open `tailwind.config.ts`
- Add placeholder custom color palette, font family, and any spacing overrides
- Set up `globals.css` with body defaults

### 6. Set Up Folder Structure

Confirm folder structure inside `/src`:

```
/src
  /app
    /[locale]         ← locale-aware routes via next-intl
      layout.tsx
      page.tsx
  /components
    /ui               ← shadcn-style atoms
    /layout           ← Header, Footer, Section
    /sections         ← page-level section components
  /locales
    ro.json
    en.json
  /lib                ← shared utilities
  /types              ← shared TypeScript types
  /utils
    /supabase
      client.ts
      server.ts
```

### 7. Deploy to Vercel

- Link repo to Vercel project
- Add environment variables in Vercel dashboard
- Deploy — even empty shell is a valid deliverable
- Confirm the URL resolves

### 8. Create README.md

Simple readme covering:
- What Growonio is
- Stack overview
- Local setup instructions
- Environment variables reference

---

## Acceptance Criteria

Phase 1 is complete when:

- Next.js app runs with `npm run dev` without errors
- Tailwind CSS is working
- TypeScript compiles without errors
- `/` resolves as Romanian, `/en` resolves as English
- Supabase client is importable and env vars are set
- Vercel deployment is live
- README.md exists

---

## Out of Scope

- Any visual page design
- Any Supabase table schemas
- Any real content
- Admin dashboard
- SEO implementation

---

## Reference Docs

- `PHASE_PLAN.md` — full phase overview
- `STACK_DECISIONS.md` — confirmed libraries and rationale
- `IMPLEMENTATION_ORDER.md` — step-by-step build order (follow Step 1)
- `MASTER_CONTEXT.md` — product strategy and constraints
