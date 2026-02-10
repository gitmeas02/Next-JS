// middleware.ts - Authentication middleware for Next.js

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookie
  const token = request.cookies.get('token')?.value || request.cookies.get('accessToken')?.value;
  const isAuthenticated = !!token;

  // Define auth routes (login, register - should redirect away if already authenticated)
  const authRoutes = ['/signin', '/register'];

  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Redirect to dashboard if accessing auth routes while already authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  // Redirect to signin if not authenticated and not already on auth route
  if (!isAuthenticated && !isAuthRoute) {
    const url = new URL('/signin', request.url);
    // Save the attempted URL to redirect back after login (if not root)
    if (pathname !== '/') {
      url.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (API routes handle their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
