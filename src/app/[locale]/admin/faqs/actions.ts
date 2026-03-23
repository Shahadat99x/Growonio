"use server";

import { createClient, hasSupabaseEnv, missingSupabaseConfigMessage } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteFAQAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  if (!hasSupabaseEnv()) return;

  const supabase = await createClient();
  await supabase.from("faqs").delete().eq("id", id);
  
  revalidatePath("/admin/faqs");
  revalidatePath("/[locale]/faq", "layout");
}

export async function saveFAQAction(prevState: any, formData: FormData) {
  if (!hasSupabaseEnv()) {
    return { error: missingSupabaseConfigMessage };
  }

  const supabase = await createClient();
  const id = formData.get("id") as string;
  const locale = formData.get("locale") as string || "en";
  
  const payload = {
    question_en: formData.get("question_en") as string,
    question_ro: formData.get("question_ro") as string,
    answer_en: formData.get("answer_en") as string,
    answer_ro: formData.get("answer_ro") as string,
    category_en: formData.get("category_en") as string,
    category_ro: formData.get("category_ro") as string,
    sort_order: parseInt(formData.get("sort_order") as string || "0"),
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.question_en || !payload.question_ro || !payload.answer_en || !payload.answer_ro) {
    return { error: "Questions and Answers are required." };
  }

  let dbError;
  if (id === "new") {
    const { error } = await supabase.from("faqs").insert(payload);
    dbError = error;
  } else {
    const { error } = await supabase.from("faqs").update(payload).eq("id", id);
    dbError = error;
  }

  if (dbError) {
    return { error: dbError.message };
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/[locale]/faq", "layout");
  
  redirect(`/${locale}/admin/faqs`);
}
