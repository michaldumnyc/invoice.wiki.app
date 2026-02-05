"use client"

import { useSyncExternalStore, useCallback } from "react"

function getMatchMediaSnapshot(query: string): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia(query).matches
}

function subscribeMatchMedia(query: string, callback: () => void): () => void {
  const media = window.matchMedia(query)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((callback: () => void) => subscribeMatchMedia(query, callback), [query])
  const getSnapshot = useCallback(() => getMatchMediaSnapshot(query), [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
