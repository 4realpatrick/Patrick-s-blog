export type TTheme = "blue" | "green" | "red" | "violet" | "yellow";
export const THEME_ARRAY: TTheme[] = [
  "blue",
  "green",
  "red",
  "violet",
  "yellow",
];
export type TMode = "system" | "light" | "dark";
export const MODE_ARRAY: TMode[] = ["system", "light", "dark"];
export const TASKIFY_THEME_KEY = "taskify_theme_key";
export function getThemeFromLocal(): TTheme {
  try {
    if (localStorage) {
      return (localStorage.getItem(TASKIFY_THEME_KEY) || "blue") as TTheme;
    }
    return "blue";
  } catch (error) {
    return "blue";
  }
}
