"use client";
// Cmp
import { Button, ButtonProps } from "@/components/ui/button";
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
  THEME_ARRAY,
  TTheme,
  getThemeFromLocal,
} from "@/constant/theme";
import { ColorWheelIcon } from "@radix-ui/react-icons";

// Hooks
import { useEffect, useState } from "react";
interface IThemeControllerProps {
  variant?: ButtonProps["variant"];
}
export function ThemeController({
  variant = "default",
}: IThemeControllerProps) {
  const [mounted, setMounted] = useState(false);
  const [curTheme, setCurTheme] = useState<TTheme>(getThemeFromLocal());
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(BLOG_THEME_KEY, curTheme);
      document.documentElement.setAttribute("data-theme", curTheme);
    }
  }, [curTheme, mounted]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="md:hidden">
          <div className="flex items-center">
            <ColorWheelIcon className="text-primary size-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">
          <DropdownMenuRadioGroup
            value={curTheme}
            onValueChange={(val: string) => setCurTheme(val as TTheme)}
          >
            {THEME_ARRAY.map((theme) => (
              <DropdownMenuRadioItem
                value={theme}
                className="justify-between"
                key={theme}
              >
                <span>
                  {theme.slice(0, 1).toUpperCase() +
                    theme.slice(1).toLowerCase()}
                </span>
                <div
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[${theme}] hover:bg-primary/80 rotate-90 justify-end`}
                ></div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden md:block">
          <Button variant={variant} size="lg" className="text-lg">
            主题
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-30">
          <DropdownMenuRadioGroup
            value={curTheme}
            onValueChange={(val: string) => setCurTheme(val as TTheme)}
          >
            {THEME_ARRAY.map((theme) => (
              <DropdownMenuRadioItem
                value={theme}
                className="justify-between"
                key={theme}
              >
                <span>
                  {theme.slice(0, 1).toUpperCase() +
                    theme.slice(1).toLowerCase()}
                </span>
                <div
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 rotate-90 justify-end`}
                  style={{ background: theme }}
                ></div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
