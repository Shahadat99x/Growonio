# Admin Scope Boundary

This document establishes the explicit boundary between Code-Owned (static) structures and Content-Owned (admin-editable) structures. By maintaining this split, we guarantee optimal performance, unbreakable design tokens, and simplicity for content managers.

## Code-Owned (Non-Editable via Admin Panel)
These elements are tightly coupled to the architecture, design system, or routing structure.
1. **Layout & Grid Overarching Architecture**: Root layouts, responsive `Container` / `Section` padding logic.
2. **Navigation & Footer Links**: Core top-level routing architecture.
3. **Design System & Theming**: Colors, typography, global animations, Tailwind tokens.
4. **General UI Labels**: Buttons ("Learn More", "Submit"), Form fields ("First Name", "Email"), and generic errors. (Managed via `messages/en.json` and `messages/ro.json`).
5. **SEO Metadata Generation Logic**: The dynamic `generateMetadata` functions that parse the data.
6. **Legal Page Skeletons**: The layouts themselves (the text content can later be CMS-managed if requested, but traditionally is static).

## Content-Owned (Editable via Database/CMS)
These are dynamic business entities that are expected to be updated by non-technical marketing staff.
1. **Services**: Adding/Removing core offerings, updating descriptions.
2. **Pricing Packages**: Adjusting tiers, prices, and features.
3. **Work/Portfolio**: Publishing new case studies, toggles to feature them on the homepage.
4. **FAQ Items**: Updating frequently asked questions based on sales feedback.
5. **Company Settings**: Global contact emails, phone numbers, and physical addresses.
6. **Homepage Highlights**: E.g., which Work items are marked `is_featured=true`.
