import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import type {
  LocalizedArticle,
  LocalizedFAQItem,
  LocalizedService,
  LocalizedWorkItem,
} from "@/types/content";

export type AppLocale = (typeof routing.locales)[number];

type SeoImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

type BuildPageMetadataInput = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
  image?: SeoImage;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  authors?: string[];
  section?: string | null;
  tags?: string[];
};

type BreadcrumbItem = {
  name: string;
  pathname: string;
};

function getLocalePrefixMode(): "always" | "as-needed" | "never" {
  const mode = (routing as { localePrefix?: { mode?: string } }).localePrefix?.mode;
  if (mode === "as-needed" || mode === "never") {
    return mode;
  }

  return "always";
}

function normalizePathname(pathname: string) {
  if (!pathname) {
    return "/";
  }

  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (withLeadingSlash !== "/" && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1);
  }

  return withLeadingSlash;
}

export function getLocalePath(locale: AppLocale, pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  const prefixMode = getLocalePrefixMode();

  if (prefixMode === "never") {
    return normalizedPathname;
  }

  const shouldPrefix =
    prefixMode === "always" || locale !== routing.defaultLocale;
  const localePrefix = shouldPrefix ? `/${locale}` : "";

  return normalizedPathname === "/"
    ? localePrefix || "/"
    : `${localePrefix}${normalizedPathname}`;
}

export function getAbsoluteUrl(pathname: string) {
  return new URL(normalizePathname(pathname), siteConfig.url).toString();
}

export function getLocaleAbsoluteUrl(locale: AppLocale, pathname: string) {
  return getAbsoluteUrl(getLocalePath(locale, pathname));
}

function getLocaleMetadata(locale: AppLocale) {
  if (locale === "ro") {
    return {
      hreflang: "ro-RO",
      openGraphLocale: "ro_RO",
      alternateOpenGraphLocale: "en_US",
      organizationDescription:
        "Growonio ajuta afacerile de servicii din Romania sa creasca prin automatizare, website-uri performante si fluxuri digitale practice.",
      websiteDescription:
        "Solutii digitale premium pentru afaceri de servicii care vor crestere sustenabila in Romania.",
    };
  }

  return {
    hreflang: "en-US",
    openGraphLocale: "en_US",
    alternateOpenGraphLocale: "ro_RO",
    organizationDescription:
      "Growonio helps service businesses in Romania grow through business automation, conversion-focused websites, and practical digital systems.",
    websiteDescription:
      "Premium digital growth systems for service businesses operating in Romania and beyond.",
  };
}

export function getLanguageAlternates(pathname: string) {
  return {
    "ro-RO": getLocaleAbsoluteUrl("ro", pathname),
    "en-US": getLocaleAbsoluteUrl("en", pathname),
    "x-default": getLocaleAbsoluteUrl(routing.defaultLocale as AppLocale, pathname),
  };
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  image,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: BuildPageMetadataInput): Metadata {
  const localeMeta = getLocaleMetadata(locale);
  const canonicalUrl = getLocaleAbsoluteUrl(locale, pathname);
  const images = image ? [image] : undefined;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(pathname),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: localeMeta.openGraphLocale,
      alternateLocale: [localeMeta.alternateOpenGraphLocale],
      type,
      images,
      ...(type === "article"
        ? {
            publishedTime: publishedTime ?? undefined,
            modifiedTime: modifiedTime ?? undefined,
            authors,
            section: section ?? undefined,
            tags,
          }
        : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}

export function buildOrganizationSchema(locale: AppLocale) {
  const localeMeta = getLocaleMetadata(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getAbsoluteUrl("/")}#organization`,
    name: siteConfig.name,
    url: getAbsoluteUrl("/"),
    email: siteConfig.companyEmail,
    slogan: siteConfig.tagline,
    description: localeMeta.organizationDescription,
    areaServed: {
      "@type": "Country",
      name: siteConfig.location.country,
    },
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.companyEmail,
        areaServed: siteConfig.location.country,
        availableLanguage: ["Romanian", "English"],
      },
    ],
  };
}

