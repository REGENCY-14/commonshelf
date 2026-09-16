import type { ReactNode } from "react";

type BadgeVariant = "mint" | "muted" | "muted-strong" | "neutral" | "terracotta";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  mint: "bg-brand-mint text-white shadow-xs",
  muted: "bg-muted text-text-secondary",
  "muted-strong": "bg-white/90 text-brand-teal shadow-sm backdrop-blur-[6px]",
  // Neutral gray source pill (Project Gutenberg / Internet Archive editions
  // on the results page, Figma node 23:1526) — a touch cooler than `muted`.
  neutral: "bg-[#e8e8e6] text-text-secondary",
  // Warm terracotta/blush pill for non-primary-text editions (e.g. the
  // "Critical Companion" biographical work on the results page).
  terracotta: "bg-[#ffdbd2] text-[#3c0800]",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

/**
 * Small, non-interactive pill label for format/edition/source tags (e.g.
 * "EPUB + PDF", "Standard Ebooks", "New Edition"). Distinct from `Chip`,
 * which is an interactive 44px-tall tap target — these badges are dense
 * metadata decoration, not controls, so they intentionally skip the
 * min-height and focus-ring treatment.
 */
export function Badge({ children, variant = "muted", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.44px] ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
