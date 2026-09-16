/**
 * Generated book cover logic.
 * -----------------------------------------------------------------------
 * ONE pure function (`getCoverStyle`) that deterministically derives a
 * diagonal two-tone gradient + accent angle from a book's title/id. This
 * is reused everywhere a cover renders (bento grid, result rows, detail
 * page, related books) via `components/ui/GeneratedCover`.
 */

export type CoverPalette = {
  name: string;
  stops: [string, string, string];
};

/** Curated diagonal two-tone palettes lifted from the Figma bento cards. */
const PALETTES: CoverPalette[] = [
  { name: "forest", stops: ["#2B4735", "#2B4735", "#153020"] },
  { name: "umber", stops: ["#583C05", "#6A4225", "#422212"] },
  { name: "slate", stops: ["#2F3F4E", "#212D38", "#121920"] },
  { name: "ochre", stops: ["#6B5528", "#4D3A17", "#30230C"] },
  { name: "plum", stops: ["#4A2E4E", "#3A2340", "#221226"] },
  { name: "teal", stops: ["#1F4A48", "#173735", "#0D2120"] },
  { name: "brick", stops: ["#5C2A20", "#471F18", "#2B120D"] },
];

/** Small deterministic string hash (djb2 variant). */
function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash);
}

export type CoverStyle = {
  /** CSS background-image gradient string for the diagonal two-tone cover. */
  backgroundImage: string;
  /** CSS background-image for the subtle diagonal shading overlay. */
  shadingImage: string;
  /** Deterministic palette name, exposed for tests/debugging. */
  palette: string;
  /** Deterministic gradient angle in degrees. */
  angle: number;
};

/**
 * Derive a deterministic generated-cover style from a seed (title, id, or
 * `coverSeed`). Same seed always produces the same cover.
 */
export function getCoverStyle(seed: string): CoverStyle {
  const hash = hashString(seed);
  const palette = PALETTES[hash % PALETTES.length];
  const angle = 140 + (hash % 30); // 140deg - 169deg, matches Figma's ~147-153deg range
  const shadingAngle = 20 + (hash % 20);

  const [a, b, c] = palette.stops;
  return {
    backgroundImage: `linear-gradient(${angle}deg, ${a} 0%, ${b} 50%, ${c} 100%)`,
    shadingImage: `linear-gradient(${shadingAngle}deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 50%, rgba(255,255,255,0.1) 100%)`,
    palette: palette.name,
    angle,
  };
}

/**
 * "Book jacket" abstract-cover palette — the lighter, geometric
 * terracotta/navy/amber-on-cream visual language from the book detail page
 * Figma (as opposed to the dark diagonal gradients above, used by the bento
 * grid/result rows). A distinct curated palette set, hashed the same
 * deterministic way so a given seed always renders the same jacket.
 */
export type JacketShape = {
  color: string;
  /** CSS inset box for the shape (any subset of top/right/bottom/left), plus explicit size. */
  box: { top?: string; right?: string; bottom?: string; left?: string; width: string; height: string };
  /** CSS border-radius value — "9999px" for a circle, or a per-corner value for an arch. */
  radius: string;
  opacity?: number;
  blur?: string;
};

export type JacketPalette = {
  name: string;
  /** Solid background color. Ignored when `backgroundImage` is set. */
  bg: string;
  /** Optional gradient background instead of a solid `bg` (e.g. the rose/navy diagonal wash palette). */
  backgroundImage?: string;
  /** Accent color for the eyebrow text, year label, and divider bar. */
  accent: string;
  /** Color for the large title text. */
  titleColor: string;
  /** Decorative geometric shapes layered behind the typography, in paint order. */
  shapes: JacketShape[];
};

const JACKET_PALETTES: JacketPalette[] = [
  {
    name: "terracotta-navy",
    bg: "#EDE7DC",
    accent: "#C1583C",
    titleColor: "#24344A",
    shapes: [
      {
        color: "#C1583C",
        box: { bottom: "20%", left: "-12%", width: "50%", height: "68%" },
        radius: "9999px 9999px 0 0",
        opacity: 0.9,
      },
      { color: "#24344A", box: { bottom: "-12%", right: "-12%", width: "58%", height: "58%" }, radius: "9999px" },
      {
        color: "#D9A441",
        box: { top: "-15%", right: "-15%", width: "55%", height: "55%" },
        radius: "9999px",
        opacity: 0.35,
        blur: "2px",
      },
    ],
  },
  {
    name: "terracotta-solo",
    bg: "#EDE7DC",
    accent: "#C1583C",
    titleColor: "#24344A",
    shapes: [
      {
        color: "#C1583C",
        box: { bottom: "-14%", right: "-14%", width: "45%", height: "45%" },
        radius: "9999px",
        opacity: 0.85,
      },
    ],
  },
  {
    name: "amber-navy",
    bg: "rgba(217,164,65,0.2)",
    accent: "#24344A",
    titleColor: "#24344A",
    shapes: [
      { color: "#D9A441", box: { top: "8%", right: "8%", width: "28%", height: "28%" }, radius: "9999px", opacity: 0.7 },
      {
        color: "#24344A",
        box: { bottom: "-12%", left: "-12%", width: "50%", height: "50%" },
        radius: "9999px 9999px 0 0",
      },
    ],
  },
  {
    name: "rose-navy",
    bg: "#F6E6E4",
    backgroundImage: "linear-gradient(156deg, #F6E6E4 0%, rgba(246,230,228,0) 50%, rgba(36,52,74,0.8) 100%)",
    accent: "#C1583C",
    titleColor: "#24344A",
    shapes: [],
  },
  {
    name: "amber-terracotta",
    bg: "#EDE7DC",
    accent: "#D9A441",
    titleColor: "#24344A",
    shapes: [
      { color: "#D9A441", box: { top: "-16%", right: "-16%", width: "40%", height: "40%" }, radius: "9999px" },
      {
        color: "rgba(193,88,60,0.7)",
        box: { bottom: "20%", left: "8%", width: "22%", height: "48%" },
        radius: "9999px 9999px 0 0",
      },
    ],
  },
];

export type JacketStyle = JacketPalette;

/** Derive a deterministic jacket-cover palette from a seed. Same seed always produces the same jacket. */
export function getJacketStyle(seed: string): JacketStyle {
  const hash = hashString(`jacket:${seed}`);
  return JACKET_PALETTES[hash % JACKET_PALETTES.length];
}
