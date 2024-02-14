import "server-only";
import { headers } from "next/headers";
import { Locale } from "@/i18n.config";

export const getLocaleFromUrl = (): Locale => {
  const requestHeaders = headers();
  const url = requestHeaders.get("Referer");
  if (!url) return "zh";
  const urlMatch = url.match(/https?:\/\/[^\/]+\/(\w{2})(?=\/|$)/);
  return urlMatch ? (urlMatch[1] as Locale) : "zh";
};
