"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  hermesPaneStats,
  paneComponentTypes,
  irisStats,
} from "@/data/hermes";

function PaneMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
      className="relative mx-auto aspect-[9/19] w-full max-w-[300px]"
    >
      <div className="absolute inset-0 rounded-[2.4rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-[3px] shadow-2xl shadow-brand-500/10">
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border border-white/[0.05] bg-[#070707]">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-x-0 top-0 z-0 h-16 bg-gradient-to-b from-brand-500/15 to-transparent" />

          {/* status bar */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-3 font-mono text-[9px] text-text-tertiary">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              hermes.pane
            </span>
          </div>

          {/* heading */}
          <div className="relative z-10 px-4 pt-7">
            <p className="font-mono text-[9px] uppercase tracking-widest text-accent-400">
              Generative pane
            </p>
            <h4 className="mt-0.5 text-base font-semibold text-white">Media stack</h4>
            <p className="text-[10.5px] text-text-tertiary">Composed for &lsquo;is everything healthy?&rsquo;</p>
          </div>

          {/* metric tiles */}
          <div className="relative z-10 mt-3 grid grid-cols-2 gap-2 px-4">
            <PaneTile label="Gluetun" value="up" tone="ok" />
            <PaneTile label="Sonarr" value="up" tone="ok" />
            <PaneTile label="SAB queue" value="62 KB/s" tone="warn" />
            <PaneTile label="Tdarr" value="2 active" tone="ok" />
          </div>

          {/* incident card */}
          <div className="relative z-10 mt-3 px-4">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.06] p-2.5">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300">
                  Incident · 12m ago
                </span>
                <span className="font-mono text-[9px] text-amber-300/70">paused</span>
              </div>
              <p className="text-[10.5px] leading-snug text-text-secondary">
                SAB queue paused with force items present. Past resolutions: queue paused-by-default,
                non-zero speed expected when Force priority active.
              </p>
            </div>
          </div>

          {/* action buttons */}
          <div className="relative z-10 mt-3 grid grid-cols-2 gap-2 px-4">
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-center text-[10.5px] text-white">
              Diagnose
            </div>
            <div className="rounded-lg border border-brand-500/30 bg-brand-500/15 p-2 text-center text-[10.5px] font-semibold text-brand-200">
              Run media_queue
            </div>
          </div>

          {/* footer */}
          <div className="absolute inset-x-0 bottom-3 px-4 text-center font-mono text-[8.5px] text-text-muted">
            Bound to hermes-services · hermes-memory · unifi-network
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PaneTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "warn" | "bad";
}) {
  const toneColor = tone === "ok" ? "#34d399" : tone === "warn" ? "#fbbf24" : "#ef4444";
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-2">
      <div className="mb-0.5 flex items-center gap-1">
        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: toneColor }} />
        <span className="font-mono text-[9px] text-text-tertiary">{label}</span>
      </div>
      <div className="font-mono text-[12px] font-semibold text-white">{value}</div>
    </div>
  );
}

function PaneFacts() {
  const stats = [
    { label: "Component types", value: hermesPaneStats.componentTypes },
    { label: "Lib functions", value: hermesPaneStats.libFunctions },
    { label: "MCP servers", value: hermesPaneStats.mcpServers },
    { label: "Poll interval", value: `${hermesPaneStats.pollIntervalSeconds}s` },
  ];
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
        Hermes Pane · port {hermesPaneStats.port}
      </p>
      <h3 className="mb-3 text-2xl font-semibold text-white">
        A panel composed for the moment
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">
        The operator says &ldquo;is everything healthy?&rsquo; — Hermes spawns Claude with{" "}
        <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-[11px] text-accent-300">--output-format=stream-json</code>{" "}
        and a tool allowlist. The model returns a JSON tree describing the panel. The renderer maps the tree to live React components bound to MCP tools. Live data fills in at runtime; the model never sees credentials, only placeholders.
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="rounded-xl border border-white/[0.06] bg-surface-1 p-3 text-center"
          >
            <div className="font-mono text-xl font-bold text-white">{s.value}</div>
            <div className="mt-0.5 text-[10.5px] text-text-tertiary">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mb-6">
        <p className="mb-2 font-mono text-[10.5px] uppercase tracking-widest text-text-tertiary">
          Component vocabulary
        </p>
        <div className="flex flex-wrap gap-1.5">
          {paneComponentTypes.map((c) => (
            <span
              key={c.id}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10.5px] text-text-secondary"
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3 text-[12px] text-emerald-200/90">
        <div className="font-semibold">{hermesPaneStats.auth}</div>
        <div className="mt-0.5 text-emerald-200/60">
          PWA-installable from iOS Safari · live since {hermesPaneStats.liveSince}
        </div>
      </div>
    </div>
  );
}

function IrisCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
            Iris v3 · port {irisStats.port}
          </p>
          <h3 className="mb-2 text-xl font-semibold text-white">A web UI for the session history</h3>
          <p className="mb-3 text-sm leading-relaxed text-text-secondary">
            Built on {irisStats.base}, extended with Hermes-specific surfaces: capability injection preview,
            Stage-aware sidebar, ambient-entry timeline. Lets the operator browse and tail sessions across
            every project.
          </p>
          <p className="font-mono text-[11px] text-text-muted">
            Iris v2 (custom Next.js) archived; v3 in use since {irisStats.v3Since}.
          </p>
        </div>
        <div className="relative w-full max-w-[260px] flex-shrink-0">
          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-bg/80 shadow-xl">
            <div className="flex items-center gap-1 bg-white/[0.04] px-2 py-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-amber-400/60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
              <span className="ml-3 font-mono text-[9.5px] text-text-tertiary">iris-v3.local:3101</span>
            </div>
            <div className="space-y-1.5 p-3">
              <div className="flex items-center gap-2 rounded bg-brand-500/10 px-2 py-1 text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                <span className="text-white">hermes · dabarkle rework</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-text-tertiary">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span>jesse-trading · momentum backtest</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-text-tertiary">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span>hermes · network-fleet phase 2</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-text-tertiary">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span>hermes · stage v2 reflect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function GenerativeUI() {
  return (
    <section id="generative-ui" className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(700px circle at 25% 30%, rgba(99,102,241,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            overline="Flagship · Interface"
            title="Generative UI"
            subtitle="Hermes isn't a CLI any more. Two interfaces sit in front of it — a phone-first generative pane that composes a custom panel for every intent, and a web viewer that lets the operator browse sessions across projects."
            centered
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <ScrollReveal delay={0.05}>
            <PaneMock />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <PaneFacts />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1} className="mt-10">
          <IrisCard />
        </ScrollReveal>
      </div>
    </section>
  );
}
