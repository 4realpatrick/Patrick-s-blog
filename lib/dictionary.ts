import "server-only";
import type { Locale } from "@/i18n.config";

export type TDictionary = typeof import("@/dictionaries/zh.json");
export type TResponseDictionary =
  typeof import("@/dictionaries/response/zh.json");

const dictionaries: {
  [key in Locale]: () => Promise<TDictionary>;
} = {
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

const responseDictionaries: {
  [key in Locale]: () => Promise<TResponseDictionary>;
} = {
  zh: () =>
    import("@/dictionaries/response/zh.json").then((module) => module.default),
  en: () =>
    import("@/dictionaries/response/en.json").then((module) => module.default),
};

export const getResponseDictionary = async (locale: Locale) =>
  responseDictionaries[locale]();
