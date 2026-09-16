"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Book } from "@/lib/mock-data";
import { GeneratedCover } from "@/components/ui/GeneratedCover";
import { BookCoverImage } from "@/components/ui/BookCoverImage";
import { FormatTag } from "@/components/ui/FormatTag";
import { Icon } from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type BookCardProps = {
  book: Book;
};

/**
 * Bento-matrix book card: generated cover with overlaid call-number plate,
 * title/author/source line, format badges, and a "View edition" action
 * that reveals on hover/focus via framer-motion (not a plain CSS
 * transition).
 */
export function BookCard({ book }: BookCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm"
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
    >
      <Link href={`/books/${book.id}`} className="focus-ring block" tabIndex={-1}>
        {book.coverImage ? (
          <BookCoverImage
            src={book.coverImage}
            title={book.title}
            author={book.authorShort ?? book.author}
            className="aspect-[4/3]"
          />
        ) : (
          <GeneratedCover
            seed={book.coverSeed ?? book.id}
            title={book.title}
            author={book.authorShort ?? book.author}
            subject={book.subject}
            callNumber={book.callNumber}
            className="aspect-[4/3]"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-0.5">
          <Link href={`/books/${book.id}`} className="focus-ring rounded-sm">
            <h3 className="font-serif text-card-title text-text-primary">{book.title}</h3>
          </Link>
          <p className="text-body text-text-secondary">{book.author}</p>
          <p className="pt-0.5 font-sans font-semibold text-label tracking-wide text-text-secondary/80">
            {book.sourceLine}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 pt-3.5">
            {book.formats.map((format) => (
              <FormatTag key={format} format={format} />
            ))}
          </div>
        </div>
        <motion.div
          className="pt-8"
          variants={{
            rest: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
        >
          <Link
            href={`/books/${book.id}`}
            className="focus-ring flex min-h-[44px] w-full items-center justify-between rounded-sm bg-brand-darker px-4 font-sans font-medium text-body text-white transition-colors hover:bg-brand-dark"
          >
            View edition
            <Icon name="arrow-right-3" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
