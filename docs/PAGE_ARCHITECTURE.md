# Growonio Page Architecture

This document outlines the routing structure, localization strategy, and reusable design patterns for the Growonio marketing site as built during Phase 3.

## 1. Routing & Localization
The site uses Next.js App Router with `next-intl` for seamless bilingual support.
Every public route sits under `src/app/[locale]/(route)` to automatically inject the locale (`ro` or `en`) into the path.

**Available Routes:**
- `/` (Home): Hero, Services Preview, Solutions, Process, Trust metrics.
- `/services`: Detailed offerings (Web Design, Booking Systems, Automations, Apps).
- `/pricing`: Transparent 3-tier SaaS-style pricing matrix.
- `/solutions`: Industry-specific landing pages (Salons, Clinics, Consultants).
- `/work`: Grid showcasing past transformations.
- `/about`: Company mission, values, and core story.
- `/faq`: Business-oriented questions addressing standard objections.
- `/contact`: Direct contact info and structured query form.
- `/legal/privacy`, `/legal/terms`, `/legal/cookies`: Minimal legal structural placeholders.

## 2. Shared Layout Abstractions
All pages are built using a system of reusable layout atoms to maintain visual consistency and strict spacing rules across the platform.

- `Container.tsx`: Standard maximum-width wrapper (`100%`, `max-w-7xl`, `mx-auto`, consistent horizontal padding).
- `Section.tsx`: Semantic `<section>` wrapper providing standardized vertical spacing (`py-16 md:py-24`).
- `SectionHeader.tsx`: A robust block atom combining an optional badge, H2 Title, and description subtitle. Used at the top of virtually every section to introduce the feature or topic cleanly without code duplication.

## 3. Reusable UI Components
Built on top of `shadcn/ui` and raw Tailwind CSS v4 variables.

- **FeatureCard (`src/components/ui/FeatureCard.tsx`)**: An icon, title, and description card that is responsive and includes delicate hover interactions. Heavily used on Home, Services, and Solutions pages.
- **PricingCard (`src/components/ui/PricingCard.tsx`)**: Dedicated 3-tier card utilizing Shadcn's internal `Card` structure with specific `isPopular` variant logic.
- **FAQAccordion (`src/components/sections/FAQAccordion.tsx`)**: Wraps Shadcn's primitive `Accordion` component into a single, data-driven structure accepting `[{question, answer}]`.
- **ContactForm (`src/components/sections/ContactForm.tsx`)**: UI form shell incorporating `Input`, `Textarea`, and `Label` with full `next-intl` integration.

## 4. Translation Strategy (`messages/`)
All hardcoded strings must be replaced by `{t('key')}` utilizing namespaces inside `ro.json` and `en.json`.
- Each page has a dedicated root key (e.g. `"ServicesPage"`, `"PricingPage"`, `"ContactPage"`).
- Global, repeated UI terminology exists in `"Shared"` (e.g., "First Name", "Email", "Learn More", "Send Message").
- Navigation routes exist in `"Navigation"`.
