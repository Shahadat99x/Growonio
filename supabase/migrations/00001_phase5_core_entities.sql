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
    image_url TEXT,
    stats JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
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

-- RLS Policies (Public Read Access)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access for services" ON services FOR SELECT USING (is_active = true);

ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access for pricing_packages" ON pricing_packages FOR SELECT USING (is_active = true);

ALTER TABLE work_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access for work_items" ON work_items FOR SELECT USING (is_active = true);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access for faqs" ON faqs FOR SELECT USING (is_active = true);
