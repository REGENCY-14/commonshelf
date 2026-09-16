type SpecStatProps = {
  label: string;
  value: string;
  /** Optional secondary line under the value, e.g. "approx. 14h read". */
  secondary?: string;
  /** Renders a right-hand vertical divider (all but the last item in the spec bar). */
  withDivider?: boolean;
  className?: string;
};

/**
 * A single label/value stat in the book detail page's horizontal spec bar
 * (FIRST PUBLISHED / LANGUAGE / LENGTH / FORMATS). New primitive — nothing
 * existing matched this uppercase-label-over-value-with-divider shape.
 */
export function SpecStat({ label, value, secondary, withDivider = false, className = "" }: SpecStatProps) {
  return (
    <div
      className={`flex flex-1 flex-col items-start px-3 ${
        withDivider ? "border-r border-border/60" : ""
      } ${className}`}
    >
      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.55px] text-text-muted">{label}</p>
      <p className="pt-0.5 font-sans text-body-sm font-semibold text-text-primary">{value}</p>
      {secondary && <p className="font-sans text-caption text-text-muted">{secondary}</p>}
    </div>
  );
}
