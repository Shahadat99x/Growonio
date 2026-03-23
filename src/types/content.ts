/**
 * Base TypeScript Interfaces for the Content Layer.
 * These map 1:1 with the underlying Database / Mock structures.
 */

export interface BaseEntity {
  id: string;
  order: number;
  isActive: boolean;
}

export interface Service extends BaseEntity {
  slug: string;
  title_en: string;
  title_ro: string;
  description_en: string;
  description_ro: string;
  icon_name: string;
}

export interface PricingPackage extends BaseEntity {
  title_en: string;
  title_ro: string;
  price_monthly: string;
  description_en: string;
  description_ro: string;
  features_en: string[];
  features_ro: string[];
  is_popular: boolean;
  cta_text_en: string;
  cta_text_ro: string;
  cta_link: string;
}

export interface WorkItem extends BaseEntity {
  slug: string;
  title_en: string;
  title_ro: string;
  client_name: string;
  industry_en: string;
  industry_ro: string;
  description_en: string;
  description_ro: string;
  image_url: string | null;
  image_public_id: string | null;
  image_alt_en: string | null;
  image_alt_ro: string | null;
  image_width: number | null;
  image_height: number | null;
  stats: { label: string; value: string }[];
  is_featured: boolean;
}

export interface FAQItem extends BaseEntity {
  question_en: string;
  question_ro: string;
  answer_en: string;
  answer_ro: string;
  category_en?: string;
  category_ro?: string;
}

export interface CompanySettings {
  id: string;
  email: string;
  phone: string;
  address_en: string;
  address_ro: string;
  social_urls: Record<string, string>;
  updated_at: string;
}

/**
 * Localized Projection Types
 * These are the objects actually passed down to the localized React Components
 * after resolving `_en` vs `_ro` fields.
 */

export type Localized<T> = {
  // strips out all keys ending in _en or _ro and replaces them with a single localized key.
  // Done dynamically in the mapping layer.
  [K in keyof T as K extends `${string}_en` | `${string}_ro`
    ? never 
    : K
  ]: T[K];
} & {
  // A generic property map added at runtime
  [key: string]: unknown;
};

// Example projection result:
export interface LocalizedService {
  id: string;
  order: number;
  isActive: boolean;
  slug: string;
  title: string;
  description: string;
  icon_name: string;
}

export interface LocalizedFAQItem {
  id: string;
  order: number;
  isActive: boolean;
  question: string;
  answer: string;
  category?: string;
}

export interface LocalizedWorkItem {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  industry: string;
  description: string;
  image_url: string | null;
  image_public_id: string | null;
  image_alt: string | null;
  image_width: number | null;
  image_height: number | null;
  stats: { label: string; value: string }[];
  is_featured: boolean;
  order: number;
  isActive: boolean;
}

export interface LocalizedPricingPackage {
  id: string;
  title: string;
  price_monthly: string;
  description: string;
  features: string[];
  is_popular: boolean;
  cta_text: string;
  cta_link: string;
  order: number;
  isActive: boolean;
}

export interface Article {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  title_en: string;
  title_ro: string;
  excerpt_en: string;
  excerpt_ro: string;
  content_en: string;
  content_ro: string;
  seo_title_en: string | null;
  seo_title_ro: string | null;
  seo_description_en: string | null;
  seo_description_ro: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  cover_image_alt_en: string | null;
  cover_image_alt_ro: string | null;
  cover_image_width: number | null;
  cover_image_height: number | null;
  author_name: string | null;
  category: string | null;
  tags: string[];
  reading_time: number;
}

export interface LocalizedArticle {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  title: string;
  excerpt: string;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  cover_image_alt: string | null;
  cover_image_width: number | null;
  cover_image_height: number | null;
  author_name: string | null;
  category: string | null;
  tags: string[];
  reading_time: number;
}
