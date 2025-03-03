"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  
  // Apply theme to document and localStorage
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Remove both themes first
    root.classList.remove("light", "dark");
    // Add new theme
    root.classList.add(newTheme);
    // Update localStorage immediately
    window.localStorage.setItem("theme", newTheme);
  }, []);

  // Initialize theme on load
  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    
    // Default to light theme if no theme is stored
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, [applyTheme]);

  // Custom setTheme function that updates both state and applies theme
  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  return { theme, setTheme: updateTheme };
} 