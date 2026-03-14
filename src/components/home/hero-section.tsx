"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Lamp } from "@/components/aceternity/lamp";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { BrandMark } from "@/components/brand/brand-mark";
import { springs, easings, fadeUp, staggerContainer } from "@/lib/motion";

const statPills = [
  { label: "12 Agents", delay: 1.2 },
  { label: "9 Capabilities", delay: 1.4 },
  { label: "5-Level Memory", delay: 1.6 },
];

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
    <Lamp className="!min-h-screen">
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate="visible"
      >
        {/* Overline */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-brand-400"
        >
          Systems Architect &amp; Infrastructure Engineer
        </motion.p>

        {/* Title with TextGenerateEffect wrapping the name */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easings.entrance }}
          className="text-display mb-8"
        >
          <h1 className="text-display">
            <span className="inline-flex items-baseline">
              <BrandMark
                inline
                className="hero-logo-d"
                color="#818cf8"
                delay={300}
                duration={1200}
                microMovement={false}
              />
              <TextGenerateEffect
                words="aBarkle"
                className="inline text-display"
                duration={0.6}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mx-auto max-w-2xl text-xl leading-relaxed text-text-secondary md:text-2xl"
        >
          Building intelligent systems that{" "}
          <span className="font-semibold text-white">evolve themselves</span>.
        </motion.p>

        {/* Floating stat pills */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {statPills.map((pill) => (
            <motion.span
              key={pill.label}
              initial={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, y: 10, scale: 0.95 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: pill.delay,
                duration: 0.5,
                ease: easings.entrance,
              }}
              className="gentle-float rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-400 backdrop-blur-sm"
              style={
                prefersReducedMotion
                  ? undefined
                  : ({
                      animationDelay: `${pill.delay}s`,
                    } as React.CSSProperties)
              }
            >
              {pill.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easings.entrance }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {/* Primary CTA with MovingBorder */}
          <MovingBorder
            duration={3000}
            borderRadius="9999px"
            containerClassName="rounded-full"
            borderClassName="border-brand-400"
            as="div"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              className="group relative inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
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
          </MovingBorder>

          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.snappy}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
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

      {/* Gentle float keyframes */}
      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .gentle-float {
          animation: gentle-float 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gentle-float {
            animation: none;
          }
        }
      `}</style>
    </Lamp>
  );
}
