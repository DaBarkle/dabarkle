"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { TextReveal } from "@/components/aceternity/text-reveal";
import { builtWithAiCallouts } from "@/data/hermes";

export function BuiltWithAI() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Subtle top gradient divider */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(99,102,241,0.2) 50%, transparent 90%)",
        }}
      />

      {/* Dramatic text reveal */}
      <div className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <TextReveal text="Every line of code in Hermes was prompted into existence through Claude Code. The interesting question isn't who wrote the code. It's whether conversational AI development can produce ambient intelligence systems with real engineering rigor. Fifteen production sessions suggest it can." />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <ScrollReveal>
          <p className="mb-3 text-overline font-mono text-accent-400">
            Transparency
          </p>
          <h2 className="mb-6 text-h1">
            <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent">
              Built With Claude, Engineered With Intent
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mb-10 text-lg leading-relaxed text-text-secondary">
            What IS genuinely engineered is the architecture: the intent-based
            routing that makes 12 agents discoverable, the ambient memory that
            builds knowledge across sessions, the safety-first approach that
            guarantees zero data loss, and the self-improving feedback loops
            that have deployed 19 optimizations autonomously.
          </p>
        </ScrollReveal>

        {/* Callouts */}
        <div className="space-y-4">
          {builtWithAiCallouts.map((callout, i) => (
            <ScrollReveal key={i} direction="left" delay={0.4 + i * 0.12}>
              <CardSpotlight className="p-5" spotlightColor={`${callout.color}15`}>
                <div className="group/callout flex items-start gap-4">
                  <div
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover/callout:scale-110"
                    style={{ background: `${callout.color}15` }}
                  >
                    <div
                      className="h-2 w-2 rounded-full transition-shadow duration-300"
                      style={{
                        background: callout.color,
                        boxShadow: `0 0 8px ${callout.color}60`,
                      }}
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary transition-colors duration-300 group-hover/callout:text-text-primary/80">
                    {callout.text}
                  </p>
                </div>
              </CardSpotlight>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.7} className="mt-16 text-center">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand-500 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]"
          >
            {/* Shimmer overlay on hover */}
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s ease-in-out infinite",
              }}
            />
            <svg className="relative h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="relative">View on GitHub</span>
            <svg
              className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}
