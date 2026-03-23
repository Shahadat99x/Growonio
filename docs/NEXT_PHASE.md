# Growonio — Next Phase

## Current Phase

**Phase 3 — Core Marketing Pages**

---

## Main Goal

Flesh out the remaining static marketing pages in the sitemap using the established design system. This phase brings life to the broader website structure before connecting any databases or complex logic.

By the end of this phase, the `/services`, `/pricing`, and `/contact` pages will be functional with static generic content, fully localized, and responsive.

---

## Tasks

### 1. Services Page
- Create `/services` route.
- Implement a detailed features/services list using the `FeatureCard` and `Section` components from Phase 2.
- Add an "Our Process" or "Why Us" section.

### 2. Pricing Page
- Create `/pricing` route.
- Build a generic `PricingCard` component.
- Layout a 3-tier pricing structure (e.g., Starter, Growth, Enterprise).

### 3. Contact Page Setup
- Create `/contact` route.
- Scaffold the `ContactForm` component using `shadcn/ui` Input and Button.
- Note: Form submission logic (e.g., using Resend) belongs to Phase 4. Just build the UI here.

### 4. Localization Sync
- Add relevant keys to `messages/ro.json` and `messages/en.json` for the new pages.
- Ensure all hardcoded UI text is wrapped in Next-Intl `t()` calls.

---

## Acceptance Criteria

Phase 3 is complete when:

- `Services`, `Pricing`, and `Contact` routes exist and work.
- Content is fully localized in RO and EN.
- The UI strictly adheres to the Phase 2 layout atoms (`Container`, `Section`) and Design Tokens.

---

## Out of Scope

- CMS Integration or dynamic data fetching.
- Active email delivery on the contact form (just UI is needed).
- Complex animations (keep it simple for now).

---

## Reference Docs

- `MASTER_CONTEXT.md` — Section 7: Sitemap & Structure
- `PHASE_PLAN.md` — Phase 3 roadmap
