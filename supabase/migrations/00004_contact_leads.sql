CREATE TABLE IF NOT EXISTS contact_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'ro',
    source_path TEXT NOT NULL DEFAULT '/contact',
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx
    ON contact_leads (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_leads_status_idx
    ON contact_leads (status);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
