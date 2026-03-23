# Growonio — Next Phase

## Current Phase

**Phase 2 — Design System & Branding Foundation**

---

## Main Goal

Establish the visual identity and core UI component foundation. This phase transitions from a functional shell to a premium, design-forward interface.

By the end of this phase, the project should have a fully configured Tailwind theme, premium typography, and a set of reusable UI "atoms" (buttons, cards, badges) ready for page building.

---

## Tasks

### 1. Configure Design Tokens

- Define the official Growonio color palette in `tailwind.config.ts`.
- Set up typography scale (using Inter or similar premium sans-serif).
- Define spacing and radius tokens for a "modern/premium" feel.

### 2. Implement shadcn/ui Foundation

- Initialize `shadcn/ui` with the current Tailwind setup.
- Add core components: `Button`, `Input`, `Badge`, `Separator`, `Dialog`.
- Ensure components follow the established design tokens.

### 3. Build Layout Atoms

- Refine `Container` component for consistent max-width.
- Create `Section` component with standardized vertical spacing.
- Create `Typography` components (Heading1, Heading2, Body, etc.).

### 4. Refine App Shell Visuals

- Update `Navbar` with the new design tokens (glassmorphism tabs, refined transitions).
- Update `Footer` with a more premium layout.
- Finalize `LanguageSwitcher` styling.

### 5. Create Hero & Section Boilerplates

- Create a reusable `Hero` section component.
- Create a `FeatureCard` or `ServiceCard` component.

---

## Acceptance Criteria

Phase 2 is complete when:

- Tailwind configuration reflects the chosen branding colors.
- Typography is consistent across Navbar, Home, and Footer.
- Core `shadcn/ui` components are styled and usable.
- A "Section" and "Container" pattern is used on the home page.
- Visuals feel "premium and modern" as per the master context.

---

## Out of Scope

- Building final marketing content for all services.
- Connecting real data from Supabase.
- SEO fine-tuning.
- Admin dashboard UI.

---

## Reference Docs

- `MASTER_CONTEXT.md` — Section 9: UI / UX Direction
- `STACK_DECISIONS.md` — UI Component strategy (shadcn/ui)
- `PHASE_PLAN.md` — Phase 2 roadmap
