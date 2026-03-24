# Growonio — Key Decisions Log

## 1. Brand Name

Chosen brand:
**Growonio**

Reason:

- sounds modern and brandable
- feels more ownable than generic service names
- can support future growth beyond just websites
- domain direction chosen around growonio.com

Tagline:
**Business automation built for growth**

---

## 2. Market Direction

Primary market:
**Romania**

Reason:

- local opportunity exists
- Romanian language gives trust advantage
- local SEO can support early organic visibility
- easier to position against generic English-only small agencies

Secondary positioning:

- English also supported for broader credibility and future expansion

---

## 3. Language Decision

Decision:
**Bilingual site (Romanian + English)**

Reason:

- Romanian is important for local sales and local SEO
- English is important for premium feel and broader business credibility
- Romania-first strategy should not block future growth

Current preference:

- Romanian as default
- English as secondary

---

## 4. Positioning Decision

Growonio will not be positioned as a generic “we build anything” company.

Instead, it will focus on:

- websites
- booking flows
- lead capture
- client management
- simple automation

Reason:

- easier to sell outcomes than generic coding services
- stronger differentiation
- better fit for local service businesses
- more resilient than just “AI makes websites too”

---

## 5. Core Service Direction

Main service areas chosen:

- Website Design & Development
- Booking & Client Management
- Lead Capture & Workflow Automation
- Mobile App Development

Reason:

- strong business relevance
- easy to package
- suitable for service-business clients
- allows future upsell without overcomplicating the offer

Mobile apps should remain secondary, not the main sales entry point.

---

## 6. Website Structure Decision

Core public pages chosen:

- Home
- Services
- Pricing
- Work / Portfolio
- Solutions
- About
- FAQ
- Contact

Reason:

- enough pages for trust, sales, and SEO
- avoids bloated agency-site structure
- supports both conversion and discoverability

Legal pages also required.

---

## 7. UI Direction Decision

Visual direction chosen:

- modern
- premium
- minimal
- clear
- business-focused
- trustworthy

Avoid:

- overanimated UI
- generic corporate jargon
- fake giant-agency feeling
- cluttered layouts

Reason:

- target buyers need trust and clarity
- small studio should look focused, not inflated

---

## 8. SEO Direction Decision

SEO must be built in from the beginning.

Priority:

- Romanian local organic SEO
- bilingual structure
- service + niche relevance
- technical SEO basics from launch

Reason:

- organic traffic can compound over time
- Romanian pages help local search trust
- better to design page structure early around SEO than patch later

---

## 9. Admin Scope Decision

Decision:
**Hybrid CMS approach**

Editable in admin:

- service content
- pricing
- work / portfolio
- blog / insights
- testimonials
- FAQs
- company settings
- selected homepage text

Hardcoded in code:

- page templates
- design system
- route structure
- SEO logic
- navigation structure

Reason:

- best balance of flexibility and consistency
- avoids messy page-builder problems
- preserves design quality and SEO structure

---

## 10. Tech Stack Decision

Preferred core stack:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Cloudinary
- Vercel

Likely additions:

- i18n library
- validation/forms library
- domain email
- analytics/search console setup

Reason:

- strong modern stack
- good fit for content + admin + deployment
- scalable enough without being too heavy

---

## 11. Build Workflow Decision

Project should use a lean documentation system for AI continuity.

Core docs:

- MASTER_CONTEXT.md
- STATUS.md
- NEXT_PHASE.md
- DECISIONS.md

Reason:

- fewer files
- easier context transfer across AI chats
- lower token waste
- easy to update phase by phase

---

## 12. Business Strategy Direction

Growonio should sell business outcomes, not just code.

Main sales framing:

- more bookings
- better lead capture
- reduced manual work
- better online trust
- clearer client communication
- practical digital systems

Reason:

- “website/app development” alone is too generic
- AI lowers the value of raw page production
- value is in execution, structure, integration, and accountability

---

## 13. Premium Growth-Tech Redesign Direction

Decision:
**Adopt “Premium Growth-Tech” as the next frontend design direction**

Meaning:

- light base as the default canvas
- selective tinted and bold feature sections for rhythm
- stronger depth, hierarchy, and contrast than the current minimal system
- violet / electric-indigo accent energy
- subtle organic growth motifs inspired by layered rings and branching systems
- restrained glass and motion only in strategic areas like the header, hero, and premium CTA surfaces

Implementation rules:

- no mascot-led or childish visuals
- no full-site dark mode presentation by default
- no random animation without product meaning
- no broad one-off styling hacks that weaken maintainability

System-level constraint:
The redesign should be built around reusable section modes, reusable motion patterns, and reusable surface styles rather than page-specific decoration.

Technical implementation notes:

- use `motion` / Motion for React as the primary animation layer
- keep GSAP out unless a later scroll-storytelling phase creates a clear need
- lock the section-mode system to three reusable states only:
  - `light`
  - `tint`
  - `feature`

---

## 14. Homepage Phase 3 Composition Decision

Decision:
**Refactor homepage sections into dedicated section components with asymmetric layouts**

Implementation shape:

- homepage sections below the hero now live in `src/components/home/*`
- services, industries, process, proof, and CTA each use different layout rhythms instead of repeating the same centered heading + uniform card row
- homepage-specific cards can be richer than the generic card primitive, but they must still reuse the main visual tokens, button system, and section modes

Reason:

- the homepage needed a stronger sense of progression after the hero
- keeping the redesign inside dedicated section components is cleaner than pushing complex one-off markup into `page.tsx`
- asymmetric composition helps the premium growth-tech direction feel intentional without forcing the same art direction onto every other page

---

## 15. Inner Page Phase 4 System Decision

Decision:
**Use shared inner-page hero and premium CTA primitives across the main public inner pages**

Implementation shape:

- introduced reusable `InnerPageHero` and `PremiumCtaPanel` components
- Services, Pricing, Work, Insights, and Contact now share a stronger structural shell while still allowing page-specific right-panel content and section composition
- page-specific surfaces can remain specialized, but the hero/CTA rhythm should stay consistent enough that the site feels like one product/studio system

Reason:

- the homepage redesign established a much higher visual quality bar than the inner pages
- using shared hero and CTA primitives is cleaner and more maintainable than rebuilding those patterns separately on every route
- the inner pages needed to catch up in quality without collapsing into five nearly identical page templates
