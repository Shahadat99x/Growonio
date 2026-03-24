import { createPublicClient } from './supabase/server';
import { 
  LocalizedService, 
  LocalizedPricingPackage, 
  LocalizedWorkItem, 
  LocalizedWorkItemGalleryItem,
  LocalizedFAQItem,
  LocalizedArticle,
} from "@/types/content";

/**
 * Generic mapping function to resolve `_en` vs `_ro` properties.
 * Strips the language suffix and assigns it to the base key.
 */
function localizeEntity<T extends Record<string, unknown>>(
  entity: T,
  locale: string,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...entity };
  const targetSuffix = `_${locale}`;
  
  for (const key of Object.keys(entity)) {
    if (key.endsWith("_en") || key.endsWith("_ro")) {
      if (key.endsWith(targetSuffix)) {
        const baseKey = key.replace(targetSuffix, "");
        result[baseKey] = entity[key as keyof T];
      }
      delete result[key];
    }
  }
  
  // Normalize SQL snake_case BaseEntity to TS camelCase BaseEntity for UI
  if ('sort_order' in result) {
    result.order = result.sort_order;
    delete result.sort_order;
  }
  if ('is_active' in result) {
    result.isActive = result.is_active;
    delete result.is_active;
  }
  
  return result;
}

function localizeWorkItemGallery(
  galleryItems: Record<string, unknown>[] | null | undefined,
  locale: string,
): LocalizedWorkItemGalleryItem[] {
  if (!Array.isArray(galleryItems)) {
    return [];
  }

  return galleryItems
    .slice()
    .sort(
      (left, right) =>
        Number((left.sort_order as number | null | undefined) ?? 0) -
        Number((right.sort_order as number | null | undefined) ?? 0),
    )
    .map((item) => {
      const localized = { ...item } as Record<string, unknown>;
      const altKey = locale === "ro" ? "alt_ro" : "alt_en";

      localized.alt = (item[altKey] as string | null | undefined) ?? null;
      delete localized.alt_en;
      delete localized.alt_ro;

      return localized as unknown as LocalizedWorkItemGalleryItem;
    });
}

export async function getServices(locale: string = "en"): Promise<LocalizedService[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map((s) => localizeEntity(s, locale) as unknown as LocalizedService);
  } catch (err) {
    console.error("Failed to fetch services:", err);
    return [];
  }
}

export async function getPricingPackages(locale: string = "en"): Promise<LocalizedPricingPackage[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map((p) => localizeEntity(p, locale) as unknown as LocalizedPricingPackage);
  } catch (err) {
    console.error("Failed to fetch pricing_packages:", err);
    return [];
  }
}

export async function getWorkItems(locale: string = "en"): Promise<LocalizedWorkItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('work_items')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map((w) => localizeEntity(w, locale) as unknown as LocalizedWorkItem);
  } catch (err) {
    console.error("Failed to fetch work_items:", err);
    return [];
  }
}

export async function getWorkItemBySlug(
  slug: string,
  locale: string = "en",
): Promise<LocalizedWorkItem | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("work_items")
      .select("*, work_item_gallery(*)")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error) throw error;
    if (!data) return null;

    const localized = localizeEntity(data, locale) as Record<string, unknown>;
    localized.gallery_items = localizeWorkItemGallery(
      data.work_item_gallery as Record<string, unknown>[] | undefined,
      locale,
    );
    delete localized.work_item_gallery;

    return localized as unknown as LocalizedWorkItem;
  } catch (err) {
    console.error("Failed to fetch work item by slug:", err);
    return null;
  }
}

export async function getFeaturedWorkItems(locale: string = "en"): Promise<LocalizedWorkItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('work_items')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map((w) => localizeEntity(w, locale) as unknown as LocalizedWorkItem);
  } catch (err) {
    console.error("Failed to fetch featured work_items:", err);
    return [];
  }
}

export async function getFAQs(locale: string = "en"): Promise<LocalizedFAQItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map((f) => localizeEntity(f, locale) as unknown as LocalizedFAQItem);
  } catch (err) {
    console.error("Failed to fetch faqs:", err);
    return [];
  }
}

export async function getCompanySettings(locale: string = "en") {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .limit(1)
      .single();
      
    if (error) throw error;
    
    return localizeEntity(data || {}, locale) as unknown as Record<string, unknown>;
  } catch (err) {
    console.error("Failed to fetch company_settings:", err);
    return null;
  }
}

export async function getPublishedArticles(locale: string = "en"): Promise<LocalizedArticle[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((a) => localizeEntity(a, locale) as unknown as LocalizedArticle);
  } catch (err) {
    console.error("Failed to fetch published articles:", err);
    return [];
  }
}

export async function getFeaturedArticles(locale: string = "en"): Promise<LocalizedArticle[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) throw error;

    return (data || []).map((a) => localizeEntity(a, locale) as unknown as LocalizedArticle);
  } catch (err) {
    console.error("Failed to fetch featured articles:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string, locale: string = "en"): Promise<LocalizedArticle | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .single();

    if (error) throw error;
    if (!data) return null;

    return localizeEntity(data, locale) as unknown as LocalizedArticle;
  } catch (err) {
    console.error("Failed to fetch article by slug:", err);
    return null;
  }
}
