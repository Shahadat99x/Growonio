import { createBrowserClient } from "@supabase/ssr";

import { MissingSupabaseConfigError, hasSupabaseEnv } from "@/lib/supabase/server";

export function createClient() {
  if (!hasSupabaseEnv()) {
    throw new MissingSupabaseConfigError();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) {
    throw new MissingSupabaseConfigError();
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  );
}
