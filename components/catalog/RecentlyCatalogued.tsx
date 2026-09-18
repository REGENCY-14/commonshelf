import Link from "next/link";
import { getBookByIdRemote } from "@/lib/api/bot-client";
import { apiBookToBook } from "@/lib/api/adapters";
import { BookCoverImage } from "@/components/ui/BookCoverImage";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

/**
 * The four editions featured in this section (Open Library work ids),
 * paired with the top-right cover badge Figma shows for each (format/
 * edition label distinct from the bottom-row tag, which comes from
 * `book.editionLabel`).
 */
const FEATURED = [
  { id: "OL8193416W", coverBadge: "EPUB + PDF" }, // The Picture of Dorian Gray
  { id: "OL66554W", coverBadge: "EPUB" }, // Pride and Prejudice
  { id: "OL166894W", coverBadge: "New Edition" }, // Crime and Punishment
  { id: "OL450063W", coverBadge: "EPUB" }, // Frankenstein
] as const;

/** "Recently Catalogued" section (Figma node 20:956): a 4-column grid of real book covers with format/edition badges. */
export async function RecentlyCatalogued() {
  const books = await Promise.all(
    FEATURED.map(async ({ id, coverBadge }) => {
      try {
        const detail = await getBookByIdRemote(id);
        return detail ? { book: apiBookToBook(detail), coverBadge } : null;
      } catch {
        return null;
      }
    })
  );

  return (
    <section id="recently-catalogued" className="px-4 py-10 sm:px-12">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center">
        <div className="flex max-w-[672px] flex-col items-center gap-2 text-center">
          <p className="font-sans text-eyebrow font-bold uppercase tracking-[0.6px] text-brand-teal">
            Curated arrivals
          </p>
          <h2 className="font-serif text-section-heading tracking-[-0.9px] text-text-primary">
            Recently Catalogued
          </h2>
          <p className="font-sans text-[15px] leading-6 text-text-secondary">
            New open-access additions formatted and checked by volunteer bibliophiles for
            archival fidelity.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((entry) => {
            if (!entry) return null;
            const { book, coverBadge } = entry;
            return (
              <article key={book.id} className="flex flex-col bg-white p-3 shadow-xs">
                <Link href={`/books/${book.id}`} className="focus-ring relative block pb-4">
                  {book.coverImage ? (
                    <BookCoverImage
                      src={book.coverImage}
                      title={book.title}
                      author={book.author}
                      className="aspect-[3/4] bg-muted"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  ) : null}
                  <span className="absolute right-3 top-3">
                    <Badge variant="mint">{coverBadge}</Badge>
                  </span>
                </Link>

                <div className="flex flex-1 flex-col gap-0.5 px-1">
                  <Link href={`/books/${book.id}`} className="focus-ring rounded-sm">
                    <h3 className="truncate font-serif text-h3 text-text-primary">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="pb-3 font-sans text-[13px] leading-5 text-text-secondary">
                    {book.author}
                    {book.publicationYear > 0 && ` · ${book.publicationYear}`}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <Badge variant="muted">{book.editionLabel ?? book.source}</Badge>
                    <Icon name="home-download" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex w-full justify-end pt-8">
          <Link
            href="/results"
            className="focus-ring flex items-center gap-2 rounded-sm font-sans text-[14px] font-semibold leading-[18px] tracking-[0.14px] text-brand-teal underline decoration-brand-teal/40 decoration-1 underline-offset-4 hover:text-brand-dark"
          >
            View all 1,420 catalogued this month
            <span className="flex size-7 items-center justify-center rounded-full bg-brand-mint/20">
              <Icon name="home-arrow-link" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
