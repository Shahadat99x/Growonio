import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = intlMiddleware(request);

  // Suppress warnings in case ENV vars aren't provided yet
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = /^\/(en|ro)\/admin/.test(pathname) || pathname.startsWith('/admin');

  if (isAdminRoute && !user) {
    const localeMatch = pathname.match(/^\/(en|ro)/);
    const locale = localeMatch ? localeMatch[1] : 'ro';
    
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute = /^\/(en|ro)\/login/.test(pathname) || pathname.startsWith('/login');
  if (isAuthRoute && user) {
    const localeMatch = pathname.match(/^\/(en|ro)/);
    const locale = localeMatch ? localeMatch[1] : 'ro';
    
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = `/${locale}/admin`;
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
