"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "commonshelf:bookmarks";

function getInitialBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Reads/writes bookmarked book ids to localStorage (per-viewer convenience only). */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(getInitialBookmarks);

  const persist = useCallback((next: string[]) => {
    setBookmarks(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  const toggle = useCallback(
    (id: string) => {
      persist(isBookmarked(id) ? bookmarks.filter((b) => b !== id) : [...bookmarks, id]);
    },
    [bookmarks, isBookmarked, persist]
  );

  return { bookmarks, isBookmarked, toggle };
}
