/**
 * Common Shelf — Design Tokens
 * -----------------------------------------------------------------------
 * Single source of truth for color, typography and radius values used
 * across the app. `tailwind.config.ts` imports this file and extends the
 * Tailwind theme from it — colors are never duplicated or hardcoded again
 * anywhere else (components must use the generated Tailwind classes, e.g.
 * `bg-brand`, `text-text-secondary`, `bg-surface`).
 *
 * Light mode only: the Figma source has no dark-mode variants specified,
 * so dark mode is intentionally out of scope for this build.
 *
 * Spacing: every spacing value observed in the design (2, 4, 6, 8, 12, 14,
 * 16, 20, 24, 40, 48px) already sits on Tailwind's default 4px spacing
 * scale, so no custom spacing scale is defined — components use Tailwind's
 * built-in spacing utilities (p-1, gap-6, py-10, ...).
 */

export const colors = {
  // Backgrounds
  bgCanvas: "#FFFFFF",
  bgSubtle: "#FFFFFF",
  surface: "#F2EDE8",

  // Borders
  border: "rgba(194, 200, 193, 0.5)",
  borderStrong: "rgba(194, 200, 193, 0.6)",

  // Text
  textPrimary: "#1C1B18",
  textSecondary: "#424843",
  // Lighter tertiary gray introduced by the book detail page Figma
  // (breadcrumbs, spec-bar labels, auxiliary action links, provenance
  // captions). Distinct from `textSecondary` — reused 10+ times on that
  // page alone, so promoted to a token rather than inlined as an arbitrary
  // hex everywhere it appears.
  textMuted: "#6D7A73",

  // Brand
  brand: "#3A684C",
  brandDark: "#2B4735",
  brandDarker: "#153020",
  // Brighter brand green + deep teal introduced by the refreshed homepage
  // Figma (buttons, active nav underline, italic headline accent, links).
  // Genuinely new hues vs. the older brand.* forest green, so added rather
  // than reused — kept under the same `brand` namespace since they're the
  // same semantic role (brand accent) at different points in the app.
  brandMint: "#4EC095",
  brandTeal: "#006C4E",

  // Accents / badges
  accentGreenBg: "#B9EBC8",
  accentGreenText: "#153020",
  accentGreenAltBg: "#CAEBD1",
  accentGreenAltText: "#3E6C50",
  accentAmberBg: "#FFDEAE",
  accentAmberText: "#281800",

  // Cooler neutral chip/pill background used throughout the refreshed
  // homepage (eyebrow badges, trending tags, source pills, footer pills).
  // Close to, but distinct from, the warmer `surface` token used by the
  // original design — kept separate to stay pixel-accurate to Figma.
  neutralMuted: "#F4F4F2",

  // Utility
  white: "#FFFFFF",

  // "Book jacket" abstract-cover palette introduced by the book detail page
  // Figma (lighter geometric terracotta/navy/amber shapes on a cream base,
  // as opposed to the dark diagonal-gradient `GeneratedCover` palette used
  // by the bento grid). Kept as its own namespace since it's a genuinely
  // distinct visual language, reused by `lib/covers.ts:getJacketStyle`.
  jacketCream: "#EDE7DC",
  jacketTerracotta: "#C1583C",
  jacketNavy: "#24344A",
  jacketAmber: "#D9A441",
  jacketRose: "#F6E6E4",
} as const;

/**
 * Type scale — named tokens map to Tailwind `fontSize` entries as
 * [fontSize, { lineHeight }] pairs. Sizes are in px per the Figma spec.
 */
export const typeScale: Record<string, [string, { lineHeight: string }]> = {
  caption: ["11px", { lineHeight: "13px" }],
  label: ["13px", { lineHeight: "16px" }],
  bodySm: ["14px", { lineHeight: "20px" }],
  body: ["16px", { lineHeight: "24px" }],
  bodyLg: ["18px", { lineHeight: "28px" }],
  h3: ["20px", { lineHeight: "26px" }],
  cardTitle: ["22px", { lineHeight: "28px" }],
  h2: ["28px", { lineHeight: "36px" }],
  h1: ["40px", { lineHeight: "48px" }],
  display: ["56px", { lineHeight: "64px" }],
  // New sizes from the refreshed homepage Figma, each reused 2-3+ times
  // (eyebrow badges, section subheads, "Recently Catalogued"/"Curated for
  // Reader Delight" headings, stat-card values) — systemic enough to earn
  // a token rather than being inlined as one-off arbitrary values.
  eyebrow: ["12px", { lineHeight: "16px" }],
  subhead: ["17px", { lineHeight: "28px" }],
  sectionHeading: ["36px", { lineHeight: "44px" }],
  statValue: ["24px", { lineHeight: "32px" }],
};

export const radius = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
} as const;

export const shadows = {
  xs: "0px 1px 1px rgba(0,0,0,.05)",
  sm: "0px 1px 2px rgba(0,0,0,.05)",
  md: "0px 4px 6px -1px rgba(0,0,0,.1), 0px 2px 4px -2px rgba(0,0,0,.1)",
  lg: "0px 20px 25px -5px rgba(0,0,0,.1), 0px 8px 10px -6px rgba(0,0,0,.1)",
} as const;

export const fonts = {
  serif: "var(--font-plus-jakarta-sans)",
  sans: "var(--font-plus-jakarta-sans)",
} as const;

const designTokens = { colors, typeScale, radius, shadows, fonts };

export default designTokens;
