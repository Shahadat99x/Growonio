ALTER TABLE services
ADD COLUMN bullet_points_en JSONB NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN bullet_points_ro JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE services
SET
  title_en = 'Business Website Design & Development',
  title_ro = 'Creare Website-uri pentru Afaceri',
  description_en = 'Modern, high-performing websites built to help businesses look credible, rank better, and turn visitors into inquiries.',
  description_ro = 'Website-uri moderne și performante, create pentru a inspira încredere, a susține SEO și a transforma vizitatorii în cereri reale.',
  bullet_points_en = '["Custom responsive design", "SEO-ready page structure", "Easy content management"]'::jsonb,
  bullet_points_ro = '["Design responsive personalizat", "Structură de pagină pregătită pentru SEO", "Administrare ușoară a conținutului"]'::jsonb
WHERE slug = 'web-design';

UPDATE services
SET
  title_en = 'Booking & Client Management Systems',
  title_ro = 'Sisteme de Programări și Management Clienți',
  description_en = 'Scheduling and client-handling systems that reduce manual work, organize requests, and improve the customer journey.',
  description_ro = 'Sisteme de programări și gestionare a clienților care reduc munca manuală, organizează cererile și îmbunătățesc experiența clientului.',
  bullet_points_en = '["Booking or request flows", "Admin dashboard access", "Service and client handling"]'::jsonb,
  bullet_points_ro = '["Fluxuri de programări sau cereri", "Acces la dashboard administrativ", "Gestionare servicii și clienți"]'::jsonb
WHERE slug = 'booking-systems';

UPDATE services
SET
  title_en = 'Lead Capture & Workflow Automation',
  title_ro = 'Captare Cereri și Automatizare Fluxuri',
  description_en = 'Smarter lead capture and workflow automation that helps businesses respond faster, reduce repetitive tasks, and miss fewer opportunities.',
  description_ro = 'Captare mai inteligentă a cererilor și automatizare a fluxurilor pentru a răspunde mai rapid, a reduce sarcinile repetitive și a pierde mai puține oportunități.',
  bullet_points_en = '["Lead forms and inquiry flows", "Follow-up automations", "Automation-ready architecture"]'::jsonb,
  bullet_points_ro = '["Formulare de lead și fluxuri de cereri", "Automatizări pentru follow-up", "Arhitectură pregătită pentru automatizare"]'::jsonb
WHERE slug = 'automations';

UPDATE services
SET
  title_en = 'Mobile App Development',
  title_ro = 'Dezvoltare Aplicații Mobile',
  description_en = 'Custom mobile solutions for customer-facing experiences or internal business workflows when web alone is not enough.',
  description_ro = 'Soluții mobile personalizate pentru experiențe orientate spre client sau pentru fluxuri interne de business atunci când web-ul nu este suficient.',
  bullet_points_en = '["Android / cross-platform apps", "Business-focused workflows", "Scalable technical foundation"]'::jsonb,
  bullet_points_ro = '["Aplicații Android / cross-platform", "Fluxuri orientate spre business", "Fundație tehnică scalabilă"]'::jsonb
WHERE slug = 'mobile-apps';
