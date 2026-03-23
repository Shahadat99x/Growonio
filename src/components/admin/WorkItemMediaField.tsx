"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024;

type WorkItemMediaFieldProps = {
  initialUrl?: string | null;
  initialPublicId?: string | null;
  initialWidth?: number | null;
  initialHeight?: number | null;
};

type SignedUploadResponse = {
  apiKey: string;
  cloudName: string;
  folder: string;
  signature: string;
  timestamp: number;
};

export function WorkItemMediaField({
  initialUrl,
  initialPublicId,
  initialWidth,
  initialHeight,
}: WorkItemMediaFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(initialUrl ?? "");
  const [imagePublicId, setImagePublicId] = useState(initialPublicId ?? "");
  const [imageWidth, setImageWidth] = useState(initialWidth ? String(initialWidth) : "");
  const [imageHeight, setImageHeight] = useState(initialHeight ? String(initialHeight) : "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);

  function clearMedia() {
    setImageUrl("");
    setImagePublicId("");
    setImageWidth("");
    setImageHeight("");
    setPreviewError(false);
    setStatus("Image cleared. Save to persist the change.");
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleManualUrlChange(value: string) {
    setImageUrl(value);
    setPreviewError(false);
    setStatus(null);
    setError(null);

    if (value.trim() !== (initialUrl ?? "")) {
      setImagePublicId("");
      setImageWidth("");
      setImageHeight("");
    }
  }

  async function handleUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setError("Images must be 8MB or smaller.");
      return;
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

      const uploadBody = new FormData();
      uploadBody.set("api_key", signPayload.apiKey);
      uploadBody.set("file", file);
      uploadBody.set("folder", signPayload.folder);
      uploadBody.set("signature", signPayload.signature);
      uploadBody.set("timestamp", signPayload.timestamp.toString());

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signPayload.cloudName}/image/upload`,
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

      setImageUrl(uploadPayload.secure_url);
      setImagePublicId(uploadPayload.public_id);
      setImageWidth(uploadPayload.width ? String(uploadPayload.width) : "");
      setImageHeight(uploadPayload.height ? String(uploadPayload.height) : "");
      setPreviewError(false);
      setStatus("Upload complete. Save the work item to persist it.");
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : "Upload failed.";
      setError(message);
    } finally {
      setIsUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name="image_url" value={imageUrl} />
      <input type="hidden" name="image_public_id" value={imagePublicId} />
      <input type="hidden" name="image_width" value={imageWidth} />
      <input type="hidden" name="image_height" value={imageHeight} />

      <div className="space-y-2">
        <Label htmlFor="manual_image_url">Image URL</Label>
        <Input
          id="manual_image_url"
          value={imageUrl}
          onChange={(event) => handleManualUrlChange(event.target.value)}
          placeholder="https://res.cloudinary.com/... or /local-placeholder.jpg"
        />
        <p className="text-xs text-muted-foreground">
          Upload a file to Cloudinary or paste a trusted URL. Saving the form persists the selected media to the database.
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
          {isUploading ? "Uploading..." : "Upload image"}
        </Button>

        <Button type="button" variant="ghost" onClick={clearMedia} disabled={!imageUrl && !isUploading}>
          <Trash2 className="mr-2 h-4 w-4" />
          Remove image
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void handleUpload(file);
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

      <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
        <div className="relative aspect-[16/10]">
          {imageUrl && !previewError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Work item image preview"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setPreviewError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-muted-foreground">
              No image selected yet. Upload a file or provide a direct URL.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
