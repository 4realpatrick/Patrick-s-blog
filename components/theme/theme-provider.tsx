"use client";
import { BLOG_THEME_KEY } from "@/constant/theme";
import { useEffect, useState } from "react";

const ThemeProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      const theme = localStorage.getItem(BLOG_THEME_KEY);
      document.documentElement.setAttribute("data-theme", theme || "blue");
    }
  }, [mounted]);
  return null;
};

export default ThemeProvider;
