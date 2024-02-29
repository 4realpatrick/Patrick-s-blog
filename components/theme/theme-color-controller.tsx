"use client";
// Cmp
import { Button, ButtonProps } from "@/components/ui/button";
import { CgColorPicker } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Constant
import {
  BLOG_THEME_KEY,
  THEME_COLOR_ARRAY,
  TTheme,
  getThemeFromLocal,
} from "@/constant/theme";
import { ColorWheelIcon } from "@radix-ui/react-icons";

// Hooks
import { useContext, useEffect, useState } from "react";
import { DictionaryContext } from "../dictionary-provider";
interface IThemeControllerProps {
  variant?: ButtonProps["variant"];
}
export function ThemeColorController({
  variant = "default",
}: IThemeControllerProps) {
  const [mounted, setMounted] = useState(false);
  const [curTheme, setCurTheme] = useState<TTheme>(getThemeFromLocal());
  const { common: commonDictionary } = useContext(DictionaryContext);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(BLOG_THEME_KEY, curTheme);
      document.documentElement.setAttribute("data-theme", curTheme);
    }
  }, [curTheme, mounted]);
  if (!mounted) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hidden md:block">
        <Button variant={variant}>
          <CgColorPicker />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuRadioGroup
          value={curTheme}
          onValueChange={(val: string) => setCurTheme(val as TTheme)}
        >
          {THEME_COLOR_ARRAY.map((color) => (
            <DropdownMenuRadioItem
              value={color}
              className="justify-between"
              key={color}
            >
              <span>{commonDictionary.theme_colors[color]}</span>
              <div
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 rotate-90 justify-end`}
                style={{ background: color }}
              ></div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
