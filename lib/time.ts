import { Locale } from "@/i18n.config";
import dayjs from "dayjs";
export const getRegularTime = (time?: Date) => {
  return dayjs(time).format("dddd, MMMM D, YYYY h:mm A");
};

export const isNewBlog = (time: string) => {
  return dayjs(time).isAfter(dayjs().subtract(7, "day"));
};

export const getFormatterByLocale = (locale: Locale) => {
  const formatter: {
    [key in Locale]: string;
  } = {
    zh: "YYYY年MMMMDD日",
    en: "dddd, MMMM D, YYYY",
  };
  return formatter[locale];
};
