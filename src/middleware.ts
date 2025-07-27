import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rolePermissions, UserRole } from '@/lib/auth-utils';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const userDataCookie = request.cookies.get('user_data')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');
  
  // If trying to access protected route without token, redirect to login
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If trying to access auth pages with token, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Role-based route protection
  if (token && userDataCookie && request.nextUrl.pathname.startsWith('/dashboard')) {
    try {
      const userData = JSON.parse(userDataCookie);
      const userRole = userData?.Role || '';
      const currentPath = request.nextUrl.pathname;

      const allowedRoutes = rolePermissions[userRole as UserRole] || [];
      
      // Check if current path is allowed for the user's role
      const isPathAllowed = allowedRoutes.some(route => 
        currentPath === route || currentPath.startsWith(route + '/')
      );

      // If path is not allowed, redirect to dashboard
      if (!isPathAllowed) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Error parsing user data in middleware:', error);
      // If there's an error parsing user data, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}; 