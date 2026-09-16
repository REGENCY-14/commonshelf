import type { BookFormat } from "./mock-data";

export type FormatConfigEntry = {
  label: string;
  /** Tailwind classes for background + text color. */
  className: string;
  /** Short description used on the format-guide banner / detail page. */
  description: string;
  /** Longer label for filter-chip contexts (results page). Falls back to `label`. */
  filterLabel?: string;
  /** Loose keywords used to match a free-form edition format-tag label (results page editions) to this format facet. */
  keywords: string[];
};

/**
 * Config-driven format registry. Adding a new format anywhere in the app
 * means adding an entry here — no component code changes required.
 */
export const FORMAT_CONFIG: Record<BookFormat, FormatConfigEntry> = {
  epub: {
    label: "EPUB",
    className: "bg-surface text-text-primary",
    description: "Optimal for phones and e-readers (Kobo, Kindle).",
    keywords: ["epub"],
  },
  pdf: {
    label: "PDF",
    className: "bg-surface text-text-primary",
    description: "Preserves original typeset pages.",
    keywords: ["pdf"],
  },
  "read-online": {
    label: "Read Online",
    className: "bg-accent-green text-accent-green-text",
    description: "Opens right in your browser without downloading.",
    keywords: ["read online", "page turner"],
  },
  txt: {
    label: "TXT",
    className: "bg-surface text-text-primary",
    description: "Plain text — universally compatible, no formatting.",
    filterLabel: "Plain text (ASCII)",
    keywords: ["plain text", "ascii", "txt", "text"],
  },
  audiobook: {
    label: "Audiobook",
    className: "bg-surface text-text-primary",
    description: "Narrated audio edition, streamed or downloaded.",
    keywords: ["audiobook", "audio"],
  },
};

export const FORMAT_ORDER: BookFormat[] = ["epub", "pdf", "read-online", "txt"];

/**
 * Facet order for the results page's compact filter-pill row (Figma node
 * 23:1494) — deliberately excludes "read-online" (it's a per-edition action
 * there, not a filterable format facet) and adds "audiobook", which isn't
 * used elsewhere in the app yet.
 */
export const RESULTS_FILTER_FORMAT_ORDER: BookFormat[] = ["epub", "pdf", "txt", "audiobook"];
