export const siteConfig = {
  name: "Growonio",
  tagline: "Business automation built for growth",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://growonio.com",
  ogImage: "/og.jpg",
  description: "Modern digital solutions for service businesses.",
  links: {
    whatsapp: "https://wa.me/your-number",
  },
  locales: ["ro", "en"],
  defaultLocale: "ro",
} as const;

export type SiteConfig = typeof siteConfig;
