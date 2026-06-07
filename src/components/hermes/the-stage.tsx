"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Spotlight } from "@/components/aceternity/spotlight";
import {
  stageZones,
  stagePublishers,
  stageSalience,
  type StagePublisher,
} from "@/data/hermes";
import { cn } from "@/lib/utils";

const cadenceLabel: Record<string, string> = {
  self: "Regenerated daily at 03:00 — stage-reflect (Sonnet)",
  situation: "Regenerated every 60 seconds — stage-heartbeat",
  attention: "Recomputed every heartbeat from publisher inbox",
  monologue: "Regenerates on attention churn (≥2 IDs or >30% score shift)",
};

function ZoneTile({
  zone,
  index,
}: {
  zone: (typeof stageZones)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-1 p-6"
      style={{ boxShadow: `inset 0 0 0 1px ${zone.color}10` }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${zone.color}88, transparent)` }}
      />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${zone.color}1a`, color: zone.color, boxShadow: `inset 0 0 0 1px ${zone.color}30` }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d={zone.iconPath} />
            </svg>
          </span>
          <h3 className="text-lg font-semibold text-white">{zone.name}</h3>
        </div>
        <span className="rounded-full border border-white/[0.06] bg-bg/60 px-2.5 py-0.5 font-mono text-[10px] text-text-tertiary">
          {zone.charBudget} chars
        </span>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-text-secondary">{zone.description}</p>
      <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: zone.color }}>
        {cadenceLabel[zone.id]}
      </p>
    </motion.div>
  );
}

function SalienceBar({
  item,
  max,
  index,
}: {
  item: (typeof stageSalience)[number];
  max: number;
  index: number;
}) {
  const widthPct = Math.max(8, (item.decaySeconds / max) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="mb-1.5 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="font-mono text-xs uppercase tracking-wider text-white">{item.className}</span>
        </div>
        <span className="font-mono text-[11px] text-text-tertiary">{item.halfLifeLabel}</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.04]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${widthPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${item.color}, ${item.color}77)`,
            boxShadow: `0 0 12px ${item.color}55`,
          }}
        />
      </div>
      <p className="mt-1 text-[11px] text-text-muted">{item.example}</p>
    </motion.div>
  );
}

const decayClassColor: Record<StagePublisher["decayClass"], string> = {
  credential: "#ef4444",
  integration: "#fbbf24",
  infra: "#818cf8",
  reasoning: "#a5b4fc",
  routine: "#5eead4",
};

function PublisherChip({ pub, index }: { pub: StagePublisher; index: number }) {
  const color = decayClassColor[pub.decayClass];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.03 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group relative rounded-xl border border-white/[0.06] bg-surface-1 p-3 transition-colors hover:border-white/[0.14]"
      style={{ boxShadow: `inset 0 0 0 1px ${color}10` }}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="font-mono text-[11px] font-medium text-white">{pub.label}</span>
      </div>
      <p className="text-[10.5px] leading-snug text-text-tertiary">{pub.concern}</p>
      <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-widest text-text-muted">
        {pub.cadence}
      </p>
    </motion.div>
  );
}

export function TheStage() {
  const maxDecay = Math.max(...stageSalience.map((s) => s.decaySeconds));
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgba(129, 140, 248, 0.18)" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            overline="Flagship · Substrate"
            title="The Stage"
            subtitle="A four-zone blackboard for situated state — Self, Situation, Attention, Inner Monologue. It's the substrate the system reasons over on every turn, regenerated continuously by background heartbeats, daily reflection, and nightly dream synthesis."
            centered
          />
        </ScrollReveal>

        {/* Zones grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {stageZones.map((zone, i) => (
            <ZoneTile key={zone.id} zone={zone} index={i} />
          ))}
        </div>

        {/* Salience math */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
                Salience math
              </p>
              <h3 className="mb-4 text-lg font-semibold text-white">Decay constants per class</h3>
              <p className="mb-5 text-sm text-text-secondary">
                Attention candidates fade at different rates depending on their class. Credential signals
                stay sticky for a full day; routine tool events decay within half an hour.
              </p>
              <div className="space-y-4">
                {stageSalience.map((item, i) => (
                  <SalienceBar key={item.className} item={item} max={maxDecay} index={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Daily cycle */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
                Daily cycles
              </p>
              <h3 className="mb-4 text-lg font-semibold text-white">Heartbeat · Reflect · Dream</h3>
              <div className="space-y-4">
                <CycleRow
                  time="every 60s"
                  label="Heartbeat"
                  detail="Regenerates Situation, recomputes Attention salience, optionally rewrites Inner Monologue."
                  color="#fbbf24"
                />
                <CycleRow
                  time="every 5m"
                  label="Watchdog"
                  detail="Checks reflection staleness, dream generation, attention-inbox backlog. Publishes degradations."
                  color="#14b8a6"
                />
                <CycleRow
                  time="03:00 daily"
                  label="Reflect"
                  detail="stage-reflect (Sonnet) rewrites the Self zone — identity, commitments, capability gaps."
                  color="#818cf8"
                />
                <CycleRow
                  time="04:00 daily"
                  label="Dream"
                  detail="stage-dream (Haiku) writes a narrative summary to dreams/YYYY-MM-DD.md."
                  color="#6366f1"
                />
              </div>
              <div className="mt-5 rounded-lg border border-white/[0.05] bg-bg/60 p-3">
                <p className="font-mono text-[11px] text-text-tertiary">
                  Kill switch: <span className="text-accent-400">STAGE_ENABLED=0</span> reverts to legacy
                  multi-section session injection.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Publishers constellation */}
        <ScrollReveal delay={0.1} className="mt-16">
          <div className="text-center">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
              14 publishers
            </p>
            <h3 className="mb-2 text-h3 text-white">Who fills the inbox</h3>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-text-secondary">
              Every Attention candidate is published by a substrate component with a clear responsibility.
              Color-coded by decay class — credential, integration, infra, reasoning, routine.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {stagePublishers.map((pub, i) => (
              <PublisherChip key={pub.id} pub={pub} index={i} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-text-tertiary">
            {(Object.keys(decayClassColor) as StagePublisher["decayClass"][]).map((cls) => (
              <span key={cls} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: decayClassColor[cls] }} />
                <span className="font-mono uppercase tracking-wider">{cls}</span>
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CycleRow({
  time,
  label,
  detail,
  color,
}: {
  time: string;
  label: string;
  detail: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className={cn(
          "mt-0.5 inline-flex min-w-[88px] justify-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest",
        )}
        style={{ backgroundColor: `${color}1a`, color }}
      >
        {time}
      </span>
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        <p className="text-xs leading-relaxed text-text-secondary">{detail}</p>
      </div>
    </div>
  );
}
