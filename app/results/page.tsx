"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterBar } from "@/components/catalog/FilterBar";
import { ResultRow } from "@/components/catalog/ResultRow";
import { ResultsQueryHeader } from "@/components/catalog/ResultsQueryHeader";
import { ResultsPagination } from "@/components/catalog/ResultsPagination";
import { EmptyState } from "@/components/catalog/EmptyState";
import { SkeletonRow } from "@/components/catalog/SkeletonRow";
import { useFilters } from "@/hooks/useFilters";
import { books, getEditionEntries } from "@/lib/mock-data";

const PAGE_SIZE = 10;
const INITIAL_VISIBLE = 4;

/**
 * Search results page (Figma file 20GKGVAFmt5Y902ZOeIpS5, node 23:1470,
 * "Html → Body"). Renders one card per *edition* (a specific
 * source/printing of a work) rather than one row per book — see
 * `lib/mock-data.ts:Edition` for the data-model rationale.
 */
function ResultsContent({ query, category }: { query: string; category: string | null }) {
  // Remounted via `key` whenever query/category change, so loading always
  // starts true for the new search without a synchronous setState in an effect.
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const matchingBooks = useMemo(() => {
    let list = books;
    if (category) list = list.filter((b) => b.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.subject.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, category]);

  const allEditions = useMemo(() => getEditionEntries(matchingBooks), [matchingBooks]);
  const filters = useFilters(allEditions);
  const { filteredEditions } = filters;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const visibleEditions = filteredEditions.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-12">
      <ResultsQueryHeader query={query} resultCount={filteredEditions.length} loading={loading} />

      <div className="pb-6">
        <FilterBar filters={filters} />
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
        ) : filteredEditions.length === 0 ? (
          <EmptyState
            title="No editions found"
            description="Try a different title, author, or clear your filters to browse the full catalog."
            primaryActionLabel="Browse the full catalog"
            primaryActionHref="/results"
            secondaryActionLabel={undefined}
            secondaryActionHref={undefined}
            showGraphic={false}
          />
        ) : (
          visibleEditions.map((edition) => <ResultRow key={edition.id} edition={edition} />)
        )}
      </div>

      {!loading && filteredEditions.length > 0 && (
        <ResultsPagination
          visibleCount={visibleCount}
          total={filteredEditions.length}
          onLoadMore={() => setVisibleCount((v) => Math.min(v + PAGE_SIZE, filteredEditions.length))}
          onPrevious={() => setVisibleCount((v) => Math.max(INITIAL_VISIBLE, v - PAGE_SIZE))}
        />
      )}

      {/* Figma shows this "keep exploring" callout unconditionally below
          pagination, not only on a true zero-results state — kept visible
          here too so a search that *does* find results still surfaces it. */}
      <div className="pt-2">
        <EmptyState />
      </div>
    </div>
  );
}

function ResultsRoute() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category");

  return <ResultsContent key={`${query}::${category ?? ""}`} query={query} category={category} />;
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-12" />}>
      <ResultsRoute />
    </Suspense>
  );
}
