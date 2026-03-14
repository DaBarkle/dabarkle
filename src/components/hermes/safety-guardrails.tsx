"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { Spotlight } from "@/components/aceternity/spotlight";
import { guardrails, gates } from "@/data/hermes";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function SafetyGuardrails() {
  const gatesRef = useRef<HTMLDivElement>(null);
  const gatesInView = useInView(gatesRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [gateChecks, setGateChecks] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    if (!gatesInView || prefersReducedMotion) {
      if (gatesInView && prefersReducedMotion) {
        setGateChecks([true, true, true]);
      }
      return;
    }
    const timers = gates.map((_, i) =>
      setTimeout(() => {
        setGateChecks((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 800 + i * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, [gatesInView, prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <Spotlight
        className="min-h-full"
        fill="rgba(99, 102, 241, 0.06)"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            overline="Safety First"
            title="Defense in Depth"
            subtitle="Five layers of protection ensure the system operates within strict safety bounds."
          />

          {/* Guardrail cards - staggered layout */}
          <motion.div
            className="mb-20 mt-10 sm:mt-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Top row: 3 cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {guardrails.slice(0, 3).map((guard, i) => (
                <motion.div key={guard.id} variants={fadeUp}>
                  <CardSpotlight
                    className="h-full"
                    spotlightColor={`${guard.color}12`}
                  >
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background: `${guard.color}15`,
                          }}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={guard.color}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={guard.icon}
                            />
                          </svg>
                        </div>
                        <h4
                          className="text-sm font-semibold"
                          style={{ color: guard.color }}
                        >
                          {guard.title}
                        </h4>
                      </div>
                      <p className="mb-3 text-xs leading-relaxed text-text-secondary">
                        {guard.description}
                      </p>
                      <div
                        className="rounded-lg px-3 py-2"
                        style={{
                          background: `${guard.color}08`,
                          borderLeft: `2px solid ${guard.color}40`,
                        }}
                      >
                        <p className="text-[11px] leading-relaxed text-text-muted">
                          {guard.detail}
                        </p>
                      </div>
                    </div>
                  </CardSpotlight>
                </motion.div>
              ))}
            </div>

            {/* Bottom row: 2 cards centered */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:mx-auto sm:max-w-[66.666%]">
              {guardrails.slice(3, 5).map((guard) => (
                <motion.div key={guard.id} variants={fadeUp}>
                  <CardSpotlight
                    className="h-full"
                    spotlightColor={`${guard.color}12`}
                  >
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background: `${guard.color}15`,
                          }}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={guard.color}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={guard.icon}
                            />
                          </svg>
                        </div>
                        <h4
                          className="text-sm font-semibold"
                          style={{ color: guard.color }}
                        >
                          {guard.title}
                        </h4>
                      </div>
                      <p className="mb-3 text-xs leading-relaxed text-text-secondary">
                        {guard.description}
                      </p>
                      <div
                        className="rounded-lg px-3 py-2"
                        style={{
                          background: `${guard.color}08`,
                          borderLeft: `2px solid ${guard.color}40`,
                        }}
                      >
                        <p className="text-[11px] leading-relaxed text-text-muted">
                          {guard.detail}
                        </p>
                      </div>
                    </div>
                  </CardSpotlight>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Validation Gates Pipeline */}
          <div ref={gatesRef}>
            <ScrollReveal>
              <h3 className="mb-2 text-center text-h3 text-white">
                3-Gate Validation Pipeline
              </h3>
              <p className="mb-8 text-center text-sm text-text-tertiary">
                Every document update must pass all three gates before being committed.
              </p>
            </ScrollReveal>

            {/* Desktop: horizontal pipeline */}
            <div className="hidden sm:block">
              <ScrollReveal delay={0.2}>
                <div className="mx-auto flex max-w-3xl items-center justify-center gap-0">
                  {gates.map((gate, i) => (
                    <div key={gate.id} className="flex items-center">
                      {/* Gate card */}
                      <div
                        className="relative flex w-56 flex-col items-center rounded-xl border p-5 transition-all duration-500"
                        style={{
                          borderColor: gateChecks[i]
                            ? `${gate.color}50`
                            : "rgba(255,255,255,0.06)",
                          background: gateChecks[i]
                            ? `${gate.color}08`
                            : "rgba(255,255,255,0.01)",
                          boxShadow: gateChecks[i]
                            ? `0 0 20px ${gate.color}15`
                            : "none",
                        }}
                      >
                        {/* Check mark */}
                        <div
                          className="mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500"
                          style={{
                            background: gateChecks[i]
                              ? `${gate.color}20`
                              : "rgba(255,255,255,0.03)",
                            boxShadow: gateChecks[i]
                              ? `0 0 16px ${gate.color}30`
                              : "none",
                          }}
                        >
                          {gateChecks[i] ? (
                            <motion.svg
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <motion.path
                                d="M5 13l4 4L19 7"
                                stroke={gate.color}
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeOut",
                                }}
                              />
                            </motion.svg>
                          ) : (
                            <span
                              className="text-xs font-bold"
                              style={{ color: "rgba(255,255,255,0.2)" }}
                            >
                              {i + 1}
                            </span>
                          )}
                        </div>

                        <h4
                          className="mb-1 text-sm font-semibold transition-colors duration-500"
                          style={{
                            color: gateChecks[i]
                              ? gate.color
                              : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {gate.shortName}
                        </h4>
                        <p className="text-center text-[10px] text-text-muted">
                          {gate.validates.length} validations
                        </p>
                      </div>

                      {/* Arrow connector */}
                      {i < gates.length - 1 && (
                        <div className="flex w-12 items-center justify-center">
                          <motion.div
                            className="flex items-center"
                            initial={{ opacity: 0.15 }}
                            animate={{
                              opacity: gateChecks[i] ? 0.6 : 0.15,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <div
                              className="h-px w-6"
                              style={{
                                background: gateChecks[i]
                                  ? gate.color
                                  : "rgba(255,255,255,0.1)",
                              }}
                            />
                            <svg
                              className="h-3 w-3 -ml-0.5"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M4 2l4 4-4 4"
                                stroke={
                                  gateChecks[i]
                                    ? gate.color
                                    : "rgba(255,255,255,0.1)"
                                }
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Mobile: vertical pipeline */}
            <div className="sm:hidden">
              <div className="mx-auto max-w-xs space-y-0">
                {gates.map((gate, i) => (
                  <div key={gate.id}>
                    <ScrollReveal delay={0.2 + i * 0.15}>
                      <div
                        className="flex items-center gap-3 rounded-xl border p-4 transition-all duration-500"
                        style={{
                          borderColor: gateChecks[i]
                            ? `${gate.color}50`
                            : "rgba(255,255,255,0.06)",
                          background: gateChecks[i]
                            ? `${gate.color}08`
                            : "transparent",
                        }}
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500"
                          style={{
                            background: gateChecks[i]
                              ? `${gate.color}20`
                              : "rgba(255,255,255,0.03)",
                          }}
                        >
                          {gateChecks[i] ? (
                            <motion.svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                stroke={gate.color}
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          ) : (
                            <span
                              className="text-xs font-bold"
                              style={{ color: "rgba(255,255,255,0.2)" }}
                            >
                              {i + 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4
                            className="text-sm font-semibold transition-colors duration-500"
                            style={{
                              color: gateChecks[i]
                                ? gate.color
                                : "rgba(255,255,255,0.4)",
                            }}
                          >
                            Gate {i + 1}: {gate.shortName}
                          </h4>
                          <p className="text-[10px] text-text-muted">
                            {gate.validates.length} validations
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                    {i < gates.length - 1 && (
                      <div className="flex justify-center">
                        <div
                          className="h-5 w-px transition-all duration-500"
                          style={{
                            background: gateChecks[i]
                              ? gate.color
                              : "rgba(255,255,255,0.06)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Spotlight>
    </section>
  );
}
