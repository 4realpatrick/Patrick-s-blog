export type TTheme = "blue" | "green" | "red" | "violet" | "yellow";
export const THEME_COLOR_ARRAY: TTheme[] = [
  "blue",
  "green",
  "red",
  "violet",
  "yellow",
];
export type TMode = "system" | "light" | "dark";
export const MODE_ARRAY: TMode[] = ["system", "light", "dark"];

export const BLOG_THEME_KEY = "blog_theme_key";
export function getThemeFromLocal(): TTheme {
  try {
    if (localStorage) {
      return (localStorage.getItem(BLOG_THEME_KEY) || "blue") as TTheme;
    }
    return "blue";
  } catch (error) {
    return "blue";
  }
}
