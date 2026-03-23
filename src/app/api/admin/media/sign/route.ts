import { NextResponse } from "next/server";

import { requireAdminClient } from "@/lib/admin-auth";
import { createCloudinarySignedUpload, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    await requireAdminClient();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary environment variables are missing." },
      { status: 500 },
    );
  }

  let payload: { entity?: string } = {};

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (payload.entity !== "work_items" && payload.entity !== "articles") {
    return NextResponse.json({ error: "Unsupported media entity." }, { status: 400 });
  }

  try {
    const signature = createCloudinarySignedUpload(payload.entity);
    return NextResponse.json(signature);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload signing failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
