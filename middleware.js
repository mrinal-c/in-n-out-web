import { NextResponse } from 'next/server';

export function middleware(request) {
    if (!request.cookies.has('auth-token')) {
        return NextResponse.redirect(new URL('/', request.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/dashboard', '/transactions', '/api/transaction', '/settings']
  }