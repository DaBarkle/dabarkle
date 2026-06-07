"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { AuroraBackground } from "@/components/visuals/aurora-background";

const EMAIL = "davidbarker774@gmail.com";

export function Contact() {
  const reduced = useReducedMotion();
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-32">
      <AuroraBackground intensity="medium" className="opacity-80" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-b from-transparent to-canvas"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h2 className="text-h1 mt-5 text-balance text-white">
            Interested in <span className="text-gradient">ambient AI systems</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-body-lg text-text-secondary">
            Harness design, infrastructure operation, or how to run a single intelligent system
            across every domain you work in — I read every email.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <motion.a
            href={`mailto:${EMAIL}`}
            whileHover={reduced ? undefined : { y: -3 }}
            whileTap={reduced ? undefined : { scale: 0.99 }}
            className="group inline-flex items-center"
          >
            <GlassCard
              tone="strong"
              gradientBorder
              className="flex items-center gap-4 px-6 py-4 transition-colors duration-300 group-hover:border-border-strong"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft ring-1 ring-inset ring-[rgba(94,105,210,0.3)]">
                <Mail className="h-5 w-5 text-brand-300" />
              </span>
              <span className="flex flex-col items-start text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  Email
                </span>
                <span className="font-mono text-sm font-medium text-white sm:text-base">{EMAIL}</span>
              </span>
              <ArrowUpRight className="ml-2 h-4 w-4 text-text-tertiary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-300" />
            </GlassCard>
          </motion.a>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 font-mono text-xs text-text-muted">Plain email · no forms · no tracking</p>
        </Reveal>
      </div>
    </section>
  );
}
