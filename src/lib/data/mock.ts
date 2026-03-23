import { Service, PricingPackage, WorkItem, FAQItem, CompanySettings } from "@/types/content";

export const mockServices: Service[] = [
  {
    id: "s1",
    slug: "web-design",
    title_en: "Website Design & Development",
    title_ro: "Design și Dezvoltare Web",
    description_en: "High-performance, beautifully crafted websites that convert visitors into clients.",
    description_ro: "Site-uri web performante, frumos create, care convertesc vizitatorii în clienți.",
    icon_name: "MonitorSmartphone",
    order: 1,
    isActive: true,
  },
  {
    id: "s2",
    slug: "booking-systems",
    title_en: "Booking & Client Management",
    title_ro: "Sisteme de Rezervări",
    description_en: "Streamlined scheduling systems that eliminate administrative overhead.",
    description_ro: "Sisteme de programare optimizate care elimină munca administrativă.",
    icon_name: "CalendarCheck",
    order: 2,
    isActive: true,
  },
  {
    id: "s3",
    slug: "automations",
    title_en: "Lead Capture & Workflow Automation",
    title_ro: "Automatizări & Captare Lead-uri",
    description_en: "Automated funnels and data syncing to capture every opportunity.",
    description_ro: "Pâlnii automate și sincronizare de date pentru a capta orice oportunitate.",
    icon_name: "Workflow",
    order: 3,
    isActive: true,
  },
  {
    id: "s4",
    slug: "mobile-apps",
    title_en: "Mobile App Development",
    title_ro: "Dezvoltare Aplicații Mobile",
    description_en: "Custom iOS and Android solutions for deeper client engagement.",
    description_ro: "Soluții personalizate iOS și Android pentru o implicare mai profundă a clienților.",
    icon_name: "Smartphone",
    order: 4,
    isActive: true,
  }
];

export const mockPricingPackages: PricingPackage[] = [
  {
    id: "p1",
    title_en: "Starter",
    title_ro: "Începător",
    price_monthly: "€499",
    description_en: "Perfect for new businesses needing a professional digital presence.",
    description_ro: "Perfect pentru afaceri noi care au nevoie de o prezență digitală profesională.",
    features_en: ["Custom 5-page website", "Basic SEO setup", "Contact form integration", "Mobile responsive"],
    features_ro: ["Site web personalizat 5 pagini", "Configurare SEO de bază", "Formular contact integrat", "Optimizat pentru mobil"],
    is_popular: false,
    cta_text_en: "Get Started",
    cta_text_ro: "Începe acum",
    cta_link: "/contact",
    order: 1,
    isActive: true,
  },
  {
    id: "p2",
    title_en: "Growth",
    title_ro: "Creștere",
    price_monthly: "€999",
    description_en: "For established businesses looking to automate and scale.",
    description_ro: "Pentru afaceri stabile care doresc să automatizeze și să crească.",
    features_en: ["Advanced booking system", "Automated email workflows", "CRM integration", "Monthly analytics"],
    features_ro: ["Sistem avansat de rezervări", "Fluxuri automate de email", "Integrare CRM", "Analize lunare"],
    is_popular: true,
    cta_text_en: "Get Started",
    cta_text_ro: "Începe acum",
    cta_link: "/contact",
    order: 2,
    isActive: true,
  },
  {
    id: "p3",
    title_en: "Enterprise",
    title_ro: "Personalizat",
    price_monthly: "Custom",
    description_en: "Custom architecture and complex integrations.",
    description_ro: "Arhitectură personalizată și integrări complexe.",
    features_en: ["Dedicated mobile app", "Custom API integrations", "Priority 24/7 support", "Dedicated account manager"],
    features_ro: ["Aplicație mobilă dedicată", "Integrări API personalizate", "Suport prioritar 24/7", "Manager de cont dedicat"],
    is_popular: false,
    cta_text_en: "Contact Us",
    cta_text_ro: "Contactează-ne",
    cta_link: "/contact",
    order: 3,
    isActive: true,
  }
];

export const mockWorkItems: WorkItem[] = [
  {
    id: "w1",
    slug: "luxe-salon",
    title_en: "Luxe Beauty Salon",
    title_ro: "Salonul de Înfrumusețare Luxe",
    client_name: "Luxe Beauty",
    industry_en: "Salons",
    industry_ro: "Saloane",
    description_en: "A complete digital transformation including a custom booking portal that increased appointments by 40%.",
    description_ro: "O transformare digitală completă incluzând un portal de rezervări care a crescut programările cu 40%.",
    image_url: "/placeholder-salon.jpg",
    image_public_id: null,
    image_alt_en: "Luxe Beauty Salon website preview",
    image_alt_ro: "Preview site pentru Luxe Beauty Salon",
    image_width: null,
    image_height: null,
    stats: [
      { label: "Bookings", value: "+40%" },
      { label: "Admin Time", value: "-15h/wk" }
    ],
    is_featured: true,
    order: 1,
    isActive: true,
  },
  {
    id: "w2",
    slug: "medica-clinic",
    title_en: "Medica Health Clinic",
    title_ro: "Clinica Medica",
    client_name: "Medica Health",
    industry_en: "Clinics",
    industry_ro: "Clinici",
    description_en: "Secure patient onboarding and automated reminder pipelines reducing no-shows entirely.",
    description_ro: "Sistem securizat de înregistrare pacienți și mementouri automate care au redus complet neprezentările.",
    image_url: "/placeholder-clinic.jpg",
    image_public_id: null,
    image_alt_en: "Medica Health Clinic operations preview",
    image_alt_ro: "Preview operațiuni pentru Clinica Medica",
    image_width: null,
    image_height: null,
    stats: [
      { label: "No-shows", value: "-95%" },
      { label: "Retention", value: "+22%" }
    ],
    is_featured: true,
    order: 2,
    isActive: true,
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: "f1",
    question_en: "How long does a typical project take?",
    question_ro: "Cât durează un proiect tipic?",
    answer_en: "Most growth packages are implemented within 4 to 6 weeks, depending on the complexity of your workflow integrations.",
    answer_ro: "Majoritatea pachetelor de creștere sunt implementate în 4 până la 6 săptămâni, în funcție de complexitate.",
    category_en: "General",
    category_ro: "General",
    order: 1,
    isActive: true,
  },
  {
    id: "f2",
    question_en: "Do I need technical skills to manage my new system?",
    question_ro: "Am nevoie de abilități tehnice pentru a gestiona noul sistem?",
    answer_en: "Not at all. We build tools that are intuitive for your entire team, and we provide complete training before hand-off.",
    answer_ro: "Deloc. Construim instrumente intuitive pentru întreaga echipă și oferim instruire completă la predare.",
    category_en: "Support",
    category_ro: "Suport",
    order: 2,
    isActive: true,
  }
];

export const mockCompanySettings: CompanySettings = {
  id: "global",
  email: "hello@growonio.com",
  phone: "+40 123 456 789",
  address_en: "123 Innovation Blvd, Tech District",
  address_ro: "Bvd Inovației 123, Districtul Tehnologic",
  social_urls: {
    linkedin: "https://linkedin.com/company/growonio",
    facebook: "https://facebook.com/growonio"
  },
  updated_at: new Date().toISOString()
};
