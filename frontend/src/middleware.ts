// frontend/src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types' // We will create this type definition soon

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client that can be used in Server Components and middleware
  const supabase = createMiddlewareClient<Database>({ req, res })
  
  // Refresh the session cookie if it's expired.
  const { data: { session } } = await supabase.auth.getSession();
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarded, role')
    .single();
  
  const url = req.nextUrl;

  // Rule 1: If a user is not signed in and tries to access any protected route under /app,
  // redirect them to the login page.
  if (!session && url.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Rule 2: If a user IS signed in but HAS NOT completed onboarding,
  // force them to the /onboarding page, unless they are already there.
  if (session && profile && !profile.onboarded && url.pathname !== '/onboarding') {
     return NextResponse.redirect(new URL('/onboarding', req.url));
  }
  
  // Rule 3: If a user IS signed in AND HAS completed onboarding,
  // prevent them from accessing the landing page, login, or signup pages.
  // Redirect them to their appropriate dashboard.
  if (session && profile && profile.onboarded && (url.pathname === '/' || url.pathname === '/login' || url.pathname === '/signup')) {
    const dashboardUrl = profile.role === 'teacher' ? '/app/dashboard' : '/app/student/dashboard';
    return NextResponse.redirect(new URL(dashboardUrl, req.url));
  }
  
  // If none of the above rules match, allow the request to proceed.
  return res
}

// This config specifies which paths the middleware should run on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/ (our API routes are handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}