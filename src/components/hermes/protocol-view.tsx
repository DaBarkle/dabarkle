"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { scspExample, scspCallouts } from "@/data/hermes";

export function ProtocolView() {
  const lines = scspExample.split("\n");
  const [highlightRange, setHighlightRange] = useState<[number, number] | null>(
    null
  );
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

  function getLineColor(line: string): string {
    if (line.match(/^[a-z_]+:/)) return "#818cf8";
    if (line.trim().startsWith("-") && line.includes(":")) return "#fbbf24";
    if (line.includes('"')) return "#14b8a6";
    if (line.match(/:\s/)) return "#fbbf24";
    if (line.trim().startsWith("#")) return "rgba(255,255,255,0.3)";
    return "rgba(255,255,255,0.6)";
  }

  function isHighlighted(lineIdx: number): boolean {
    if (!highlightRange) return false;
    return lineIdx >= highlightRange[0] && lineIdx <= highlightRange[1];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <ScrollReveal>
        <h3 className="mb-3 text-h2 text-white">SCSP Protocol</h3>
        <p className="mb-10 max-w-xl text-base text-text-secondary sm:mb-12">
          Structured Change Set Protocol &mdash; the language agents use to
          communicate changes between pipeline stages.
        </p>
      </ScrollReveal>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Code block */}
        <ScrollReveal direction="left" delay={0.2} className="lg:w-3/5">
          <div className="group/code rounded-2xl border border-border-subtle bg-surface-1 overflow-hidden transition-all duration-500 hover:border-border-default hover:shadow-lg hover:shadow-accent-500/5">
            <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.06] transition-colors duration-300 group-hover/code:bg-red-400/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.06] transition-colors duration-300 group-hover/code:bg-yellow-400/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.06] transition-colors duration-300 group-hover/code:bg-green-400/40" />
                </div>
                <span className="ml-2 font-mono text-xs text-text-tertiary">
                  scsp-output.yaml
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-muted">
                YAML
              </span>
            </div>
            <div className="p-5 overflow-x-auto max-w-full">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  {lines.map((line, i) => (
                    <span
                      key={i}
                      className="block rounded-sm px-1 -mx-1 transition-all duration-200"
                      style={{
                        background: isHighlighted(i)
                          ? "rgba(99,102,241,0.1)"
                          : "transparent",
                        borderLeft: isHighlighted(i)
                          ? "2px solid rgba(99,102,241,0.5)"
                          : "2px solid transparent",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      <span
                        className="mr-4 inline-block w-5 select-none text-right text-xs transition-colors duration-200"
                        style={{
                          color: isHighlighted(i)
                            ? "rgba(99,102,241,0.6)"
                            : "rgba(255,255,255,0.15)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: getLineColor(line) }}>
                        {line || " "}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </ScrollReveal>

        {/* Callout cards */}
        <div className="lg:w-2/5 space-y-4">
          {scspCallouts.map((callout, i) => (
            <ScrollReveal key={callout.label} direction="right" delay={0.5 + i * 0.1}>
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-xl border bg-surface-1 p-5 cursor-default overflow-hidden transition-all duration-300"
                style={{
                  borderColor:
                    activeCallout === i
                      ? `${callout.color}40`
                      : "var(--color-border-subtle)",
                  boxShadow:
                    activeCallout === i
                      ? `0 0 20px ${callout.color}10`
                      : "none",
                }}
                onMouseEnter={() => {
                  setHighlightRange(callout.lineRange);
                  setActiveCallout(i);
                }}
                onMouseLeave={() => {
                  setHighlightRange(null);
                  setActiveCallout(null);
                }}
              >
                {/* Accent line on left */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-300"
                  style={{
                    background: callout.color,
                    opacity: activeCallout === i ? 1 : 0,
                  }}
                />
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full transition-all duration-300"
                    style={{
                      background: callout.color,
                      boxShadow:
                        activeCallout === i
                          ? `0 0 8px ${callout.color}80`
                          : "none",
                    }}
                  />
                  <h4 className="text-sm font-semibold text-white">{callout.label}</h4>
                </div>
                <p className="text-sm text-text-secondary">{callout.description}</p>
                <p className="mt-2 font-mono text-xs text-text-tertiary">
                  Lines {callout.lineRange[0] + 1}&ndash;{callout.lineRange[1] + 1}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}

          <ScrollReveal direction="right" delay={1.0}>
            <div className="rounded-xl border border-accent-500/20 bg-accent-500/5 p-5 transition-all duration-300 hover:border-accent-500/30 hover:bg-accent-500/[0.07]">
              <p className="text-sm text-accent-400">
                SCSP v1.1 doesn&apos;t just identify explicit changes &mdash; it
                infers what should be documented by matching conversation topics
                to the 18 documented sections.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
