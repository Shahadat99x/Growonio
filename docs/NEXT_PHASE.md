# Next Phase Plan: Phase 6
**Focus:** Authentication & Admin Back-Office 

## Objective
Establish a secure, authenticated GUI for non-technical users to Create, Read, Update, and Delete the Phase 5 content schemas.

## Key Tasks
- **Infrastructure:** Wire `@supabase/ssr` into standard Next.js Middleware route guards.
- **Authentication:** Establish a clean `/admin/login` page leveraging Supabase Email/Password or Magic Link.
- **Admin Shell:** Scaffold a secured `/admin/dashboard` layout utilizing Shadcn UI components.
- **CRUD Operations:** Build intuitive Server-Action powered edit forms for Services, Pricing, Portfolios, and FAQs.
- **Localization Handling:** Ensure form fields correctly update both `_en` and `_ro` explicitly.
- **File Uploads (Optional/Prepared):** Supabase Storage buckets for `image_url` on Portfolio/Work items.

## Constraints
- Keep it highly focused on functionality and usability, not "perfect" enterprise-style admin complexity.
- Do not let the Admin CSS leak into or corrupt the public Marketing-site CSS footprint.
