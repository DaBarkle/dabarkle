"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { captureLevels } from "@/data/hermes";

export function CaptureLevels() {
  return (
    <div className="mx-auto max-w-2xl space-y-[-8px]">
      {captureLevels.map((level, i) => (
        <ScrollReveal key={level.id} delay={0.15 + i * 0.1}>
          <div
            className="relative rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01]"
            style={{
              borderColor: `${level.color}20`,
              background: `linear-gradient(135deg, ${level.color}06, rgba(5,5,5,0.95))`,
              marginLeft: `${i * 12}px`,
              marginRight: `${(captureLevels.length - 1 - i) * 12}px`,
              zIndex: captureLevels.length - i,
              position: "relative",
            }}
          >
            <div className="flex items-start gap-4">
              {/* Level badge */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold"
                style={{
                  color: level.color,
                  background: `${level.color}12`,
                  border: `1px solid ${level.color}20`,
                  boxShadow: `0 0 16px ${level.color}10`,
                }}
              >
                {level.level}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: level.color }}
                  >
                    {level.label}
                  </h3>

                  {/* Automation badge */}
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      color: level.automation === "Automatic" ? "#14b8a6" : level.automation === "Semi-enforced" ? "#fbbf24" : "#818cf8",
                      background: level.automation === "Automatic" ? "#14b8a610" : level.automation === "Semi-enforced" ? "#fbbf2410" : "#818cf810",
                      border: `1px solid ${level.automation === "Automatic" ? "#14b8a620" : level.automation === "Semi-enforced" ? "#fbbf2420" : "#818cf820"}`,
                    }}
                  >
                    {level.automation}
                  </span>

                  {/* Zero-LLM badge */}
                  {level.llmFree && (
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Zero LLM
                    </span>
                  )}

                  <div
                    className="hidden h-px flex-1 sm:block"
                    style={{
                      background: `linear-gradient(to right, ${level.color}20, transparent)`,
                    }}
                  />
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {level.description}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
