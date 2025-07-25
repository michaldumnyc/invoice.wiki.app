"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light"); // Start with light to prevent SSR mismatch
  const [mounted, setMounted] = useState(false);
  
  // Get system theme preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light"; // fallback for SSR
  }, []);
  
  // Apply theme to document and localStorage
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Determine actual theme to apply
    const actualTheme = newTheme === "system" ? getSystemTheme() : newTheme;
    
    // Remove both themes first
    root.classList.remove("light", "dark");
    // Add actual theme
    root.classList.add(actualTheme);
    // Update localStorage immediately
    window.localStorage.setItem("theme", newTheme);
  }, [getSystemTheme]);

  // Initialize theme on load
  useEffect(() => {
    setMounted(true);
    // Check if theme is stored in localStorage
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    
    if (storedTheme) {
      // Пользователь уже делал выбор - используем его выбор
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      // Первый визит - определяем системную тему и сохраняем как выбор пользователя
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }
  }, [applyTheme, getSystemTheme]);

  // Listen for system theme changes ONLY if user chose "system"
  useEffect(() => {
    if (theme === "system" && mounted && typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = () => {
        if (theme === "system") {
          applyTheme("system");
        }
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, applyTheme, mounted]);

  // Custom setTheme function that updates both state and applies theme
  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  // Don't render theme toggle until mounted to prevent hydration mismatch
  if (!mounted) {
    return { theme: "light" as Theme, setTheme: updateTheme };
  }

  return { theme, setTheme: updateTheme };
} 