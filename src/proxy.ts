import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  // Logged-in users shouldn't see login/register pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protected routes require authentication
  const isProtectedRoute =
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/research");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
