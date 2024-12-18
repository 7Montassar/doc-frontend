import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('session'); // Assuming this cookie represents authentication

    const { pathname } = request.nextUrl;

    if (token && (pathname === '/signin' || pathname === '/signup')) {
        // Redirect authenticated users away from signin/signup to a protected page (e.g., dashboard)
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    if (!token && ['/dashboard', '/invoice', '/day_off', '/report'].includes(pathname)) {
        // Redirect unauthenticated users to /signin
        const signInUrl = new URL('/signin', request.url);
        return NextResponse.redirect(signInUrl);
    }

    // Allow request to proceed
    return NextResponse.next();
}

// Specify the routes to protect
export const config = {
    matcher: [
        '/signin', // Include /signin
        '/signup', // Include /signup
        '/dashboard',
        '/invoice',
        '/day_off',
        '/report',
    ],
};
