ALTER TABLE work_items
ADD COLUMN IF NOT EXISTS image_public_id TEXT,
ADD COLUMN IF NOT EXISTS image_alt_en TEXT,
ADD COLUMN IF NOT EXISTS image_alt_ro TEXT,
ADD COLUMN IF NOT EXISTS image_width INTEGER,
ADD COLUMN IF NOT EXISTS image_height INTEGER;

UPDATE work_items
SET
    image_alt_en = COALESCE(image_alt_en, CONCAT(title_en, ' for ', client_name)),
    image_alt_ro = COALESCE(image_alt_ro, CONCAT(title_ro, ' pentru ', client_name))
WHERE image_url IS NOT NULL
  AND TRIM(image_url) <> '';
