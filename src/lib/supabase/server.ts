import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from 'next/headers';

export const missingSupabaseConfigMessage =
  "Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and either NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY to continue.";
export const missingSupabaseAdminConfigMessage =
  "Admin Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to continue.";

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

function getSupabaseServiceRoleKey() {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return value && value.length > 0 ? value : null;
}

export function hasSupabaseEnv() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}

export function hasSupabaseAdminEnv() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey());
}

export class MissingSupabaseConfigError extends Error {
  constructor() {
    super(missingSupabaseConfigMessage);
    this.name = "MissingSupabaseConfigError";
  }
}

export class MissingSupabaseAdminConfigError extends Error {
  constructor() {
    super(missingSupabaseAdminConfigMessage);
    this.name = "MissingSupabaseAdminConfigError";
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

export function createAdminClient() {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new MissingSupabaseAdminConfigError();
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createPublicClient() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublishableKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new MissingSupabaseConfigError();
  }

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
