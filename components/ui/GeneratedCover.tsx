import { getCoverStyle, getJacketStyle } from "@/lib/covers";
import { CallNumberLabel } from "./CallNumberLabel";
import { Icon } from "./Icon";

type GeneratedCoverProps = {
  seed: string;
  title: string;
  author: string;
  subject: string;
  callNumber: string;
  className?: string;
  /** Compact mode drops the call-number plate + subject line (used in small thumbnails). */
  compact?: boolean;
  /**
   * "diagonal" (default): the original dark two-tone diagonal gradient with
   * a call-number plate, used across the bento grid/result rows/related
   * books.
   * "jacket": the lighter abstract-shapes "book jacket" treatment from the
   * book detail page Figma — geometric terracotta/cream/navy shapes with
   * the title typeset directly on the art. Same deterministic seed hashing
   * as the diagonal variant, via `getJacketStyle`.
   */
  variant?: "diagonal" | "jacket";
  /** Jacket-only eyebrow line above the title, e.g. "STANDARD OPEN EDITION" (hero) or a publication year (compact). */
  eyebrow?: string;
  /** Jacket-only meta line under the author, e.g. "1871 • UNABRIDGED". Shown in hero mode only. */
  meta?: string;
  /** Jacket-only tagline shown under the title on compact cards, e.g. "THE WEAVER OF RAVELOE". */
  tagline?: string;
  /** Jacket-only floating source pill (hero mode only), e.g. "Standard Ebooks". */
  sourceBadge?: string;
};

/**
 * Abstract generated book cover, consuming the pure `getCoverStyle` /
 * `getJacketStyle` functions from lib/covers.ts. Reused across the bento
 * grid, result rows, book detail page (jacket + related-works), and related
 * books rows.
 */
export function GeneratedCover({
  seed,
  title,
  author,
  subject,
  callNumber,
  className = "",
  compact = false,
  variant = "diagonal",
  eyebrow,
  meta,
  tagline,
  sourceBadge,
}: GeneratedCoverProps) {
  if (variant === "jacket") {
    return (
      <JacketCover
        seed={seed}
        title={title}
        author={author}
        className={className}
        compact={compact}
        eyebrow={eyebrow}
        meta={meta}
        tagline={tagline}
        sourceBadge={sourceBadge}
      />
    );
  }

  const style = getCoverStyle(seed);

  return (
    <div
      className={`relative isolate flex w-full flex-col justify-between overflow-hidden ${
        compact ? "p-2" : "p-4"
      } ${className}`}
      style={{ backgroundImage: style.backgroundImage }}
    >
      {/* Diagonal split shading layer */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: style.shadingImage }} />
      {/* Spine texture on left edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent" />

      {!compact && (
        <div className="relative z-10">
          <CallNumberLabel callNumber={callNumber} />
        </div>
      )}

      <div className="relative z-10">
        {!compact && (
          <p className="mb-0.5 font-sans text-caption uppercase tracking-[0.1em] text-surface/80">
            {subject}
          </p>
        )}
        <p
          className={`font-serif italic text-bg-canvas ${compact ? "text-h3" : "text-h2"}`}
          style={{ lineHeight: 1.15 }}
        >
          {title}
        </p>
        {!compact && <p className="mt-1 font-sans text-body text-[#ece7e2]/90">{author}</p>}
      </div>
    </div>
  );
}

type JacketCoverProps = {
  seed: string;
  title: string;
  author: string;
  className: string;
  compact: boolean;
  eyebrow?: string;
  meta?: string;
  tagline?: string;
  sourceBadge?: string;
};

/** The lighter "abstract jacket" cover treatment — see `GeneratedCover`'s `variant="jacket"`. */
function JacketCover({
  seed,
  title,
  author,
  className,
  compact,
  eyebrow,
  meta,
  tagline,
  sourceBadge,
}: JacketCoverProps) {
  const jacket = getJacketStyle(seed);
  const titleLines = title.split(" ");

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden ${
          compact ? "p-5" : "p-8"
        }`}
        style={{ backgroundColor: jacket.bg, backgroundImage: jacket.backgroundImage }}
      >
        {jacket.shapes.map((shape, i) => (
          <div
            key={i}
            className="pointer-events-none absolute"
            style={{
              backgroundColor: shape.color,
              borderRadius: shape.radius,
              opacity: shape.opacity,
              filter: shape.blur ? `blur(${shape.blur})` : undefined,
              ...shape.box,
            }}
          />
        ))}

        {!compact && (
          <Icon
            name="detail-jacket-overlay"
            size={compact ? undefined : 320}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          />
        )}

        {/* Left-edge spine highlight */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-black/20 to-transparent ${
            compact ? "w-3" : "w-4"
          }`}
        />

        {compact ? (
          <>
            <div className="relative z-10 pt-0.5">
              {eyebrow && (
                <p
                  className="font-sans text-[10px] font-semibold uppercase leading-6 tracking-[0.5px]"
                  style={{ color: jacket.accent }}
                >
                  {eyebrow}
                </p>
              )}
              <p className="pt-1 font-serif text-h3 leading-[25px]" style={{ color: jacket.titleColor }}>
                {title}
              </p>
            </div>
            {tagline && (
              <p
                className="relative z-10 font-sans text-[11px] font-medium uppercase leading-6 tracking-[1.1px]"
                style={{ color: jacket.titleColor, opacity: 0.8 }}
              >
                {tagline}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="relative z-10 flex flex-col items-start gap-1 pt-4">
              {eyebrow && (
                <p
                  className="font-sans text-caption font-bold uppercase tracking-[2.75px]"
                  style={{ color: jacket.accent }}
                >
                  {eyebrow}
                </p>
              )}
              <p
                className="font-serif text-h2 tracking-[-0.9px]"
                style={{ color: jacket.titleColor, lineHeight: 1.05 }}
              >
                {titleLines.map((word, i) => (
                  <span key={i} className="block uppercase">
                    {word}
                  </span>
                ))}
              </p>
              <div className="h-0.5 w-10" style={{ backgroundColor: jacket.accent }} />
            </div>
            <div className="relative z-10 flex flex-col items-start pb-2">
              <p className="w-full font-sans text-label font-semibold uppercase tracking-[2.16px] text-jacket-cream">
                {author}
              </p>
              {meta && (
                <p className="w-full font-sans text-caption uppercase tracking-[1.1px] text-jacket-cream/80">
                  {meta}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {!compact && <div className="pointer-events-none absolute inset-y-0 left-3 w-px bg-white/20" />}

      {!compact && sourceBadge && (
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-mint px-3 py-1 shadow-xs backdrop-blur-[2px]">
            <Icon name="detail-badge-check" />
            <span className="font-sans text-label font-bold tracking-wide text-white">{sourceBadge}</span>
          </span>
        </div>
      )}
    </div>
  );
}
