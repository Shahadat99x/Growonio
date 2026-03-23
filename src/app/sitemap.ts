import type { MetadataRoute } from "next";

import { createPublicClient } from "@/lib/supabase/server";
import { getLanguageAlternates, getLocaleAbsoluteUrl } from "@/lib/seo";

const staticRoutes: Array<{
  pathname: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { pathname: "/", changeFrequency: "weekly", priority: 1 },
  { pathname: "/services", changeFrequency: "monthly", priority: 0.9 },
  { pathname: "/pricing", changeFrequency: "monthly", priority: 0.85 },
  { pathname: "/solutions", changeFrequency: "monthly", priority: 0.85 },
  { pathname: "/work", changeFrequency: "weekly", priority: 0.8 },
  { pathname: "/about", changeFrequency: "monthly", priority: 0.6 },
  { pathname: "/faq", changeFrequency: "weekly", priority: 0.7 },
  { pathname: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { pathname: "/insights", changeFrequency: "weekly", priority: 0.75 },
  { pathname: "/legal/privacy", changeFrequency: "yearly", priority: 0.2 },
  { pathname: "/legal/terms", changeFrequency: "yearly", priority: 0.2 },
  { pathname: "/legal/cookies", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: getLocaleAbsoluteUrl("ro", route.pathname),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: getLanguageAlternates(route.pathname),
    },
  }));

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("articles")
      .select("slug, updated_at, published_at, cover_image_url, status")
      .eq("status", "published")
      .lte("published_at", now.toISOString())
      .order("published_at", { ascending: false });

    if (error) {
      throw error;
    }

    for (const article of data ?? []) {
      const pathname = `/insights/${article.slug}`;
      entries.push({
        url: getLocaleAbsoluteUrl("ro", pathname),
        lastModified: article.updated_at ?? article.published_at ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: getLanguageAlternates(pathname),
        },
        images: article.cover_image_url ? [article.cover_image_url] : undefined,
      });
    }
  } catch (error) {
    console.error("Failed to generate article sitemap entries:", error);
  }

  return entries;
}
