"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024;

type SignedUploadResponse = {
  apiKey: string;
  cloudName: string;
  folder: string;
  signature: string;
  timestamp: number;
};

export type WorkItemEditorGalleryRecord = {
  id?: string | null;
  image_url?: string | null;
  image_public_id?: string | null;
  alt_en?: string | null;
  alt_ro?: string | null;
  image_width?: number | null;
  image_height?: number | null;
  sort_order?: number | null;
};

type GalleryItem = {
  id: string;
  image_url: string;
  image_public_id: string;
  alt_en: string;
  alt_ro: string;
  image_width: string;
  image_height: string;
  sort_order: number;
};

type WorkItemGalleryFieldProps = {
  initialItems: WorkItemEditorGalleryRecord[];
};

function normalizeInitialItem(item: WorkItemEditorGalleryRecord): GalleryItem | null {
  const imageUrl = item.image_url?.trim();
  if (!imageUrl) {
    return null;
  }

  return {
    id: item.id?.trim() || crypto.randomUUID(),
    image_url: imageUrl,
    image_public_id: item.image_public_id?.trim() || "",
    alt_en: item.alt_en?.trim() || "",
    alt_ro: item.alt_ro?.trim() || "",
    image_width: item.image_width ? String(item.image_width) : "",
    image_height: item.image_height ? String(item.image_height) : "",
    sort_order: item.sort_order ?? 0,
  };
}

export function WorkItemGalleryField({ initialItems }: WorkItemGalleryFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<GalleryItem[]>(
    initialItems
      .map(normalizeInitialItem)
      .filter((item): item is GalleryItem => Boolean(item))
      .sort((a, b) => a.sort_order - b.sort_order),
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const serializedItems = useMemo(
    () =>
      JSON.stringify(
        items.map((item, index) => ({
          id: item.id,
          image_url: item.image_url,
          image_public_id: item.image_public_id || null,
          alt_en: item.alt_en || null,
          alt_ro: item.alt_ro || null,
          image_width: item.image_width ? Number(item.image_width) : null,
          image_height: item.image_height ? Number(item.image_height) : null,
          sort_order: index + 1,
        })),
      ),
    [items],
  );

  function resetFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function updateItem(id: string, patch: Partial<GalleryItem>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    setStatus("Gallery item removed. Save the work item to persist the change.");
    setError(null);
  }

  function moveItem(id: string, direction: -1 | 1) {
    setItems((current) => {
      const index = current.findIndex((item) => item.id === id);
      const targetIndex = index + direction;

      if (index === -1 || targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }

      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      return next;
    });
    setStatus("Gallery order updated. Save the work item to persist the new sort order.");
    setError(null);
  }

async function uploadFile(file: File, signature: SignedUploadResponse) {
    const uploadBody = new FormData();
    uploadBody.set("api_key", signature.apiKey);
    uploadBody.set("file", file);
    uploadBody.set("folder", signature.folder);
    uploadBody.set("signature", signature.signature);
    uploadBody.set("timestamp", signature.timestamp.toString());

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadBody,
      },
    );

    const uploadPayload = (await uploadResponse.json()) as {
      secure_url?: string;
      public_id?: string;
      width?: number;
      height?: number;
      error?: { message?: string };
    };

    if (!uploadResponse.ok || !uploadPayload.secure_url || !uploadPayload.public_id) {
      throw new Error(uploadPayload.error?.message || "Cloudinary upload failed.");
    }

    return {
      secure_url: uploadPayload.secure_url,
      public_id: uploadPayload.public_id,
      width: uploadPayload.width,
      height: uploadPayload.height,
    };
  }

  async function handleUpload(fileList: FileList) {
    const files = Array.from(fileList);
    if (files.length === 0) {
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are supported.");
        resetFileInput();
        return;
      }

      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        setError("Images must be 8MB or smaller.");
        resetFileInput();
        return;
      }
    }

    setIsUploading(true);
    setError(null);
    setStatus(null);

    try {
      const signResponse = await fetch("/api/admin/media/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entity: "work_items" }),
      });

      const signPayload = (await signResponse.json()) as SignedUploadResponse & { error?: string };
      if (!signResponse.ok) {
        throw new Error(signPayload.error || "Failed to sign upload.");
      }

      const uploadedItems: GalleryItem[] = [];

      for (const [index, file] of files.entries()) {
        setStatus(`Uploading gallery image ${index + 1} of ${files.length}...`);
        const uploadPayload = await uploadFile(file, signPayload);

        uploadedItems.push({
          id: crypto.randomUUID(),
          image_url: uploadPayload.secure_url,
          image_public_id: uploadPayload.public_id,
          alt_en: "",
          alt_ro: "",
          image_width: uploadPayload.width ? String(uploadPayload.width) : "",
          image_height: uploadPayload.height ? String(uploadPayload.height) : "",
          sort_order: items.length + index + 1,
        });
      }

      setItems((current) => [...current, ...uploadedItems]);
      setStatus(`${uploadedItems.length} gallery image${uploadedItems.length === 1 ? "" : "s"} uploaded. Save the work item to persist them.`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Gallery upload failed.");
    } finally {
      setIsUploading(false);
      resetFileInput();
    }
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name="gallery_items_json" value={serializedItems} />

      <div className="space-y-2">
        <Label>Gallery Images</Label>
        <p className="text-sm text-muted-foreground">
          Upload multiple images, reorder them, and set localized alt text for future case-study pages.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImagePlus className="mr-2 h-4 w-4" />}
          {isUploading ? "Uploading..." : "Upload gallery images"}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files?.length) {
              void handleUpload(event.target.files);
            }
          }}
        />
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {status && (
        <p className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">
          {status}
        </p>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-10 text-center text-sm text-muted-foreground">
          No gallery images yet. Upload one or more files to start building the case-study gallery.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="grid gap-4 rounded-2xl border border-border/60 bg-background p-4 md:grid-cols-[220px_1fr]">
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt="Gallery preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Item {index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => moveItem(item.id, -1)} disabled={index === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => moveItem(item.id, 1)} disabled={index === items.length - 1}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`gallery-alt-en-${item.id}`}>Alt (English)</Label>
                  <Input
                    id={`gallery-alt-en-${item.id}`}
                    value={item.alt_en}
                    onChange={(event) => updateItem(item.id, { alt_en: event.target.value })}
                    placeholder="Optional gallery alt text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`gallery-alt-ro-${item.id}`}>Alt (Romanian)</Label>
                  <Input
                    id={`gallery-alt-ro-${item.id}`}
                    value={item.alt_ro}
                    onChange={(event) => updateItem(item.id, { alt_ro: event.target.value })}
                    placeholder="Text alternativ opțional"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
