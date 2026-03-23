import { createAdminClient, createClient } from "@/lib/supabase/server";

export async function requireAdminClient() {
  const authClient = await createClient();
  const {
    data: { user },
    error,
  } = await authClient.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return createAdminClient();
}
