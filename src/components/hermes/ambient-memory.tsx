import { Check, Sparkles, Zap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { CountUp } from "@/components/ui/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { alpha, harmonize } from "@/lib/tokens";
import {
  captureLevels,
  intelligenceLayers,
  memoryDataFlow,
  memoryStats,
  openClawComparisons,
} from "@/data/hermes";

// ---- highlight stats row -------------------------------------------------

const STATS: { label: string; node: React.ReactNode; mono?: boolean }[] = [
  { label: "Capture levels", node: <CountUp value={memoryStats.captureLevels} /> },
  { label: "Intelligence layers", node: <CountUp value={memoryStats.intelligenceLayers} /> },
  { label: "Vectors stored", node: <CountUp value={memoryStats.vectorsStored} suffix="+" /> },
  { label: "LLM sync dependency", node: memoryStats.llmSyncDependency, mono: true },
];

// ---- pill helper ---------------------------------------------------------

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        tone === "accent"
          ? "border-[rgba(94,105,210,0.35)] bg-primary-soft text-brand-200"
          : "border-hairline text-text-tertiary",
      )}
    >
      {children}
    </span>
  );
}

// ---- tab 1: capture levels ----------------------------------------------

function CaptureLevelsTab() {
  return (
    <Stagger className="flex flex-col gap-3">
      {captureLevels.map((lvl) => {
        const accent = harmonize(lvl.color);
        return (
          <StaggerItem key={lvl.id}>
            <GlassCard className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* level badge + icon */}
                <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-3">
                  <span
                    className="inline-flex items-center rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold"
                    style={{
                      color: accent,
                      borderColor: alpha(accent, 0.35),
                      backgroundColor: alpha(accent, 0.12),
                    }}
                  >
                    {lvl.level}
                  </span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={accent}
                      strokeWidth={1.5}
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={lvl.icon} />
                    </svg>
                  </span>
                </div>

                {/* body */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-h3 text-white">{lvl.label}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-brand-300">
                      {lvl.tagline}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
                    {lvl.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Pill>{lvl.automation}</Pill>
                    {lvl.llmFree && (
                      <Pill tone="accent">
                        <Zap className="h-3 w-3" aria-hidden />
                        zero-LLM
                      </Pill>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

// ---- tab 2: intelligence layers -----------------------------------------

function IntelligenceLayersTab() {
  return (
    <Stagger className="flex flex-col gap-3">
      {intelligenceLayers.map((layer) => {
        const accent = harmonize(layer.color);
        return (
          <StaggerItem key={layer.id}>
            <GlassCard className="p-5 sm:p-6">
              <div className="flex gap-4 sm:gap-5">
                {/* index */}
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-semibold"
                  style={{
                    color: accent,
                    borderColor: alpha(accent, 0.4),
                    backgroundColor: alpha(accent, 0.12),
                  }}
                  aria-hidden
                >
                  {layer.index}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white">{layer.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {layer.description}
                  </p>
                  <code className="mt-3 inline-block max-w-full overflow-x-auto rounded-md border border-hairline bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-brand-200">
                    {layer.example}
                  </code>
                </div>
              </div>
            </GlassCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

// ---- tab 3: data flow ----------------------------------------------------

function DataFlowTab() {
  return (
    <GlassCard className="p-6 sm:p-8">
      <ProcessTimeline
        steps={memoryDataFlow.map((s) => ({
          id: s.step,
          label: `Step ${s.step} · ${s.level}`,
          title: s.trigger,
          description: s.action,
        }))}
      />
    </GlassCard>
  );
}

// ---- tab 4: vs OpenClaw --------------------------------------------------

function HermesCell({ value, shared }: { value: string; shared: boolean }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 text-sm leading-relaxed",
        shared ? "text-text-secondary" : "text-white",
      )}
    >
      {shared ? (
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-tertiary" aria-hidden />
      ) : (
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-300" aria-hidden />
      )}
      <span>{value}</span>
    </div>
  );
}

function ComparisonTab() {
  return (
    <GlassCard tone="strong" className="overflow-hidden">
      {/* legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-hairline px-5 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
          <Check className="h-3 w-3" aria-hidden />
          Shared foundation
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-300">
          <Sparkles className="h-3 w-3" aria-hidden />
          Hermes extends
        </span>
      </div>

      {/* desktop header row */}
      <div className="hidden grid-cols-[0.9fr_1.2fr_1.4fr] gap-4 border-b border-hairline px-5 py-3 md:grid">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
          Dimension
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
          OpenClaw
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-300">
          Hermes
        </span>
      </div>

      <Stagger className="divide-y divide-hairline">
        {openClawComparisons.map((row) => (
          <StaggerItem key={row.dimension}>
            {/* desktop: aligned grid row · mobile: stacked card */}
            <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[0.9fr_1.2fr_1.4fr] md:items-start md:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] font-medium text-white">
                  {row.dimension}
                </span>
                {row.shared && (
                  <span className="rounded-full border border-hairline px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-text-tertiary md:hidden">
                    shared
                  </span>
                )}
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted md:hidden">
                  OpenClaw
                </span>
                <p className="mt-1 text-sm leading-relaxed text-text-tertiary md:mt-0">
                  {row.openClaw}
                </p>
              </div>

              <div
                className={cn(
                  "rounded-lg",
                  !row.shared &&
                    "bg-primary-soft p-3 ring-1 ring-inset ring-[rgba(94,105,210,0.22)] md:px-3 md:py-2",
                )}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-brand-300 md:hidden">
                  Hermes
                </span>
                <div className="mt-1 md:mt-0">
                  <HermesCell value={row.hermes} shared={row.shared} />
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </GlassCard>
  );
}

// ---- section -------------------------------------------------------------

export function AmbientMemory() {
  const tabs = [
    { id: "capture", label: "5 capture levels", content: <CaptureLevelsTab /> },
    { id: "intelligence", label: "5 intelligence layers", content: <IntelligenceLayersTab /> },
    { id: "flow", label: "Data flow", content: <DataFlowTab /> },
    { id: "openclaw", label: "vs OpenClaw", content: <ComparisonTab /> },
  ];

  return (
    <Section
      id="ambient-memory"
      eyebrow="Memory"
      title="Continuous memory across sessions"
      lede="Five capture levels feed a real-time vector store, enriched by five intelligence layers as they sync. Nothing is lost between sessions — and most of the pipeline runs with zero LLM calls."
    >
      {/* highlight stats row */}
      <Reveal direction="up">
        <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1.5 bg-surface-1/60 px-4 py-5 backdrop-blur-sm"
            >
              <div
                className={cn(
                  "text-2xl font-semibold leading-none text-white sm:text-3xl",
                  s.mono && "font-mono text-xl sm:text-2xl",
                )}
              >
                {s.node}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-text-tertiary">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <AnimatedTabs tabs={tabs} />
      </Reveal>
    </Section>
  );
}
