import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('session');

    if (!token) {
        const signInUrl = new URL('/signin', request.url);
        return NextResponse.redirect(signInUrl);
    }

    // Allow request to proceed
    return NextResponse.next();
}

// Specify the routes to protect
export const config = {
    matcher: ['/dashboard'],
};
