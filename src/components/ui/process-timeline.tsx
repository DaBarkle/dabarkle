"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  id: string;
  label: string;
  title: string;
  description: React.ReactNode;
  meta?: string;
}

/**
 * ProcessTimeline — a vertical methodology track whose progress line fills as
 * you scroll through it. Each step reveals in order. Reduced-motion: full line,
 * no scroll binding, steps visible.
 */
export function ProcessTimeline({
  steps,
  className,
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ol ref={ref} className={cn("relative ml-3 flex flex-col gap-10", className)}>
      {/* track */}
      <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-hairline" aria-hidden="true">
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-primary via-brand-400 to-transparent"
          style={{ height: "100%", scaleY: reduced ? 1 : scaleY }}
        />
      </div>

      {steps.map((step, i) => (
        <motion.li
          key={step.id}
          className="relative pl-8"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* node */}
          <span
            aria-hidden="true"
            className="absolute -left-[7px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border-strong bg-surface-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(94,105,210,0.9)]" />
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand-300">
              {step.label}
            </span>
            {step.meta && (
              <span className="font-mono text-[11px] text-text-tertiary">{step.meta}</span>
            )}
          </div>
          <h3 className="mt-1.5 text-h3 text-white">{step.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
            {step.description}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
