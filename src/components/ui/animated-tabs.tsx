"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

/**
 * AnimatedTabs — glass tab strip with a shared-layout active pill and
 * direction-aware content transitions. Keyboard: arrow keys move focus/selection.
 */
export function AnimatedTabs({
  tabs,
  className,
  panelClassName,
}: {
  tabs: TabItem[];
  className?: string;
  panelClassName?: string;
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const reduced = useReducedMotion();

  function select(i: number) {
    setDir(i > active ? 1 : -1);
    setActive(i);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select((active + 1) % tabs.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select((active - 1 + tabs.length) % tabs.length);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKey}
        className="glass inline-flex flex-wrap gap-1 self-start rounded-xl p-1"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "relative rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200",
                selected ? "text-white" : "text-text-secondary hover:text-white",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="tab-active"
                  className="absolute inset-0 rounded-lg bg-primary-soft ring-1 ring-inset ring-[rgba(94,105,210,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className={cn("relative", panelClassName)}>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={tabs[active].id}
            role="tabpanel"
            custom={dir}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 18 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -18 * dir }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
