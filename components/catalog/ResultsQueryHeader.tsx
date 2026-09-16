"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

type ResultsQueryHeaderProps = {
  query: string;
  resultCount: number;
  loading: boolean;
};

/**
 * Figma node 23:1474, "Query Feedback & Search Header Section": an
 * eyebrow, an H1 with the quoted query rendered in italic brand green, a
 * subhead, and — on the right — a compact "live refinement" pill search
 * input.
 *
 * This pill is visually and behaviorally distinct from `SearchInput` (the
 * homepage hero's search bar): it's ~384px vs. `SearchInput`'s 672px max
 * width, a single flat `bg-muted` pill with no visible submit button
 * (Enter re-submits), and its own compact icon set — so it's implemented
 * as its own small block here rather than stretching `SearchInput`'s
 * variants to fit.
 */
export function ResultsQueryHeader({ query, resultCount, loading }: ResultsQueryHeaderProps) {
  const router = useRouter();

  const submit = (value: string) => {
    router.push(value.trim() ? `/results?q=${encodeURIComponent(value)}` : "/results");
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex max-w-[672px] flex-col gap-1">
          <p className="font-sans text-caption font-bold uppercase tracking-[0.55px] text-text-muted">
            Search query
          </p>
          <h1 className="font-serif text-h2 tracking-[-0.9px] text-text-primary sm:text-[36px]">
            {query ? (
              <>
                Results for <span className="italic text-brand-teal">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              "Browse the catalog"
            )}
          </h1>
          <p className="pt-1 text-[15px] leading-6 text-text-secondary">
            {loading
              ? "Searching…"
              : query
                ? `Found ${resultCount} public-domain edition${resultCount === 1 ? "" : "s"}, commentaries, and related open-access texts preserved in our common index.`
                : `Showing ${resultCount} edition${resultCount === 1 ? "" : "s"} across the full catalog.`}
          </p>
        </div>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const value = new FormData(e.currentTarget).get("q");
            submit(typeof value === "string" ? value : "");
          }}
          className="flex w-full max-w-[384px] items-center gap-2 rounded-full bg-muted px-4 py-2 shadow-xs"
        >
          <Icon name="results-pill-search" />
          <input
            key={query}
            name="q"
            type="text"
            defaultValue={query}
            placeholder="Search the catalog…"
            aria-label="Refine your search"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-sans text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => submit("")}
              aria-label="Clear search query"
              className="focus-ring flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e2e2e1] text-text-secondary"
            >
              <Icon name="results-pill-clear" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
