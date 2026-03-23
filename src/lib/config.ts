function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Growonio",
  tagline: "Business automation built for growth",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://growonio.com"),
  ogImage: null,
  description: "Modern digital solutions for service businesses.",
  companyEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@growonio.com",
  location: {
    city: "Bucharest",
    country: "Romania",
    countryCode: "RO",
  },
  links: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || null,
  },
  locales: ["ro", "en"],
  defaultLocale: "ro",
} as const;

export type SiteConfig = typeof siteConfig;
