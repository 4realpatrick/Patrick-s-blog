import "server-only";
import type { Locale } from "@/i18n.config";
export type TDictionary = typeof import("@/dictionaries/cn.json");

const dictionaries: {
  [key in Locale]: () => Promise<TDictionary>;
} = {
  zh: () => import("@/dictionaries/cn.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
