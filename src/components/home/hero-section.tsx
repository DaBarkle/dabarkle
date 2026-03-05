"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/aceternity/background-gradient-animation";
import { Sparkles } from "@/components/aceternity/sparkles";
import { BrandMark } from "@/components/brand/brand-mark";

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
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(5, 5, 5)"
      gradientBackgroundEnd="rgb(8, 5, 15)"
      firstColor="139, 92, 246"
      secondColor="249, 115, 22"
      thirdColor="100, 50, 200"
      fourthColor="200, 80, 20"
      fifthColor="80, 40, 180"
      pointerColor="139, 92, 246"
      size="80%"
      blendingValue="hard-light"
      interactive={!prefersReducedMotion}
      containerClassName="!h-screen"
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Floating BrandMark above title */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <BrandMark
              size={120}
              color="#f97316"
              delay={300}
              duration={1200}
              microMovement
            />
            {/* Glow ring behind logo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -m-4 rounded-full opacity-30 blur-2xl"
              style={{
                background: "radial-gradient(circle, rgba(249,115,22,0.4), transparent 70%)",
              }}
            />
          </div>
        </motion.div>

        {/* Overline */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6 font-mono text-sm tracking-[0.2em] text-accent-400 uppercase"
        >
          Systems Architect & Infrastructure Engineer
        </motion.p>

        {/* Title with Sparkles */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-display mb-8"
        >
          <Sparkles color="#f97316" count={8}>
            <span className="inline-flex items-baseline">
              <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                DaBarkle
              </span>
            </span>
          </Sparkles>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto max-w-2xl text-xl leading-relaxed text-text-secondary md:text-2xl"
        >
          Building intelligent systems that{" "}
          <span className="text-white font-semibold">evolve themselves</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
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
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] backdrop-blur-sm"
          >
            Get in Touch
          </a>
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
    </BackgroundGradientAnimation>
  );
}
