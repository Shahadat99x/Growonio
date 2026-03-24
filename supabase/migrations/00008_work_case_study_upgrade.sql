ALTER TABLE work_items
ADD COLUMN IF NOT EXISTS overview_en TEXT,
ADD COLUMN IF NOT EXISTS overview_ro TEXT,
ADD COLUMN IF NOT EXISTS challenge_en TEXT,
ADD COLUMN IF NOT EXISTS challenge_ro TEXT,
ADD COLUMN IF NOT EXISTS solution_en TEXT,
ADD COLUMN IF NOT EXISTS solution_ro TEXT,
ADD COLUMN IF NOT EXISTS results_en TEXT,
ADD COLUMN IF NOT EXISTS results_ro TEXT,
ADD COLUMN IF NOT EXISTS features_en JSONB NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS features_ro JSONB NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS live_url TEXT;

CREATE TABLE IF NOT EXISTS work_item_gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_item_id UUID NOT NULL REFERENCES work_items(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_public_id TEXT,
    alt_en TEXT,
    alt_ro TEXT,
    image_width INTEGER,
    image_height INTEGER,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_work_item_gallery_work_item_id
ON work_item_gallery(work_item_id);

CREATE INDEX IF NOT EXISTS idx_work_item_gallery_sort_order
ON work_item_gallery(work_item_id, sort_order);

ALTER TABLE work_item_gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read-only access for work_item_gallery" ON work_item_gallery;
CREATE POLICY "Allow public read-only access for work_item_gallery"
ON work_item_gallery
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM work_items
    WHERE work_items.id = work_item_gallery.work_item_id
      AND work_items.is_active = true
  )
);
