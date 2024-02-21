"use client";
import { ThemeProvider as NextModeProvider } from "next-themes";

import { type ThemeProviderProps } from "next-themes/dist/types";

export function ModeProvider({ children, ...rest }: ThemeProviderProps) {
  return <NextModeProvider {...rest}>{children}</NextModeProvider>;
}
