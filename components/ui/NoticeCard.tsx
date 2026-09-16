import type { ReactNode } from "react";
import type { IconName } from "./Icon";
import { Icon } from "./Icon";

type NoticeCardProps = {
  icon: IconName;
  heading: string;
  children: ReactNode;
  className?: string;
};

/**
 * Muted-background notice box with a leading icon, heading, and body copy
 * (e.g. the book detail page's "Standard Reader Guarantee"). New
 * primitive — generic enough to reuse anywhere else a similar callout is
 * needed.
 */
export function NoticeCard({ icon, heading, children, className = "" }: NoticeCardProps) {
  return (
    <div className={`flex items-start gap-3 bg-[#EEEEEC] p-4 ${className}`}>
      <Icon name={icon} className="shrink-0" />
      <div className="flex flex-col gap-1">
        <p className="font-sans text-body-sm font-semibold text-text-primary">{heading}</p>
        <p className="font-sans text-label text-text-secondary">{children}</p>
      </div>
    </div>
  );
}
