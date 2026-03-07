"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { scspExample, scspCallouts } from "@/data/hermes";

export function ProtocolView() {
  const lines = scspExample.split("\n");
  const [highlightRange, setHighlightRange] = useState<[number, number] | null>(
    null
  );

  function getLineColor(line: string): string {
    if (line.match(/^[a-z_]+:/)) return "#a78bfa";
    if (line.trim().startsWith("-") && line.includes(":")) return "#fb923c";
    if (line.includes('"')) return "#34d399";
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
          <div className="rounded-2xl border border-border-subtle bg-surface-1 overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                </div>
                <span className="ml-2 font-mono text-xs text-text-tertiary">
                  scsp-output.yaml
                </span>
              </div>
            </div>
            <div className="p-5 overflow-x-auto max-w-full">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  {lines.map((line, i) => (
                    <span
                      key={i}
                      className="block rounded-sm px-1 -mx-1 transition-colors duration-200"
                      style={{
                        background: isHighlighted(i)
                          ? "rgba(167,139,250,0.08)"
                          : "transparent",
                      }}
                    >
                      <span
                        className="mr-4 inline-block w-5 select-none text-right text-xs transition-colors duration-200"
                        style={{
                          color: isHighlighted(i)
                            ? "rgba(167,139,250,0.5)"
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
              <div
                className="group rounded-xl border border-border-subtle bg-surface-1 p-5 transition-all duration-300 hover:border-border-strong cursor-default"
                onMouseEnter={() => setHighlightRange(callout.lineRange)}
                onMouseLeave={() => setHighlightRange(null)}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_6px_var(--glow)]"
                    style={{
                      background: callout.color,
                      "--glow": callout.color,
                    } as React.CSSProperties}
                  />
                  <h4 className="text-sm font-semibold text-white">{callout.label}</h4>
                </div>
                <p className="text-sm text-text-secondary">{callout.description}</p>
                <p className="mt-2 font-mono text-xs text-text-tertiary">
                  Lines {callout.lineRange[0] + 1}&ndash;{callout.lineRange[1] + 1}
                </p>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal direction="right" delay={1.0}>
            <div className="rounded-xl border border-accent-500/20 bg-accent-500/5 p-5">
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
