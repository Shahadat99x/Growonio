import { createHash } from "node:crypto";

type CloudinaryEntity = "work_items";

type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "limit" | "fit";
  gravity?: string;
};

const DEFAULT_WORK_ITEMS_FOLDER = "growonio/work-items";

function getCloudinaryConfig() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
  };
}

export function isCloudinaryConfigured() {
  return getCloudinaryConfig() !== null;
}

export function getCloudinaryFolder(entity: CloudinaryEntity) {
  if (entity === "work_items") {
    return process.env.CLOUDINARY_WORK_ITEMS_FOLDER?.trim() || DEFAULT_WORK_ITEMS_FOLDER;
  }

  return DEFAULT_WORK_ITEMS_FOLDER;
}

function signCloudinaryParams(params: Record<string, string | number>, apiSecret: string) {
  const signaturePayload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${signaturePayload}${apiSecret}`).digest("hex");
}

export function createCloudinarySignedUpload(entity: CloudinaryEntity) {
  const config = getCloudinaryConfig();
  if (!config) {
    throw new Error("Cloudinary is not configured.");
  }

  const folder = getCloudinaryFolder(entity);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signCloudinaryParams({ folder, timestamp }, config.apiSecret);

  return {
    cloudName: config.cloudName,
    apiKey: config.apiKey,
    folder,
    signature,
    timestamp,
  };
}

export async function deleteCloudinaryAsset(publicId: string | null | undefined) {
  const normalizedPublicId = publicId?.trim();
  const config = getCloudinaryConfig();

  if (!normalizedPublicId || !config) {
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signCloudinaryParams(
    {
      public_id: normalizedPublicId,
      timestamp,
    },
    config.apiSecret,
  );

  const body = new URLSearchParams({
    api_key: config.apiKey,
    public_id: normalizedPublicId,
    signature,
    timestamp: timestamp.toString(),
  });

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    throw new Error("Cloudinary asset cleanup failed.");
  }
}

export function isCloudinaryUrl(src: string | null | undefined) {
  return Boolean(src && src.includes("res.cloudinary.com"));
}

export function isLocalAssetUrl(src: string | null | undefined) {
  return Boolean(src && src.startsWith("/"));
}

export function buildCloudinaryImageUrl(
  src: string,
  options: CloudinaryTransformOptions = {},
) {
  if (!isCloudinaryUrl(src)) {
    return src;
  }

  const transformations = ["f_auto", "q_auto", "dpr_auto"];

  if (options.crop) {
    transformations.push(`c_${options.crop}`);
  }

  if (options.gravity) {
    transformations.push(`g_${options.gravity}`);
  }

  if (options.width) {
    transformations.push(`w_${Math.round(options.width)}`);
  }

  if (options.height) {
    transformations.push(`h_${Math.round(options.height)}`);
  }

  return src.replace("/image/upload/", `/image/upload/${transformations.join(",")}/`);
}

export function getWorkItemImageAlt(input: {
  image_alt?: string | null;
  title: string;
  client_name?: string | null;
}) {
  const customAlt = input.image_alt?.trim();
  if (customAlt) {
    return customAlt;
  }

  if (input.client_name?.trim()) {
    return `${input.title} for ${input.client_name}`;
  }

  return input.title;
}
