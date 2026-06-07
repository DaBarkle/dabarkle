"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { GridBackground } from "@/components/aceternity/grid-background";
import { stageSnapshot, stageZones } from "@/data/hermes";

function HeartbeatPulse() {
  const prefersReducedMotion = useReducedMotion();
  const [tick, setTick] = useState(stageSnapshot.heartbeat);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 12000);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-emerald-300/80">
        Stage live
      </span>
      <span className="font-mono text-xs text-text-tertiary">
        heartbeat {tick.toLocaleString()}
      </span>
    </div>
  );
}

const cadenceLabel: Record<string, string> = {
  self: "Daily 03:00 reflect (Sonnet)",
  situation: "Every 60 seconds",
  attention: "On publisher events",
  monologue: "On attention churn",
};

function ZoneCard({
  zone,
  index,
  children,
}: {
  zone: (typeof stageZones)[number];
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-1/80 p-5 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${zone.color}55, transparent)` }} />
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${zone.color}1a`, color: zone.color }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d={zone.iconPath} />
            </svg>
          </span>
          <h3 className="text-sm font-semibold text-white">{zone.name}</h3>
        </div>
        <span className="font-mono text-[10px] text-text-muted">
          {zone.charBudget} char budget
        </span>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-text-tertiary">{zone.description}</p>
      <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {cadenceLabel[zone.id]}
      </div>
      <div className="rounded-lg border border-white/[0.04] bg-bg/60 p-3">{children}</div>
    </motion.div>
  );
}

function SelfPreview() {
  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary">version</span>
        <span className="font-mono text-white">v{stageSnapshot.selfVersion}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-text-secondary">last reflect</span>
        <span className="font-mono text-text-tertiary">{stageSnapshot.lastReflect}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-text-secondary">last dream</span>
        <span className="font-mono text-text-tertiary">{stageSnapshot.lastDream}</span>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.05] pt-1.5">
        <span className="text-text-secondary">kill switch</span>
        <span className="font-mono text-[10px] text-text-muted">{stageSnapshot.killSwitch}</span>
      </div>
    </div>
  );
}

function SituationPreview() {
  const lines = [
    ["Guardian", "healthy · session True"],
    ["SSH socket", "active"],
    ["Sentinel cache", "30 values · 1762ms"],
    ["Pending integrations", "0"],
  ] as const;
  return (
    <div className="space-y-1.5 text-xs">
      {lines.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between">
          <span className="text-text-secondary">{k}</span>
          <span className="font-mono text-text-tertiary">{v}</span>
        </div>
      ))}
    </div>
  );
}

function AttentionPreview() {
  const max = stageSnapshot.attentionTop[0]?.score ?? 10;
  return (
    <div className="space-y-2.5">
      {stageSnapshot.attentionTop.map((item, i) => (
        <div key={item.id}>
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[10px] text-text-tertiary truncate max-w-[55%]">
              {item.source}
            </span>
            <span className="font-mono text-[10px] text-white">{item.score.toFixed(2)}</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.04]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(item.score / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{
                background:
                  item.score > 7
                    ? "linear-gradient(90deg, #ef4444, #fb923c)"
                    : item.score > 5
                      ? "linear-gradient(90deg, #fbbf24, #fcd34d)"
                      : "linear-gradient(90deg, #5eead4, #14b8a6)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MonologuePreview() {
  return (
    <p className="text-xs leading-relaxed text-text-secondary">
      &ldquo;{stageSnapshot.innerMonologue.slice(0, 240)}&hellip;&rdquo;
    </p>
  );
}

export function LiveSnapshot() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-28">
      <GridBackground variant="grid" gridSize={48} color="rgba(255,255,255,0.018)">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-3 flex items-center justify-center gap-3">
              <HeartbeatPulse />
            </div>
          </ScrollReveal>
          <SectionHeader
            overline="What it's doing right now"
            title="A snapshot of the Stage"
            subtitle="Hermes maintains four zones of situated state — Self, Situation, Attention, and Inner Monologue. They regenerate on different cadences and feed every reasoning step the system takes."
            centered
          />

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ZoneCard zone={stageZones[0]} index={0}>
              <SelfPreview />
            </ZoneCard>
            <ZoneCard zone={stageZones[1]} index={1}>
              <SituationPreview />
            </ZoneCard>
            <ZoneCard zone={stageZones[2]} index={2}>
              <AttentionPreview />
            </ZoneCard>
            <ZoneCard zone={stageZones[3]} index={3}>
              <MonologuePreview />
            </ZoneCard>
          </div>

          <ScrollReveal delay={0.3} className="mt-8 text-center">
            <p className="font-mono text-[11px] text-text-muted">
              Snapshot taken at session start · attention top-3 published by hermes-reflex, guardian-sentinel, stage-health-watchdog
            </p>
          </ScrollReveal>
        </div>
      </GridBackground>
    </section>
  );
}
