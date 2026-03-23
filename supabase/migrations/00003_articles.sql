-- Articles table for the Insights / Blog system
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Bilingual content
  title_en TEXT NOT NULL DEFAULT '',
  title_ro TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  excerpt_ro TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  content_ro TEXT NOT NULL DEFAULT '',

  -- SEO
  seo_title_en TEXT,
  seo_title_ro TEXT,
  seo_description_en TEXT,
  seo_description_ro TEXT,

  -- Cover image (Cloudinary)
  cover_image_url TEXT,
  cover_image_public_id TEXT,
  cover_image_alt_en TEXT,
  cover_image_alt_ro TEXT,
  cover_image_width INTEGER,
  cover_image_height INTEGER,

  -- Metadata
  author_name TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 0
);

-- Index for public listing queries
CREATE INDEX IF NOT EXISTS idx_articles_published
  ON articles (status, published_at DESC)
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_articles_slug
  ON articles (slug);

-- RLS: public read for published articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published articles"
  ON articles FOR SELECT
  USING (status = 'published');
