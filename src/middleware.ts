import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [ '/sign-in', '/sign-up', '/', '/verify/:path*' , '/addproperty'],
};

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request }); // gets session token form jwt
  const url = request.nextUrl; // gives access to incoming Request of URL

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }


const protectedRoutesss = ['/addproperty']


if (!token && protectedRoutesss.some(route => url.pathname.startsWith(route))) {
  return NextResponse.redirect(new URL('/sign-in', request.url));
}

  return NextResponse.next();
}