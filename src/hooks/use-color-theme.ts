import { useState, useEffect } from "react";

export type ColorTheme = "gold" | "blue" | "emerald";

const THEMES: { value: ColorTheme; label: string; color: string }[] = [
  { value: "gold", label: "Gold", color: "hsl(36, 90%, 50%)" },
  { value: "blue", label: "Blue", color: "hsl(210, 90%, 50%)" },
  { value: "emerald", label: "Emerald", color: "hsl(160, 80%, 38%)" },
];

export function useColorTheme() {
  const [theme, setThemeState] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem("color-theme") as ColorTheme | null;
    return stored && ["gold", "blue", "emerald"].includes(stored) ? stored : "gold";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-gold", "theme-blue", "theme-emerald");
    if (theme !== "gold") {
      root.classList.add(`theme-${theme}`);
    }
    localStorage.setItem("color-theme", theme);
  }, [theme]);

  return { theme, setTheme: setThemeState, themes: THEMES };
}
