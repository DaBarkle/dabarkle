"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { GlowButton } from "@/components/ui/glow-button";
import { Magnetic } from "@/components/ui/magnetic";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { GridOverlay } from "@/components/visuals/grid-overlay";
import { Spotlight } from "@/components/visuals/spotlight";
import { easings } from "@/lib/motion";

const STATS = ["15 Agents", "22 MCP Servers", "5-Level Memory", "130 Days Live"];

export function Hero() {
  const reduced = useReducedMotion();
  const [scrollFade, setScrollFade] = useState(1);

  useEffect(() => {
    const onScroll = () => setScrollFade(Math.max(0, 1 - window.scrollY / 280));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-24 pt-28"
    >
      {/* layered backdrop */}
      <AuroraBackground intensity="strong" />
      <Spotlight className="left-1/2 top-[-30%]" />
      <GridOverlay fade="top" opacity={0.5} className="opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        {/* availability pill */}
        <motion.div variants={item} transition={{ duration: 0.6, ease: easings.entrance }}>
          <span className="gradient-border inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-brand-200 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
            </span>
            Hermes is live in production
          </span>
        </motion.div>

        {/* signature brand glyph */}
        <motion.div
          variants={item}
          transition={{ duration: 0.7, ease: easings.entrance }}
          className="relative mt-8"
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
          />
          <Magnetic strength={0.25}>
            <BrandMark
              size={78}
              color="#828fff"
              animated={!reduced}
              delay={250}
              duration={1300}
              microMovement={false}
              className="relative drop-shadow-[0_0_24px_rgba(94,105,210,0.45)]"
            />
          </Magnetic>
        </motion.div>

        {/* eyebrow */}
        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-7 font-mono text-overline text-brand-300"
        >
          David Barker · AI Harness Builder
        </motion.p>

        {/* headline */}
        <motion.h1
          variants={item}
          transition={{ duration: 0.75, ease: easings.entrance }}
          className="text-display mt-4 text-balance text-white"
        >
          I build the scaffolding{" "}
          <span className="text-gradient">around AI</span>.
        </motion.h1>

        {/* subhead */}
        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-6 max-w-2xl text-pretty text-body-lg text-text-secondary"
        >
          The memory, the routing, the guardrails, the interfaces — the harness that turns a
          chat model into an ambient system that learns, acts and self-maintains.{" "}
          <span className="font-medium text-white">Not just a user of AI; an operator of it.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.35}>
            <GlowButton href="/projects/hermes" size="lg" withArrow>
              Explore Hermes
            </GlowButton>
          </Magnetic>
          <GlowButton href="#contact" variant="secondary" size="lg">
            Get in touch
          </GlowButton>
        </motion.div>

        {/* stat pills */}
        <motion.ul
          variants={item}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          {STATS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-hairline bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm"
            >
              {s}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
        style={{ opacity: scrollFade }}
        animate={reduced ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Scroll</span>
        <ChevronDown className="h-4 w-4 text-text-muted" />
      </motion.div>
    </section>
  );
}
