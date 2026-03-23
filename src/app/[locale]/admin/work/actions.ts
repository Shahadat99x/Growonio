"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminClient } from "@/lib/admin-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export type WorkItemFormState = {
  error: string | null;
};

function normalizeOptionalText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function parseOptionalInteger(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseStats(statsString: string | null) {
  if (!statsString) {
    return [];
  }

  return statsString
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(":");
      if (parts.length < 2) {
        return null;
      }

      return {
        label: parts[0].trim(),
        value: parts.slice(1).join(":").trim(),
      };
    })
    .filter((entry): entry is { label: string; value: string } => Boolean(entry));
}

function isSupportedImageUrl(value: string | null) {
  if (!value) {
    return true;
  }

  return value.startsWith("/") || /^https?:\/\//i.test(value);
}

export async function deleteWorkItemAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
    return;
  }

  try {
    const supabase = await requireAdminClient();
    const { data: existingWork } = await supabase
      .from("work_items")
      .select("image_public_id")
      .eq("id", id)
      .single();

    await supabase.from("work_items").delete().eq("id", id);

    if (existingWork?.image_public_id) {
      try {
        await deleteCloudinaryAsset(existingWork.image_public_id);
      } catch (error) {
        console.error("Failed to remove Cloudinary asset during work item deletion:", error);
      }
    }
  } catch (error) {
    console.error("Failed to delete work item:", error);
    return;
  }

  revalidatePath("/admin/work");
  revalidatePath("/ro/admin/work");
  revalidatePath("/en/admin/work");
  revalidatePath("/[locale]/work", "layout");
}

export async function saveWorkItemAction(
  _prevState: WorkItemFormState,
  formData: FormData,
): Promise<WorkItemFormState> {
  const supabase = await requireAdminClient();
  const id = formData.get("id") as string;
  const locale = (formData.get("locale") as string) || "en";
  const isNew = id === "new";

  const imageUrl = normalizeOptionalText(formData.get("image_url"));
  const imagePublicId = imageUrl ? normalizeOptionalText(formData.get("image_public_id")) : null;
  const imageWidth = imageUrl ? parseOptionalInteger(formData.get("image_width")) : null;
  const imageHeight = imageUrl ? parseOptionalInteger(formData.get("image_height")) : null;
  const parsedStats = parseStats(normalizeOptionalText(formData.get("stats_str")));

  if (!isSupportedImageUrl(imageUrl)) {
    return { error: "Image URL must start with /, http://, or https://." };
  }

  let existingImagePublicId: string | null = null;

  if (!isNew) {
    const { data: existingWork, error: existingError } = await supabase
      .from("work_items")
      .select("image_public_id")
      .eq("id", id)
      .single();

    if (existingError) {
      return { error: existingError.message };
    }

    existingImagePublicId = existingWork?.image_public_id ?? null;
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
    image_url: imageUrl,
    image_public_id: imagePublicId,
    image_alt_en: imageUrl ? normalizeOptionalText(formData.get("image_alt_en")) : null,
    image_alt_ro: imageUrl ? normalizeOptionalText(formData.get("image_alt_ro")) : null,
    image_width: imageWidth,
    image_height: imageHeight,
    stats: parsedStats,
    is_featured: formData.get("is_featured") === "on",
    sort_order: parseOptionalInteger(formData.get("sort_order")) ?? 0,
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.title_en || !payload.title_ro || !payload.slug) {
    return { error: "Titles and slug are required." };
  }

  let dbError;
  if (isNew) {
    const { error } = await supabase.from("work_items").insert(payload);
    dbError = error;
  } else {
    const { error } = await supabase.from("work_items").update(payload).eq("id", id);
    dbError = error;
  }

  if (dbError) {
    if (payload.image_public_id && payload.image_public_id !== existingImagePublicId) {
      try {
        await deleteCloudinaryAsset(payload.image_public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up failed Cloudinary upload:", cleanupError);
      }
    }

    return { error: dbError.message };
  }

  if (existingImagePublicId && existingImagePublicId !== payload.image_public_id) {
    try {
      await deleteCloudinaryAsset(existingImagePublicId);
    } catch (cleanupError) {
      console.error("Failed to remove replaced Cloudinary asset:", cleanupError);
    }
  }

  revalidatePath("/admin/work");
  revalidatePath("/ro/admin/work");
  revalidatePath("/en/admin/work");
  revalidatePath("/[locale]/work", "layout");

  redirect(`/${locale}/admin/work`);
}
