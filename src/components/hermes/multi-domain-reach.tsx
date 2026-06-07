"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { domainCapabilities, type DomainCapability } from "@/data/hermes";

const domainIconPaths: Record<string, string> = {
  banking:
    "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
  "network-fleet":
    "M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z",
  voice:
    "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z",
  fabric:
    "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
};

function DomainCard({ d, index }: { d: DomainCapability; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-1 p-6 transition-colors hover:border-white/[0.14]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(700px circle at 90% 0%, ${d.accent}, transparent 60%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${d.color}77, transparent)` }}
      />

      <div className="relative">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${d.color}1a`, color: d.color, boxShadow: `inset 0 0 0 1px ${d.color}30` }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={domainIconPaths[d.id]} />
            </svg>
          </span>
          <div>
            <h3 className="text-xl font-semibold text-white">{d.label}</h3>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: d.color }}>
              {d.tagline}
            </p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-text-secondary">{d.blurb}</p>

        <div className="mb-5 grid grid-cols-2 gap-2">
          {d.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/[0.05] bg-bg/40 p-2.5"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {s.label}
              </div>
              <div className="mt-0.5 text-sm font-semibold text-white">{s.value}</div>
            </div>
          ))}
        </div>

        <div
          className="rounded-lg border p-3"
          style={{
            borderColor: `${d.color}26`,
            backgroundColor: `${d.color}0a`,
          }}
        >
          <p className="font-mono text-[11px] leading-relaxed" style={{ color: d.color }}>
            {d.flair}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function MultiDomainReach() {
  return (
    <section id="multi-domain-reach" className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            overline="Flagship · Reach"
            title="Beyond the homelab"
            subtitle="Hermes isn't a server tool — it's an operator. Four domains, each a structurally separate capability, all stitched together by the same memory, the same intent router, the same credential boundary."
            centered
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {domainCapabilities.map((d, i) => (
            <DomainCard key={d.id} d={d} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.2} className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-sm text-text-tertiary">
            Each domain ships with its own MCP server or skill. The registry routes intent to the right one
            — banking via a SQLite-backed privacy-first MCP, fleet via a trust-tiered UniFi proxy, voice via
            local STT/TTS, fabric via two compositional pipelines.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
