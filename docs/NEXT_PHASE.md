# Next Phase Plan: Submission Inbox + Delivery Hardening
**Focus:** optional admin storage, optional mailbox architecture, and pragmatic spam protection improvements

## Goal
Build the next operational layer on top of the restored public forms so Growonio can review submissions more comfortably, keep a better record of leads/applications, and harden abuse handling without replacing the simple Resend-first flow.

## Exact Scope
- Add structured persistence for public submissions:
  - either a unified `public_submissions` table or dedicated contact/careers tables
  - preserve key fields separately instead of storing only a large combined message body
- Add an admin/dashboard view for submissions:
  - list recent contact inquiries
  - list recent careers applications
  - basic status markers such as `new`, `reviewed`, `archived`
- Decide the later mailbox architecture explicitly:
  - keep Resend notifications as the delivery mechanism
  - document whether Growonio will later use Google Workspace, forwarding, or another mailbox host for `hello@growonio.ro`
- Improve lightweight anti-abuse protections only where justified by traffic:
  - request-rate throttling for public form endpoints/server actions
  - stronger honeypot or timing heuristics if spam appears
  - optional CAPTCHA only if lighter measures are insufficient

## Direction
- Keep the current public form design and user flow intact.
- Preserve Resend email delivery as the primary operational path.
- Prefer simple internal tools over building a heavy CRM.

## Constraints
- Do not turn this into a full sales pipeline system.
- Do not block legitimate inquiries with heavy anti-spam friction unless abuse volume justifies it.
- Do not replace the working Resend notification flow while adding storage/admin layers.

## Definition of Done
- Public submissions are stored in a structured, reviewable way.
- Admin users can review recent contact and careers submissions from the dashboard.
- The future mailbox hosting/forwarding path is documented clearly.
- Spam protection is improved only to the level justified by real usage.
