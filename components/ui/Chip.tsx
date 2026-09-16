"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { IconName } from "./Icon";
import { Icon } from "./Icon";

type ChipProps = {
  label: string;
  icon?: IconName;
  /** Optional trailing meta badge, e.g. "412 titles". */
  meta?: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  /** Shared layoutId for the animated active-state sliding background (see FilterBar). */
  layoutId?: string;
  /** Active-state background class. Defaults to the dark brand green; the results page's compact pill row uses the brighter mint. */
  activeClassName?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Pill chip primitive. Used both as a static browse-category link (white
 * bg, icon + label + meta badge) and as an interactive filter toggle
 * (FilterBar) where `active` + `layoutId` drive an animated sliding
 * background instead of an instant color swap.
 */
export function Chip({
  label,
  icon,
  meta,
  active,
  onClick,
  href,
  layoutId,
  activeClassName = "bg-brand-darker",
  className = "",
}: ChipProps) {
  const content = (
    <>
      {layoutId && active && (
        <motion.span
          layoutId={layoutId}
          className={`absolute inset-0 rounded-full ${activeClassName}`}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      {icon && <Icon name={icon} className="relative z-10 shrink-0" />}
      <span
        className={`relative z-10 font-sans font-semibold text-body ${
          active ? "text-white" : "text-text-primary"
        }`}
      >
        {label}
      </span>
      {meta && (
        <span
          className={`relative z-10 rounded-full px-2 py-0.5 font-sans font-semibold text-label tracking-wide ${
            active ? "bg-white/20 text-white" : "bg-surface text-text-secondary"
          }`}
        >
          {meta}
        </span>
      )}
    </>
  );

  const sharedClasses = `relative inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 shadow-xs focus-ring ${className}`;

  if (href) {
    return (
      <a href={href} className={sharedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={sharedClasses} aria-pressed={active}>
      {content}
    </button>
  );
}
