INSERT INTO services (
  slug,
  title_en,
  title_ro,
  description_en,
  description_ro,
  bullet_points_en,
  bullet_points_ro,
  icon_name,
  sort_order,
  is_active
)
VALUES
(
  'web-design',
  'Business Website Design & Development',
  'Creare Website-uri pentru Afaceri',
  'Modern, high-performing websites built to help businesses look credible, rank better, and turn visitors into inquiries.',
  'Website-uri moderne și performante, create pentru a inspira încredere, a susține SEO și a transforma vizitatorii în cereri reale.',
  '["Custom responsive design", "SEO-ready page structure", "Easy content management"]'::jsonb,
  '["Design responsive personalizat", "Structură de pagină pregătită pentru SEO", "Administrare ușoară a conținutului"]'::jsonb,
  'MonitorSmartphone',
  1,
  true
),
(
  'booking-systems',
  'Booking & Client Management Systems',
  'Sisteme de Programări și Management Clienți',
  'Scheduling and client-handling systems that reduce manual work, organize requests, and improve the customer journey.',
  'Sisteme de programări și gestionare a clienților care reduc munca manuală, organizează cererile și îmbunătățesc experiența clientului.',
  '["Booking or request flows", "Admin dashboard access", "Service and client handling"]'::jsonb,
  '["Fluxuri de programări sau cereri", "Acces la dashboard administrativ", "Gestionare servicii și clienți"]'::jsonb,
  'CalendarCheck',
  2,
  true
),
(
  'automations',
  'Lead Capture & Workflow Automation',
  'Captare Cereri și Automatizare Fluxuri',
  'Smarter lead capture and workflow automation that helps businesses respond faster, reduce repetitive tasks, and miss fewer opportunities.',
  'Captare mai inteligentă a cererilor și automatizare a fluxurilor pentru a răspunde mai rapid, a reduce sarcinile repetitive și a pierde mai puține oportunități.',
  '["Lead forms and inquiry flows", "Follow-up automations", "Automation-ready architecture"]'::jsonb,
  '["Formulare de lead și fluxuri de cereri", "Automatizări pentru follow-up", "Arhitectură pregătită pentru automatizare"]'::jsonb,
  'Workflow',
  3,
  true
),
(
  'mobile-apps',
  'Mobile App Development',
  'Dezvoltare Aplicații Mobile',
  'Custom mobile solutions for customer-facing experiences or internal business workflows when web alone is not enough.',
  'Soluții mobile personalizate pentru experiențe orientate spre client sau pentru fluxuri interne de business atunci când web-ul nu este suficient.',
  '["Android / cross-platform apps", "Business-focused workflows", "Scalable technical foundation"]'::jsonb,
  '["Aplicații Android / cross-platform", "Fluxuri orientate spre business", "Fundație tehnică scalabilă"]'::jsonb,
  'Smartphone',
  4,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ro = EXCLUDED.title_ro,
  description_en = EXCLUDED.description_en,
  description_ro = EXCLUDED.description_ro,
  bullet_points_en = EXCLUDED.bullet_points_en,
  bullet_points_ro = EXCLUDED.bullet_points_ro,
  icon_name = EXCLUDED.icon_name,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();
