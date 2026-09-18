"use client";

import { Icon } from "@/components/ui/Icon";
import type { Book } from "@/lib/mock-data";

type BookDetailActionsProps = {
  book: Book;
};

/**
 * Action row on the book detail page (Figma node 22:1238's "Action Buttons
 * Row"): a primary "Read online" pill CTA, format download buttons, and a
 * smaller auxiliary link row underneath.
 */
export function BookDetailActions({ book }: BookDetailActionsProps) {
  const hasReadOnline = book.formats.includes("read-online");
  const hasEpub = book.formats.includes("epub");
  const hasPdf = book.formats.includes("pdf");
  const hasTxt = book.formats.includes("txt");

  const handleCitation = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    const year = book.publicationYear > 0 ? ` ${book.publicationYear}.` : "";
    const citation = `${book.author}. ${book.title}.${year}`;
    navigator.clipboard.writeText(citation).catch(() => {});
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="flex flex-wrap items-center gap-3">
        {hasReadOnline && (
          <a
            href={`/books/${book.id}/read`}
            className="focus-ring inline-flex items-center gap-2.5 rounded-full bg-brand-mint px-7 py-3.5 shadow-[0px_8px_20px_-4px_rgba(78,192,149,0.4)] hover:bg-brand-teal"
          >
            <Icon name="detail-read-online" />
            <span className="font-sans text-[14px] font-semibold tracking-[0.14px] text-white">Read online</span>
            <Icon name="arrow-right-3" />
          </a>
        )}
        {hasEpub && (
          <a
            href={`/books/${book.id}/download/epub`}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-muted px-5 py-3 shadow-xs hover:bg-[#e8e8e6]"
          >
            <Icon name="detail-download" />
            <span className="font-sans text-[14px] font-semibold tracking-[0.14px] text-text-primary">
              Download EPUB
            </span>
            {book.epubSizeLabel && (
              <span className="font-sans text-label font-bold tracking-wide text-text-muted">
                {book.epubSizeLabel}
              </span>
            )}
          </a>
        )}
        {hasPdf && (
          <a
            href={`/books/${book.id}/download/pdf`}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-muted px-5 py-3 shadow-xs hover:bg-[#e8e8e6]"
          >
            <Icon name="detail-pdf" />
            <span className="font-sans text-[14px] font-semibold tracking-[0.14px] text-text-primary">PDF</span>
          </a>
        )}
        {hasTxt && (
          <a
            href={`/books/${book.id}/download/txt`}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-muted px-4 py-3 shadow-xs hover:bg-[#e8e8e6]"
          >
            <Icon name="detail-text-doc" />
            <span className="font-sans text-[14px] font-semibold tracking-[0.14px] text-text-primary">Text</span>
          </a>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="button"
          className="focus-ring flex items-center gap-1.5 rounded-sm"
          aria-label="Send to Kindle or e-Reader"
        >
          <Icon name="detail-kindle" />
          <span className="font-sans text-label font-semibold tracking-wide text-text-muted">
            Send to Kindle / e-Reader
          </span>
        </button>
        <span className="font-sans text-body-lg text-border-strong" aria-hidden="true">
          •
        </span>
        <button
          type="button"
          onClick={handleCitation}
          className="focus-ring flex items-center gap-1.5 rounded-sm"
        >
          <Icon name="detail-copy-citation" />
          <span className="font-sans text-label font-semibold tracking-wide text-text-muted">
            Copy citation (MLA / Chicago)
          </span>
        </button>
        <span className="font-sans text-body-lg text-border-strong" aria-hidden="true">
          •
        </span>
        <a href={`/books/${book.id}/history`} className="focus-ring flex items-center gap-1.5 rounded-sm">
          <Icon name="detail-revision-history" />
          <span className="font-sans text-label font-semibold tracking-wide text-text-muted">
            Revision History
          </span>
        </a>
      </div>
    </div>
  );
}
