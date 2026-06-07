"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { CountUp } from "@/components/shared/count-up";
import { GridBackground } from "@/components/aceternity/grid-background";
import { systemMetrics, metrics } from "@/data/hermes";

function MetricTile({
  m,
  index,
  inView,
}: {
  m: (typeof systemMetrics)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-1 p-5 transition-colors hover:border-white/[0.14]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${m.color}55, transparent)` }}
      />

      <div className="flex items-baseline gap-2">
        <span className="font-mono text-4xl font-bold tabular-nums" style={{ color: m.color }}>
          {inView ? <CountUp value={m.value} duration={1.4} /> : "0"}
        </span>
        {m.suffix && <span className="font-mono text-xl text-text-tertiary">{m.suffix}</span>}
      </div>
      <div className="mt-1 text-sm font-semibold text-white">{m.label}</div>
      <div className="mt-0.5 text-[11px] leading-snug text-text-tertiary">{m.caption}</div>
    </motion.div>
  );
}

function FootnoteCard({
  label,
  value,
  detail,
  color,
  isString,
}: {
  label: string;
  value: number | string;
  detail: string;
  color: string;
  isString?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl font-bold" style={{ color }}>
        {isString ? value : <CountUp value={value as number} />}
      </p>
      <p className="mt-1 text-[11px] text-text-tertiary">{detail}</p>
    </div>
  );
}

export function MetricsDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="grid" gridSize={64} color="rgba(255,255,255,0.018)">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <SectionHeader
              overline="By the numbers"
              title="Where the system stands today"
              subtitle="Hermes ships with breadth. Every metric below is registered, monitored, and surfaced through the same ambient memory stack that powers the rest of the system."
              centered
            />
          </ScrollReveal>

          <div ref={ref} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {systemMetrics.map((m, i) => (
              <MetricTile key={m.id} m={m} index={i} inView={inView} />
            ))}
          </div>

          <ScrollReveal delay={0.2} className="mt-10">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <FootnoteCard
                label="Days running"
                value={metrics.daysRunning}
                detail="Continuous ambient capture since first session"
                color="#34d399"
              />
              <FootnoteCard
                label="As-built version"
                value={metrics.asbuiltVersion}
                detail="Maintained by the closeout pipeline"
                color="#fbbf24"
                isString
              />
              <FootnoteCard
                label="Failed deployments"
                value={0}
                detail="Optimizer + bridge + Stage shipped clean"
                color="#818cf8"
              />
            </div>
          </ScrollReveal>
        </div>
      </GridBackground>
    </section>
  );
}
