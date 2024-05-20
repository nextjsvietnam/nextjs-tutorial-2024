import AuthService from "@/service/auth.service";
import { AppCookie, AppRoute } from "@/shared/constant";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = (req: NextRequest) => {
  // middleware/auth.ts

  const token = req.cookies.get(AppCookie.UserToken);
  const authService = new AuthService();
  const userToken = token?.name ? authService.verifyToken(token?.value) : null;

  // Assuming you have some function to verify the token
  if (!token || !userToken) {
    const url = req.nextUrl.clone();
    url.searchParams.set("redirectUrl", url.pathname);
    url.pathname = AppRoute.Login;

    return NextResponse.redirect(url);
  }

  return null;
};
