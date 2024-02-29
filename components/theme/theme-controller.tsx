"use client";
// Cmp
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Hooks
import { useContext } from "react";
import { useTheme as useMode } from "next-themes";
// Constant
import { MODE_ARRAY } from "@/constant/theme";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";

export function ThemeController() {
  const { theme: mode, setTheme: setMode } = useMode();
  const {
    pages: {
      setting: { general },
    },
  } = useContext(DictionaryContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={mode} onValueChange={setMode}>
          {MODE_ARRAY.map((mode) => (
            <DropdownMenuRadioItem
              value={mode}
              className="justify-between"
              key={mode}
            >
              {general.themes[mode]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
