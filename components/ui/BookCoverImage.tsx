import Image from "next/image";

type BookCoverImageProps = {
  src: string;
  title: string;
  author: string;
  className?: string;
  /** `object-position` for the underlying image, matching Figma's per-cover crop offsets. */
  objectPosition?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Real photographic book cover primitive (as opposed to `GeneratedCover`'s
 * abstract diagonal gradient). Used for books that have genuine cover art
 * per the Figma source — the homepage hero fan, the "Recently Catalogued"
 * grid, and the "Curated for Reader Delight" mini-grid — and reused
 * wherever else those specific books appear (results rows, detail pages)
 * so the real art stays consistent across the app.
 */
export function BookCoverImage({
  src,
  title,
  author,
  className = "",
  objectPosition = "center",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
}: BookCoverImageProps) {
  return (
    <div className={`relative isolate overflow-hidden bg-surface ${className}`}>
      <Image
        src={src}
        alt={`${title} — cover, ${author}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
