"use client";

import { useEffect, useMemo, useState } from "react";
import { searchBooks, type Book } from "@/lib/mock-data";

const DEBOUNCE_MS = 200;

export type UseSearchResult = {
  query: string;
  setQuery: (value: string) => void;
  debouncedQuery: string;
  results: Book[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

/**
 * Owns debounced search-query state + derived autocomplete results.
 * Presentational components (SearchInput, the autocomplete listbox) stay
 * dumb and simply render what this hook returns.
 */
export function useSearch(initialQuery = ""): UseSearchResult {
  const [query, setQueryState] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const setQuery = (value: string) => {
    setDismissed(false);
    setQueryState(value);
  };

  const results = useMemo(() => searchBooks(debouncedQuery).slice(0, 6), [debouncedQuery]);
  const isOpen = !dismissed && debouncedQuery.trim().length > 0;

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    isOpen,
    open: () => setDismissed(false),
    close: () => setDismissed(true),
  };
}
