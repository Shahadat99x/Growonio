import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";

function isProductionEnvironment() {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }

  return process.env.NODE_ENV === "production";
}

export default function robots(): MetadataRoute.Robots {
  if (!isProductionEnvironment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteConfig.url}/sitemap.xml`,
      host: new URL(siteConfig.url).host,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/ro/admin",
        "/en/admin",
        "/login",
        "/ro/login",
        "/en/login",
        "/api/",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: new URL(siteConfig.url).host,
  };
}
