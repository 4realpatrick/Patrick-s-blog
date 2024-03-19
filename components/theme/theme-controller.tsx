"use client";
// Cmp
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GrSystem } from "react-icons/gr";
import { LuSun } from "react-icons/lu";
import { RxMoon } from "react-icons/rx";
// Hooks
import { useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
// Constant
import { THEME_ARRAY, TTheme } from "@/constant/theme";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

{
  /* <div className="flex-1 lg:max-w-[400px] max-w-[300px]">
<div
  className={cn(
    "items-center rounded-md border-2 p-1 cursor-pointer hover:border-primary transition-[border]",
    theme === "system" && "border-primary"
  )}
  onClick={() => setTheme("system")}
>
  <div
    className={`space-y-2 rounded-sm p-2 ${
      isSystemDarkTheme ? "bg-slate-950" : "bg-[#ecedef]"
    }`}
  >
    <div
      className={`space-y-2 rounded-md ${
        isSystemDarkTheme ? "bg-slate-800" : "bg-white"
      } p-2 shadow-sm`}
    >
      <div
        className={`h-2 w-[80px] rounded-lg ${
          isSystemDarkTheme ? "bg-slate-400" : "bg-[#ecedef]"
        }`}
      ></div>
      <div
        className={`h-2 w-[100px] rounded-lg ${
          isSystemDarkTheme ? "bg-slate-400" : "bg-[#ecedef]"
        }`}
      ></div>
    </div>
    <div
      className={`flex items-center space-x-2 rounded-md ${
        isSystemDarkTheme ? "bg-slate-800" : "bg-white"
      } p-2 shadow-sm`}
    >
      <div
        className={`h-4 w-4 rounded-full ${
          isSystemDarkTheme ? "bg-slate-400" : "bg-[#ecedef]"
        }`}
      ></div>
      <div
        className={`h-2 w-[100px] rounded-lg ${
          isSystemDarkTheme ? "bg-slate-400" : "bg-[#ecedef]"
        }`}
      ></div>
    </div>
    <div
      className={`flex items-center space-x-2 rounded-md ${
        isSystemDarkTheme ? "bg-slate-800" : "bg-white"
      } p-2 shadow-sm`}
    >
      <div
        className={`h-4 w-4 rounded-full ${
          isSystemDarkTheme ? "bg-slate-400" : "bg-[#ecedef]"
        }`}
      ></div>
      <div
        className={`h-2 w-[100px] rounded-lg ${
          isSystemDarkTheme ? "bg-slate-400" : "bg-[#ecedef]"
        }`}
      ></div>
    </div>
  </div>
</div>
<p className="w-full p-2 text-center font-normal text-sm">
  {commonDictionary.themes.system}
</p>
</div> */
}
export function ThemeController({
  type = "dropdown",
}: {
  type?: "expand" | "dropdown";
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { common: commonDictionary } = useContext(DictionaryContext);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const isSystemDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const themeArray: {
    main: string;
    second: string;
    third: string;
    value: TTheme;
    icon: IconType;
  }[] = [
    {
      main: "bg-[#ecedef]",
      second: "bg-white",
      third: "bg-[#ecedef]",
      value: "light",
      icon: LuSun,
    },
    {
      main: "bg-slate-950",
      second: "bg-slate-800",
      third: "bg-slate-400",
      value: "dark",
      icon: RxMoon,
    },
    {
      main: isSystemDarkTheme ? "bg-slate-950" : "bg-[#ecedef]",
      second: isSystemDarkTheme ? "bg-slate-800" : "bg-white",
      third: isSystemDarkTheme ? "bg-slate-400" : "bg-[#ecedef]",
      value: "system",
      icon: GrSystem,
    },
  ];

  if (type === "expand") {
    return (
      <div className="flex gap-8 items-center flex-wrap">
        {themeArray.map((color) => (
          <div className="flex-1 lg:max-w-[33%] max-w-[50%]" key={color.value}>
            <div
              className={cn(
                "items-center rounded-md border-2 p-1 cursor-pointer hover:border-primary transition-[border]",
                theme === color.value && "border-primary"
              )}
              onClick={() => setTheme(color.value)}
            >
              <div className={`space-y-2 rounded-sm p-2 ${color.main}`}>
                <div
                  className={`space-y-2 rounded-md ${color.second} p-2 shadow-sm`}
                >
                  <div
                    className={`h-2 w-[80px] rounded-lg ${color.third}`}
                  ></div>
                  <div
                    className={`h-2 w-[100px] rounded-lg ${color.third}`}
                  ></div>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md ${color.second} p-2 shadow-sm`}
                >
                  <div className={`h-4 w-4 rounded-full ${color.third}`}></div>
                  <div
                    className={`h-2 w-[100px] rounded-lg ${color.third}`}
                  ></div>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md ${color.second} p-2 shadow-sm`}
                >
                  <div className={`h-4 w-4 rounded-full ${color.third}`}></div>
                  <div
                    className={`h-2 w-[100px] rounded-lg ${color.third}`}
                  ></div>
                </div>
              </div>
            </div>
            <p className="w-full p-2 text-center font-normal text-sm inline-flex items-center justify-center">
              {color.icon({ className: "mr-2 size-4" })}
              {commonDictionary.themes[color.value]}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <RxMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {THEME_ARRAY.map((theme) => (
            <DropdownMenuRadioItem
              value={theme}
              className="justify-between"
              key={theme}
            >
              {commonDictionary.themes[theme]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
