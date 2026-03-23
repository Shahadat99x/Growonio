import { 
  mockServices, 
  mockPricingPackages, 
  mockWorkItems, 
  mockFAQs, 
  mockCompanySettings 
} from "./data/mock";
import { 
  LocalizedService, 
  LocalizedPricingPackage, 
  LocalizedWorkItem, 
  LocalizedFAQItem,
} from "@/types/content";

/**
 * Generic mapping function to resolve `_en` vs `_ro` properties.
 * Strips the language suffix and assigns it to the base key.
 */
function localizeEntity<T extends Record<string, any>>(entity: T, locale: string): any {
  const result: any = { ...entity };
  const targetSuffix = `_${locale}`;
  
  // Example: if locale is 'en', we want to keep property_en as property, and delete property_ro.
  for (const key of Object.keys(entity)) {
    if (key.endsWith("_en") || key.endsWith("_ro")) {
      if (key.endsWith(targetSuffix)) {
        const baseKey = key.replace(targetSuffix, "");
        result[baseKey] = entity[key];
      }
      delete result[key];
    }
  }
  
  return result;
}

export async function getServices(locale: string = "en"): Promise<LocalizedService[]> {
  // Simulate DB fetch
  const activeServices = mockServices.filter(s => s.isActive).sort((a, b) => a.order - b.order);
  return activeServices.map(s => localizeEntity(s, locale) as LocalizedService);
}

export async function getPricingPackages(locale: string = "en"): Promise<LocalizedPricingPackage[]> {
  const activePackages = mockPricingPackages.filter(p => p.isActive).sort((a, b) => a.order - b.order);
  return activePackages.map(p => localizeEntity(p, locale) as LocalizedPricingPackage);
}

export async function getWorkItems(locale: string = "en"): Promise<LocalizedWorkItem[]> {
  const activeWork = mockWorkItems.filter(w => w.isActive).sort((a, b) => a.order - b.order);
  return activeWork.map(w => localizeEntity(w, locale) as LocalizedWorkItem);
}

export async function getFeaturedWorkItems(locale: string = "en"): Promise<LocalizedWorkItem[]> {
  const activeWork = mockWorkItems.filter(w => w.isActive && w.is_featured).sort((a, b) => a.order - b.order);
  return activeWork.map(w => localizeEntity(w, locale) as LocalizedWorkItem);
}

export async function getFAQs(locale: string = "en"): Promise<LocalizedFAQItem[]> {
  const activeFAQs = mockFAQs.filter(f => f.isActive).sort((a, b) => a.order - b.order);
  return activeFAQs.map(f => localizeEntity(f, locale) as LocalizedFAQItem);
}

export async function getCompanySettings(locale: string = "en") {
  return localizeEntity(mockCompanySettings, locale);
}
