"use client";

import { useEffect, useRef, useState } from "react";
import type { Book } from "@/lib/mock-data";
import { searchBooksRemote } from "@/lib/api/bot-client";
import { apiBookToBook } from "@/lib/api/adapters";

const DEBOUNCE_MS = 200;

export type UseSearchResult = {
  query: string;
  setQuery: (value: string) => void;
  debouncedQuery: string;
  results: Book[];
  isLoading: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

/**
 * Owns debounced search-query state + autocomplete results fetched from
 * the bot backend's /api/search. Presentational components (SearchInput,
 * the autocomplete listbox) stay dumb and simply render what this hook
 * returns.
 */
export function useSearch(initialQuery = ""): UseSearchResult {
  const [query, setQueryState] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [dismissed, setDismissed] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const requestId = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const thisRequest = ++requestId.current;
    setIsLoading(true);

    searchBooksRemote(trimmed)
      .then((data) => {
        if (requestId.current !== thisRequest) return;
        setResults(data.results.slice(0, 6).map(apiBookToBook));
      })
      .catch(() => {
        if (requestId.current !== thisRequest) return;
        setResults([]);
      })
      .finally(() => {
        if (requestId.current !== thisRequest) return;
        setIsLoading(false);
      });
  }, [debouncedQuery]);

  const setQuery = (value: string) => {
    setDismissed(false);
    setQueryState(value);
  };

  const isOpen = !dismissed && debouncedQuery.trim().length > 0;

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    isLoading,
    isOpen,
    open: () => setDismissed(false),
    close: () => setDismissed(true),
  };
}
