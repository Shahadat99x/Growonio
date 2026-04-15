UPDATE pricing_packages
SET
  description_en = 'Best for smaller businesses that need a credible online presence and a clean starting structure.',
  description_ro = 'Potrivit pentru afaceri mai mici care au nevoie de o prezență online credibilă și un punct de plecare clar.',
  features_en = '["Responsive website", "Up to 5 main pages", "Service and contact editing", "Contact or inquiry form", "Basic SEO and launch setup"]'::jsonb,
  features_ro = '["Website responsive", "Până la 5 pagini principale", "Editare servicii și informații de contact", "Formular de contact sau solicitări", "Setare SEO de bază și suport la lansare"]'::jsonb,
  cta_text_en = 'Request a Quote',
  cta_text_ro = 'Solicită o ofertă'
WHERE title_en = 'LaunchPad';

UPDATE pricing_packages
SET
  description_en = 'Best for businesses that need a stronger website plus booking or inquiry flow.',
  description_ro = 'Potrivit pentru afaceri care au nevoie de un website mai puternic, plus flux de programare sau solicitări.',
  features_en = '["Everything in LaunchPad", "Booking or inquiry flow", "Stronger admin control", "Service, pricing, and inquiry management", "Conversion-focused page structure"]'::jsonb,
  features_ro = '["Tot ce este inclus în LaunchPad", "Flux de programare sau solicitări", "Control administrativ mai bun", "Gestionare servicii, prețuri și solicitări", "Structură de pagină orientată spre conversie"]'::jsonb,
  cta_text_en = 'Request a Quote',
  cta_text_ro = 'Solicită o ofertă'
WHERE title_en = 'FlowSite';

UPDATE pricing_packages
SET
  description_en = 'Best for businesses that need website, admin visibility, and operational support in one system.',
  description_ro = 'Potrivit pentru afaceri care au nevoie de website, vizibilitate administrativă și suport operațional într-un singur sistem.',
  features_en = '["Everything in FlowSite", "Advanced admin dashboard", "Client record visibility", "Operational support workflows", "Reporting-ready structure"]'::jsonb,
  features_ro = '["Tot ce este inclus în FlowSite", "Dashboard administrativ avansat", "Vizibilitate asupra evidenței clienților", "Fluxuri de suport operațional", "Structură pregătită pentru raportare"]'::jsonb,
  cta_text_en = 'Book a Consultation',
  cta_text_ro = 'Programează o consultanță'
WHERE title_en = 'OpsCore';
