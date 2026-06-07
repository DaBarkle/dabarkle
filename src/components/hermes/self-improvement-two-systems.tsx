"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { selfImprovementSystems, type SelfImprovementSystem } from "@/data/hermes";

function SystemColumn({
  sys,
  index,
}: {
  sys: SelfImprovementSystem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-1 p-6"
      style={{ boxShadow: `inset 0 0 0 1px ${sys.color}12` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${sys.color}88, transparent)` }} />

      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: sys.color }}>
            {sys.classification}
          </p>
          <h3 className="mt-0.5 font-mono text-xl font-semibold text-white">{sys.label}</h3>
        </div>
        <span
          className="rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest"
          style={{
            borderColor: `${sys.color}33`,
            color: sys.color,
            backgroundColor: `${sys.color}0d`,
          }}
        >
          {sys.id === "closeout-optimizer" ? "Capability" : "Substrate"}
        </span>
      </div>

      <FactRow label="Scope" value={sys.scope} />
      <FactRow label="Trigger" value={sys.trigger} />
      <FactRow label="Observes" value={sys.observes} mono />
      <FactRow label="Acts on" value={sys.actsOn} />

      <div className="mt-5">
        <p className="mb-2 font-mono text-[10.5px] uppercase tracking-widest text-text-tertiary">
          Guardrails
        </p>
        <ul className="space-y-1.5">
          {sys.guardrails.map((g) => (
            <li key={g} className="flex items-start gap-2 text-[12px] text-text-secondary">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: sys.color }} />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {sys.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-white/[0.05] bg-bg/40 p-2.5 text-center"
          >
            <div className="font-mono text-base font-bold text-white">{s.value}</div>
            <div className="mt-0.5 text-[10px] text-text-tertiary">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.05] bg-bg/40 p-2.5">
        <p className="font-mono text-[10.5px] text-text-muted">
          Kill switch: <span className="text-text-secondary">{sys.killSwitch}</span>
        </p>
      </div>
    </motion.div>
  );
}

function FactRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="font-mono text-[10.5px] uppercase tracking-widest text-text-muted">{label}</p>
      <p className={`text-sm leading-relaxed text-text-secondary ${mono ? "font-mono text-[12px]" : ""}`}>
        {value}
      </p>
    </div>
  );
}

export function SelfImprovementTwoSystems() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            overline="Self-improvement"
            title="Two systems, never conflated"
            subtitle="One improves the documentation pipeline. The other improves the substrate itself. They have different triggers, different scopes, and very different guardrails — and they must never be mistaken for each other."
            centered
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {selfImprovementSystems.map((sys, i) => (
            <SystemColumn key={sys.id} sys={sys} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.1} className="mt-8">
          <div className="rounded-xl border border-white/[0.06] bg-surface-1 p-5 text-center">
            <p className="text-sm text-text-secondary">
              Capabilities do work on behalf of the operator. The substrate is what decides{" "}
              <em className="text-white">how</em> that work gets done. Mixing them up breaks the
              ambient-intelligence vision — universal, automatic, zero-maintenance, invisible.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
