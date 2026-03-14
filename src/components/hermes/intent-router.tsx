"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { Spotlight } from "@/components/aceternity/spotlight";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { intentExamples, capabilities } from "@/data/hermes";
import { fadeLeft, fadeRight, staggerContainer, fadeUp } from "@/lib/motion";

export function IntentRouter() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const currentExample = intentExamples[activeIndex];
  const matchedCapabilityId = currentExample.capabilityId;

  const advanceToNext = useCallback(() => {
    setShowResult(false);
    setIsTyping(true);
    setDisplayedText("");
    setActiveIndex((prev) => (prev + 1) % intentExamples.length);
  }, []);

  // Typing effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(currentExample.input);
      setIsTyping(false);
      setShowResult(true);
      return;
    }

    if (!isTyping) return;

    const fullText = currentExample.input;
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => setShowResult(true), 300);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, [activeIndex, isTyping, currentExample.input, prefersReducedMotion]);

  // Auto-cycle
  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setInterval(advanceToNext, 3000);
      return () => clearInterval(timer);
    }

    if (!showResult) return;

    const timer = setTimeout(advanceToNext, 2500);
    return () => clearTimeout(timer);
  }, [showResult, prefersReducedMotion, advanceToNext]);

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <Spotlight
        className="min-h-full"
        fill="rgba(251, 191, 36, 0.05)"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            overline="Intent Routing"
            title="Say What You Want"
            subtitle="Natural language requests are matched against a capability registry and routed to the right agent, tools, and context automatically."
          />

          <div className="mt-10 flex flex-col gap-8 sm:mt-16 lg:flex-row lg:gap-12">
            {/* Left: Terminal visualization */}
            <ScrollReveal direction="left" className="flex-1">
              <div className="overflow-hidden rounded-xl border border-border-subtle bg-[#0a0a0a]">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-text-muted">
                    hermes-terminal
                  </span>
                </div>

                {/* Terminal body */}
                <div className="min-h-[220px] p-5 font-mono text-sm">
                  {/* Prompt line */}
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 text-accent-400">$</span>
                    <div className="flex-1">
                      <span className="text-white">
                        {displayedText}
                      </span>
                      {isTyping && (
                        <motion.span
                          className="ml-0.5 inline-block h-4 w-1.5 bg-accent-400"
                          animate={{ opacity: [1, 1, 0, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            times: [0, 0.5, 0.5, 1],
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Routing result */}
                  <AnimatePresence mode="wait">
                    {showResult && (
                      <motion.div
                        key={`result-${activeIndex}`}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-2"
                      >
                        <div className="flex items-center gap-2 text-text-muted">
                          <svg
                            className="h-3.5 w-3.5 text-teal-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                          <span className="text-xs text-text-tertiary">
                            routing to
                          </span>
                        </div>
                        <div className="rounded-lg border border-border-subtle bg-[#111] px-4 py-3">
                          <p className="text-xs text-text-tertiary">
                            capability
                          </p>
                          <p className="text-sm font-semibold text-brand-400">
                            {currentExample.capability}
                          </p>
                          <p className="mt-1.5 text-xs text-text-tertiary">
                            method
                          </p>
                          <p className="text-xs text-text-secondary">
                            {currentExample.method}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-1.5 border-t border-border-subtle px-4 py-2.5">
                  {intentExamples.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setShowResult(false);
                        setIsTyping(true);
                        setDisplayedText("");
                        setActiveIndex(i);
                      }}
                      className="group p-0.5"
                      aria-label={`Show example ${i + 1}`}
                    >
                      <div
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: i === activeIndex ? 20 : 6,
                          background:
                            i === activeIndex
                              ? "#fbbf24"
                              : "rgba(255, 255, 255, 0.15)",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Capability registry */}
            <ScrollReveal direction="right" className="flex-1">
              <div className="rounded-xl border border-border-subtle bg-surface-1 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/15">
                    <svg
                      className="h-3.5 w-3.5 text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Capability Registry
                  </h3>
                  <span className="ml-auto text-[10px] font-mono text-text-muted">
                    {capabilities.length} registered
                  </span>
                </div>

                <motion.div
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {capabilities.map((cap) => {
                    const isActive = showResult && cap.id === matchedCapabilityId;
                    return (
                      <motion.div
                        key={cap.id}
                        variants={fadeUp}
                        className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-all duration-300"
                        style={{
                          borderColor: isActive
                            ? `${cap.color}60`
                            : "rgba(255, 255, 255, 0.06)",
                          background: isActive
                            ? `${cap.color}10`
                            : "transparent",
                          boxShadow: isActive
                            ? `0 0 16px ${cap.color}20`
                            : "none",
                        }}
                      >
                        <div
                          className="h-2 w-2 shrink-0 rounded-full transition-all duration-300"
                          style={{
                            background: isActive ? cap.color : `${cap.color}40`,
                            boxShadow: isActive
                              ? `0 0 8px ${cap.color}80`
                              : "none",
                          }}
                        />
                        <span
                          className="text-xs font-medium transition-colors duration-300"
                          style={{
                            color: isActive
                              ? cap.color
                              : "rgba(255, 255, 255, 0.5)",
                          }}
                        >
                          {cap.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Spotlight>
    </section>
  );
}
