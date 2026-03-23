export const siteConfig = {
  name: "Growonio",
  tagline: "Business automation built for growth",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://growonio.com",
  ogImage: null,
  description: "Modern digital solutions for service businesses.",
  companyEmail: "hello@growonio.com",
  location: {
    city: "Bucharest",
    country: "Romania",
    countryCode: "RO",
  },
  links: {
    whatsapp: "https://wa.me/your-number",
  },
  locales: ["ro", "en"],
  defaultLocale: "ro",
} as const;

export type SiteConfig = typeof siteConfig;
