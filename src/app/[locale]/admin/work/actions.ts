"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteWorkItemAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("work_items").delete().eq("id", id);
  
  revalidatePath("/admin/work");
  revalidatePath("/[locale]/work", "layout");
}

export async function saveWorkItemAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const locale = formData.get("locale") as string || "en";
  
  const statsStr = formData.get("stats_str") as string;
  let parsedStats: { label: string, value: string }[] = [];
  
  if (statsStr) {
    parsedStats = statsStr.split('\n')
      .map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
        }
        return null;
      })
      .filter(Boolean) as { label: string, value: string }[];
  }

  const payload = {
    slug: formData.get("slug") as string,
    title_en: formData.get("title_en") as string,
    title_ro: formData.get("title_ro") as string,
    client_name: formData.get("client_name") as string,
    industry_en: formData.get("industry_en") as string,
    industry_ro: formData.get("industry_ro") as string,
    description_en: formData.get("description_en") as string,
    description_ro: formData.get("description_ro") as string,
    image_url: formData.get("image_url") as string,
    stats: parsedStats,
    is_featured: formData.get("is_featured") === "on",
    sort_order: parseInt(formData.get("sort_order") as string || "0"),
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.title_en || !payload.title_ro || !payload.slug) {
    return { error: "Titles and Slug are required." };
  }

  let dbError;
  if (id === "new") {
    const { error } = await supabase.from("work_items").insert(payload);
    dbError = error;
  } else {
    const { error } = await supabase.from("work_items").update(payload).eq("id", id);
    dbError = error;
  }

  if (dbError) {
    return { error: dbError.message };
  }

  revalidatePath("/admin/work");
  revalidatePath("/[locale]/work", "layout");
  
  redirect(`/${locale}/admin/work`);
}
