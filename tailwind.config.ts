import type { Config } from "tailwindcss";
import { colors, typeScale, radius } from "./lib/design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-canvas": colors.bgCanvas,
        "bg-subtle": colors.bgSubtle,
        surface: colors.surface,
        border: colors.border,
        "border-strong": colors.borderStrong,
        "text-primary": colors.textPrimary,
        "text-secondary": colors.textSecondary,
        "text-muted": colors.textMuted,
        brand: {
          DEFAULT: colors.brand,
          dark: colors.brandDark,
          darker: colors.brandDarker,
          mint: colors.brandMint,
          teal: colors.brandTeal,
        },
        accent: {
          green: { DEFAULT: colors.accentGreenBg, text: colors.accentGreenText },
          "green-alt": { DEFAULT: colors.accentGreenAltBg, text: colors.accentGreenAltText },
          amber: { DEFAULT: colors.accentAmberBg, text: colors.accentAmberText },
        },
        muted: colors.neutralMuted,
        jacket: {
          cream: colors.jacketCream,
          terracotta: colors.jacketTerracotta,
          navy: colors.jacketNavy,
          amber: colors.jacketAmber,
          rose: colors.jacketRose,
        },
      },
      fontFamily: {
        serif: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        caption: typeScale.caption,
        label: typeScale.label,
        "body-sm": typeScale.bodySm,
        body: typeScale.body,
        "body-lg": typeScale.bodyLg,
        h3: typeScale.h3,
        "card-title": typeScale.cardTitle,
        h2: typeScale.h2,
        h1: typeScale.h1,
        display: typeScale.display,
        eyebrow: typeScale.eyebrow,
        subhead: typeScale.subhead,
        "section-heading": typeScale.sectionHeading,
        "stat-value": typeScale.statValue,
      },
      borderRadius: {
        xs: radius.xs,
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
      },
      boxShadow: {
        xs: "0px 1px 1px rgba(0,0,0,.05)",
        sm: "0px 1px 2px rgba(0,0,0,.05)",
        md: "0px 4px 6px -1px rgba(0,0,0,.1), 0px 2px 4px -2px rgba(0,0,0,.1)",
        lg: "0px 20px 25px -5px rgba(0,0,0,.1), 0px 8px 10px -6px rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
};

export default config;
