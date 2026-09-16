type CallNumberLabelProps = {
  callNumber: string;
  className?: string;
};

/** The amber "call number plate" badge overlaid on generated book covers. */
export function CallNumberLabel({ callNumber, className = "" }: CallNumberLabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-xs bg-accent-amber px-2 py-0.5 font-sans font-bold text-label tracking-wide text-accent-amber-text shadow-xs ${className}`}
    >
      {callNumber}
    </span>
  );
}
