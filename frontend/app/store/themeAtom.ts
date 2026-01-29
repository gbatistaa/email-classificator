"use client";

import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

// Theme preference: what the user selected
export type ThemePreference = "light" | "dark" | "system";

// Actual resolved theme (what is displayed)
export type ResolvedTheme = "light" | "dark";

// Custom storage that defaults to "system" if empty
const themeStorage = {
  getItem: (key: string): ThemePreference => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem(key);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    // No stored value, default to system
    return "system";
  },
  setItem: (key: string, value: ThemePreference): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

// User's theme preference atom (light, dark, or system)
export const themePreferenceAtom = atomWithStorage<ThemePreference>(
  "mailprism-theme",
  "system",
  themeStorage,
);

// Atom to store the current OS theme
export const systemThemeAtom = atom<ResolvedTheme>("dark");

// Derived atom that resolves the actual theme based on preference
export const resolvedThemeAtom = atom((get) => {
  const preference = get(themePreferenceAtom);
  const systemTheme = get(systemThemeAtom);

  if (preference === "system") {
    return systemTheme;
  }
  return preference;
});
