"use client";

import { useEffect, useState } from "react";

/**
 * Shared helper for respecting `prefers-reduced-motion` across the app.
 * Components/animations should read this instead of checking
 * `window.matchMedia` ad hoc.
 */
function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitialReducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/** Motion variants that collapse to instant/no-op transitions when reduced motion is requested. */
export function getMotionTransition(reduced: boolean, transition: object) {
  return reduced ? { duration: 0 } : transition;
}
