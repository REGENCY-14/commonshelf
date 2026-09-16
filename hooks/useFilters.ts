"use client";

import { useMemo, useState } from "react";
import type { Book, BookFormat, EditionEntry } from "@/lib/mock-data";
import { FORMAT_CONFIG } from "@/lib/formats";

export type UseFiltersResult = {
  format: BookFormat | "all";
  setFormat: (format: BookFormat | "all") => void;
  language: string | "all";
  setLanguage: (language: string | "all") => void;
  languages: { value: string; count: number }[];
  source: Book["source"] | "all";
  setSource: (source: Book["source"] | "all") => void;
  sources: { value: Book["source"]; count: number }[];
  filteredEditions: EditionEntry[];
  reset: () => void;
};

/**
 * Owns format/language/source filter state for the results page (Figma
 * node 23:1494, "Filter Bar with Pill Affordances"). Operates over
 * *editions* rather than books — each edition carries its own format tags
 * and source, so filtering by "Source: Standard Ebooks" correctly narrows
 * a multi-edition work down to just its Standard Ebooks entry instead of
 * hiding/showing the whole book. FilterBar stays presentational and just
 * calls the setters.
 */
export function useFilters(entries: EditionEntry[]): UseFiltersResult {
  const [format, setFormat] = useState<BookFormat | "all">("all");
  const [language, setLanguage] = useState<string | "all">("all");
  const [source, setSource] = useState<Book["source"] | "all">("all");

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of entries) {
      counts.set(entry.book.language, (counts.get(entry.book.language) ?? 0) + 1);
    }
    return Array.from(counts, ([value, count]) => ({ value, count })).sort((a, b) =>
      a.value.localeCompare(b.value)
    );
  }, [entries]);

  const sources = useMemo(() => {
    const counts = new Map<Book["source"], number>();
    for (const entry of entries) {
      counts.set(entry.sourceLabel as Book["source"], (counts.get(entry.sourceLabel as Book["source"]) ?? 0) + 1);
    }
    return Array.from(counts, ([value, count]) => ({ value, count })).sort((a, b) =>
      a.value.localeCompare(b.value)
    );
  }, [entries]);

  const filteredEditions = useMemo(() => {
    return entries.filter((entry) => {
      const matchesFormat =
        format === "all" ||
        entry.formatTags.some((tag) =>
          FORMAT_CONFIG[format].keywords.some((kw) => tag.label.toLowerCase().includes(kw))
        );
      const matchesLanguage = language === "all" || entry.book.language === language;
      const matchesSource = source === "all" || entry.sourceLabel === source;
      return matchesFormat && matchesLanguage && matchesSource;
    });
  }, [entries, format, language, source]);

  return {
    format,
    setFormat,
    language,
    setLanguage,
    languages,
    source,
    setSource,
    sources,
    filteredEditions,
    reset: () => {
      setFormat("all");
      setLanguage("all");
      setSource("all");
    },
  };
}
