"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = usePrefersTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <>{children}</>;
}

function usePrefersTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme: Theme = matcher.matches ? "dark" : "light";
    setTheme(initialTheme);

    const listener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    matcher.addEventListener("change", listener);
    return () => {
      matcher.removeEventListener("change", listener);
    };
  }, []);

  return [theme, setTheme];
}