export function buildWebsiteSchema(locale: AppLocale) {
  const localeMeta = getLocaleMetadata(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getAbsoluteUrl("/")}#website`,
    name: siteConfig.name,
    url: getLocaleAbsoluteUrl(locale, "/"),
    inLanguage: localeMeta.hreflang,
    description: localeMeta.websiteDescription,
    publisher: {
      "@id": `${getAbsoluteUrl("/")}#organization`,
    },
  };
}

export function buildServiceListSchema(
  locale: AppLocale,
  services: LocalizedService[],
) {
  if (services.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "ro" ? "Servicii Growonio" : "Growonio Services",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        "@id": `${getAbsoluteUrl("/")}#organization`,
      },
      areaServed: siteConfig.location.country,
      url: getLocaleAbsoluteUrl(locale, "/services"),
    })),
  };
}

export function buildWorkItemListSchema(
  locale: AppLocale,
  workItems: LocalizedWorkItem[],
) {
  if (workItems.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "ro" ? "Studii de caz Growonio" : "Growonio Case Studies",
    itemListElement: workItems.map((workItem, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: workItem.title,
      description: workItem.overview || workItem.description,
      creator: {
        "@id": `${getAbsoluteUrl("/")}#organization`,
      },
      image: workItem.image_url ? [getAbsoluteUrl(workItem.image_url)] : undefined,
      url: getLocaleAbsoluteUrl(locale, `/work/${workItem.slug}`),
    })),
  };
}

export function buildWorkItemSchema(
  locale: AppLocale,
  workItem: LocalizedWorkItem,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: workItem.title,
    description: workItem.overview || workItem.description,
    url: getLocaleAbsoluteUrl(locale, `/work/${workItem.slug}`),
    inLanguage: getLocaleMetadata(locale).hreflang,
    image: workItem.image_url ? [getAbsoluteUrl(workItem.image_url)] : undefined,
    about: workItem.industry || undefined,
    keywords:
      workItem.features && workItem.features.length > 0
        ? workItem.features.join(", ")
        : undefined,
    creator: {
      "@id": `${getAbsoluteUrl("/")}#organization`,
    },
  };
}

export function buildFAQSchema(locale: AppLocale, faqs: LocalizedFAQItem[]) {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: getLocaleMetadata(locale).hreflang,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBlogSchema(
  locale: AppLocale,
  articles: Pick<LocalizedArticle, "slug" | "title">[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${getAbsoluteUrl("/insights")}#blog`,
    name: locale === "ro" ? "Articole Growonio" : "Growonio Insights",
    url: getLocaleAbsoluteUrl(locale, "/insights"),
    inLanguage: getLocaleMetadata(locale).hreflang,
    publisher: {
      "@id": `${getAbsoluteUrl("/")}#organization`,
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: getLocaleAbsoluteUrl(locale, `/insights/${article.slug}`),
    })),
  };
}

export function buildArticleSchema(
  locale: AppLocale,
  article: LocalizedArticle,
) {
  const image = article.cover_image_url
    ? getAbsoluteUrl(article.cover_image_url)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    url: getLocaleAbsoluteUrl(locale, `/insights/${article.slug}`),
    mainEntityOfPage: getLocaleAbsoluteUrl(locale, `/insights/${article.slug}`),
    inLanguage: getLocaleMetadata(locale).hreflang,
    image: image ? [image] : undefined,
    datePublished: article.published_at ?? undefined,
    dateModified: article.updated_at,
    articleSection: article.category ?? undefined,
    keywords: article.tags.length > 0 ? article.tags.join(", ") : undefined,
    author: {
      "@type": "Person",
      name: article.author_name || siteConfig.name,
    },
    publisher: {
      "@id": `${getAbsoluteUrl("/")}#organization`,
    },
  };
}

export function buildBreadcrumbSchema(
  locale: AppLocale,
  items: BreadcrumbItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getLocaleAbsoluteUrl(locale, item.pathname),
    })),
  };
}
