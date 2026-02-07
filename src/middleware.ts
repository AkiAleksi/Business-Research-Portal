import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
                       req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
                          req.nextUrl.pathname.startsWith("/register");

        if (isAuthPage) {
          return true;
        }

        const isProtectedRoute = req.nextUrl.pathname === "/" ||
                                 req.nextUrl.pathname.startsWith("/research") ||
                                 req.nextUrl.pathname.startsWith("/api/copilotkit");

        if (isProtectedRoute) {
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
