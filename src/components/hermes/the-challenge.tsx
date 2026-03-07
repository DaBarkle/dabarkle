"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/aceternity/text-reveal";
import { GridBackground } from "@/components/aceternity/grid-background";
import { challengePoints } from "@/data/hermes";

export function TheChallenge() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Dramatic text reveal as scroll hook */}
      <div className="py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <TextReveal text="Infrastructure drifts. Documentation doesn't keep up. Every config tweak, every service update creates drift between reality and documentation. Hermes asks: what if the AI that helps you troubleshoot could also maintain the docs?" />
        </div>
      </div>

      {/* Comparison cards with grid background */}
      <GridBackground variant="grid" gridSize={48} color="rgba(255,255,255,0.015)">
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6">
          <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
            {/* Without Hermes */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-red-500/20 p-8">
                {/* Gradient fill */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 20% 20%, rgba(239,68,68,0.12), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-red-400">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    Without Hermes
                  </h3>
                  <div className="space-y-4">
                    {challengePoints.without.map((point, i) => (
                      <motion.div
                        key={point.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-4 transition-colors duration-300 hover:border-red-500/20 hover:bg-red-500/[0.06]"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
                          <h4 className="text-sm font-semibold text-white">
                            {point.label}
                          </h4>
                        </div>
                        <p className="pl-3.5 text-sm text-text-secondary">
                          {point.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* With Hermes */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 p-8">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 80% 80%, rgba(52,211,153,0.12), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-emerald-400">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    With Hermes
                  </h3>
                  <div className="space-y-4">
                    {challengePoints.with.map((point, i) => (
                      <motion.div
                        key={point.label}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4 transition-colors duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.06]"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                          <h4 className="text-sm font-semibold text-white">
                            {point.label}
                          </h4>
                        </div>
                        <p className="pl-3.5 text-sm text-text-secondary">
                          {point.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.8} className="mt-16 text-center">
            <p className="text-lg font-medium text-text-muted">
              Hermes solves this with a{" "}
              <span className="text-accent-400">two-mode architecture</span>.
            </p>
          </ScrollReveal>
        </div>
      </GridBackground>
    </section>
  );
}
