UPDATE services
SET
  title_en = 'Websites & Mobile Apps',
  title_ro = 'Website-uri și aplicații mobile',
  description_en = 'Customer-facing websites and mobile apps designed to build trust, improve access, and make services easier to use.',
  description_ro = 'Website-uri și aplicații mobile orientate către client, gândite să inspire încredere, să îmbunătățească accesul și să facă serviciile mai ușor de folosit.',
  bullet_points_en = '["Website design", "Mobile apps", "Service access"]'::jsonb,
  bullet_points_ro = '["Design website", "Aplicații mobile", "Acces mai ușor la servicii"]'::jsonb,
  updated_at = NOW()
WHERE slug = 'web-design';

UPDATE services
SET
  title_en = 'Booking & Client Management',
  title_ro = 'Programări și administrarea clienților',
  description_en = 'Booking flows and admin visibility for businesses that manage appointments, requests, or repeat clients.',
  description_ro = 'Fluxuri de programare și vizibilitate administrativă pentru afaceri care gestionează programări, solicitări sau clienți recurenți.',
  bullet_points_en = '["Booking flows", "Admin visibility", "Client handling"]'::jsonb,
  bullet_points_ro = '["Fluxuri de programare", "Vizibilitate administrativă", "Gestionarea clienților"]'::jsonb,
  updated_at = NOW()
WHERE slug = 'booking-systems';

UPDATE services
SET
  title_en = 'Workflow Automation',
  title_ro = 'Automatizare workflow',
  description_en = 'Lead capture, follow-up, and practical automations that help teams respond faster and reduce manual work.',
  description_ro = 'Captarea lead-urilor, follow-up-ul și automatizările practice care ajută echipele să răspundă mai rapid și să reducă munca manuală.',
  bullet_points_en = '["Lead capture", "Follow-up flows", "Practical automation"]'::jsonb,
  bullet_points_ro = '["Captare lead-uri", "Fluxuri de follow-up", "Automatizare practică"]'::jsonb,
  updated_at = NOW()
WHERE slug = 'automations';

UPDATE services
SET
  title_en = 'Custom Apps',
  title_ro = 'Aplicații custom',
  description_en = 'Custom mobile or internal apps for businesses that need more tailored workflows than a website alone can provide.',
  description_ro = 'Aplicații mobile sau interne pentru afaceri care au nevoie de fluxuri mai bine adaptate decât poate oferi doar un website.',
  bullet_points_en = '["Mobile apps", "Internal workflows", "Custom delivery"]'::jsonb,
  bullet_points_ro = '["Aplicații mobile", "Fluxuri interne", "Dezvoltare custom"]'::jsonb,
  updated_at = NOW()
WHERE slug = 'mobile-apps';
