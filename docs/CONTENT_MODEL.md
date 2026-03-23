# Content Model Definition

This document outlines the structured models representing our primary editable entities. The schema deliberately avoids deep JSONB nesting in favor of explicit localization columns (e.g. `title_ro` and `title_en`).

## 1. Services
Represents the core offerings.
- `id`: uuid (PK)
- `slug`: string (unique)
- `title_en`, `title_ro`: string
- `description_en`, `description_ro`: text
- `icon_name`: string (maps to Lucide icons)
- `order`: integer
- `is_active`: boolean

## 2. Pricing Packages
Represents the subscription or fixed-tier pricing.
- `id`: uuid (PK)
- `title_en`, `title_ro`: string
- `price_monthly`: decimal (or string if custom formatting)
- `description_en`, `description_ro`: string
- `features_en`, `features_ro`: jsonb (array of strings)
- `is_popular`: boolean
- `cta_text_en`, `cta_text_ro`: string
- `cta_link`: string
- `order`: integer
- `is_active`: boolean

## 3. Work/Portfolio Items
Showcases previous client transformations.
- `id`: uuid (PK)
- `slug`: string (unique)
- `title_en`, `title_ro`: string
- `client_name`: string
- `industry_en`, `industry_ro`: string
- `description_en`, `description_ro`: text
- `image_url`: string (optional)
- `image_public_id`: string (Cloudinary asset id for tracked cleanup)
- `image_alt_en`, `image_alt_ro`: string (optional localized alt text)
- `image_width`, `image_height`: integer (optional intrinsic dimensions returned by Cloudinary)
- `stats`: jsonb (e.g. `[{ label: "Conversion", value: "+20%" }]` - stats are usually locale-agnostic or simple enough to map)
- `is_featured`: boolean
- `order`: integer
- `is_active`: boolean

## 4. FAQ Items
Business-oriented questions.
- `id`: uuid (PK)
- `question_en`, `question_ro`: string
- `answer_en`, `answer_ro`: text
- `category_en`, `category_ro`: string (optional grouping)
- `order`: integer
- `is_active`: boolean

## 5. Company Settings
A singleton configuration object.
- `id`: uuid (PK)
- `email`: string
- `phone`: string
- `address_en`, `address_ro`: string
- `social_urls`: jsonb (e.g. `{ facebook: "url", linkedin: "url" }`)
- `updated_at`: timestamp

## 6. Articles / Blog Posts
Bilingual blog content with SEO and Cloudinary cover images.
- `id`: uuid (PK)
- `slug`: string (unique)
- `status`: string ('draft' | 'published')
- `is_featured`: boolean
- `published_at`: timestamptz
- `created_at`, `updated_at`: timestamptz
- `title_en`, `title_ro`: text
- `excerpt_en`, `excerpt_ro`: text
- `content_en`, `content_ro`: text (markdown)
- `seo_title_en`, `seo_title_ro`: text (optional override)
- `seo_description_en`, `seo_description_ro`: text (optional override)
- `cover_image_url`: string (Cloudinary URL)
- `cover_image_public_id`: string (Cloudinary asset id)
- `cover_image_alt_en`, `cover_image_alt_ro`: string (optional localized alt)
- `cover_image_width`, `cover_image_height`: integer (optional intrinsic dimensions)
- `author_name`: string
- `category`: string
- `tags`: text[] (flat array)
- `reading_time`: integer (minutes)
