import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login'];

export const middleware = (request: NextRequest) => {
  const identityCookie = request.cookies.get('chatse_identity');

  if (identityCookie && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!identityCookie && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
