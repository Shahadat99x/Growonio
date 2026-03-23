"use server";

import { requireAdminClient } from "@/lib/admin-auth";
import { hasSupabaseAdminEnv, missingSupabaseAdminConfigMessage } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteServiceAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  if (!hasSupabaseAdminEnv()) return;

  const supabase = await requireAdminClient();
  await supabase.from("services").delete().eq("id", id);
  
  revalidatePath("/admin/services");
  // Also revalidate public pages
  revalidatePath("/[locale]/services", "layout");
}

export async function saveServiceAction(formData: FormData) {
  if (!hasSupabaseAdminEnv()) {
    return { error: missingSupabaseAdminConfigMessage };
  }

  const supabase = await requireAdminClient();
  const id = formData.get("id") as string;
  const locale = formData.get("locale") as string || "en";
  
  const payload = {
    slug: formData.get("slug") as string,
    title_en: formData.get("title_en") as string,
    title_ro: formData.get("title_ro") as string,
    description_en: formData.get("description_en") as string,
    description_ro: formData.get("description_ro") as string,
    icon_name: formData.get("icon_name") as string,
    sort_order: parseInt(formData.get("sort_order") as string || "0"),
    is_active: formData.get("is_active") === "on",
  };

  // Basic validation
  if (!payload.slug || !payload.title_en || !payload.title_ro) {
    return { error: "Slug and Titles are required." };
  }

  let dbError;
  if (id === "new") {
    const { error } = await supabase.from("services").insert(payload);
    dbError = error;
  } else {
    const { error } = await supabase.from("services").update(payload).eq("id", id);
    dbError = error;
  }

  if (dbError) {
    return { error: dbError.message };
  }

  revalidatePath("/admin/services");
  revalidatePath("/[locale]/services", "layout");
  
  redirect(`/${locale}/admin/services`);
}
