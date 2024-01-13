import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/signup'];

export const middleware = (request: NextRequest) => {
  const identityCookie = request.cookies.get('chatse_identity');
  const currentRoute = request.nextUrl.pathname;

  if (identityCookie && publicRoutes.includes(currentRoute)) {
    return NextResponse.redirect(new URL('/clubs', request.url));
  }

  if (!identityCookie && !publicRoutes.includes(currentRoute)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
