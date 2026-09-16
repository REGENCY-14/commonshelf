import Link from "next/link";
import type { EditionEntry } from "@/lib/mock-data";
import { BookCoverImage } from "@/components/ui/BookCoverImage";
import { GeneratedCover } from "@/components/ui/GeneratedCover";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type ResultRowProps = {
  edition: EditionEntry;
};

const SECONDARY_ICON = {
  arrow: "results-view-arrow",
  "external-link": "results-external-link",
  magnifier: "results-magnifier",
} as const;

const isInternalHref = (href: string) => href.startsWith("/");

/**
 * A single result card (Figma node 23:1526, "Article - Result Card"): a
 * 128×192 cover thumbnail with a source-coded corner chip, a source pill +
 * meta caption, the edition title as a heading-2 link, a metadata byline,
 * a 2-line description, and a bottom row of format tag pills plus a
 * secondary text link + primary action button.
 *
 * Each card renders one *edition* (a specific source/printing of a work),
 * not one row per `Book` — see `lib/mock-data.ts:Edition`.
 */
export function ResultRow({ edition }: ResultRowProps) {
  const detailHref = `/books/${edition.book.id}`;
  const secondaryExternal = edition.secondaryAction.external ?? !isInternalHref(edition.secondaryAction.href);
  const primaryExternal = !isInternalHref(edition.primaryAction.href);

  return (
    <article className="flex w-full flex-col items-start gap-6 bg-white p-6 shadow-[0px_10px_24px_-6px_rgba(26,26,26,0.04)] sm:flex-row">
      <div className="relative aspect-[2/3] w-32 shrink-0 overflow-hidden bg-surface shadow-md">
        {edition.coverImage ? (
          <BookCoverImage
            src={edition.coverImage}
            title={edition.title}
            author={edition.book.author}
            className="h-full w-full"
            sizes="128px"
          />
        ) : (
          <GeneratedCover
            seed={edition.book.coverSeed ?? edition.book.id}
            title={edition.title}
            author={edition.book.author}
            subject={edition.book.subject}
            callNumber={edition.book.callNumber}
            className="h-full w-full"
          />
        )}
        <span
          className={`absolute right-2 top-2 inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[11px] font-bold tracking-[0.44px] text-white shadow-xs ${edition.cornerBadgeClassName}`}
        >
          {edition.sourceBadgeCode}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={edition.sourceBadgeVariant}>{edition.sourceLabel}</Badge>
            <span className="text-body-sm text-text-muted">{edition.metaCaption}</span>
          </div>

          <Link href={detailHref} className="focus-ring rounded-sm pt-1">
            <h2 className="font-serif text-card-title text-text-primary">{edition.title}</h2>
          </Link>

          <p className="text-[15px] leading-6 text-text-muted">{edition.byline}</p>

          <p className="line-clamp-2 text-body-sm text-text-secondary">{edition.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pr-1 font-sans text-caption font-bold tracking-wide text-text-muted">Formats:</span>
            {edition.formatTags.map((tag) => (
              <span
                key={tag.label}
                className={`inline-flex items-center rounded-full px-3 py-1 font-sans text-caption font-bold tracking-wide ${
                  tag.primary ? "bg-brand-mint/15 text-[#004a34]" : "bg-surface text-text-secondary"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={edition.secondaryAction.href}
              target={secondaryExternal ? "_blank" : undefined}
              rel={secondaryExternal ? "noreferrer" : undefined}
              className={`focus-ring flex items-center gap-1 rounded-sm font-sans text-body-sm font-semibold tracking-[0.14px] ${
                secondaryExternal ? "text-text-secondary" : "text-brand-teal"
              }`}
            >
              {edition.secondaryAction.label}
              <Icon name={SECONDARY_ICON[edition.secondaryAction.icon ?? "arrow"]} />
            </Link>

            <Button
              href={edition.primaryAction.href}
              target={primaryExternal ? "_blank" : undefined}
              rel={primaryExternal ? "noreferrer" : undefined}
              variant={edition.primaryAction.variant === "mint" ? "mint" : "muted"}
              pill
              className="min-h-0 gap-1.5 px-5 py-2 text-body-sm"
            >
              <Icon name={edition.primaryAction.icon} />
              {edition.primaryAction.label}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
