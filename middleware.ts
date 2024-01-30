// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextRequest } from "next/server";
import { i18n } from "./i18n.config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

export const { auth } = NextAuth(authConfig);

/**
 * @description 获取当前浏览器的语言
 * @param {NextRequest} req request
 * @returns {string} 返回当前的语言
 */
function getLocale(req: NextRequest): string {
  const negotiatorHears: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHears[key] = value));
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHears }).languages();
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

// Core function
export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = req.nextUrl;
  // 是否登录
  const isLoggedIn = !!req.auth;
  // 当前语言
  const locale = getLocale(req);
  // 去掉locale的pathname
  const pathnameWithoutLocale = pathname.replace(/^\/[^\/]+/, "");

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale);
  const isAuthRoute = authRoutes.includes(pathnameWithoutLocale);

  // 当前路径中是否包含locale
  const isPathnameMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 如果是用以authentication的请求都允许
  if (isApiAuthRoute) {
    return null;
  }
  // 如果url缺少locale
  if (isPathnameMissingLocale) {
    return Response.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url
      )
    );
  }
  // 如果是用以authentication的地址
  if (isAuthRoute) {
    // 如果是已经登录，则不允许再访问登录或者注册页面
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // 允许
    return null;
  }
  // 如果没有登录，且当前不是在为登录就可以访问的地址则重定向到登录
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  return null;
});

// 哪些
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
