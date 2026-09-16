"use client";

import { Icon } from "@/components/ui/Icon";

const PAGE_SIZE = 10;

type ResultsPaginationProps = {
  /** How many editions are currently visible (grows by PAGE_SIZE each "Load next" click). */
  visibleCount: number;
  total: number;
  onLoadMore: () => void;
  onPrevious: () => void;
};

/**
 * Figma node 23:1707, "Section - Pagination Pill Controls": a result-range
 * caption on the left, and on the right a muted "Previous" pill (disabled
 * on page 1), a "Page N of M" pill, and a primary "Load next 10 results"
 * pill. Wired to a real incremental reveal over the filtered edition list
 * rather than Figma's static "1–4 of 18" placeholder copy.
 */
export function ResultsPagination({ visibleCount, total, onLoadMore, onPrevious }: ResultsPaginationProps) {
  const shown = Math.min(visibleCount, total);
  const currentPage = shown === 0 ? 1 : Math.ceil(shown / PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasMore = shown < total;
  const canGoBack = currentPage > 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-8">
      <p className="text-body-sm text-text-muted">
        Showing editions {total === 0 ? 0 : 1}–{shown} of {total} total results
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoBack}
          className="focus-ring flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 font-sans text-[12px] font-semibold tracking-[0.24px] text-text-primary disabled:opacity-40"
        >
          <Icon name="results-chevron-left" />
          Previous
        </button>
        <span className="rounded-full bg-[#eeeeec] px-3.5 py-1.5 font-sans text-[12px] font-semibold tracking-[0.24px] text-text-primary">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={onLoadMore}
          disabled={!hasMore}
          className="focus-ring flex items-center gap-1.5 rounded-full bg-brand-mint px-5 py-2 font-sans text-[12px] font-semibold tracking-[0.24px] text-white shadow-xs hover:bg-brand-teal disabled:pointer-events-none disabled:opacity-40"
        >
          Load next {Math.min(PAGE_SIZE, Math.max(total - shown, 0))} results
          <Icon name="results-chevron-right" />
        </button>
      </div>
    </div>
  );
}
