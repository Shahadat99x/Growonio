UPDATE work_items
SET
  overview_en = 'Growonio delivered a polished salon website and a clearer appointment experience so Luxe Beauty could present services professionally, capture more leads, and reduce booking friction.',
  overview_ro = 'Growonio a livrat un website premium pentru salon și o experiență de programare mai clară, astfel încât Luxe Beauty să își prezinte serviciile profesionist, să capteze mai multe cereri și să reducă fricțiunea din programări.',
  challenge_en = 'The salon relied on fragmented communication, limited service presentation, and too much manual coordination for appointment requests. That reduced trust and slowed down responses to potential clients.',
  challenge_ro = 'Salonul se baza pe comunicare fragmentată, prezentare limitată a serviciilor și prea multă coordonare manuală pentru cererile de programare. Acest lucru reducea încrederea și încetinea răspunsurile către potențialii clienți.',
  solution_en = 'We structured the project around a conversion-focused service website, clearer pricing and treatment visibility, stronger inquiry capture, and a booking flow that could be managed from an admin-friendly setup.',
  solution_ro = 'Am structurat proiectul în jurul unui website de servicii orientat spre conversie, cu vizibilitate mai clară pentru prețuri și tratamente, captare mai bună a cererilor și un flux de programare administrabil dintr-un sistem ușor de folosit.',
  results_en = 'The final setup gave the business a stronger digital presence, faster lead handling, and a cleaner operational flow that supported both marketing and day-to-day scheduling.',
  results_ro = 'Configurația finală a oferit afacerii o prezență digitală mai puternică, gestionare mai rapidă a cererilor și un flux operațional mai clar care a susținut atât marketingul, cât și programările zilnice.',
  features_en = '["Premium responsive website", "Service presentation and pricing clarity", "Lead capture and booking inquiry flow", "Admin-friendly content updates"]'::jsonb,
  features_ro = '["Website premium responsive", "Prezentare clară a serviciilor și prețurilor", "Captare de cereri și flux de programare", "Actualizări de conținut ușor de administrat"]'::jsonb,
  live_url = NULL
WHERE slug = 'luxe-salon';

UPDATE work_items
SET
  overview_en = 'Medica Health needed a cleaner digital presentation and a more reliable way to handle patient onboarding and appointment reminders without adding manual admin pressure.',
  overview_ro = 'Medica Health avea nevoie de o prezentare digitală mai clară și de o metodă mai fiabilă pentru onboardingul pacienților și mementourile de programare, fără a adăuga presiune administrativă manuală.',
  challenge_en = 'Patient communication and scheduling depended too heavily on manual follow-up, which created avoidable no-shows and inconsistent client experience.',
  challenge_ro = 'Comunicarea cu pacienții și programările depindeau prea mult de follow-up manual, ceea ce genera neprezentări evitabile și o experiență inconstantă pentru clienți.',
  solution_en = 'The project focused on a clear clinic presentation, streamlined onboarding touchpoints, and reminder-ready workflows that made the operational process easier to manage.',
  solution_ro = 'Proiectul s-a concentrat pe o prezentare clară a clinicii, puncte de contact simplificate pentru onboarding și fluxuri pregătite pentru remindere care au făcut procesul operațional mai ușor de gestionat.',
  results_en = 'The clinic gained a more professional digital surface, stronger process consistency, and a system foundation ready for future service expansion.',
  results_ro = 'Clinica a câștigat o prezență digitală mai profesionistă, consistență mai bună în procese și o fundație de sistem pregătită pentru extinderea viitoare a serviciilor.',
  features_en = '["Clinic service presentation", "Structured onboarding flow", "Reminder-ready workflow support", "Operationally cleaner admin process"]'::jsonb,
  features_ro = '["Prezentare a serviciilor clinicii", "Flux structurat de onboarding", "Suport pentru fluxuri pregătite de remindere", "Proces administrativ mai clar operațional"]'::jsonb,
  live_url = NULL
WHERE slug = 'medica-clinic';

INSERT INTO work_item_gallery (
  work_item_id,
  image_url,
  image_public_id,
  alt_en,
  alt_ro,
  image_width,
  image_height,
  sort_order
)
SELECT
  work.id,
  work.image_url,
  work.image_public_id,
  COALESCE(work.image_alt_en, work.title_en || ' gallery image'),
  COALESCE(work.image_alt_ro, work.title_ro || ' imagine galerie'),
  work.image_width,
  work.image_height,
  1
FROM work_items AS work
WHERE work.slug IN ('luxe-salon', 'medica-clinic')
  AND work.image_url IS NOT NULL
  AND TRIM(work.image_url) <> ''
  AND NOT EXISTS (
    SELECT 1
    FROM work_item_gallery gallery
    WHERE gallery.work_item_id = work.id
      AND gallery.sort_order = 1
  );
