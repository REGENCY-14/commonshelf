import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: IconName;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  /** Omit to render a single-button (true zero-results) layout instead of the two-button refinement callout. */
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  /** The faint decorative corner graphic — only meaningful on the tinted "always visible" callout. */
  showGraphic?: boolean;
};

/**
 * Figma node 23:1722, "Section - Empty-State / Query Refinement Callout
 * Card": an icon bubble, "Looking for something else?" heading + body
 * copy, and two buttons, on a muted background with a faint decorative
 * circle graphic in the corner.
 *
 * Figma shows this callout unconditionally below pagination — a "keep
 * exploring" prompt rather than a strict zero-results state. The results
 * page reuses this same component for a genuinely-empty filtered list too
 * (via the title/description/secondaryAction props), so one component
 * covers both roles instead of two parallel ones.
 */
export function EmptyState({
  title = "Looking for something else?",
  description = "If you didn't find your specific edition or query — try browsing by Victorian Literature subject classifications, or explore our curated collections index.",
  icon = "results-empty-icon",
  primaryActionLabel = "Browse by subject",
  primaryActionHref = "/results",
  secondaryActionLabel = "Explore Victorian Classics",
  secondaryActionHref = "/results?q=victorian",
  showGraphic = true,
}: EmptyStateProps) {
  return (
    <div className="relative flex flex-col items-start gap-6 overflow-hidden bg-muted p-8 sm:flex-row sm:items-center sm:justify-between">
      {showGraphic && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-10 opacity-10"
        >
          <Icon name="results-empty-graphic" />
        </span>
      )}

      <div className="relative flex max-w-[576px] items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
          <Icon name={icon} />
        </span>
        <div>
          <h2 className="font-serif text-h3 text-text-primary">{title}</h2>
          <p className="mt-1 text-body-sm text-text-secondary">{description}</p>
        </div>
      </div>

      <div className="relative flex shrink-0 items-center gap-3">
        {secondaryActionLabel && secondaryActionHref && (
          <Button href={secondaryActionHref} variant="white" pill>
            {secondaryActionLabel}
          </Button>
        )}
        <Button href={primaryActionHref} variant="mint" pill className="gap-1.5">
          {primaryActionLabel}
          <Icon name="results-empty-arrow" />
        </Button>
      </div>
    </div>
  );
}
