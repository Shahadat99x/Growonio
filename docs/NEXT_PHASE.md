# Next Phase Plan: Phase 7
**Focus:** Media & Storage Integration

## Objective
Enhance the existing Admin and Content layers by implementing robust handling, upload, and optimization workflows for image assets using Supabase Storage or Cloudinary.

## Key Tasks
- **Supabase Storage:** Create secure image buckets for portfolio (`work_items`) and potentially blog/author avatars if scaling.
- **Admin Upload UI:** Replace the plain `image_url` text input with an interactive drag-and-drop file uploader component inside the Admin editor layout.
- **Action Mutations:** Update React Server actions to receive `FormData` blobs, upload to Supabase Storage, and retrieve the public access URL before persisting to Postgres.
- **Public Optimization:** Ensure `next/image` is optimally configured to serve and cache the resulting remote asset URLs without warnings.

## Constraints
- Security remains paramount. Storage buckets should strictly enforce RLS preventing public or unauthenticated POST/PUT events.
- Keep the upload UI clean and aligned with the professional, functional design of the current Shadcn layout.
