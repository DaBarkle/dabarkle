"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { TypewriterEffect } from "@/components/aceternity/typewriter-effect";
import { Sparkles } from "@/components/aceternity/sparkles";
import { metrics } from "@/data/hermes";
import { springs, easings, fadeUp, fadeScale, staggerContainer } from "@/lib/motion";

const statItems = [
  {
    value: metrics.documentLines.toLocaleString(),
    label: "lines maintained",
    sublabel: "zero manual edits",
  },
  {
    value: metrics.sessions.toString(),
    label: "sessions completed",
    sublabel: "zero data loss",
  },
  {
    value: `${metrics.optimizationsApplied}`,
    label: "self-applied optimizations",
    sublabel: "zero failures",
  },
];

const statPillStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function HermesHero() {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrollOpacity(Math.max(0, 1 - window.scrollY / 300));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative">
      <AuroraBackground
        colors={[
          "rgba(99, 102, 241, 0.35)",
          "rgba(79, 70, 229, 0.3)",
          "rgba(249, 115, 22, 0.15)",
          "rgba(129, 140, 248, 0.25)",
          "rgba(67, 56, 202, 0.2)",
        ]}
        speed={0.7}
        particles={true}
        particleCount={60}
        blur={85}
        intensity={0.5}
        containerClassName="!h-screen"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      >
        <motion.div
          className="relative z-10 max-w-4xl px-6 text-center"
          variants={staggerContainer}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate="visible"
        >
          {/* Back link */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: easings.entrance }}>
            <a
              href="/"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-text-tertiary backdrop-blur-sm transition-all duration-200 hover:border-white/[0.15] hover:text-white"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Back to Home
            </a>
          </motion.div>

          {/* Claude badge */}
          <motion.div variants={fadeScale} transition={{ duration: 0.5, ease: easings.entrance }}>
            <span className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-hermes-500/30 bg-hermes-500/10 px-4 py-1.5 text-xs font-medium text-hermes-400 backdrop-blur-sm">
              Built with Claude &middot; Anthropic
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.97 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ ...springs.smooth, duration: 0.7 }}
            className="mb-6"
          >
            <Sparkles color="#818cf8" count={10}>
              <span className="bg-gradient-to-r from-hermes-400 via-hermes-300 to-brand-400 bg-clip-text text-8xl font-bold tracking-tight text-transparent sm:text-9xl md:text-[10rem]">
                Hermes
              </span>
            </Sparkles>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easings.entrance }}
            className="mb-8"
          >
            <TypewriterEffect
              words={[
                { text: "AI-Powered", className: "text-hermes-400" },
                { text: "Infrastructure" },
                { text: "Command" },
                { text: "Center" },
              ]}
              className="!text-lg !font-mono !font-medium tracking-wider sm:!text-xl"
              cursorClassName="!bg-hermes-500 !h-5"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easings.entrance }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            A self-improving multi-agent system that operates, troubleshoots,
            and documents a production homelab &mdash; built entirely through
            conversational AI development with Claude Code.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            variants={statPillStagger}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {statItems.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={springs.snappy}
                className="group inline-flex items-baseline gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.12] hover:shadow-lg hover:shadow-hermes-500/5"
              >
                <span className="font-mono text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs text-text-tertiary">
                  {stat.label}
                  <br />
                  <span className="text-text-muted">{stat.sublabel}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: scrollOpacity }}
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest text-white/30">
            Explore the system
          </span>
          <svg
            className="h-5 w-5 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </AuroraBackground>
    </section>
  );
}
