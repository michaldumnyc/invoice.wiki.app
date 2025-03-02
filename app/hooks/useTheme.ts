"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  
  // Apply theme to document
  const applyTheme = useCallback((theme: Theme) => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, []);

  // Initialize theme on load
  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    
    // Default to light theme if no theme is stored
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
  }, []);

  // Apply theme when changed and store in localStorage
  useEffect(() => {
    if (theme) {
      applyTheme(theme);
      window.localStorage.setItem("theme", theme);
    }
  }, [theme, applyTheme]);

  return { theme, setTheme };
} 