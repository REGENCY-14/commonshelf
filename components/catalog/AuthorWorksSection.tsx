"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GeneratedCover } from "@/components/ui/GeneratedCover";
import { Icon } from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Book } from "@/lib/mock-data";

type AuthorWorksSectionProps = {
  author: string;
  books: Book[];
  totalCount: number;
};

/**
 * "More by this author" section on the book detail page (Figma node
 * 22:1345): a compact grid of the same abstract-jacket cover treatment as
 * `BookDetailJacket`, with a hover/focus-reveal micro-interaction matching
 * `BookCard`'s pattern elsewhere in the app.
 */
export function AuthorWorksSection({ author, books, totalCount }: AuthorWorksSectionProps) {
  if (books.length === 0) return null;

  return (
    <section aria-labelledby="author-works-heading" className="flex flex-col gap-8 border-t border-border/60 pt-12">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-caption font-bold uppercase tracking-[1.1px] text-text-muted">
            Author Catalogue
          </p>
          <h2 id="author-works-heading" className="font-serif text-[36px] leading-[44px] tracking-[-0.9px] text-text-primary">
            More by {author}
          </h2>
        </div>
        <Link
          href={`/results?author=${encodeURIComponent(author)}`}
          className="focus-ring flex items-center gap-2 rounded-sm"
        >
          <span className="font-sans text-body font-semibold text-brand-teal">
            View all {totalCount} works by {author}
          </span>
          <span className="flex size-6 items-center justify-center rounded-full bg-brand-mint">
            <Icon name="home-cta-arrow" />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <AuthorWorkCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

function AuthorWorkCard({ book }: { book: Book }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div initial="rest" whileHover="hover" whileFocus="hover" animate="rest" className="group flex flex-col gap-3">
      <Link href={`/books/${book.id}`} className="focus-ring block">
        <GeneratedCover
          variant="jacket"
          compact
          seed={book.coverSeed ?? book.id}
          title={book.title}
          author={book.authorShort ?? book.author}
          subject={book.subject}
          callNumber={book.callNumber}
          className="aspect-[4/3] shadow-sm"
          eyebrow={book.jacketEyebrow ?? String(book.publicationYear)}
          tagline={book.jacketTagline}
        />
      </Link>
      <div className="flex flex-col">
        <Link href={`/books/${book.id}`} className="focus-ring rounded-sm">
          <motion.h3
            className="font-sans text-body-sm font-semibold text-text-primary"
            variants={{ rest: { x: 0 }, hover: reducedMotion ? { x: 0 } : { x: 2 } }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {book.title}
          </motion.h3>
        </Link>
        <p className="font-sans text-label text-text-muted">
          {book.publicationYear} • {book.wordCountLabel ?? "N/A"}
        </p>
      </div>
    </motion.div>
  );
}
