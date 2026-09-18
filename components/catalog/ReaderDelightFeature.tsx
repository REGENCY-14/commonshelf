import Link from "next/link";
import { getBookByIdRemote } from "@/lib/api/bot-client";
import { apiBookToBook } from "@/lib/api/adapters";
import { BookCoverImage } from "@/components/ui/BookCoverImage";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Project Gutenberg ids: The Time Machine, Wuthering Heights, Moby Dick, Great Expectations. */
const MINI_GRID = ["35", "768", "2701", "1400"] as const;

const STATS = [
  { value: "74,000+", label: ["Books", "Catalogued"] },
  { value: "12,500", label: ["Authors"] },
  { value: "120+", label: ["Curated", "Subjects"] },
];

/**
 * "Curated for Reader Delight" secondary feature (Figma node 20:1045): a
 * staggered 2x2 mini-grid of real book covers on the left, and a badge +
 * heading + copy + stat-card row + primary CTA on the right, inside a
 * large rounded panel.
 */
export async function ReaderDelightFeature() {
  const details = await Promise.all(
    MINI_GRID.map((id) => getBookByIdRemote(id).catch(() => null))
  );
  const books = details
    .filter((detail): detail is NonNullable<typeof detail> => detail !== null)
    .map(apiBookToBook);

  return (
    <section className="px-4 pb-6 sm:px-12">
      <div className="mx-auto max-w-[1280px] rounded-[48px] bg-muted p-6 sm:p-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: staggered mini-grid of real covers */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-6">
            {books.map((book, i) => {
              const staggered = i % 2 === 1;
              return (
                <div key={book.id} className={staggered ? "lg:-mt-6" : undefined}>
                  <Link
                    href={`/books/${book.id}`}
                    className="focus-ring relative block aspect-[2/3] overflow-hidden bg-white shadow-xs"
                  >
                    {book.coverImage ? (
                      <BookCoverImage
                        src={book.coverImage}
                        title={book.title}
                        author={book.author}
                        className="h-full w-full"
                        sizes="(min-width: 1024px) 20vw, 40vw"
                      />
                    ) : null}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-6">
                      <p className="font-sans text-[15px] font-semibold leading-[22px] text-white">
                        {book.title}
                      </p>
                      <p className="font-sans text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#E8E8E6]">
                        {book.author}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right: narrative copy + stats + CTA */}
          <div className="flex flex-col items-start lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1">
              <Icon name="home-badge-check" />
              <span className="font-sans text-[12px] font-semibold leading-4 tracking-[0.24px] text-brand-teal">
                Zero Paywalls · No DRM · Open Standards
              </span>
            </span>

            <h2 className="pt-6 font-serif text-section-heading tracking-[-0.9px] text-text-primary">
              Curated for Reader Delight
            </h2>

            <p className="max-w-[520px] pt-6 font-sans text-subhead text-text-secondary">
              Every edition is hand-restored with meticulous typesetting, custom drop caps,
              proper em-dashes, and validated ePub structures. We believe public-domain
              literature deserves the care of the world&rsquo;s finest boutique press.
            </p>

            <div className="flex w-full flex-wrap gap-4 pt-6">
              {STATS.map((stat) => (
                <StatCard key={stat.value} value={stat.value} label={stat.label} />
              ))}
            </div>

            <div className="pt-8">
              <Button href="/results" variant="mint" pill className="gap-3 px-8 py-3.5">
                Browse the catalog
                <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
                  <Icon name="home-cta-arrow" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
