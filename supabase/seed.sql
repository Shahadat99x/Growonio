-- Seed: Services
INSERT INTO services (
  slug,
  title_en,
  title_ro,
  description_en,
  description_ro,
  bullet_points_en,
  bullet_points_ro,
  icon_name,
  sort_order
) VALUES
(
  'web-design',
  'Business Website Design & Development',
  'Creare Website-uri pentru Afaceri',
  'Modern, high-performing websites built to help businesses look credible, rank better, and turn visitors into inquiries.',
  'Website-uri moderne și performante, create pentru a inspira încredere, a susține SEO și a transforma vizitatorii în cereri reale.',
  '["Custom responsive design", "SEO-ready page structure", "Easy content management"]'::jsonb,
  '["Design responsive personalizat", "Structură de pagină pregătită pentru SEO", "Administrare ușoară a conținutului"]'::jsonb,
  'MonitorSmartphone',
  1
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
  2
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
  3
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
  4
);

-- Seed: Pricing Packages
INSERT INTO pricing_packages (title_en, title_ro, price_monthly, description_en, description_ro, features_en, features_ro, is_popular, cta_text_en, cta_text_ro, cta_link, sort_order) VALUES
('LaunchPad', 'LaunchPad', 'from €690', 'Best for small businesses that need a modern website and easy content control.', 'Ideal pentru afaceri mici care au nevoie de un website modern și control ușor al conținutului.', '["Custom responsive website", "Up to 5 main pages", "Simple admin dashboard", "Edit services, basic content, and contact info", "Contact / lead form", "WhatsApp integration", "Basic SEO setup", "sitemap.xml + robots.txt", "Mobile-friendly design", "Basic launch support"]'::jsonb, '["Website personalizat, responsive", "Până la 5 pagini principale", "Dashboard administrativ simplu", "Editare servicii, conținut de bază și date de contact", "Formular de contact / lead capture", "Integrare WhatsApp", "Setare SEO de bază", "sitemap.xml + robots.txt", "Design optimizat pentru mobil", "Suport de bază la lansare"]'::jsonb, false, 'Request Quote', 'Cere ofertă', '/contact', 1),
('FlowSite', 'FlowSite', 'from €1,390', 'Best for businesses that need website plus booking or inquiry flow.', 'Ideal pentru afaceri care au nevoie de website plus flux de programări sau cereri.', '["Everything in LaunchPad", "Booking or appointment request flow", "Better admin dashboard", "Manage services, pricing, content, and inquiries", "Confirmation flow", "Stronger lead capture setup", "Search Console setup/submission", "Basic analytics setup", "Blog / insights management ready", "Better conversion-focused page structure"]'::jsonb, '["Tot ce este inclus în LaunchPad", "Flux de programări sau cereri", "Dashboard administrativ mai avansat", "Gestionare servicii, prețuri, conținut și cereri", "Flux de confirmare", "Configurare mai bună pentru lead capture", "Setare / trimitere în Search Console", "Setare de bază pentru analytics", "Pregătit pentru administrarea blogului / insight-urilor", "Structură de pagină mai orientată spre conversie"]'::jsonb, true, 'Request Quote', 'Cere ofertă', '/contact', 2),
('OpsCore', 'OpsCore', 'from €2,490', 'Best for growing businesses that need website, admin, and automation support.', 'Ideal pentru afaceri în creștere care au nevoie de website, administrare și automatizare.', '["Everything in FlowSite", "Advanced admin dashboard", "Client records / CRM basics", "Reminder workflow", "Lead/workflow automation basics", "Business process automation", "Reporting-ready data structure", "Blog / content management", "Stronger SEO-ready structure", "Launch guidance and handover"]'::jsonb, '["Tot ce este inclus în FlowSite", "Dashboard administrativ avansat", "Bază de date clienți / CRM de bază", "Flux de remindere", "Automatizări de bază pentru lead-uri și workflow", "Automatizare pentru procese de business", "Structură de date pregătită pentru raportare", "Administrare blog / conținut", "Structură mai puternică pregătită pentru SEO", "Ghidaj și predare la lansare"]'::jsonb, false, 'Book Consultation', 'Programează o discuție', '/contact', 3);

