"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminClient } from "@/lib/admin-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export type ArticleFormState = {
  error: string | null;
};

function normalizeOptionalText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function parseOptionalInteger(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseTags(tagsString: string | null) {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function deleteArticleAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  try {
    const supabase = await requireAdminClient();
    const { data: existing } = await supabase
      .from("articles")
      .select("cover_image_public_id")
      .eq("id", id)
      .single();

    await supabase.from("articles").delete().eq("id", id);

    if (existing?.cover_image_public_id) {
      try {
        await deleteCloudinaryAsset(existing.cover_image_public_id);
      } catch (error) {
        console.error("Failed to remove Cloudinary asset during article deletion:", error);
      }
    }
  } catch (error) {
    console.error("Failed to delete article:", error);
    return;
  }

  revalidatePath("/admin/articles");
  revalidatePath("/[locale]/insights", "layout");
}

export async function saveArticleAction(
  _prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const supabase = await requireAdminClient();
  const id = formData.get("id") as string;
  const locale = (formData.get("locale") as string) || "en";
  const isNew = id === "new";

  const coverImageUrl = normalizeOptionalText(formData.get("cover_image_url"));
  const coverImagePublicId = coverImageUrl ? normalizeOptionalText(formData.get("cover_image_public_id")) : null;
  const coverImageWidth = coverImageUrl ? parseOptionalInteger(formData.get("cover_image_width")) : null;
  const coverImageHeight = coverImageUrl ? parseOptionalInteger(formData.get("cover_image_height")) : null;

  let existingCoverPublicId: string | null = null;

  if (!isNew) {
    const { data: existing, error: existingError } = await supabase
      .from("articles")
      .select("cover_image_public_id")
      .eq("id", id)
      .single();

    if (existingError) {
      return { error: existingError.message };
    }

    existingCoverPublicId = existing?.cover_image_public_id ?? null;
  }

  const status = (formData.get("status") as string) || "draft";
  const publishedAtRaw = normalizeOptionalText(formData.get("published_at"));

  const payload = {
    slug: (formData.get("slug") as string)?.trim(),
    status,
    is_featured: formData.get("is_featured") === "on",
    published_at: status === "published" ? (publishedAtRaw || new Date().toISOString()) : null,
    title_en: (formData.get("title_en") as string)?.trim(),
    title_ro: (formData.get("title_ro") as string)?.trim(),
    excerpt_en: (formData.get("excerpt_en") as string)?.trim() || "",
    excerpt_ro: (formData.get("excerpt_ro") as string)?.trim() || "",
    content_en: (formData.get("content_en") as string) || "",
    content_ro: (formData.get("content_ro") as string) || "",
    seo_title_en: normalizeOptionalText(formData.get("seo_title_en")),
    seo_title_ro: normalizeOptionalText(formData.get("seo_title_ro")),
    seo_description_en: normalizeOptionalText(formData.get("seo_description_en")),
    seo_description_ro: normalizeOptionalText(formData.get("seo_description_ro")),
    cover_image_url: coverImageUrl,
    cover_image_public_id: coverImagePublicId,
    cover_image_alt_en: coverImageUrl ? normalizeOptionalText(formData.get("cover_image_alt_en")) : null,
    cover_image_alt_ro: coverImageUrl ? normalizeOptionalText(formData.get("cover_image_alt_ro")) : null,
    cover_image_width: coverImageWidth,
    cover_image_height: coverImageHeight,
    author_name: normalizeOptionalText(formData.get("author_name")),
    category: normalizeOptionalText(formData.get("category")),
    tags: parseTags(normalizeOptionalText(formData.get("tags"))),
    reading_time: parseOptionalInteger(formData.get("reading_time")) ?? 0,
  };

  if (!payload.title_en || !payload.title_ro || !payload.slug) {
    return { error: "Titles and slug are required." };
  }

  let dbError;
  if (isNew) {
    const { error } = await supabase.from("articles").insert(payload);
    dbError = error;
  } else {
    const { error } = await supabase.from("articles").update(payload).eq("id", id);
    dbError = error;
  }

  if (dbError) {
    if (payload.cover_image_public_id && payload.cover_image_public_id !== existingCoverPublicId) {
      try {
        await deleteCloudinaryAsset(payload.cover_image_public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up failed Cloudinary upload:", cleanupError);
      }
    }
    return { error: dbError.message };
  }

  if (existingCoverPublicId && existingCoverPublicId !== payload.cover_image_public_id) {
    try {
      await deleteCloudinaryAsset(existingCoverPublicId);
    } catch (cleanupError) {
      console.error("Failed to remove replaced Cloudinary cover:", cleanupError);
    }
  }

  revalidatePath("/admin/articles");
  revalidatePath("/[locale]/insights", "layout");

  redirect(`/${locale}/admin/articles`);
}
