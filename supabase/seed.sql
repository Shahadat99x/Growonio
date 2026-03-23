-- Seed: Services
INSERT INTO services (slug, title_en, title_ro, description_en, description_ro, icon_name, sort_order) VALUES
('web-design', 'Website Design & Development', 'Design și Dezvoltare Web', 'High-performance, beautifully crafted websites that convert visitors into clients.', 'Site-uri web performante, frumos create, care convertesc vizitatorii în clienți.', 'MonitorSmartphone', 1),
('booking-systems', 'Booking & Client Management', 'Sisteme de Rezervări', 'Streamlined scheduling systems that eliminate administrative overhead.', 'Sisteme de programare optimizate care elimină munca administrativă.', 'CalendarCheck', 2),
('automations', 'Lead Capture & Workflow Automation', 'Automatizări & Captare Lead-uri', 'Automated funnels and data syncing to capture every opportunity.', 'Pâlnii automate și sincronizare de date pentru a capta orice oportunitate.', 'Workflow', 3),
('mobile-apps', 'Mobile App Development', 'Dezvoltare Aplicații Mobile', 'Custom iOS and Android solutions for deeper client engagement.', 'Soluții personalizate iOS și Android pentru o implicare mai profundă a clienților.', 'Smartphone', 4);

-- Seed: Pricing Packages
INSERT INTO pricing_packages (title_en, title_ro, price_monthly, description_en, description_ro, features_en, features_ro, is_popular, cta_text_en, cta_text_ro, cta_link, sort_order) VALUES
('Starter', 'Începător', '€499', 'Perfect for new businesses needing a professional digital presence.', 'Perfect pentru afaceri noi care au nevoie de o prezență digitală profesională.', '["Custom 5-page website", "Basic SEO setup", "Contact form integration", "Mobile responsive"]'::jsonb, '["Site web personalizat 5 pagini", "Configurare SEO de bază", "Formular contact integrat", "Optimizat pentru mobil"]'::jsonb, false, 'Get Started', 'Începe acum', '/contact', 1),
('Growth', 'Creștere', '€999', 'For established businesses looking to automate and scale.', 'Pentru afaceri stabile care doresc să automatizeze și să crească.', '["Advanced booking system", "Automated email workflows", "CRM integration", "Monthly analytics"]'::jsonb, '["Sistem avansat de rezervări", "Fluxuri automate de email", "Integrare CRM", "Analize lunare"]'::jsonb, true, 'Get Started', 'Începe acum', '/contact', 2),
('Enterprise', 'Personalizat', 'Custom', 'Custom architecture and complex integrations.', 'Arhitectură personalizată și integrări complexe.', '["Dedicated mobile app", "Custom API integrations", "Priority 24/7 support", "Dedicated account manager"]'::jsonb, '["Aplicație mobilă dedicată", "Integrări API personalizate", "Suport prioritar 24/7", "Manager de cont dedicat"]'::jsonb, false, 'Contact Us', 'Contactează-ne', '/contact', 3);

-- Seed: Work Items
INSERT INTO work_items (slug, title_en, title_ro, client_name, industry_en, industry_ro, description_en, description_ro, image_url, stats, is_featured, sort_order) VALUES
('luxe-salon', 'Luxe Beauty Salon', 'Salonul de Înfrumusețare Luxe', 'Luxe Beauty', 'Salons', 'Saloane', 'A complete digital transformation including a custom booking portal that increased appointments by 40%.', 'O transformare digitală completă incluzând un portal de rezervări care a crescut programările cu 40%.', '/placeholder-salon.jpg', '[{"label": "Bookings", "value": "+40%"}, {"label": "Admin Time", "value": "-15h/wk"}]'::jsonb, true, 1),
('medica-clinic', 'Medica Health Clinic', 'Clinica Medica', 'Medica Health', 'Clinics', 'Clinici', 'Secure patient onboarding and automated reminder pipelines reducing no-shows entirely.', 'Sistem securizat de înregistrare pacienți și mementouri automate care au redus complet neprezentările.', '/placeholder-clinic.jpg', '[{"label": "No-shows", "value": "-95%"}, {"label": "Retention", "value": "+22%"}]'::jsonb, true, 2);

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
