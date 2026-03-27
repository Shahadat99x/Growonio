import type { AppLocale } from "@/lib/seo";

type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalPageContent = {
  intro: string;
  sections: LegalSection[];
};

type LegalPageKey = "privacy" | "terms" | "cookies";

const legalContent: Record<AppLocale, Record<LegalPageKey, LegalPageContent>> = {
  en: {
    privacy: {
      intro:
        "Growonio collects only the information needed to respond to inquiries, manage commercial discussions, and operate the website responsibly.",
      sections: [
        {
          heading: "What we collect",
          paragraphs: [
            "When you contact Growonio, we may collect your name, email address, message content, and basic technical information related to the request.",
            "We do not ask for sensitive personal data through the public website.",
          ],
        },
        {
          heading: "Why we use it",
          paragraphs: [
            "We use submitted information to respond to inquiries, evaluate project fit, follow up on requested services, and maintain a record of legitimate business leads.",
          ],
          bullets: [
            "Reply to direct inquiries",
            "Prepare service discussions or quotes",
            "Maintain lead history for operational follow-up",
            "Protect the site against spam or abuse",
          ],
        },
        {
          heading: "Storage and retention",
          paragraphs: [
            "Lead submissions may be stored in Supabase and, when configured, forwarded through Resend for notification delivery.",
            "We retain inquiry data only for as long as it remains relevant for legitimate business communication or legal/operational record keeping.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You may request access, correction, or deletion of your inquiry data by contacting Growonio directly.",
            "For privacy-related requests, email us at hello@growonio.ro.",
          ],
        },
      ],
    },
    terms: {
      intro:
        "This website is provided by Growonio for informational, commercial, and lead-generation purposes. Use of the website implies acceptance of these basic terms.",
      sections: [
        {
          heading: "Service information",
          paragraphs: [
            "Website content is intended to describe Growonio services, positioning, and example capabilities. It does not constitute a binding offer or guarantee until confirmed in a separate commercial agreement.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You agree not to misuse the website, attempt unauthorized access, interfere with the platform, or submit spam, malicious, or misleading inquiries.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Unless stated otherwise, the copy, design, branding, and presentation of this site belong to Growonio and may not be reused in misleading or unauthorized ways.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "Growonio makes reasonable efforts to keep the site accurate and available, but does not guarantee uninterrupted operation or the absence of technical issues.",
            "Nothing on this site creates a client relationship without a separate agreement.",
          ],
        },
      ],
    },
    cookies: {
      intro:
        "Growonio uses a limited cookie and tracking setup focused on essential functionality, locale behavior, and basic analytics when configured.",
      sections: [
        {
          heading: "Essential cookies",
          paragraphs: [
            "Essential cookies may be used to support session handling, authentication for the admin area, and language preference behavior.",
          ],
        },
        {
          heading: "Analytics",
          paragraphs: [
            "If Google Analytics is enabled in the deployment environment, analytics cookies may be used to understand traffic sources, route usage, and overall site performance.",
          ],
        },
        {
          heading: "Third-party services",
          paragraphs: [
            "The site may rely on third-party infrastructure such as Supabase, Cloudinary, Vercel, Google Analytics, and Resend. Those services may process technical request data as part of normal operation.",
          ],
        },
        {
          heading: "Managing cookies",
          paragraphs: [
            "You can control or clear cookies through your browser settings. Disabling some cookies may affect site behavior, especially login or locale handling.",
          ],
        },
      ],
    },
  },
  ro: {
    privacy: {
      intro:
        "Growonio colectează doar informațiile necesare pentru a răspunde solicitărilor, a gestiona discuțiile comerciale și a opera site-ul în mod responsabil.",
      sections: [
        {
          heading: "Ce colectăm",
          paragraphs: [
            "Când contactezi Growonio, putem colecta numele, adresa de email, conținutul mesajului și informații tehnice de bază legate de solicitare.",
            "Nu solicităm date personale sensibile prin intermediul site-ului public.",
          ],
        },
        {
          heading: "De ce folosim aceste date",
          paragraphs: [
            "Folosim informațiile transmise pentru a răspunde solicitărilor, a evalua potrivirea proiectului, a continua discuțiile comerciale și a păstra un istoric legitim al lead-urilor.",
          ],
          bullets: [
            "Răspuns la solicitări directe",
            "Pregătirea discuțiilor comerciale sau a ofertelor",
            "Păstrarea istoricului lead-urilor pentru follow-up operațional",
            "Protejarea site-ului împotriva spamului sau abuzului",
          ],
        },
        {
          heading: "Stocare și retenție",
          paragraphs: [
            "Formularele de contact pot fi stocate în Supabase și, când este configurat, pot fi transmise prin Resend pentru notificare.",
            "Păstrăm datele doar atât timp cât sunt relevante pentru comunicare comercială legitimă sau pentru evidență operațională/legală.",
          ],
        },
        {
          heading: "Drepturile tale",
          paragraphs: [
            "Poți solicita accesul, corectarea sau ștergerea datelor transmise prin formular contactând direct Growonio.",
            "Pentru solicitări legate de confidențialitate, scrie-ne la hello@growonio.ro.",
          ],
        },
      ],
    },
    terms: {
      intro:
        "Acest site este oferit de Growonio în scop informativ, comercial și de generare de lead-uri. Utilizarea site-ului implică acceptarea acestor termeni de bază.",
      sections: [
        {
          heading: "Informații despre servicii",
          paragraphs: [
            "Conținutul site-ului descrie serviciile, poziționarea și exemplele de capabilități Growonio. Nu reprezintă o ofertă contractuală fermă până la confirmarea într-un acord comercial separat.",
          ],
        },
        {
          heading: "Utilizare acceptată",
          paragraphs: [
            "Ești de acord să nu folosești site-ul în mod abuziv, să nu încerci acces neautorizat, să nu interferezi cu platforma și să nu trimiți solicitări spam, malițioase sau înșelătoare.",
          ],
        },
        {
          heading: "Proprietate intelectuală",
          paragraphs: [
            "Cu excepția cazurilor menționate altfel, textele, designul, brandingul și prezentarea acestui site aparțin Growonio și nu pot fi reutilizate în mod înșelător sau neautorizat.",
          ],
        },
        {
          heading: "Răspundere",
          paragraphs: [
            "Growonio depune eforturi rezonabile pentru a menține site-ul corect și disponibil, dar nu garantează funcționarea neîntreruptă sau absența problemelor tehnice.",
            "Nimic de pe acest site nu creează o relație contractuală cu clientul fără un acord separat.",
          ],
        },
      ],
    },
    cookies: {
      intro:
        "Growonio folosește un set limitat de cookie-uri și tehnologii similare pentru funcționalitate esențială, comportament de limbă și analitice de bază atunci când sunt configurate.",
      sections: [
        {
          heading: "Cookie-uri esențiale",
          paragraphs: [
            "Cookie-urile esențiale pot fi utilizate pentru sesiuni, autentificarea în zona de admin și comportamentul preferinței de limbă.",
          ],
        },
        {
          heading: "Analitice",
          paragraphs: [
            "Dacă Google Analytics este activ în mediul de producție, pot fi utilizate cookie-uri de analiză pentru a înțelege sursele de trafic, utilizarea rutelor și performanța generală a site-ului.",
          ],
        },
        {
          heading: "Servicii terțe",
          paragraphs: [
            "Site-ul poate folosi infrastructură terță precum Supabase, Cloudinary, Vercel, Google Analytics și Resend. Aceste servicii pot procesa date tehnice de request ca parte a funcționării normale.",
          ],
        },
        {
          heading: "Gestionarea cookie-urilor",
          paragraphs: [
            "Poți controla sau șterge cookie-urile din setările browserului. Dezactivarea unora dintre ele poate afecta comportamentul site-ului, în special autentificarea sau schimbarea limbii.",
          ],
        },
      ],
    },
  },
};

export function getLegalContent(locale: AppLocale, page: LegalPageKey) {
  return legalContent[locale][page];
}
