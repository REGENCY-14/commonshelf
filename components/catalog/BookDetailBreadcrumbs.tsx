"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { Book } from "@/lib/mock-data";

type BookDetailBreadcrumbsProps = {
  book: Book;
};

/**
 * Top bar of the book detail page (Figma node 22:1172): a breadcrumb trail,
 * a "Catalog Record #" status pill, and bookmark/share icon buttons.
 */
export function BookDetailBreadcrumbs({ book }: BookDetailBreadcrumbsProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(book.id);

  const handleShare = () => {
    if (typeof navigator === "undefined") return;
    const url = `${window.location.origin}/books/${book.id}`;
    if (navigator.share) {
      navigator.share({ title: book.title, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 pb-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link href="/" className="font-sans text-body-sm text-text-muted hover:text-text-primary">
          Home
        </Link>
        <Icon name="detail-breadcrumb-chevron" />
        <Link href="/results" className="font-sans text-body-sm text-text-muted hover:text-text-primary">
          Search results
        </Link>
        <Icon name="detail-breadcrumb-chevron" />
        <span className="font-sans text-[15px] font-semibold leading-[22px] text-text-primary">{book.title}</span>
      </nav>

      <div className="flex items-center gap-2">
        {book.catalogRecordNumber && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
            <span className="size-2 rounded-full bg-brand-mint" aria-hidden="true" />
            <span className="font-sans text-label font-bold tracking-wide text-text-muted">
              Catalog Record #{book.catalogRecordNumber}
            </span>
          </span>
        )}
        <button
          type="button"
          onClick={() => toggle(book.id)}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this book"}
          className="focus-ring flex size-8 items-center justify-center rounded-full bg-muted hover:bg-[#e8e8e6]"
        >
          <Icon name="detail-bookmark" className={bookmarked ? "opacity-100" : "opacity-60"} />
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this book"
          className="focus-ring flex size-8 items-center justify-center rounded-full bg-muted hover:bg-[#e8e8e6]"
        >
          <Icon name="detail-share" />
        </button>
      </div>
    </div>
  );
}
