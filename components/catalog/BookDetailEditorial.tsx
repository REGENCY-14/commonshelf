import { SpecStat } from "@/components/ui/SpecStat";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { BookDetailActions } from "@/components/catalog/BookDetailActions";
import type { Book } from "@/lib/mock-data";

type BookDetailEditorialProps = {
  book: Book;
};

/**
 * Right column of the book detail page (Figma node 22:1238): genre tags,
 * title/byline, the horizontal spec bar, the "About the Work" synopsis,
 * the action row, and the reader-guarantee notice.
 */
export function BookDetailEditorial({ book }: BookDetailEditorialProps) {
  const genres = book.genres ?? [book.subject];
  const [primaryGenre, ...secondaryGenres] = genres;
  const synopsis = book.synopsis ?? [book.description];
  const [synopsisPrimary, synopsisSecondary] = synopsis;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {primaryGenre && (
          <span className="inline-flex items-center rounded-full bg-brand-mint/20 px-3 py-1 font-sans text-label font-semibold tracking-wide text-brand-teal">
            {primaryGenre}
          </span>
        )}
        {secondaryGenres.map((genre) => (
          <span
            key={genre}
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 font-sans text-label font-bold tracking-wide text-text-secondary"
          >
            {genre}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[40px] leading-[48px] tracking-[-1.2px] text-text-primary sm:text-[48px]">
          {book.title}
        </h1>
        {book.subtitle && (
          <p className="font-serif text-h2 italic leading-[32px] tracking-[-0.24px] text-text-secondary">
            {book.subtitle}
          </p>
        )}
        <p className="pt-1 font-sans text-body-lg text-text-muted">
          By{" "}
          <a href={`/results?author=${encodeURIComponent(book.author)}`} className="font-sans text-[15px] font-semibold text-text-primary underline decoration-brand-mint decoration-1 underline-offset-2 focus-ring">
            {book.author}
          </a>
          {book.authorFullName && ` (${book.authorFullName})`}
          {book.publicationYear > 0 && `, ${book.publicationYear}`}
        </p>
      </div>

      <div className="flex items-start gap-2 bg-muted p-4">
        <SpecStat
          label="First Published"
          value={book.publishedRange ?? (book.publicationYear > 0 ? String(book.publicationYear) : "Unknown")}
          withDivider
        />
        <SpecStat label="Language" value={book.languageDetail ?? book.language} withDivider />
        <SpecStat
          label="Length"
          value={book.wordCountLabel ?? "N/A"}
          secondary={book.readTimeLabel}
          withDivider
        />
        <SpecStat label="Formats" value={book.formatsLabel ?? book.formats.join(", ")} />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-sans text-h3 font-semibold tracking-[-0.45px] text-text-primary">About the Work</h2>
        <p className="max-w-[70ch] font-sans text-body-lg leading-[27.63px] text-text-secondary">
          {synopsisPrimary}
        </p>
        {synopsisSecondary && (
          <p className="max-w-[70ch] font-sans text-body-sm leading-[24.38px] text-text-muted">
            {synopsisSecondary}
          </p>
        )}
      </div>

      <BookDetailActions book={book} />

      <NoticeCard icon="detail-guarantee-seal" heading="Standard Reader Guarantee">
        Free from copyright restrictions. Transcribed, proofread, and formatted for effortless reading across
        modern devices with typographic drop caps, correct em dashes, and navigable table of contents.
      </NoticeCard>
    </div>
  );
}
