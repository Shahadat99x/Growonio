import { createClient } from './supabase/server';
import { 
  LocalizedService, 
  LocalizedPricingPackage, 
  LocalizedWorkItem, 
  LocalizedFAQItem,
  LocalizedArticle,
} from "@/types/content";

/**
 * Generic mapping function to resolve `_en` vs `_ro` properties.
 * Strips the language suffix and assigns it to the base key.
 */
function localizeEntity<T extends Record<string, any>>(entity: T, locale: string): any {
  const result: any = { ...entity };
  const targetSuffix = `_${locale}`;
  
  for (const key of Object.keys(entity)) {
    if (key.endsWith("_en") || key.endsWith("_ro")) {
      if (key.endsWith(targetSuffix)) {
        const baseKey = key.replace(targetSuffix, "");
        result[baseKey] = entity[key];
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

export async function getServices(locale: string = "en"): Promise<LocalizedService[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map(s => localizeEntity(s, locale) as LocalizedService);
  } catch (err) {
    console.error("Failed to fetch services:", err);
    return [];
  }
}

export async function getPricingPackages(locale: string = "en"): Promise<LocalizedPricingPackage[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map(p => localizeEntity(p, locale) as LocalizedPricingPackage);
  } catch (err) {
    console.error("Failed to fetch pricing_packages:", err);
    return [];
  }
}

export async function getWorkItems(locale: string = "en"): Promise<LocalizedWorkItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('work_items')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map(w => localizeEntity(w, locale) as LocalizedWorkItem);
  } catch (err) {
    console.error("Failed to fetch work_items:", err);
    return [];
  }
}

export async function getFeaturedWorkItems(locale: string = "en"): Promise<LocalizedWorkItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('work_items')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map(w => localizeEntity(w, locale) as LocalizedWorkItem);
  } catch (err) {
    console.error("Failed to fetch featured work_items:", err);
    return [];
  }
}

export async function getFAQs(locale: string = "en"): Promise<LocalizedFAQItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map(f => localizeEntity(f, locale) as LocalizedFAQItem);
  } catch (err) {
    console.error("Failed to fetch faqs:", err);
    return [];
  }
}

export async function getCompanySettings(locale: string = "en") {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .limit(1)
      .single();
      
    if (error) throw error;
    
    return localizeEntity(data || {}, locale);
  } catch (err) {
    console.error("Failed to fetch company_settings:", err);
    return null;
  }
}

export async function getPublishedArticles(locale: string = "en"): Promise<LocalizedArticle[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(a => localizeEntity(a, locale) as LocalizedArticle);
  } catch (err) {
    console.error("Failed to fetch published articles:", err);
    return [];
  }
}

export async function getFeaturedArticles(locale: string = "en"): Promise<LocalizedArticle[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) throw error;

    return (data || []).map(a => localizeEntity(a, locale) as LocalizedArticle);
  } catch (err) {
    console.error("Failed to fetch featured articles:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string, locale: string = "en"): Promise<LocalizedArticle | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    if (!data) return null;

    return localizeEntity(data, locale) as LocalizedArticle;
  } catch (err) {
    console.error("Failed to fetch article by slug:", err);
    return null;
  }
}
