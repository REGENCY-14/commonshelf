import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const SOURCES = ["Standard Ebooks", "Project Gutenberg", "Internet Archive"];

const FOOTER_NAV = [
  { href: "/results", label: "Contribute" },
  { href: "/#site-footer", label: "About Catalog" },
  { href: "/#site-footer", label: "Open Access" },
  { href: "/#site-footer", label: "Privacy & Terms" },
];

/** Site footer (Figma "Footer", node 20:1116): catalog-source pills, a secondary nav, and a copyright row. */
export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-border/60 bg-white px-4 py-10 sm:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pr-2 font-sans text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-text-secondary">
              Catalog sources:
            </span>
            {SOURCES.map((source) => (
              <Badge key={source} variant="muted">
                {source}
              </Badge>
            ))}
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
            {FOOTER_NAV.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="focus-ring rounded-sm font-sans text-[12px] font-semibold leading-4 tracking-[0.24px] text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-2 sm:flex-row sm:items-center">
          <p className="font-sans text-[13px] leading-5 text-text-secondary">
            Common Shelf — Curated open-access literature preserved for the public domain.
          </p>
          <p className="font-sans text-[13px] leading-5 text-text-secondary">
            © 2025 Common Shelf. Independent digital library.
          </p>
        </div>
      </div>
    </footer>
  );
}
