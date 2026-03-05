"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { GlowingStarsCard } from "@/components/aceternity/glowing-stars";
import { HoverEffect } from "@/components/aceternity/hover-effect";
import { GridBackground } from "@/components/aceternity/grid-background";
import { agents, systemModes, agentIcons } from "@/data/hermes";

const modeIcons: Record<string, string> = {
  "live-ops":
    "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z",
  "doc-pipeline":
    "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
};

export function TheSystem() {
  const [activeAgent, setActiveAgent] = useState(-1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const startDelay = setTimeout(() => {
      setActiveAgent(0);
    }, 800);

    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 2000);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="dots" gridSize={40} color="rgba(255,255,255,0.03)">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            overline="Architecture"
            title="Two Modes, One System"
            subtitle="Hermes operates in two complementary modes: real-time infrastructure operations and automated documentation maintenance."
          />

          {/* Two mode cards with dramatic hover */}
          <div className="mb-20 mt-12 grid gap-6 md:grid-cols-2 sm:mt-16">
            {systemModes.map((mode, i) => (
              <ScrollReveal key={mode.id} delay={0.2 + i * 0.15}>
                <GlowingStarsCard className="h-full p-8">
                  <div className="mb-5 flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${mode.color}15` }}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={mode.color}
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={modeIcons[mode.id]}
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {mode.name}
                    </h3>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                    {mode.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mode.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: `${mode.color}10`,
                          color: mode.color,
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </GlowingStarsCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Connector text */}
          <ScrollReveal delay={0.5} className="mb-12 text-center">
            <p className="text-lg text-text-muted">
              The documentation pipeline is where the engineering depth lives.
              <br />
              <span className="text-accent-400 font-medium">
                Four specialized agents, each purpose-built.
              </span>
            </p>
          </ScrollReveal>

          {/* Four Agents heading */}
          <ScrollReveal className="mb-12">
            <h3 className="text-center text-h2 text-white">The Four Agents</h3>
          </ScrollReveal>

          {/* Desktop: Cards with dramatic effects */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-5">
            {agents.map((agent, i) => (
              <ScrollReveal key={agent.id} delay={0.2 + i * 0.1}>
                <div
                  className="group relative overflow-hidden rounded-2xl border bg-surface-1 p-6 transition-all duration-500"
                  style={{
                    borderColor:
                      activeAgent === i
                        ? `${agent.color}60`
                        : "rgba(255,255,255,0.06)",
                    boxShadow:
                      activeAgent === i
                        ? `0 0 40px ${agent.color}15, inset 0 1px 0 ${agent.color}10`
                        : "none",
                  }}
                >
                  {/* Active glow overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      opacity: activeAgent === i ? 1 : 0,
                      background: `radial-gradient(ellipse at 50% 0%, ${agent.color}08, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500"
                      style={{
                        background: `${agent.color}15`,
                        boxShadow:
                          activeAgent === i
                            ? `0 0 20px ${agent.color}30`
                            : "none",
                      }}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={agent.color}
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={agentIcons[agent.id]}
                        />
                      </svg>
                    </div>
                    <h4 className="mb-1 text-lg font-bold text-white">
                      {agent.name}
                    </h4>
                    <p
                      className="mb-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: agent.color }}
                    >
                      {agent.role}
                    </p>
                    <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                      {agent.description}
                    </p>
                    <div className="rounded-lg bg-white/[0.02] p-3">
                      <p className="text-xs italic text-text-tertiary">
                        {agent.why}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {agent.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="rounded-full bg-white/[0.03] px-2 py-0.5 text-[10px] text-text-tertiary"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="space-y-4 md:hidden">
            {agents.map((agent, i) => (
              <ScrollReveal
                key={agent.id}
                direction="left"
                delay={0.2 + i * 0.1}
              >
                <div
                  className="relative rounded-2xl border border-border-subtle bg-surface-1 p-5"
                  style={{ borderLeft: `3px solid ${agent.color}` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${agent.color}15` }}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={agent.color}
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={agentIcons[agent.id]}
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {agent.name}
                      </h4>
                      <p className="text-xs" style={{ color: agent.color }}>
                        {agent.role}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
