# Growonio Media Strategy

## Scope
Phase 7 adds a practical media workflow for CMS-backed entities without introducing a full DAM or media-library interface.

Current supported entity:
- `work_items`

Future-friendly candidates, if needed later:
- service imagery
- testimonial avatars
- selected homepage/supporting assets tied to existing CMS entities

## Storage Approach
- **Provider:** Cloudinary
- **Upload pattern:** signed direct upload from the admin UI
- **Persistence layer:** Supabase stores the resulting media URL and metadata on the content record
- **Default folder:** `growonio/work-items` unless overridden by `CLOUDINARY_WORK_ITEMS_FOLDER`

This keeps the upload secret server-side while avoiding large file proxying through the Next.js app.

## Upload Security
1. An authenticated admin selects an image in the work item editor.
2. The browser requests a signature from `/api/admin/media/sign`.
3. The route verifies the Supabase session before returning signed Cloudinary upload parameters.
4. The browser uploads directly to Cloudinary using the signed parameters.
5. The editor stores the returned `secure_url`, `public_id`, `width`, and `height` in hidden fields.
6. Saving the form persists those values to Supabase.

Notes:
- No Cloudinary secret is exposed to the browser.
- The route only signs `work_items` uploads in this phase.
- Deleting a work item or replacing its tracked Cloudinary image attempts to clean up the previous asset.

## Work Item Media Fields
`work_items` now supports:
- `image_url`
- `image_public_id`
- `image_alt_en`
- `image_alt_ro`
- `image_width`
- `image_height`

## Field Conventions
- **Primary media field:** one cover image per work item.
- **Gallery support:** not part of this phase.
- **Optional vs required:** work item images remain optional so the CMS can save draft or text-only entries.
- **Alt text:** optional localized fields; if blank, the public site falls back to a derived label from the work item title and client name.
- **Manual URLs:** still supported for practical fallback cases, but using a manual URL clears the tracked Cloudinary `public_id`.
- **Replacement behavior:** replacing a tracked Cloudinary asset and saving the record attempts to delete the previously stored asset.

## Public Rendering Rules
- Local assets and Cloudinary assets render through `next/image`.
- Cloudinary URLs are transformed with `f_auto`, `q_auto`, and size-aware cropping for work-card delivery.
- Unknown remote URLs fall back to a standard lazy-loaded `<img>` to avoid hard failure from strict image host rules.
- Empty or broken media falls back to a clean visual placeholder instead of a broken image box.

## Environment Setup
Required:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional:
- `CLOUDINARY_WORK_ITEMS_FOLDER`

## Local / Deployment Notes
- Keep all Cloudinary secrets server-only; only the cloud name is public.
- `next.config.ts` must allow the configured Cloudinary delivery path for remote rendering.
- Apply `supabase/migrations/00002_phase7_work_item_media.sql` before using the new metadata fields in a fresh environment.

## Deliberate Non-Goals
- no general media library
- no drag-and-drop asset catalog
- no bulk asset management
- no gallery model for every entity
