import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "mint" | "muted" | "white";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-darker text-white hover:bg-brand-dark active:bg-brand-darker",
  secondary:
    "bg-surface text-text-primary hover:bg-[#e6e2dd] active:bg-[#dcd7d0]",
  // Brighter mint/teal pairing used by the refreshed homepage's CTAs
  // (hero search button, "Browse the catalog"). Additive — other pages
  // keep using `primary`/`secondary` unchanged.
  mint: "bg-brand-mint text-white hover:bg-brand-teal active:bg-brand-teal",
  // Cooler neutral pill button (results page secondary actions like
  // "Download (840 KB)" / "Page turner", Figma node 23:1526) — distinct
  // from `secondary`'s warmer `surface` background.
  muted: "bg-muted text-text-primary hover:bg-[#e8e8e6] active:bg-[#dcd7d0]",
  // Plain white pill button on a tinted section background (results page
  // refinement callout's "Explore Victorian Classics", Figma node 23:1722).
  white: "bg-white text-text-primary shadow-xs hover:bg-[#f7f7f6] active:bg-muted",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-1.5 px-6 py-3 min-h-[44px] font-sans font-medium text-body transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  /** Fully-rounded pill shape (Figma's refreshed homepage buttons) instead of the default `rounded-sm`. */
  pill?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Single Button primitive covering both `<button>` and link usage (via
 * `href`). Always a minimum 44px tap target with visible focus-visible
 * rings for keyboard users.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", pill = false, children, className = "", ...rest }, ref) {
    const classes = `${BASE_CLASSES} ${pill ? "rounded-full" : "rounded-sm"} ${VARIANT_CLASSES[variant]} ${className}`;

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