-- Seed: Work Items
INSERT INTO work_items (
  slug,
  title_en,
  title_ro,
  client_name,
  industry_en,
  industry_ro,
  description_en,
  description_ro,
  overview_en,
  overview_ro,
  challenge_en,
  challenge_ro,
  solution_en,
  solution_ro,
  results_en,
  results_ro,
  features_en,
  features_ro,
  live_url,
  image_url,
  image_alt_en,
  image_alt_ro,
  stats,
  is_featured,
  sort_order
) VALUES
(
  'luxe-salon',
  'Luxe Beauty Salon',
  'Salonul de Înfrumusețare Luxe',
  'Luxe Beauty',
  'Salons',
  'Saloane',
  'A complete digital transformation including a custom booking portal that increased appointments by 40%.',
  'O transformare digitală completă incluzând un portal de rezervări care a crescut programările cu 40%.',
  'Growonio delivered a polished salon website and a clearer appointment experience so Luxe Beauty could present services professionally, capture more leads, and reduce booking friction.',
  'Growonio a livrat un website premium pentru salon și o experiență de programare mai clară, astfel încât Luxe Beauty să își prezinte serviciile profesionist, să capteze mai multe cereri și să reducă fricțiunea din programări.',
  'The salon relied on fragmented communication, limited service presentation, and too much manual coordination for appointment requests. That reduced trust and slowed down responses to potential clients.',
  'Salonul se baza pe comunicare fragmentată, prezentare limitată a serviciilor și prea multă coordonare manuală pentru cererile de programare. Acest lucru reducea încrederea și încetinea răspunsurile către potențialii clienți.',
  'We structured the project around a conversion-focused service website, clearer pricing and treatment visibility, stronger inquiry capture, and a booking flow that could be managed from an admin-friendly setup.',
  'Am structurat proiectul în jurul unui website de servicii orientat spre conversie, cu vizibilitate mai clară pentru prețuri și tratamente, captare mai bună a cererilor și un flux de programare administrabil dintr-un sistem ușor de folosit.',
  'The final setup gave the business a stronger digital presence, faster lead handling, and a cleaner operational flow that supported both marketing and day-to-day scheduling.',
  'Configurația finală a oferit afacerii o prezență digitală mai puternică, gestionare mai rapidă a cererilor și un flux operațional mai clar care a susținut atât marketingul, cât și programările zilnice.',
  '["Premium responsive website", "Service presentation and pricing clarity", "Lead capture and booking inquiry flow", "Admin-friendly content updates"]'::jsonb,
  '["Website premium responsive", "Prezentare clară a serviciilor și prețurilor", "Captare de cereri și flux de programare", "Actualizări de conținut ușor de administrat"]'::jsonb,
  NULL,
  '/placeholder-salon.jpg',
  'Luxe Beauty Salon website preview',
  'Preview site pentru Luxe Beauty Salon',
  '[{"label": "Bookings", "value": "+40%"}, {"label": "Admin Time", "value": "-15h/wk"}]'::jsonb,
  true,
  1
),
(
  'medica-clinic',
  'Medica Health Clinic',
  'Clinica Medica',
  'Medica Health',
  'Clinics',
  'Clinici',
  'Secure patient onboarding and automated reminder pipelines reducing no-shows entirely.',
  'Sistem securizat de înregistrare pacienți și mementouri automate care au redus complet neprezentările.',
  'Medica Health needed a cleaner digital presentation and a more reliable way to handle patient onboarding and appointment reminders without adding manual admin pressure.',
  'Medica Health avea nevoie de o prezentare digitală mai clară și de o metodă mai fiabilă pentru onboardingul pacienților și mementourile de programare, fără a adăuga presiune administrativă manuală.',
  'Patient communication and scheduling depended too heavily on manual follow-up, which created avoidable no-shows and inconsistent client experience.',
  'Comunicarea cu pacienții și programările depindeau prea mult de follow-up manual, ceea ce genera neprezentări evitabile și o experiență inconstantă pentru clienți.',
  'The project focused on a clear clinic presentation, streamlined onboarding touchpoints, and reminder-ready workflows that made the operational process easier to manage.',
  'Proiectul s-a concentrat pe o prezentare clară a clinicii, puncte de contact simplificate pentru onboarding și fluxuri pregătite pentru remindere care au făcut procesul operațional mai ușor de gestionat.',
  'The clinic gained a more professional digital surface, stronger process consistency, and a system foundation ready for future service expansion.',
  'Clinica a câștigat o prezență digitală mai profesionistă, consistență mai bună în procese și o fundație de sistem pregătită pentru extinderea viitoare a serviciilor.',
  '["Clinic service presentation", "Structured onboarding flow", "Reminder-ready workflow support", "Operationally cleaner admin process"]'::jsonb,
  '["Prezentare a serviciilor clinicii", "Flux structurat de onboarding", "Suport pentru fluxuri pregătite de remindere", "Proces administrativ mai clar operațional"]'::jsonb,
  NULL,
  '/placeholder-clinic.jpg',
  'Medica Health Clinic operations preview',
  'Preview operațiuni pentru Clinica Medica',
  '[{"label": "No-shows", "value": "-95%"}, {"label": "Retention", "value": "+22%"}]'::jsonb,
  true,
  2
);

