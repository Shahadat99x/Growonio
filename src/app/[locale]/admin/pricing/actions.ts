"use server";

import { requireAdminClient } from "@/lib/admin-auth";
import { hasSupabaseAdminEnv, missingSupabaseAdminConfigMessage } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePricingPackageAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  if (!hasSupabaseAdminEnv()) return;

  const supabase = await requireAdminClient();
  await supabase.from("pricing_packages").delete().eq("id", id);
  
  revalidatePath("/admin/pricing");
  revalidatePath("/[locale]/pricing", "layout");
}

export async function savePricingPackageAction(formData: FormData) {
  if (!hasSupabaseAdminEnv()) {
    return { error: missingSupabaseAdminConfigMessage };
  }

  const supabase = await requireAdminClient();
  const id = formData.get("id") as string;
  const locale = formData.get("locale") as string || "en";
  
  const features_en_str = formData.get("features_en") as string;
  const features_ro_str = formData.get("features_ro") as string;

  const payload = {
    title_en: formData.get("title_en") as string,
    title_ro: formData.get("title_ro") as string,
    price_monthly: formData.get("price_monthly") as string,
    description_en: formData.get("description_en") as string,
    description_ro: formData.get("description_ro") as string,
    cta_text_en: formData.get("cta_text_en") as string,
    cta_text_ro: formData.get("cta_text_ro") as string,
    cta_link: formData.get("cta_link") as string,
    features_en: features_en_str ? features_en_str.split("\n").map(s => s.trim()).filter(Boolean) : [],
    features_ro: features_ro_str ? features_ro_str.split("\n").map(s => s.trim()).filter(Boolean) : [],
    sort_order: parseInt(formData.get("sort_order") as string || "0"),
    is_active: formData.get("is_active") === "on",
    is_popular: formData.get("is_popular") === "on",
  };

  if (!payload.title_en || !payload.title_ro || !payload.price_monthly) {
    return { error: "Titles and Price are required." };
  }

  let dbError;
  if (id === "new") {
    const { error } = await supabase.from("pricing_packages").insert(payload);
    dbError = error;
  } else {
    const { error } = await supabase.from("pricing_packages").update(payload).eq("id", id);
    dbError = error;
  }

  if (dbError) {
    return { error: dbError.message };
  }

  revalidatePath("/admin/pricing");
  revalidatePath("/[locale]/pricing", "layout");
  
  redirect(`/${locale}/admin/pricing`);
}
