# Supabase Schema Plan (Phase 4 Foundation)

This document outlines the planned SQL schema for Phase 5 to realize the models defined in `CONTENT_MODEL.md`.
The schema uses a discrete localization strategy (`property_en`, `property_ro`) for maximum query convenience without deep JSONB indexing.

```sql
-- Core Setup Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: services
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ro VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_ro TEXT NOT NULL,
    icon_name VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: pricing_packages
CREATE TABLE pricing_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_ro VARCHAR(255) NOT NULL,
    price_monthly VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_ro TEXT,
    features_en JSONB DEFAULT '[]'::jsonb, -- Array of strings
    features_ro JSONB DEFAULT '[]'::jsonb, -- Array of strings
    is_popular BOOLEAN DEFAULT false,
    cta_text_en VARCHAR(100),
    cta_text_ro VARCHAR(100),
    cta_link VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: work_items
CREATE TABLE work_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ro VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    industry_en VARCHAR(255),
    industry_ro VARCHAR(255),
    description_en TEXT NOT NULL,
    description_ro TEXT NOT NULL,
    overview_en TEXT,
    overview_ro TEXT,
    challenge_en TEXT,
    challenge_ro TEXT,
    solution_en TEXT,
    solution_ro TEXT,
    results_en TEXT,
    results_ro TEXT,
    features_en JSONB DEFAULT '[]'::jsonb,
    features_ro JSONB DEFAULT '[]'::jsonb,
    live_url TEXT,
    image_url TEXT,
    image_public_id TEXT,
    image_alt_en TEXT,
    image_alt_ro TEXT,
    image_width INTEGER,
    image_height INTEGER,
    stats JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE work_item_gallery (
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

-- Table: faqs
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_en VARCHAR(500) NOT NULL,
    question_ro VARCHAR(500) NOT NULL,
    answer_en TEXT NOT NULL,
    answer_ro TEXT NOT NULL,
    category_en VARCHAR(100),
    category_ro VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: company_settings
CREATE TABLE company_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    phone VARCHAR(255),
    address_en TEXT,
    address_ro TEXT,
    social_urls JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