INSERT INTO work_item_gallery (work_item_id, image_url, alt_en, alt_ro, sort_order)
SELECT id, image_url, image_alt_en, image_alt_ro, 1
FROM work_items
WHERE slug IN ('luxe-salon', 'medica-clinic')
  AND image_url IS NOT NULL
  AND TRIM(image_url) <> '';

-- Seed: FAQs
INSERT INTO faqs (question_en, question_ro, answer_en, answer_ro, category_en, category_ro, sort_order) VALUES
('How long does a typical project take?', 'Cât durează un proiect tipic?', 'Most growth packages are implemented within 4 to 6 weeks, depending on the complexity of your workflow integrations.', 'Majoritatea pachetelor de creștere sunt implementate în 4 până la 6 săptămâni, în funcție de complexitate.', 'General', 'General', 1),
('Do I need technical skills to manage my new system?', 'Am nevoie de abilități tehnice pentru a gestiona noul sistem?', 'Not at all. We build tools that are intuitive for your entire team, and we provide complete training before hand-off.', 'Deloc. Construim instrumente intuitive pentru întreaga echipă și oferim instruire completă la predare.', 'Support', 'Suport', 2);

-- Seed: Articles
INSERT INTO articles (slug, status, is_featured, published_at, title_en, title_ro, excerpt_en, excerpt_ro, content_en, content_ro, seo_title_en, seo_title_ro, seo_description_en, seo_description_ro, author_name, category, tags, reading_time) VALUES
(
  'why-automation-matters',
  'published',
  true,
  now() - INTERVAL '3 days',
  'Why Automation Matters for Small Businesses',
  'De ce contează automatizarea pentru afacerile mici',
  'Discover how simple automations can save hours every week and help your business grow faster.',
  'Descoperă cum automatizările simple pot economisi ore în fiecare săptămână și pot ajuta afacerea ta să crească mai rapid.',
  E'## The Hidden Cost of Manual Work\n\nEvery hour spent on repetitive administrative tasks is an hour not spent growing your business. For small businesses, this trade-off can mean the difference between thriving and merely surviving.\n\n### What Can Be Automated?\n\n- **Appointment scheduling** — Let clients book online 24/7\n- **Email follow-ups** — Automatic reminders and thank-you messages\n- **Invoice generation** — Create and send invoices without lifting a finger\n- **Lead capture** — Automatically collect and organize inquiries\n\n> "We saved 15 hours per week after implementing automated booking." — Luxe Beauty Salon\n\n### Getting Started\n\nYou don''t need to automate everything at once. Start with the task that consumes the most time, measure the results, and expand from there.\n\nThe key is to **start small and iterate**. Even a single automation can free up meaningful time for what matters most — your clients.',
  E'## Costul ascuns al muncii manuale\n\nFiecare oră petrecută pe sarcini administrative repetitive este o oră care nu este dedicată creșterii afacerii tale. Pentru afacerile mici, acest compromis poate face diferența între a prospera și a supraviețui.\n\n### Ce poate fi automatizat?\n\n- **Programări** — Lasă clienții să rezerve online 24/7\n- **Follow-up email** — Mementouri și mesaje de mulțumire automate\n- **Generare facturi** — Creează și trimite facturi fără efort\n- **Captare lead-uri** — Colectează și organizează automat cererile\n\n> "Am economisit 15 ore pe săptămână după implementarea rezervărilor automate." — Salonul Luxe Beauty\n\n### Cum să începi\n\nNu trebuie să automatizezi totul deodată. Începe cu sarcina care consumă cel mai mult timp, măsoară rezultatele și extinde de acolo.\n\nCheia este să **începi mic și să iterezi**. Chiar și o singură automatizare poate elibera timp semnificativ pentru ceea ce contează cel mai mult — clienții tăi.',
  'Why Automation Matters for Small Businesses | Growonio',
  'De ce contează automatizarea | Growonio',
  'Learn how small businesses save time and grow faster with simple workflow automations.',
  'Află cum afacerile mici economisesc timp și cresc mai rapid cu automatizări simple.',
  'Growonio Team',
  'automation',
  ARRAY['automation', 'productivity', 'small-business'],
  4
),
(
  'choosing-the-right-booking-system',
  'published',
  false,
  now() - INTERVAL '1 day',
  'How to Choose the Right Booking System',
  'Cum să alegi sistemul de rezervări potrivit',
  'A practical guide to evaluating booking platforms for service-based businesses.',
  'Un ghid practic pentru evaluarea platformelor de rezervări pentru afaceri bazate pe servicii.',
  E'## Not All Booking Systems Are Created Equal\n\nPicking a booking system is one of the most impactful decisions a service business can make. The right tool reduces no-shows, saves admin time, and improves the client experience.\n\n### Key Features to Look For\n\n1. **Online self-service** — Clients should book without calling\n2. **Calendar sync** — Integration with Google Calendar or Outlook\n3. **Automated reminders** — SMS or email confirmations\n4. **Payment collection** — Deposits or full prepayment\n5. **Multi-location support** — If you have more than one branch\n\n### Questions to Ask Before Committing\n\n- Does it integrate with my existing website?\n- Can I customize the booking flow?\n- What happens when I need to reschedule?\n- Is the data exportable?\n\n### Our Recommendation\n\nStart with a system that covers your core needs today but can scale tomorrow. Avoid over-investing in features you won''t use for the next 12 months.',
  E'## Nu toate sistemele de rezervări sunt la fel\n\nAlegerea unui sistem de rezervări este una dintre cele mai importante decizii pentru o afacere bazată pe servicii. Instrumentul potrivit reduce neprezentările, economisește timp administrativ și îmbunătățește experiența clientului.\n\n### Funcționalități cheie de căutat\n\n1. **Self-service online** — Clienții ar trebui să poată rezerva fără să sune\n2. **Sincronizare calendar** — Integrare cu Google Calendar sau Outlook\n3. **Mementouri automate** — Confirmări prin SMS sau email\n4. **Colectare plăți** — Avansuri sau plată integrală\n5. **Suport multi-locație** — Dacă ai mai mult de o filială\n\n### Întrebări de pus înainte de a te angaja\n\n- Se integrează cu site-ul meu existent?\n- Pot personaliza fluxul de rezervare?\n- Ce se întâmplă când trebuie să reprogramez?\n- Datele sunt exportabile?\n\n### Recomandarea noastră\n\nÎncepe cu un sistem care acoperă nevoile tale de bază de azi, dar care poate scala mâine. Evită să investești excesiv în funcționalități pe care nu le vei folosi în următoarele 12 luni.',
  'How to Choose the Right Booking System | Growonio',
  'Cum să alegi sistemul de rezervări potrivit | Growonio',
  'A practical framework for evaluating booking platforms for salons, clinics, and service businesses.',
  'Un cadru practic pentru evaluarea platformelor de rezervări pentru saloane, clinici și afaceri de servicii.',
  'Growonio Team',
  'tools',
  ARRAY['booking', 'tools', 'guide'],
  5
);
