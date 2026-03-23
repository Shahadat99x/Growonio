# Admin & Authentication Guide

Growonio uses Supabase Authentication to secure the `/admin` back-office. 

## Architecture
1. **Next.js Middleware:** `src/middleware.ts` intercepts all requests to `/admin` (and its localized variants like `/en/admin` and `/ro/admin`).
2. **Session Check:** It uses `@supabase/ssr` to check for a valid session cookie.
3. **Redirection:** Unauthenticated users are transparently booted to `/[locale]/login`.

## How to Create the First Admin
Since we are using standard Email/Password authentication and don't yet have a public user-registration flow (to prevent anyone from signing up as an admin), you must create the first admin user securely via the Supabase Dashboard:

1. Open your Supabase project dashboard.
2. Go to **Authentication** -> **Users**.
3. Click **Add User** -> **Create New User**.
4. Enter your admin email and a secure password.
5. (Optional) Auto-confirm the user so they don't need to click an email link.

## Logging In
Once the user is created in Supabase:
1. Navigate to `https://your-domain.com/login` (or `localhost:3000/login`).
2. Enter your credentials.
3. Upon success, the system will set a secure HTTP-only cookie and redirect you to the `/admin` dashboard.

## Entities Manageable
The MVP Admin covers the highest priority Phase 5 entities:
- **Services:** Core offerings and capabilities.
- **Pricing Packages:** Subscription tiers including feature arrays.
- **Work Items:** Portfolio case studies including dynamic stat arrays.
- **FAQs:** Typical questions and categorized content.

*All forms contain dual Title/Description inputs natively mapped to the `_en` and `_ro` PostgreSQL columns without complex JSONB querying.*

## Security Considerations
- The admin dashboard currently trusts *any* authenticated Supabase user as an administrator. 
- If you intend to introduce end-user logins in the future (e.g., restricted client portals), we will need to implement Role Based Access Control (RBAC) checking the user's `app_metadata.role` during the Middleware validation phase.
