"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { CountUp } from "@/components/shared/count-up";
import { memoryStats } from "@/data/hermes";
import { CaptureLevels } from "./memory/capture-levels";
import { IntelligenceLayers } from "./memory/intelligence-layers";
import { MemoryDataFlow } from "./memory/memory-data-flow";
import { OpenClawComparison } from "./memory/openclaw-comparison";

const stats = [
  { value: memoryStats.captureLevels, label: "Capture Levels", color: "#818cf8" },
  { value: memoryStats.intelligenceLayers, label: "Intelligence Layers", color: "#fbbf24" },
  { value: memoryStats.vectorsStored, label: "Vectors Stored", color: "#14b8a6" },
  { value: memoryStats.patternChecks, label: "Pattern Checks", color: "#f59e0b" },
];

export function AmbientMemory() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <BackgroundBeams />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          overline="Memory System"
          title="Five Levels of Memory"
          subtitle="Automatic multi-layer capture with five intelligence enrichment layers -- from per-tool logging to semantic vector search -- ensures nothing learned is ever lost."
        />

        {/* Stats bar */}
        <ScrollReveal delay={0.1} className="mt-8">
          <div
            ref={statsRef}
            className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span
                  className="text-lg font-bold tabular-nums"
                  style={{ color: stat.color }}
                >
                  {statsInView ? (
                    <CountUp value={stat.value} duration={1.2} />
                  ) : (
                    "0"
                  )}
                </span>
                <span className="text-xs text-text-muted">{stat.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-400">Zero</span>
              <span className="text-xs text-text-muted">LLM Sync</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 1. Capture Levels */}
        <div className="mt-12 sm:mt-16">
          <ScrollReveal>
            <h3 className="mb-6 text-center text-h3 text-white">
              Capture Pipeline
            </h3>
          </ScrollReveal>
          <CaptureLevels />
        </div>

        {/* 2. Intelligence Layers */}
        <div className="mt-16 sm:mt-20">
          <ScrollReveal>
            <h3 className="mb-6 text-center text-h3 text-white">
              Intelligence Enrichment
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-center text-sm text-text-secondary">
              Every observation passes through five enrichment layers before reaching the vector store.
            </p>
          </ScrollReveal>
          <IntelligenceLayers />
        </div>

        {/* 3. Data Flow */}
        <div className="mt-16 sm:mt-20">
          <ScrollReveal>
            <h3 className="mb-8 text-center text-h3 text-white">
              End-to-End Data Flow
            </h3>
          </ScrollReveal>
          <MemoryDataFlow />
        </div>

        {/* 4. OpenClaw Comparison */}
        <div className="mt-16 sm:mt-20">
          <ScrollReveal>
            <h3 className="mb-2 text-center text-h3 text-white">
              Standing on Shoulders
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-center text-sm text-text-secondary">
              Built on OpenClaw&apos;s memsearch foundation, extended with automatic capture and intelligence enrichment.
            </p>
          </ScrollReveal>
          <OpenClawComparison />
        </div>
      </div>
    </section>
  );
}
