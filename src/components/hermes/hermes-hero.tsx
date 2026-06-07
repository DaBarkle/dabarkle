"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { GridOverlay } from "@/components/visuals/grid-overlay";
import { Spotlight } from "@/components/visuals/spotlight";
import { metrics } from "@/data/hermes";
import { easings } from "@/lib/motion";

const PRINCIPLES = [
  "Ambient, not explicit",
  "Intent, not invocation",
  "Unified, not siloed",
  "Proactive, not passive",
];

const STATS = [
  { v: `${metrics.agents}`, l: "Agents" },
  { v: `${metrics.mcpServers}`, l: "MCP servers" },
  { v: `${metrics.credentials}`, l: "Credentials" },
  { v: `${metrics.memoryLayers}-level`, l: "Memory" },
  { v: `${metrics.daysRunning}+`, l: "Days live" },
];

export function HermesHero() {
  const reduced = useReducedMotion();
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
  const item = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-6 pb-24 pt-32">
      <AuroraBackground intensity="strong" />
      <Spotlight className="left-1/2 top-[-28%]" />
      <GridOverlay fade="top" opacity={0.5} className="opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item} transition={{ duration: 0.6, ease: easings.entrance }}>
          <GradientBadge icon={<Sparkles className="h-3.5 w-3.5" />}>
            Featured case study · Built with Claude Code
          </GradientBadge>
        </motion.div>

        <motion.h1
          variants={item}
          transition={{ duration: 0.75, ease: easings.entrance }}
          className="text-display mt-8 text-balance text-white"
        >
          <span className="text-gradient">Hermes</span>
        </motion.h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-5 max-w-2xl text-pretty text-body-lg text-text-secondary"
        >
          An <span className="font-medium text-white">ambient intelligence platform</span> — a single
          system that continuously learns, routes intent naturally, protects its own credentials, and
          acts proactively across every domain its operator works in.
        </motion.p>

        <motion.ul
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {PRINCIPLES.map((p) => (
            <li
              key={p}
              className="rounded-full border border-hairline bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-brand-200 backdrop-blur-sm"
            >
              {p}
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <GlowButton href="#live-snapshot" size="lg" withArrow>
            See it thinking
          </GlowButton>
          <GlowButton href="/#contact" variant="secondary" size="lg">
            Get in touch
          </GlowButton>
        </motion.div>

        <motion.dl
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-5"
        >
          {STATS.map((s) => (
            <div key={s.l} className="flex flex-col items-center gap-1 bg-surface-1/60 px-3 py-4 backdrop-blur-sm">
              <dt className="order-2 text-[11px] text-text-tertiary">{s.l}</dt>
              <dd className="order-1 text-xl font-semibold text-white">{s.v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#live-snapshot"
        aria-label="Scroll to content"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-text-muted"
        animate={reduced ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="h-5 w-5 rotate-90" />
      </motion.a>
    </section>
  );
}
