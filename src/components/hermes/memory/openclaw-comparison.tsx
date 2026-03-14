"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { openClawComparisons } from "@/data/hermes";

export function OpenClawComparison() {
  return (
    <div>
      {/* Intro */}
      <ScrollReveal delay={0.1}>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-text-secondary">
          Hermes builds on the{" "}
          <span className="font-semibold text-[#14b8a6]">memsearch</span>{" "}
          plugin from the OpenClaw project as its foundation layer. Where OpenClaw
          stops at capture, Hermes adds automatic multi-layer capture,
          intelligence enrichment, and proactive pattern detection.
        </p>
      </ScrollReveal>

      {/* Desktop: Side-by-side table */}
      <div className="hidden sm:block">
        <ScrollReveal delay={0.15}>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.06] backdrop-blur-sm">
            {/* Header */}
            <div className="grid grid-cols-[1fr_1.2fr_1.2fr] border-b border-white/[0.06]">
              <div className="px-4 py-3 text-xs font-semibold text-text-muted" />
              <div className="border-l border-white/[0.06] px-4 py-3 text-center">
                <span className="text-xs font-semibold text-slate-400">
                  OpenClaw
                </span>
                <span className="ml-1.5 text-[10px] text-text-muted">
                  Foundation
                </span>
              </div>
              <div className="border-l border-white/[0.06] px-4 py-3 text-center">
                <span className="text-xs font-semibold text-[#818cf8]">
                  Hermes
                </span>
                <span className="ml-1.5 text-[10px] text-text-muted">
                  Extension
                </span>
              </div>
            </div>

            {/* Rows */}
            {openClawComparisons.map((row, i) => (
              <ScrollReveal key={row.dimension} delay={0.18 + i * 0.06}>
                <div
                  className="grid grid-cols-[1fr_1.2fr_1.2fr] border-b border-white/[0.04] last:border-b-0"
                  style={{
                    background: row.shared ? "#14b8a604" : "transparent",
                  }}
                >
                  {/* Dimension */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <span className="text-xs font-semibold text-white">
                      {row.dimension}
                    </span>
                    {row.shared && (
                      <span className="rounded-full border border-[#14b8a620] bg-[#14b8a610] px-1.5 py-0.5 text-[9px] font-medium text-[#14b8a6]">
                        Shared
                      </span>
                    )}
                  </div>

                  {/* OpenClaw */}
                  <div className="flex items-center border-l border-white/[0.06] px-4 py-3">
                    <span className="text-[11px] leading-snug text-slate-400">
                      {row.openClaw}
                    </span>
                  </div>

                  {/* Hermes */}
                  <div
                    className="flex items-center border-l px-4 py-3"
                    style={{
                      borderColor: row.shared
                        ? "rgba(255,255,255,0.06)"
                        : "#818cf815",
                      background: row.shared ? "transparent" : "#818cf804",
                    }}
                  >
                    <span
                      className="text-[11px] leading-snug"
                      style={{
                        color: row.shared ? "#14b8a6" : "#c7cbf5",
                      }}
                    >
                      {row.hermes}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile: Stacked cards */}
      <div className="space-y-3 sm:hidden">
        {openClawComparisons.map((row, i) => (
          <ScrollReveal key={row.dimension} delay={0.1 + i * 0.06}>
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: row.shared ? "#14b8a620" : "rgba(255,255,255,0.06)",
                background: row.shared ? "#14b8a604" : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold text-white">
                  {row.dimension}
                </span>
                {row.shared && (
                  <span className="rounded-full border border-[#14b8a620] bg-[#14b8a610] px-1.5 py-0.5 text-[9px] font-medium text-[#14b8a6]">
                    Shared
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[10px] font-medium text-slate-500">
                    OpenClaw:{" "}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {row.openClaw}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#818cf8]">
                    Hermes:{" "}
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ color: row.shared ? "#14b8a6" : "#c7cbf5" }}
                  >
                    {row.hermes}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
