import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./app/middlewares/auth.middleware";
import { AppCookie, ProtectedRoutes } from "./shared/constant";
import _db from "../_db";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log("[Middleware Demo] : " + req.url);

  const path = req.nextUrl.pathname;

  // fake login
  if (path == "/") {
    const response = NextResponse.next();
    response.cookies.set(AppCookie.UserToken, _db.tokens[0].token);
    return response;
  }

  if (ProtectedRoutes.some((route) => path.startsWith(route))) {
    // apply auth middleware
    const redirectResponse = authMiddleware(req);
    if (redirectResponse) {
      return redirectResponse;
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
