import type { Book } from "@/lib/mock-data";
import { BookCard } from "./BookCard";

type RelatedBooksRowProps = {
  books: Book[];
  title?: string;
};

/** Horizontal-scrolling / wrapping row of related BookCards for the detail page. */
export function RelatedBooksRow({ books, title = "You might also like" }: RelatedBooksRowProps) {
  if (books.length === 0) return null;

  return (
    <section aria-labelledby="related-books-heading" className="flex flex-col gap-4">
      <h2 id="related-books-heading" className="font-serif text-h2 text-text-primary">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
