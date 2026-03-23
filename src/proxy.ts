import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

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

export async function proxy(request: NextRequest) {
  const response = intlProxy(request);
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublishableKey();

  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(en|ro)(?=\/|$)/);
  const locale = localeMatch?.[1] ?? "ro";
  const isAdminRoute = /^\/(en|ro)\/admin(?:\/|$)/.test(pathname) || pathname.startsWith("/admin");
  const isAuthRoute = /^\/(en|ro)\/login(?:\/|$)/.test(pathname) || pathname.startsWith("/login");

  if (isAdminRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = `/${locale}/admin`;
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
