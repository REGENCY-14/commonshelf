"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";
import { BookCoverImage } from "@/components/ui/BookCoverImage";
import { Icon } from "@/components/ui/Icon";
import { useSearch } from "@/hooks/useSearch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getCoverStyle } from "@/lib/covers";

const TRENDING = ["Middlemarch", "Jane Eyre", "Frankenstein", "The Odyssey"];

/**
 * Homepage hero (Figma "Hero Section", node 20:903): two-line display
 * headline with an italic serif accent line, subhead, the primary search
 * bar with real-time autocomplete, trending-title quick links, and on the
 * right a fanned stack of three real book cover photographs on a soft
 * radial glow.
 */
export function HomeHero() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const { query, setQuery, debouncedQuery, results, isOpen, close } = useSearch();

  const submit = () => {
    close();
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="px-4 pb-10 pt-6 sm:px-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left column: copy + search */}
        <div className="flex flex-col items-start lg:col-span-7">
          <h1 className="font-serif text-[40px] leading-[1.15] tracking-[-1.4px] text-text-primary sm:text-display sm:leading-[64px]">
            Find your next great read,
            <br />
            <span className="italic text-brand-teal">free and legal.</span>
          </h1>

          <p className="max-w-[576px] pt-6 font-sans text-subhead text-text-secondary">
            Over 70,000 public-domain masterworks curated from Project Gutenberg, Standard
            Ebooks, and the Internet Archive, beautifully formatted for reading anywhere.
          </p>

          <div className="relative w-full max-w-[672px] pt-6">
            <SearchInput value={query} onChange={setQuery} onSubmit={submit}>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    role="listbox"
                    aria-label={`Titles matching "${debouncedQuery}"`}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: reducedMotion ? 0.1 : 0.2, ease: "easeInOut" }}
                    className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-md bg-white shadow-lg"
                  >
                    <div className="flex items-center justify-between bg-muted/60 p-4">
                      <span className="font-sans text-label font-bold uppercase tracking-wide text-text-secondary">
                        Titles matching &ldquo;{debouncedQuery}&hellip;&rdquo;
                      </span>
                      <span className="font-sans text-caption text-text-secondary/70">
                        {results.length} match{results.length === 1 ? "" : "es"}
                      </span>
                    </div>

                    {results.length === 0 ? (
                      <p className="p-4 font-sans text-body-sm text-text-secondary">
                        No titles found. Press Enter to search the full catalog.
                      </p>
                    ) : (
                      <ul>
                        {results.map((book, i) => {
                          const cover = getCoverStyle(book.coverSeed ?? book.id);
                          return (
                            <li key={book.id}>
                              <Link
                                href={`/books/${book.id}`}
                                className={`focus-ring flex items-start gap-2 px-4 py-3.5 ${
                                  i === 0 ? "bg-surface" : "hover:bg-surface/60"
                                }`}
                              >
                                {book.coverImage ? (
                                  <BookCoverImage
                                    src={book.coverImage}
                                    title={book.title}
                                    author={book.author}
                                    className="h-10 w-8 shrink-0 rounded-xs"
                                    sizes="32px"
                                  />
                                ) : (
                                  <span
                                    className="h-10 w-8 shrink-0 rounded-xs"
                                    style={{ backgroundImage: cover.backgroundImage }}
                                    aria-hidden="true"
                                  />
                                )}
                                <span className="flex flex-wrap items-baseline gap-1">
                                  <span className="font-serif text-h3 text-text-primary">
                                    {book.title}
                                  </span>
                                  <span className="font-sans text-body-sm text-text-secondary">
                                    by {book.author}
                                  </span>
                                  <span className="font-sans text-label font-semibold tracking-wide text-text-secondary/60">
                                    · {book.publicationYear}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </SearchInput>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-6">
            <span className="font-sans text-[13px] leading-5 text-text-secondary">Trending:</span>
            {TRENDING.map((title) => (
              <Link
                key={title}
                href={`/results?q=${encodeURIComponent(title)}`}
                className="focus-ring rounded-full bg-muted px-3 py-1 font-sans text-[13px] leading-5 text-text-secondary hover:text-text-primary"
              >
                {title}
              </Link>
            ))}
          </div>
        </div>

        {/* Right column: fanned real book covers */}
        <div className="relative flex h-[320px] items-center justify-center sm:h-[400px] lg:col-span-5">
          <div
            className="absolute size-64 rounded-full bg-brand-mint/10 blur-3xl sm:size-72"
            aria-hidden="true"
          />
          <div className="relative h-full w-full max-w-[300px] sm:max-w-[360px]">
            <div className="absolute left-[6%] top-0 h-full w-[80%] -rotate-12">
              <BookCoverImage
                src="/covers/metamorphosis.png"
                title="The Metamorphosis"
                author="Franz Kafka"
                className="aspect-[2/3] shadow-[0px_20px_40px_-15px_rgba(26,26,26,0.18)]"
                sizes="300px"
              />
            </div>
            <div className="absolute left-[22%] top-0 h-full w-[76%] rotate-6">
              <BookCoverImage
                src="/covers/frankenstein.png"
                title="Frankenstein"
                author="Mary Wollstonecraft Shelley"
                className="aspect-[2/3] shadow-[0px_24px_45px_-12px_rgba(26,26,26,0.22)]"
                sizes="300px"
              />
            </div>
            <div className="absolute left-[9%] top-[8%] h-full w-[70%] -rotate-2">
              <Link href="/books/middlemarch" className="focus-ring block h-full">
                <BookCoverImage
                  src="/covers/middlemarch.png"
                  title="Middlemarch"
                  author="George Eliot"
                  className="aspect-[2/3] shadow-[0px_30px_60px_-15px_rgba(26,26,26,0.28)]"
                  sizes="300px"
                  priority
                />
                <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1.5 font-sans text-[11px] font-bold tracking-[0.44px] text-brand-teal shadow-sm backdrop-blur-[6px]">
                  Standard Ebooks
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center pt-14">
        <a
          href="#recently-catalogued"
          aria-label="Scroll to recently catalogued editions"
          className="focus-ring flex size-11 items-center justify-center rounded-full bg-muted shadow-xs hover:bg-[#e8e8e6]"
        >
          <Icon name="home-chevron-down" />
        </a>
      </div>
    </section>
  );
}
