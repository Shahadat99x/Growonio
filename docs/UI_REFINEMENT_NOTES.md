# UI Refinement Notes — Phase 7A

## Changes Made

### Navbar (`src/components/layout/Navbar.tsx`)
- Converted to client component to support mobile menu state
- Added hamburger icon (`Menu`/`X` toggle) visible below `md:` breakpoint
- Mobile menu: animated slide-down overlay with all nav links + Contact CTA
- Added Insights link to both desktop and mobile navigation
- Desktop links: hover backgrounds added (`hover:bg-muted/50`)

### Footer (`src/components/layout/Footer.tsx`)
- Replaced all `<a href="#">` with `<Link>` pointing to real routes
- Added Insights link under new "Resources" column
- Added FAQ link under "Services" column
- Legal links now point to `/legal/privacy` and `/legal/terms`
- Subtle `bg-zinc-50` background treatment
- 3-column grid on `sm:` screens

### Homepage (`src/app/[locale]/page.tsx`)
- Process section: fully translated step titles/descriptions via `t()` calls
- CTA section: heading, description, and button text translated
- Hero: badge prop wired to `t('heroBadge')`
- Process mobile: horizontal layout with vertical connector line
- Services grid: `sm:grid-cols-2` breakpoint added for tablet
- Solutions grid: `sm:grid-cols-2` breakpoint added

### Hero (`src/components/sections/Hero.tsx`)
- Tighter padding (`pt-20` → `pt-20`, `md:pt-28`, `lg:pt-36`)
- Badge: larger padding (`px-4 py-1.5`) and `mb-8` gap
- Heading: added `sm:text-5xl` and `leading-[1.1]`
- Primary CTA: taller height, stronger shadow (`shadow-lg hover:shadow-xl`)

### PricingCard (`src/components/ui/PricingCard.tsx`)
- Accepts `popularLabel` prop (default: "Most Popular")
- Pricing page passes `t('popularBadge')` to the prop

### Services Page (`src/app/[locale]/services/page.tsx`)
- CTA heading/description wired through `t('ctaTitle')` / `t('ctaDesc')`

### Translations
- EN/RO: 12+ new keys for Process steps, CTA block, Hero badge, Services CTA, Pricing badge
