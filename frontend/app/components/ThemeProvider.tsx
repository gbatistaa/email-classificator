"use client";

import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  resolvedThemeAtom,
  systemThemeAtom,
  ResolvedTheme,
} from "../store/themeAtom";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [resolvedTheme] = useAtom(resolvedThemeAtom);
  const setSystemTheme = useSetAtom(systemThemeAtom);

  // Listen to OS theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial system theme
    const updateSystemTheme = () => {
      const newTheme: ResolvedTheme = mediaQuery.matches ? "dark" : "light";
      setSystemTheme(newTheme);
    };

    updateSystemTheme();

    // Listen for changes
    const handleChange = () => {
      updateSystemTheme();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setSystemTheme]);

  // Apply theme class to document body
  useEffect(() => {
    if (resolvedTheme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [resolvedTheme]);

  return <>{children}</>;
}
