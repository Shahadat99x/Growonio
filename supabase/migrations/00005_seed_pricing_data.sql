-- Migration to populate real pricing packages instead of demo data

-- Clear existing pricing packages (which are just demo data: Starter, Growth, Enterprise)
DELETE FROM pricing_packages;

-- Insert real pricing packages
INSERT INTO pricing_packages (
    title_en, title_ro, price_monthly, description_en, description_ro, features_en, features_ro, is_popular, cta_text_en, cta_text_ro, cta_link, sort_order
) VALUES
(
    'LaunchPad',
    'LaunchPad',
    'from €690',
    'Best for small businesses that need a modern website and easy content control.',
    'Ideal pentru afaceri mici care au nevoie de un website modern și control ușor al conținutului.',
    '["Custom responsive website", "Up to 5 main pages", "Simple admin dashboard", "Edit services, basic content, and contact info", "Contact / lead form", "WhatsApp integration", "Basic SEO setup", "sitemap.xml + robots.txt", "Mobile-friendly design", "Basic launch support"]'::jsonb,
    '["Website personalizat, responsive", "Până la 5 pagini principale", "Dashboard administrativ simplu", "Editare servicii, conținut de bază și date de contact", "Formular de contact / lead capture", "Integrare WhatsApp", "Setare SEO de bază", "sitemap.xml + robots.txt", "Design optimizat pentru mobil", "Suport de bază la lansare"]'::jsonb,
    false,
    'Request Quote',
    'Cere ofertă',
    '/contact',
    1
),
(
    'FlowSite',
    'FlowSite',
    'from €1,390',
    'Best for businesses that need website plus booking or inquiry flow.',
    'Ideal pentru afaceri care au nevoie de website plus flux de programări sau cereri.',
    '["Everything in LaunchPad", "Booking or appointment request flow", "Better admin dashboard", "Manage services, pricing, content, and inquiries", "Confirmation flow", "Stronger lead capture setup", "Search Console setup/submission", "Basic analytics setup", "Blog / insights management ready", "Better conversion-focused page structure"]'::jsonb,
    '["Tot ce este inclus în LaunchPad", "Flux de programări sau cereri", "Dashboard administrativ mai avansat", "Gestionare servicii, prețuri, conținut și cereri", "Flux de confirmare", "Configurare mai bună pentru lead capture", "Setare / trimitere în Search Console", "Setare de bază pentru analytics", "Pregătit pentru administrarea blogului / insight-urilor", "Structură de pagină mai orientată spre conversie"]'::jsonb,
    true,
    'Request Quote',
    'Cere ofertă',
    '/contact',
    2
),
(
    'OpsCore',
    'OpsCore',
    'from €2,490',
    'Best for growing businesses that need website, admin, and automation support.',
    'Ideal pentru afaceri în creștere care au nevoie de website, administrare și automatizare.',
    '["Everything in FlowSite", "Advanced admin dashboard", "Client records / CRM basics", "Reminder workflow", "Lead/workflow automation basics", "Business process automation", "Reporting-ready data structure", "Blog / content management", "Stronger SEO-ready structure", "Launch guidance and handover"]'::jsonb,
    '["Tot ce este inclus în FlowSite", "Dashboard administrativ avansat", "Bază de date clienți / CRM de bază", "Flux de remindere", "Automatizări de bază pentru lead-uri și workflow", "Automatizare pentru procese de business", "Structură de date pregătită pentru raportare", "Administrare blog / conținut", "Structură mai puternică pregătită pentru SEO", "Ghidaj și predare la lansare"]'::jsonb,
    false,
    'Book Consultation',
    'Programează o discuție',
    '/contact',
    3
);
