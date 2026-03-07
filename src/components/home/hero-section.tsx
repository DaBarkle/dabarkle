"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { Sparkles } from "@/components/aceternity/sparkles";
import { BrandMark } from "@/components/brand/brand-mark";
import { springs, easings, fadeUp, staggerContainer } from "@/lib/motion";

export function HeroSection() {
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
    <AuroraBackground
      colors={[
        "rgba(139, 92, 246, 0.3)",
        "rgba(249, 115, 22, 0.25)",
        "rgba(100, 50, 200, 0.2)",
        "rgba(200, 80, 20, 0.15)",
        "rgba(80, 40, 180, 0.2)",
      ]}
      speed={0.8}
      particles={true}
      particleCount={50}
      blur={90}
      intensity={0.55}
      containerClassName="!h-screen"
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate="visible"
      >
        {/* Overline */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent-400"
        >
          Systems Architect & Infrastructure Engineer
        </motion.p>

        {/* Title with inline logo-as-D */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easings.entrance }}
          className="text-display mb-8"
        >
          <Sparkles color="#f97316" count={8}>
            <span className="inline-flex items-baseline">
              <BrandMark
                inline
                className="hero-logo-d"
                color="#f97316"
                delay={300}
                duration={1200}
                microMovement={false}
              />
              <span className="text-brand-400">a</span>
              <span className="text-accent-300">Barkle</span>
            </span>
          </Sparkles>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mx-auto max-w-2xl text-xl leading-relaxed text-text-secondary md:text-2xl"
        >
          Building intelligent systems that{" "}
          <span className="font-semibold text-white">evolve themselves</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, y: -1 }}
            transition={springs.snappy}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -1 }}
            transition={springs.snappy}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.03]"
          >
            Get in Touch
          </motion.a>
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
          Scroll
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
  );
}
