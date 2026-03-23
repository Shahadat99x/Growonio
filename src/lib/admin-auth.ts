import { createClient } from "@/lib/supabase/server";

export async function requireAdminClient() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return supabase;
}
