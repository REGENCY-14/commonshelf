"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_LINKS = [
  { href: "/", label: "Browse" },
  { href: "/results", label: "Search" },
  { href: "/results", label: "Collections" },
  { href: "/#site-footer", label: "About" },
];

/**
 * Persistent site nav (Figma "Header", node 20:1142): logo wordmark, a
 * primary nav with an animated underline on the active item, a search
 * icon button, and a round avatar button. Reused on every route — the
 * mobile hamburger fallback from the previous build is kept for narrow
 * viewports since the Figma source only specifies the desktop layout.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur-[6px]">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-10">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-sm">
          <span className="flex size-9 shrink-0 items-center justify-center bg-brand-mint shadow-[0px_2px_4px_rgba(78,192,149,0.25)]">
            <Icon name="home-logo-mark" />
          </span>
          <span className="font-serif text-[24px] leading-8 tracking-[-0.6px] text-text-primary">
            Common Shelf
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              (link.label === "Browse" && pathname === "/") ||
              (link.label === "Search" && pathname.startsWith("/results"));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`focus-ring relative flex items-center rounded-sm py-1 font-sans text-[14px] leading-[18px] tracking-[0.14px] ${
                  active
                    ? "font-semibold text-text-primary"
                    : "font-semibold text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-brand-mint" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/results"
            aria-label="Search the catalog"
            className="focus-ring flex size-10 items-center justify-center rounded-full bg-muted hover:bg-[#e8e8e6]"
          >
            <Icon name="home-header-search" />
          </Link>
          <Link
            href="/results"
            aria-label="Your account"
            className="focus-ring flex size-8 items-center justify-center rounded-full bg-brand-teal"
          >
            <Icon name="home-avatar" />
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-text-primary transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-text-primary transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 bg-text-primary transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary mobile"
            initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring flex min-h-[44px] items-center rounded-sm px-2 font-sans font-semibold text-body text-text-secondary hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/results"
                onClick={() => setOpen(false)}
                className="focus-ring flex min-h-[44px] items-center gap-2 rounded-sm px-2 font-sans font-semibold text-body text-text-secondary hover:text-text-primary"
              >
                <Icon name="home-header-search" />
                Search
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
