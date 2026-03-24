"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminClient } from "@/lib/admin-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export type WorkItemFormState = {
  error: string | null;
};

type GalleryFormItem = {
  id: string;
  image_url: string;
  image_public_id: string | null;
  alt_en: string | null;
  alt_ro: string | null;
  image_width: number | null;
  image_height: number | null;
  sort_order: number;
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

function parseFeatures(featuresString: string | null) {
  if (!featuresString) {
    return [];
  }

  return featuresString
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function isSupportedImageUrl(value: string | null) {
  if (!value) {
    return true;
  }

  return value.startsWith("/") || /^https?:\/\//i.test(value);
}

function isSupportedLiveUrl(value: string | null) {
  if (!value) {
    return true;
  }

  return /^https?:\/\//i.test(value);
}

function parseGalleryItems(rawValue: string | null): GalleryFormItem[] | null {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as Array<Record<string, unknown>>;
    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed
      .map((item, index) => {
        const imageUrl = typeof item.image_url === "string" ? item.image_url.trim() : "";
        if (!imageUrl) {
          return null;
        }

        const rawSortOrder =
          typeof item.sort_order === "number"
            ? item.sort_order
            : typeof item.sort_order === "string"
              ? Number.parseInt(item.sort_order, 10)
              : index + 1;

        return {
          id: typeof item.id === "string" && item.id.trim().length > 0 ? item.id.trim() : randomUUID(),
          image_url: imageUrl,
          image_public_id:
            typeof item.image_public_id === "string" && item.image_public_id.trim().length > 0
              ? item.image_public_id.trim()
              : null,
          alt_en:
            typeof item.alt_en === "string" && item.alt_en.trim().length > 0
              ? item.alt_en.trim()
              : null,
          alt_ro:
            typeof item.alt_ro === "string" && item.alt_ro.trim().length > 0
              ? item.alt_ro.trim()
              : null,
          image_width:
            typeof item.image_width === "number"
              ? item.image_width
              : typeof item.image_width === "string" && item.image_width.trim().length > 0
                ? Number.parseInt(item.image_width, 10)
                : null,
          image_height:
            typeof item.image_height === "number"
              ? item.image_height
              : typeof item.image_height === "string" && item.image_height.trim().length > 0
                ? Number.parseInt(item.image_height, 10)
                : null,
          sort_order: Number.isFinite(rawSortOrder) ? rawSortOrder : index + 1,
        };
      })
      .filter((item): item is GalleryFormItem => Boolean(item));
  } catch {
    return null;
  }
}

async function deleteAssets(publicIds: Array<string | null | undefined>) {
  await Promise.allSettled(
    publicIds
      .map((publicId) => publicId?.trim())
      .filter((publicId): publicId is string => Boolean(publicId))
      .map((publicId) => deleteCloudinaryAsset(publicId)),
  );
}

export async function deleteWorkItemAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
    return;
  }

  try {
    const supabase = await requireAdminClient();
    const [{ data: existingWork }, { data: existingGallery }] = await Promise.all([
      supabase
        .from("work_items")
        .select("image_public_id")
        .eq("id", id)
        .single(),
      supabase
        .from("work_item_gallery")
        .select("image_public_id")
        .eq("work_item_id", id),
    ]);

    await supabase.from("work_items").delete().eq("id", id);

    await deleteAssets([
      existingWork?.image_public_id ?? null,
      ...(existingGallery ?? []).map((item) => item.image_public_id as string | null),
    ]);
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
  const featuresEn = parseFeatures(normalizeOptionalText(formData.get("features_en_str")));
  const featuresRo = parseFeatures(normalizeOptionalText(formData.get("features_ro_str")));
  const liveUrl = normalizeOptionalText(formData.get("live_url"));
  const galleryItems = parseGalleryItems(normalizeOptionalText(formData.get("gallery_items_json")));

  if (!isSupportedImageUrl(imageUrl)) {
    return { error: "Cover image URL must start with /, http://, or https://." };
  }

  if (!isSupportedLiveUrl(liveUrl)) {
    return { error: "Live URL must start with http:// or https://." };
  }

  if (!galleryItems) {
    return { error: "Gallery data is invalid. Please refresh the page and try again." };
  }

  if (galleryItems.some((item) => !isSupportedImageUrl(item.image_url))) {
    return { error: "Gallery images must start with /, http://, or https://." };
  }

  let existingImagePublicId: string | null = null;
  let existingGallery:
    | Array<{ id: string; image_public_id: string | null }>
    | null = null;

  if (!isNew) {
    const [{ data: existingWork, error: existingError }, { data: currentGallery, error: galleryError }] =
      await Promise.all([
        supabase
          .from("work_items")
          .select("image_public_id")
          .eq("id", id)
          .single(),
        supabase
          .from("work_item_gallery")
          .select("id, image_public_id")
          .eq("work_item_id", id),
      ]);

    if (existingError) {
      return { error: existingError.message };
    }

    if (galleryError) {
      return { error: galleryError.message };
    }

    existingImagePublicId = existingWork?.image_public_id ?? null;
    existingGallery = currentGallery ?? [];
  }

  const existingGalleryPublicIds = new Set(
    (existingGallery ?? [])
      .map((item) => item.image_public_id)
      .filter((value): value is string => Boolean(value)),
  );

  const payload = {
    slug: formData.get("slug") as string,
    title_en: formData.get("title_en") as string,
    title_ro: formData.get("title_ro") as string,
    client_name: formData.get("client_name") as string,
    industry_en: formData.get("industry_en") as string,
    industry_ro: formData.get("industry_ro") as string,
    description_en: formData.get("description_en") as string,
    description_ro: formData.get("description_ro") as string,
    overview_en: normalizeOptionalText(formData.get("overview_en")),
    overview_ro: normalizeOptionalText(formData.get("overview_ro")),
    challenge_en: normalizeOptionalText(formData.get("challenge_en")),
    challenge_ro: normalizeOptionalText(formData.get("challenge_ro")),
    solution_en: normalizeOptionalText(formData.get("solution_en")),
    solution_ro: normalizeOptionalText(formData.get("solution_ro")),
    results_en: normalizeOptionalText(formData.get("results_en")),
    results_ro: normalizeOptionalText(formData.get("results_ro")),
    features_en: featuresEn,
    features_ro: featuresRo,
    live_url: liveUrl,
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

  if (!payload.title_en || !payload.title_ro || !payload.slug || !payload.client_name) {
    return { error: "Slug, client name, and titles are required." };
  }

  let workItemId = id;
  let dbError: { message: string } | null = null;

  if (isNew) {
    const { data, error } = await supabase
      .from("work_items")
      .insert(payload)
      .select("id")
      .single();
    dbError = error;
    workItemId = data?.id ?? id;
  } else {
    const { data, error } = await supabase
      .from("work_items")
      .update(payload)
      .eq("id", id)
      .select("id")
      .single();
    dbError = error;
    workItemId = data?.id ?? id;
  }

  if (dbError) {
    const galleryPublicIdsToCleanup = galleryItems.map((item) =>
      item.image_public_id && !existingGalleryPublicIds.has(item.image_public_id)
        ? item.image_public_id
        : null,
    );

    await deleteAssets([
      payload.image_public_id && payload.image_public_id !== existingImagePublicId ? payload.image_public_id : null,
      ...galleryPublicIdsToCleanup,
    ]);

    return { error: dbError.message };
  }

  const existingGalleryMap = new Map(
    (existingGallery ?? []).map((item) => [item.id, item.image_public_id]),
  );

  const galleryRows = galleryItems.map((item, index) => ({
    id: item.id,
    work_item_id: workItemId,
    image_url: item.image_url,
    image_public_id: item.image_public_id,
    alt_en: item.alt_en,
    alt_ro: item.alt_ro,
    image_width: item.image_width,
    image_height: item.image_height,
    sort_order: index + 1,
  }));

  if (galleryRows.length > 0) {
    const { error: galleryUpsertError } = await supabase
      .from("work_item_gallery")
      .upsert(galleryRows);

    if (galleryUpsertError) {
      return { error: galleryUpsertError.message };
    }
  }

  const submittedGalleryIds = new Set(galleryRows.map((item) => item.id));
  const removedGalleryItems = (existingGallery ?? []).filter((item) => !submittedGalleryIds.has(item.id));

  if (removedGalleryItems.length > 0) {
    const { error: galleryDeleteError } = await supabase
      .from("work_item_gallery")
      .delete()
      .in("id", removedGalleryItems.map((item) => item.id));

    if (galleryDeleteError) {
      return { error: galleryDeleteError.message };
    }
  }

  const replacedGalleryPublicIds = galleryRows
    .map((item) => {
      const previousPublicId = existingGalleryMap.get(item.id);
      if (previousPublicId && previousPublicId !== item.image_public_id) {
        return previousPublicId;
      }
      return null;
    })
    .filter((value): value is string => Boolean(value));

  await deleteAssets([
    existingImagePublicId && existingImagePublicId !== payload.image_public_id ? existingImagePublicId : null,
    ...removedGalleryItems.map((item) => item.image_public_id),
    ...replacedGalleryPublicIds,
  ]);

  revalidatePath("/admin/work");
  revalidatePath("/ro/admin/work");
  revalidatePath("/en/admin/work");
  revalidatePath("/[locale]/work", "layout");

  redirect(`/${locale}/admin/work`);
}
