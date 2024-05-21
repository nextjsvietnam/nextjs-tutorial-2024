import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./app/middlewares/auth.middleware";
import { AppCookie, ProtectedRoutes } from "./shared/constant";
import _db from "../_db";
import createIntlMiddleware from "next-intl/middleware";
import { redirect } from "next/dist/server/api-utils";

// This function can be marked `async` if using `await` inside

export default async function middleware(req: NextRequest) {
  const [, locale, ...segments] = req.nextUrl.pathname.split("/");
  const path = req.nextUrl.pathname;

  // other middlewares
  if (locale != null) {
    console.log("[Middleware Demo] : " + req.url);

    if (ProtectedRoutes.some((route) => path.startsWith(route))) {
      // apply auth middleware
      const redirectResponse = authMiddleware(req);
      if (redirectResponse) {
        return redirectResponse;
      }
    }
  }

  // next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "vi"],
    defaultLocale: "en",
    localePrefix: "always",
  });
  const response = handleI18nRouting(req);

  // fake login
  if (path == `/${locale}`) {
    response.cookies.set(AppCookie.UserToken, _db.tokens[0].token);
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Paths for internationalization
    // "/",
    "/(en|vi)/:path*",
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
