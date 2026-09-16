import { GeneratedCover } from "@/components/ui/GeneratedCover";
import { Icon } from "@/components/ui/Icon";
import type { Book } from "@/lib/mock-data";

type BookDetailJacketProps = {
  book: Book;
};

/**
 * Left column of the book detail page (Figma node 22:1195): the abstract
 * generated "jacket" cover with typography overlay, plus the provenance /
 * license badge card below it.
 */
export function BookDetailJacket({ book }: BookDetailJacketProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-[380px] shadow-lg">
        <GeneratedCover
          variant="jacket"
          seed={book.coverSeed ?? book.id}
          title={book.title}
          author={book.authorShort ?? book.author}
          subject={book.subject}
          callNumber={book.callNumber}
          className="aspect-[2/3]"
          eyebrow={book.jacketEyebrow ?? book.editionLabel ?? book.subject}
          meta={book.jacketMeta}
          sourceBadge={book.source}
        />
      </div>

      {(book.licenseLabel || book.provenanceNote) && (
        <div className="flex max-w-[380px] flex-col gap-2.5 bg-muted p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <Icon name="detail-verified-shield" />
              <span className="font-sans text-label font-semibold tracking-wide text-brand-teal">
                Verified Public Domain
              </span>
            </span>
            {book.licenseLabel && (
              <span className="font-sans text-label font-bold tracking-wide text-text-muted">
                {book.licenseLabel}
              </span>
            )}
          </div>

          {book.provenanceNote && (
            <p className="font-sans text-body-sm text-text-secondary">{book.provenanceNote}</p>
          )}

          <div className="flex items-center justify-between gap-2 pt-1">
            {book.catalogRecordNumber && (
              <span className="font-sans text-label font-bold tracking-wide text-text-muted">
                Source: {book.source} #{book.catalogRecordNumber}
              </span>
            )}
            <span className="font-mono text-label font-bold tracking-wide text-text-muted">SHA-256 Verified</span>
          </div>
        </div>
      )}
    </div>
  );
}
