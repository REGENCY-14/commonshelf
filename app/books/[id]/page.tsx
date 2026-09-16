import { notFound } from "next/navigation";
import { getBookById, getBooksByAuthor, countBooksByAuthor, books } from "@/lib/mock-data";
import { BookDetailBreadcrumbs } from "@/components/catalog/BookDetailBreadcrumbs";
import { BookDetailJacket } from "@/components/catalog/BookDetailJacket";
import { BookDetailEditorial } from "@/components/catalog/BookDetailEditorial";
import { AuthorWorksSection } from "@/components/catalog/AuthorWorksSection";

/**
 * Book detail page, rebuilt from Figma (file 20GKGVAFmt5Y902ZOeIpS5, node
 * 22:1168 — "Html -> Body"). Two-column desktop layout (jacket + provenance
 * card on the left, editorial content on the right) that stacks to one
 * column below `md`, per the project's existing responsive conventions.
 * The outer rounded-card-with-shadow wrapper Figma shows around the whole
 * page (node 22:1169) is artboard chrome, not real product UI, and is
 * intentionally not implemented — consistent with the homepage build.
 */
export function generateStaticParams() {
  return books.map((book) => ({ id: book.id }));
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) notFound();

  const authorWorks = getBooksByAuthor(book);
  const authorWorkCount = countBooksByAuthor(book);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-10">
      <BookDetailBreadcrumbs book={book} />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[380px_1fr] md:gap-12">
        <aside className="md:sticky md:top-24 md:self-start">
          <BookDetailJacket book={book} />
        </aside>

        <div className="flex flex-col gap-12">
          <BookDetailEditorial book={book} />
          <AuthorWorksSection author={book.author} books={authorWorks} totalCount={authorWorkCount} />
        </div>
      </div>
    </div>
  );
}
