"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { intelligenceLayers } from "@/data/hermes";

const funnelWidths = [94, 82, 70, 58, 46];

export function IntelligenceLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref}>
      {/* Desktop: Horizontal funnel */}
      <div className="hidden sm:block">
        <ScrollReveal delay={0.1}>
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-surface-0/50 p-6 backdrop-blur-sm sm:p-8">
            {/* Labels */}
            <div className="mb-4 flex items-center justify-between text-xs text-text-muted">
              <span className="font-mono">Raw Observations</span>
              <span className="font-mono">Enriched Vectors</span>
            </div>

            {/* Funnel bars */}
            <div className="space-y-2.5">
              {intelligenceLayers.map((layer, i) => (
                <div key={layer.id} className="flex items-center justify-center">
                  <motion.div
                    className="relative overflow-hidden rounded-lg border px-4 py-2.5"
                    style={{
                      borderColor: `${layer.color}25`,
                      background: `linear-gradient(90deg, ${layer.color}10, ${layer.color}06)`,
                    }}
                    initial={{ width: prefersReducedMotion ? `${funnelWidths[i]}%` : "0%" }}
                    animate={inView ? { width: `${funnelWidths[i]}%` } : {}}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.6,
                      delay: i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: layer.color }}
                        >
                          {layer.index}
                        </span>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: layer.color }}
                        >
                          {layer.label}
                        </span>
                      </div>
                      <span className="hidden text-[10px] text-text-muted lg:block">
                        {layer.description}
                      </span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Data particle */}
            {!prefersReducedMotion && inView && (
              <motion.div
                className="mx-auto mt-4 h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#818cf8",
                  boxShadow: "0 0 12px #818cf880, 0 0 4px #818cf8",
                }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: [0, 1, 1, 0], x: [-100, 0, 100, 100] }}
                transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
              />
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile: Vertical numbered list */}
      <div className="sm:hidden">
        <div className="space-y-3">
          {intelligenceLayers.map((layer, i) => (
            <ScrollReveal key={layer.id} delay={0.1 + i * 0.08}>
              <div
                className="rounded-lg border-l-2 py-2.5 pl-4 pr-3"
                style={{
                  borderColor: layer.color,
                  background: `${layer.color}06`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: layer.color }}
                  >
                    {layer.index}.
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: layer.color }}
                  >
                    {layer.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-text-secondary">
                  {layer.description}
                </p>
                <p className="mt-0.5 text-[10px] text-text-muted italic">
                  {layer.example}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
