import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const missingSupabaseConfigMessage =
  "Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.";

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

export class MissingSupabaseConfigError extends Error {
  constructor() {
    super(missingSupabaseConfigMessage);
    this.name = "MissingSupabaseConfigError";
  }
}

export async function createClient() {
  if (!hasSupabaseEnv()) {
    throw new MissingSupabaseConfigError();
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      // Since we are deploying data read-only in this phase, we want to warn
      // gracefully if ENV vars are missing rather than crashing the constructor immediately,
      // but SSR client constructor essentially requires strings. We'll handle errors in the fetch.
    }
  );
}
