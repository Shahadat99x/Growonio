# Blog / Insights System

## Architecture
The blog system follows the same flat-column bilingual architecture used by the other Growonio content entities (services, pricing, work items, FAQs).

### Content Model
Articles are stored in one `articles` Supabase table with explicit `_en` / `_ro` columns:

| Field | Type | Purpose |
|-------|------|---------|
| `slug` | text, unique | URL identifier |
| `status` | text (draft / published) | Controls visibility |
| `is_featured` | boolean | Highlights on listing |
| `published_at` | timestamptz | Publish date |
| `title_en`, `title_ro` | text | Bilingual titles |
| `excerpt_en`, `excerpt_ro` | text | Card summaries |
| `content_en`, `content_ro` | text (markdown) | Article body |
| `seo_title_en`, `seo_title_ro` | text | Override page titles |
| `seo_description_en`, `seo_description_ro` | text | Meta descriptions |
| `cover_image_url` | text | Cloudinary URL |
| `cover_image_public_id` | text | For tracked cleanup |
| `cover_image_alt_en`, `cover_image_alt_ro` | text | Localized alt text |
| `cover_image_width`, `cover_image_height` | int | Intrinsic dimensions |
| `author_name` | text | Author display |
| `category` | text | Single category |
| `tags` | text[] | Multiple tags |
| `reading_time` | int | Minutes |

### Body Format
Markdown is stored directly in `content_en` / `content_ro` columns. Rendered on the frontend using `react-markdown` + `remark-gfm`.

No block editor, no WYSIWYG, no rich JSON structure. Plain markdown is the format of record.

## Public Routes
- `/insights` — Article listing with optional featured hero
- `/insights/[slug]` — Full article view with markdown rendering, SEO metadata, and CTA block

Only `status = 'published'` articles with `published_at <= now()` appear publicly.

## Admin Routes
- `/admin/articles` — Article list with status badges
- `/admin/articles/new` — New article form
- `/admin/articles/[id]` — Edit existing article

## Image Upload
Cover images use the existing Cloudinary signed-upload pipeline:
1. Admin clicks "Upload cover" → requests signature from `/api/admin/media/sign` with `entity: "articles"`
2. File uploads directly to Cloudinary → returns `secure_url`, `public_id`, dimensions
3. Values stored in hidden form fields → persisted on save

Old cover images are automatically cleaned up from Cloudinary when replaced or deleted.

## SEO
Each article renders localized `generateMetadata` with:
- Title (from `seo_title` or `title`)
- Description (from `seo_description` or `excerpt`)
- OG image (from `cover_image_url`)
- Article type OpenGraph fields

## Known Limitations
- No inline image upload within markdown body
- No comment system
- No multi-author management beyond `author_name` text field
- No taxonomy/category management UI (plain text input)
- Tags are flat text arrays, not relational

## Migration
Run `supabase/migrations/00003_articles.sql` before using the blog system.
