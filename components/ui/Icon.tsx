import Image from "next/image";

export type IconName =
  | "badge-check"
  | "verified-check"
  | "no-paywall"
  | "search"
  | "clear-x"
  | "arrow-right"
  | "arrow-right-2"
  | "arrow-right-3"
  | "external-link"
  | "external-link-2"
  | "chip-philosophy"
  | "chip-natural-history"
  | "chip-poetry"
  | "chip-travel"
  | "chip-gothic"
  | "chip-essays"
  | "chip-political-economy"
  | "stat-book"
  | "stat-verified"
  | "stat-globe"
  | "help-circle"
  | "home-logo-mark"
  | "home-header-search"
  | "home-avatar"
  | "home-hero-search"
  | "home-hero-search-arrow"
  | "home-chevron-down"
  | "home-download"
  | "home-arrow-link"
  | "home-badge-check"
  | "home-cta-arrow"
  | "detail-breadcrumb-chevron"
  | "detail-share"
  | "detail-bookmark"
  | "detail-jacket-overlay"
  | "detail-verified-shield"
  | "detail-badge-check"
  | "detail-read-online"
  | "detail-download"
  | "detail-kindle"
  | "detail-pdf"
  | "detail-text-doc"
  | "detail-copy-citation"
  | "detail-revision-history"
  | "detail-guarantee-seal"
  | "results-check"
  | "results-chevron-down"
  | "results-reset"
  | "results-chevron-left"
  | "results-chevron-right"
  | "results-pill-search"
  | "results-pill-clear"
  | "results-empty-icon"
  | "results-empty-arrow"
  | "results-empty-graphic"
  | "results-view-arrow"
  | "results-book-icon-white"
  | "results-book-icon-dark"
  | "results-download"
  | "results-magnifier"
  | "results-eye"
  | "results-external-link";

/** Natural pixel dimensions of each exported Figma icon asset (preserves designed aspect ratio). */
const ICON_DIMENSIONS: Record<IconName, { width: number; height: number }> = {
  "badge-check": { width: 13.33, height: 13.33 },
  "verified-check": { width: 13.33, height: 13.33 },
  "no-paywall": { width: 13.2, height: 13.2 },
  search: { width: 13.2, height: 13.2 },
  "clear-x": { width: 11.67, height: 11.67 },
  "arrow-right": { width: 31.5, height: 19.5 },
  "arrow-right-2": { width: 12, height: 12 },
  "arrow-right-3": { width: 12, height: 12 },
  "external-link": { width: 12, height: 12 },
  "external-link-2": { width: 12, height: 12 },
  "chip-philosophy": { width: 14.26, height: 15 },
  "chip-natural-history": { width: 13.5, height: 15 },
  "chip-poetry": { width: 14.63, height: 12 },
  "chip-travel": { width: 15, height: 15 },
  "chip-gothic": { width: 13.5, height: 15 },
  "chip-essays": { width: 15, height: 12 },
  "chip-political-economy": { width: 15, height: 15 },
  "stat-book": { width: 22, height: 19.5 },
  "stat-verified": { width: 18.15, height: 19 },
  "stat-globe": { width: 20, height: 20 },
  "help-circle": { width: 16.67, height: 16.67 },
  "home-logo-mark": { width: 18.33, height: 16.25 },
  "home-header-search": { width: 15, height: 15 },
  "home-avatar": { width: 12, height: 12 },
  "home-hero-search": { width: 18, height: 18 },
  "home-hero-search-arrow": { width: 12, height: 12 },
  "home-chevron-down": { width: 10, height: 6.17 },
  "home-download": { width: 13.33, height: 13.33 },
  "home-arrow-link": { width: 10.67, height: 10.67 },
  "home-badge-check": { width: 14.67, height: 14 },
  "home-cta-arrow": { width: 10.67, height: 10.67 },
  "detail-breadcrumb-chevron": { width: 4.93, height: 8 },
  "detail-share": { width: 13.5, height: 15 },
  "detail-bookmark": { width: 10.5, height: 13.5 },
  "detail-jacket-overlay": { width: 380, height: 236 },
  "detail-verified-shield": { width: 12, height: 15 },
  "detail-badge-check": { width: 12.83, height: 12.25 },
  "detail-read-online": { width: 18.33, height: 16.25 },
  "detail-download": { width: 12, height: 12 },
  "detail-kindle": { width: 10, height: 14.67 },
  "detail-pdf": { width: 15, height: 15 },
  "detail-text-doc": { width: 12, height: 15 },
  "detail-copy-citation": { width: 11.33, height: 13.33 },
  "detail-revision-history": { width: 13, height: 10.67 },
  "detail-guarantee-seal": { width: 20.17, height: 21.25 },
  "results-check": { width: 10.87, height: 8.02 },
  "results-chevron-down": { width: 8, height: 4.93 },
  "results-reset": { width: 9.33, height: 9.33 },
  "results-chevron-left": { width: 4.93, height: 8 },
  "results-chevron-right": { width: 4.93, height: 8 },
  "results-pill-search": { width: 23, height: 15 },
  "results-pill-clear": { width: 8.17, height: 8.17 },
  "results-empty-icon": { width: 20, height: 20 },
  "results-empty-arrow": { width: 12, height: 12 },
  "results-empty-graphic": { width: 240, height: 240 },
  "results-view-arrow": { width: 12, height: 12 },
  "results-book-icon-white": { width: 16.5, height: 12 },
  "results-book-icon-dark": { width: 16.5, height: 12 },
  "results-download": { width: 12, height: 12 },
  "results-magnifier": { width: 13.5, height: 13.5 },
  "results-eye": { width: 16.5, height: 11.25 },
  "results-external-link": { width: 11.25, height: 11.25 },
};

type IconProps = {
  name: IconName;
  className?: string;
  /** Explicit render size in px; defaults to the asset's natural (rounded) size. */
  size?: number;
};

/**
 * Renders an exported Figma icon asset from /public/icons. Dimensions are
 * always explicit (never `auto`) to preserve the designed leaf geometry.
 */
export function Icon({ name, className, size }: IconProps) {
  const dims = ICON_DIMENSIONS[name];
  const width = size ?? Math.round(dims.width);
  const height = size ? Math.round((size * dims.height) / dims.width) : Math.round(dims.height);

  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      className={className}
      unoptimized
    />
  );
}
