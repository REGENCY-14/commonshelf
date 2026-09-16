"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Loading placeholder matching ResultRow's edition-card layout, with a subtle shimmer/pulse. */
export function SkeletonRow() {
  const reducedMotion = useReducedMotion();
  const pulse = reducedMotion ? undefined : { opacity: [0.5, 1, 0.5] };
  const transition = { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className="flex w-full flex-col gap-6 bg-white p-6 shadow-[0px_10px_24px_-6px_rgba(26,26,26,0.04)] sm:flex-row">
      <motion.div
        className="aspect-[2/3] w-32 shrink-0 rounded-sm bg-surface"
        animate={pulse}
        transition={transition}
      />
      <div className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-2">
          <motion.div className="h-4 w-28 rounded-full bg-surface" animate={pulse} transition={{ ...transition, delay: 0.05 }} />
          <motion.div className="h-7 w-2/3 rounded-sm bg-surface" animate={pulse} transition={{ ...transition, delay: 0.1 }} />
          <motion.div className="h-4 w-1/2 rounded-sm bg-surface" animate={pulse} transition={{ ...transition, delay: 0.15 }} />
          <motion.div className="h-4 w-full rounded-sm bg-surface" animate={pulse} transition={{ ...transition, delay: 0.2 }} />
        </div>
        <motion.div className="h-8 w-1/3 rounded-full bg-surface" animate={pulse} transition={{ ...transition, delay: 0.25 }} />
      </div>
    </div>
  );
}
