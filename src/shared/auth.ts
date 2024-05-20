import { AppCookie, AppRoute } from "@/shared/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runUserGuard = () => {
  const cookieStore = cookies();
  if (!cookieStore.has(AppCookie.UserToken)) {
    return false;
  }
  try {
    const userCookie = cookieStore.get(AppCookie.UserToken);
    if (userCookie) {
      const user = JSON.parse(userCookie.value);
      return true;
    }
  } catch (error) {}
  return redirect(AppRoute.Login);
};
