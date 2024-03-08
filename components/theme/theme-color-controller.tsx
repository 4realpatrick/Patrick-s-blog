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
import { FaCheck } from "react-icons/fa";

// Hooks
import { useContext, useEffect, useState } from "react";
// Context
import { DictionaryContext } from "../dictionary-provider";
// Utils
import { cn } from "@/lib/utils";
// Constant
import {
  BLOG_THEME_KEY,
  THEME_COLOR_ARRAY,
  TThemeColor,
  getThemeFromLocal,
} from "@/constant/theme";
const realColor = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  violet: "bg-violet-500",
  yellow: "bg-yellow-500",
};
// Types
interface IThemeControllerProps {
  variant?: ButtonProps["variant"];
  type?: "expand" | "dropdown";
}

export function ThemeColorController({
  variant = "default",
  type = "dropdown",
}: IThemeControllerProps) {
  const [mounted, setMounted] = useState(false);
  const [curTheme, setCurTheme] = useState<TThemeColor>(getThemeFromLocal());
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
  if (type === "expand") {
    return (
      <div className="flex gap-6">
        {THEME_COLOR_ARRAY.map((color) => {
          return (
            <div
              className="px-2"
              onClick={() => setCurTheme(color)}
              key={color}
            >
              <div
                className={cn(
                  "size-20 rounded-full relative transition-opacity cursor-pointer",
                  color !== curTheme && "hover:opacity-70",
                  realColor[color]
                )}
              >
                {color === curTheme && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-primary/70">
                    <FaCheck />
                  </div>
                )}
              </div>

              <span className="text-center text-xs w-full inline-block">
                {commonDictionary.theme_colors[color]}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
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
          onValueChange={(val: string) => setCurTheme(val as TThemeColor)}
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
