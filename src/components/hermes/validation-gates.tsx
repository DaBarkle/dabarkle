"use client";

import { useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { gates } from "@/data/hermes";

const gateIcons = [
  "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
];

export function ValidationGates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [animPhase, setAnimPhase] = useState(-1);

  useEffect(() => {
    if (prefersReducedMotion) setAnimPhase(4);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const delays = [600, 1400, 2200, 3000, 3600];
    const timers = delays.map((d, i) =>
      setTimeout(() => setAnimPhase(i), d)
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <ScrollReveal>
        <h3 className="mb-3 text-h2 text-white">3-Gate Validation</h3>
        <p className="mb-10 max-w-xl text-base text-text-secondary sm:mb-12">
          Every document update passes through three independent validation
          gates. No exceptions.
        </p>
      </ScrollReveal>

      <div className="relative mx-auto max-w-lg">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-surface-1">
          <div
            className="w-full bg-gradient-to-b from-accent-500/50 to-emerald-500/50 transition-all duration-[2000ms] ease-out"
            style={{
              height:
                animPhase >= 4
                  ? "100%"
                  : animPhase >= 0
                    ? `${(animPhase + 1) * 25}%`
                    : "0%",
            }}
          />
        </div>

        {/* Entry */}
        <div className="relative mb-8 flex justify-center">
          <div
            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-0 transition-all duration-500"
            style={{
              boxShadow:
                animPhase >= 0
                  ? "0 0 15px rgba(255,255,255,0.1)"
                  : "none",
            }}
          >
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
        </div>

        {/* Gates */}
        {gates.map((gate, i) => {
          const passed = animPhase > i;
          const active = animPhase === i;
          return (
            <ScrollReveal key={gate.id} delay={0.2 + i * 0.1} className="relative mb-8">
              <div
                className="relative z-10 mx-auto rounded-2xl border bg-surface-1 p-6 transition-all duration-500 overflow-hidden"
                style={{
                  borderColor: active
                    ? `${gate.color}80`
                    : passed
                      ? `${gate.color}40`
                      : "var(--color-border-subtle)",
                  boxShadow: active
                    ? `0 0 25px ${gate.color}20`
                    : "none",
                }}
              >
                {active && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                      backgroundSize: "100% 40px",
                      animation: "scanline 1.5s linear infinite",
                    }}
                  />
                )}
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-500"
                    style={{ background: `${gate.color}15` }}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={gate.color} strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={gateIcons[i]} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">Gate {i + 1}: {gate.shortName}</h4>
                      {passed && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#34d399"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </motion.svg>
                      )}
                      {active && (
                        <div
                          className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin"
                          style={{
                            borderColor: gate.color,
                            borderTopColor: "transparent",
                          }}
                        />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-text-tertiary">{gate.description}</p>
                  </div>
                </div>
                {(active || passed) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {gate.validates.map((item) => (
                      <span
                        key={item}
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all duration-300"
                        style={{
                          background: passed ? `${gate.color}15` : "rgba(255,255,255,0.05)",
                          color: passed ? gate.color : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {passed && <span className="mr-0.5">&#10003;</span>}
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}

        {/* Result */}
        <div className="relative flex justify-center">
          <motion.div
            animate={{
              opacity: animPhase >= 4 ? 1 : 0.2,
              scale: animPhase >= 4 ? 1 : 0.95,
            }}
            transition={{ duration: 0.5 }}
            className="relative z-10 overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-4 text-center"
          >
            <p className="relative text-3xl font-bold text-emerald-400">100%</p>
            <p className="relative mt-1 text-sm text-emerald-400/70">Pass Rate</p>
          </motion.div>
        </div>
      </div>

      <ScrollReveal delay={0.8} className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-sm text-text-muted">
          All 3 gates: 100% pass rate across 7 validated sessions (S7&ndash;S13).
          On failure, Gate 2 deletes the new document and preserves the original
          &mdash; zero tolerance for data loss.
        </p>
      </ScrollReveal>

      <style>{`
        @keyframes scanline {
          0% { background-position: 0 -40px; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
}
