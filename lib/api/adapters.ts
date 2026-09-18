import type { Book } from "@/lib/mock-data";
import type { ApiBook } from "./bot-client";

/**
 * Maps a book from the bot backend's API shape into the frontend's own
 * `Book` type, so it can flow through the existing `getEditionsForBook` /
 * `getEditionEntries` helpers and every component that already renders a
 * `Book` unchanged.
 */
export function apiBookToBook(apiBook: ApiBook): Book {
  return {
    id: apiBook.id,
    title: apiBook.title,
    author: apiBook.author,
    formats: apiBook.formats.map((format) => format.type),
    language: apiBook.language,
    publicationYear: apiBook.year ? Number(apiBook.year) : 0,
    callNumber: `PG ${apiBook.id}`,
    subject: apiBook.subjects[0] ?? "General",
    sourceLine: apiBook.sourceCatalog,
    source: apiBook.sourceCatalog as Book["source"],
    description: apiBook.description ?? "No description available for this title yet.",
    coverImage: apiBook.coverUrl ?? undefined,
    category: apiBook.subjects[0] ?? "General",
    genres: apiBook.subjects,
    languageDetail: apiBook.language,
    catalogRecordNumber: apiBook.id,
    licenseLabel: `Public Domain (${apiBook.sourceCatalog})`,
  };
}
