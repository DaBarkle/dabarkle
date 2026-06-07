"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Meteors } from "@/components/aceternity/meteors";

const EMAIL = "davidbarker774@gmail.com";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-bg py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.10), transparent 60%)",
        }}
      />
      <Meteors number={12} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent-400">
            Let&apos;s talk
          </p>
          <h2 className="text-h1">
            <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent">
              Reach out directly
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            Interested in ambient AI systems, harness design, or how to operate
            a single intelligent system across every domain you work in? I read
            every email.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.a
            href={`mailto:${EMAIL}`}
            whileHover={{ y: -3, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.985 }}
            className="group mx-auto mt-12 inline-flex max-w-full items-center gap-3 rounded-2xl border border-white/[0.08] bg-surface-1 px-6 py-4 shadow-lg transition-all duration-300 hover:border-brand-400/40 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.20)]"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background: "rgba(99, 102, 241, 0.12)",
                boxShadow: "inset 0 0 0 1px rgba(99, 102, 241, 0.30)",
              }}
            >
              <svg
                className="h-6 w-6 text-brand-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>
            <span className="flex flex-col items-start text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Email
              </span>
              <span className="font-mono text-sm font-medium text-white sm:text-base">
                {EMAIL}
              </span>
            </span>
            <svg
              className="ml-2 h-4 w-4 text-text-tertiary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <p className="mt-8 font-mono text-xs text-text-muted">
            Plain email · no forms · no tracking
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
