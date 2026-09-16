"use client";

import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import type { UseFiltersResult } from "@/hooks/useFilters";
import { FORMAT_CONFIG, RESULTS_FILTER_FORMAT_ORDER } from "@/lib/formats";

type FilterBarProps = {
  filters: UseFiltersResult;
};

/**
 * Compact single-row filter bar for the results page (Figma node 23:1494,
 * "Filter Bar with Pill Affordances"): an active "All formats" pill,
 * format-facet toggle pills, a divider, native-select dropdown pills for
 * language/source, and a "Reset filters" link. Replaces the previous
 * two-section sidebar layout — this design has no left rail.
 */
export function FilterBar({ filters }: FilterBarProps) {
  const { format, setFormat, language, setLanguage, languages, source, setSource, sources, reset } = filters;

  return (
    <div
      role="group"
      aria-label="Filter results"
      className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-4"
    >
      <Chip
        label="All formats"
        icon={format === "all" ? "results-check" : undefined}
        active={format === "all"}
        onClick={() => setFormat("all")}
        layoutId="results-format-filter-active"
        activeClassName="bg-brand-mint"
      />
      {RESULTS_FILTER_FORMAT_ORDER.map((f) => (
        <Chip
          key={f}
          label={FORMAT_CONFIG[f].filterLabel ?? FORMAT_CONFIG[f].label}
          active={format === f}
          onClick={() => setFormat(f)}
          layoutId="results-format-filter-active"
          activeClassName="bg-brand-mint"
        />
      ))}

      <span aria-hidden="true" className="mx-1 h-4 w-px bg-[#e2e2e1]" />

      <DropdownPill
        label="Language"
        value={language}
        onChange={setLanguage}
        options={languages}
      />
      <DropdownPill
        label="Source"
        value={source}
        onChange={(v) => setSource(v as UseFiltersResult["source"])}
        options={sources}
      />

      <button
        type="button"
        onClick={reset}
        className="focus-ring ml-auto flex items-center gap-1 rounded-sm px-2 py-1 font-sans text-caption font-bold uppercase tracking-wide text-text-muted hover:text-text-secondary"
      >
        <Icon name="results-reset" />
        Reset filters
      </button>
    </div>
  );
}

type DropdownPillProps = {
  label: string;
  value: string | "all";
  onChange: (value: string) => void;
  options: { value: string; count: number }[];
};

/**
 * Native `<select>` disguised as one of the design's rounded dropdown
 * pills (chevron + "Label: Value (count)"). A real `<select>` keeps this
 * keyboard/screen-reader accessible for free instead of hand-rolling a
 * listbox for what Figma otherwise shows as a static pill.
 */
function DropdownPill({ label, value, onChange, options }: DropdownPillProps) {
  const selected = options.find((o) => o.value === value);
  const displayValue = value === "all" ? `All (${options.reduce((sum, o) => sum + o.count, 0)})` : selected?.value;

  return (
    <div className="relative inline-flex min-h-[36px] items-center rounded-full bg-white pl-4 pr-8 shadow-xs">
      <span className="pointer-events-none font-sans text-[12px] font-semibold tracking-[0.24px] text-text-primary">
        {label}
        {value !== "all" && selected ? `: ${displayValue} (${selected.count})` : `: ${displayValue}`}
      </span>
      <span className="pointer-events-none absolute right-3 flex items-center">
        <Icon name="results-chevron-down" />
      </span>
      <select
        aria-label={`Filter by ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        <option value="all">All {label.toLowerCase()}s</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.value} ({o.count})
          </option>
        ))}
      </select>
    </div>
  );
}
