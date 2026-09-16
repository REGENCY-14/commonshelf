type StatCardProps = {
  value: string;
  /** Label lines rendered stacked (e.g. ["BOOKS", "CATALOGUED"]); pass a single-element array for one line. */
  label: string[];
  className?: string;
};

/** Small metric card: a serif value over an uppercase label, used in the "Curated for Reader Delight" stat row. */
export function StatCard({ value, label, className = "" }: StatCardProps) {
  return (
    <div className={`flex flex-1 flex-col gap-1 bg-white p-4 shadow-xs ${className}`}>
      <p className="font-serif text-stat-value tracking-tight text-text-primary">{value}</p>
      <p className="font-sans text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-text-secondary">
        {label.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
