"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { GridOverlay } from "@/components/visuals/grid-overlay";
import { Spotlight } from "@/components/visuals/spotlight";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { SplitHeading } from "@/components/ui/split-heading";
import { GlowButton } from "@/components/ui/glow-button";
import { Magnetic } from "@/components/ui/magnetic";
import { Eyebrow } from "@/components/ui/eyebrow";
import { heroTranscript } from "@/data/narrative";
import { memory, security, selfImprovement, substrate } from "@/data/system";
import { fadeUp, tEntrance, durations, easings } from "@/lib/motion";

/**
 * Quiet stat pills — the four strongest live numbers, straight from the
 * verified data layer (src/data/system.ts, verified 2026-06-12). Phrasing
 * stays terse on purpose: the numbers band later in the page does the talking.
 */
const STAT_PILLS = [
  { value: memory.vectors.toLocaleString("en-US"), label: "memories" },
  { value: `${substrate.warmQueryMedianMs}ms`, label: "recall" },
  { value: String(security.credentials), label: "credentials sealed" },
  { value: String(selfImprovement.verifierContracts), label: "nightly contracts" },
] as const;

/** Orchestrates the left-column entrance: eyebrow → lede → CTAs → pills. */
const introStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

/**
 * NarrativeHero — the opening frame. Asymmetric two-column on lg (copy ~52%,
 * terminal ~48%, vertically centered); stacked on mobile with the terminal
 * below, height-capped. The aurora layer rides a subtle scroll parallax
 * (translateY 0 → -8% over the first viewport) via useScroll + useTransform —
 * transform only, fully static under reduced motion.
 */
export function NarrativeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // 0 at page top → 1 when the hero's bottom edge reaches the viewport top.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const introProps = reduced
    ? {}
    : { variants: introStagger, initial: "hidden" as const, animate: "visible" as const };
  const itemV = reduced ? undefined : fadeUp;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20 lg:pt-24 lg:pb-24"
    >
      {/* ---- Background: parallax aurora + static grid/spotlight ---------- */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : auroraY }}
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-[12%]"
      >
        <AuroraBackground intensity="strong" />
      </motion.div>
      <GridOverlay variant="grid" size={56} opacity={0.5} fade="radial" />
      <Spotlight className="left-1/2 top-[-14rem]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-canvas"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[52fr_48fr] lg:gap-16">
        {/* ---- Copy column ------------------------------------------------ */}
        <motion.div {...introProps}>
          <motion.div variants={itemV} transition={tEntrance}>
            <Eyebrow>David Barker — software engineer · builder &amp; operator of Hermes</Eyebrow>
          </motion.div>

          <SplitHeading as="h1" className="mt-5 text-display-sm text-balance text-white">
            I run my infrastructure through an AI that remembers, acts, and audits itself.
          </SplitHeading>

          <motion.p
            variants={itemV}
            transition={tEntrance}
            className="mt-6 max-w-xl text-body-lg text-pretty text-ink-muted"
          >
            Persistent memory, brokered tools, structural guardrails — an ambient AI system in
            production on my own hardware since January 2026.
          </motion.p>

          <motion.div
            variants={itemV}
            transition={tEntrance}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <GlowButton href="#explainer" size="lg">
                How it works
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </GlowButton>
            </Magnetic>
            <GlowButton href="/projects/hermes" variant="secondary" size="lg" withArrow>
              The deep dive
            </GlowButton>
          </motion.div>

          {/* Respect-the-reader device: experts skip the primer entirely. */}
          <motion.div variants={itemV} transition={tEntrance} className="mt-6">
            <a
              href="#life-of-a-prompt"
              className="group inline-flex items-center gap-1.5 font-mono text-[13px] text-ink-subtle transition-colors duration-150 hover:text-brand-300"
            >
              Already know LLM harnesses? Skip to the architecture
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </motion.div>

          <motion.ul
            variants={itemV}
            transition={tEntrance}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {STAT_PILLS.map((pill) => (
              <li
                key={pill.label}
                className="inline-flex items-baseline gap-1.5 rounded-full border border-hairline bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs"
              >
                <span className="text-ink tabular-nums">{pill.value}</span>
                <span className="text-ink-faint">{pill.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---- Terminal column -------------------------------------------- */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.slow, ease: easings.entrance, delay: 0.45 }}
        >
          <TerminalWindow
            title={heroTranscript.title}
            lines={heroTranscript.lines}
            typeOn
            className="max-lg:mx-auto max-lg:max-h-[22rem] max-lg:max-w-xl"
          />
          <p className="mt-3 text-right font-mono text-[11px] text-ink-faint">
            abridged from a real session · no invented output
          </p>
        </motion.div>
      </div>
    </section>
  );
}
