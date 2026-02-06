"use client"

import { useState, useEffect, useCallback } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  }, [])

  const applyTheme = useCallback(
    (newTheme: Theme) => {
      const root = document.documentElement
      const actualTheme = newTheme === "system" ? getSystemTheme() : newTheme

      root.classList.remove("light", "dark")
      root.classList.add(actualTheme)
      localStorage.setItem("theme", newTheme)
    },
    [getSystemTheme]
  )

  // Initialize — blocking script already applied class, just sync React state
  useEffect(() => {
    const raw = localStorage.getItem("theme")
    const stored: Theme | null = raw === "light" || raw === "dark" || raw === "system" ? raw : null

    const initial = stored ?? getSystemTheme()
    // Reading from localStorage on mount is a valid sync-from-external-store pattern
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme((prev) => (prev !== initial ? initial : prev))
    setMounted(true)
  }, [getSystemTheme])

  // Listen for system theme changes when "system" is selected
  useEffect(() => {
    if (theme !== "system" || !mounted) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => applyTheme("system")

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, applyTheme, mounted])

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme)
      applyTheme(newTheme)
    },
    [applyTheme]
  )

  if (!mounted) {
    return { theme: "light" as Theme, setTheme: updateTheme }
  }

  return { theme, setTheme: updateTheme }
}
