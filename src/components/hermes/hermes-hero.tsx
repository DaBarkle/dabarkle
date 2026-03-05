"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/aceternity/background-gradient-animation";
import { TypewriterEffect } from "@/components/aceternity/typewriter-effect";
import { Sparkles } from "@/components/aceternity/sparkles";
import { metrics } from "@/data/hermes";

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
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(5, 5, 5)"
        gradientBackgroundEnd="rgb(15, 5, 25)"
        firstColor="139, 92, 246"
        secondColor="100, 50, 200"
        thirdColor="249, 115, 22"
        fourthColor="80, 30, 160"
        fifthColor="200, 80, 20"
        pointerColor="167, 139, 250"
        size="90%"
        blendingValue="hard-light"
        interactive={!prefersReducedMotion}
        containerClassName="!h-screen"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      >
        <div className="relative z-10 max-w-4xl px-6 text-center">
          {/* Back link */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-medium text-accent-400 backdrop-blur-sm">
              Built with Claude &middot; Anthropic
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6"
          >
            <Sparkles color="#a78bfa" count={10}>
              <span className="text-8xl font-bold tracking-tight sm:text-9xl md:text-[10rem] bg-gradient-to-r from-accent-400 via-brand-400 to-brand-300 bg-clip-text text-transparent">
                Hermes
              </span>
            </Sparkles>
          </motion.h1>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <TypewriterEffect
              words={[
                { text: "AI-Powered", className: "text-accent-400" },
                { text: "Infrastructure" },
                { text: "Command" },
                { text: "Center" },
              ]}
              className="!text-lg !font-mono !font-medium tracking-wider sm:!text-xl"
              cursorClassName="!bg-accent-500 !h-5"
            />
          </motion.div>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            A self-improving multi-agent system that operates, troubleshoots,
            and documents a production homelab &mdash; built entirely through
            conversational AI development with Claude Code.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className="group inline-flex items-baseline gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-lg hover:shadow-accent-500/5"
              >
                <span className="font-mono text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs text-text-tertiary">
                  {stat.label}
                  <br />
                  <span className="text-text-muted">{stat.sublabel}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: scrollOpacity }}
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest text-white/30 uppercase">
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
      </BackgroundGradientAnimation>
    </section>
  );
}
