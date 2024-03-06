export type TThemeColor = "blue" | "green" | "red" | "violet" | "yellow";
export const THEME_COLOR_ARRAY: TThemeColor[] = [
  "blue",
  "green",
  "red",
  "violet",
  "yellow",
];
export type TTheme = "system" | "light" | "dark";
export const THEME_ARRAY: TTheme[] = ["system", "light", "dark"];

export const BLOG_THEME_KEY = "blog_theme_key";
export function getThemeFromLocal(): TThemeColor {
  try {
    if (localStorage) {
      return (localStorage.getItem(BLOG_THEME_KEY) || "blue") as TThemeColor;
    }
    return "blue";
  } catch (error) {
    return "blue";
  }
}
