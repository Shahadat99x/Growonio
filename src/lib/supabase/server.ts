import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const missingSupabaseConfigMessage =
  "Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and either NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY to continue.";

function getSupabaseUrl() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  return value && value.length > 0 ? value : null;
}

function getSupabasePublishableKey() {
  const preferred = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (preferred) {
    return preferred;
  }

  const fallback = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();
  return fallback && fallback.length > 0 ? fallback : null;
}

export function hasSupabaseEnv() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
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
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublishableKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new MissingSupabaseConfigError();
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
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
