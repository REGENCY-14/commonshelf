import { FORMAT_CONFIG } from "@/lib/formats";
import type { BookFormat } from "@/lib/mock-data";

type FormatTagProps = {
  format: BookFormat;
  className?: string;
};

/**
 * Config-driven format pill (EPUB / PDF / Read Online / TXT / ...).
 * Adding a new format is a matter of adding an entry to
 * `lib/formats.ts:FORMAT_CONFIG` — this component never needs to change.
 */
export function FormatTag({ format, className = "" }: FormatTagProps) {
  const config = FORMAT_CONFIG[format];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center rounded-xs px-2 py-1 font-sans font-semibold text-caption uppercase tracking-wide ${config.className} ${className}`}
      title={config.description}
    >
      {config.label}
    </span>
  );
}
