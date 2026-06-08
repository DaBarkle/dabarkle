"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, LayoutPanelTop, Presentation } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";

const AGENTS = [
  "Expert",
  "Surgeon",
  "Optimizer",
  "Fleet",
  "Designer",
  "Investigator",
  "Formatter",
  "Auditor",
];

const TAGS = ["Ambient Intelligence", "Situated State", "Guardian + Sentinel", "Generative UI"];

const SUBPROJECTS = [
  {
    title: "Hermes Pane",
    tag: "Generative UI",
    description:
      "A mobile-first panel that composes a custom React UI for every operator intent, bound to live MCP tools across the homelab.",
    href: "/projects/hermes#generative-ui",
    Icon: LayoutPanelTop,
  },
  {
    title: "Fabric Design",
    tag: "Slide System",
    description:
      "A brand-aware deck generator — creative HTML composition for novel formats, strict Slides-API mode for template-locked work.",
    href: "/projects/hermes#multi-domain-reach",
    Icon: Presentation,
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Selected work"
          title="Systems that think"
          lede="One flagship platform, built conversationally with Claude Code and operating in production every day."
        />

        {/* Featured Hermes */}
        <Reveal className="mt-14" direction="up">
          <Link href="/projects/hermes" className="group block" aria-label="Open the Hermes case study">
            <SpotlightCard tone="strong" glow="rgba(94,105,210,0.18)" className="overflow-hidden">
              <div className="flex flex-col gap-8 p-7 md:flex-row md:items-center md:gap-10 md:p-10">
                <div className="md:w-2/5">
                  <AgentConstellation />
                </div>
                <div className="flex-1">
                  <GradientBadge>Featured project</GradientBadge>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">Hermes</h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
                    An ambient intelligence platform that continuously learns, routes intent
                    naturally, protects its own credentials, and acts proactively across every
                    domain its operator works in.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                    {[
                      { v: 22, l: "MCP servers" },
                      { v: 15, l: "Agents" },
                      { v: 36, l: "Credentials" },
                    ].map((s) => (
                      <div key={s.l} className="flex items-baseline gap-1.5">
                        <CountUp value={s.v} className="text-2xl font-semibold text-white" />
                        <span className="text-xs text-text-tertiary">{s.l}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-hairline bg-white/[0.025] px-3 py-1 text-[11px] text-text-tertiary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-all duration-200 group-hover:gap-3">
                    View case study
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </Link>
        </Reveal>

        {/* Sub-projects */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SUBPROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.1} direction="up">
              <Link href={p.href} className="group block h-full">
                <SpotlightCard className="h-full p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft ring-1 ring-inset ring-[rgba(94,105,210,0.25)]">
                      <p.Icon className="h-5 w-5 text-brand-300" />
                    </span>
                    <span className="rounded-full border border-hairline bg-white/[0.025] px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-brand-300">
                      {p.tag}
                    </span>
                  </div>
                  <h4 className="mt-4 text-h3 text-white">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-brand-300 transition-all duration-200 group-hover:gap-2.5">
                    Inside Hermes
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentConstellation() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setActive((p) => (p + 1) % AGENTS.length), 1300);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 280 280" className="h-56 w-full max-w-[280px]" role="img" aria-label="Hermes agent constellation">
        <circle cx="140" cy="140" r="28" fill="rgba(94,105,210,0.16)" stroke="#828fff" strokeWidth="1.6" />
        <text x="140" y="137" textAnchor="middle" fill="#828fff" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">
          H
        </text>
        <text x="140" y="150" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">
          hub
        </text>
        {AGENTS.map((label, i) => {
          const angle = (i / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
          const r = 96;
          const x = 140 + Math.cos(angle) * r;
          const y = 140 + Math.sin(angle) * r;
          const on = active === i;
          const color = on ? "#828fff" : "#5e6ad2";
          return (
            <g key={label}>
              <line
                x1="140"
                y1="140"
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth={on ? 1.6 : 0.6}
                strokeDasharray={on ? "none" : "3 3"}
                style={{ opacity: on ? 0.6 : 0.14, transition: "all 0.5s" }}
              />
              {on && !reduced && (
                <circle cx={x} cy={y} r="15" fill="none" stroke={color} strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="15;25;15" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={x}
                cy={y}
                r="13"
                fill={on ? `${color}26` : "rgba(10,10,14,0.85)"}
                stroke={color}
                strokeWidth={on ? 1.8 : 1}
                style={{
                  opacity: on ? 1 : 0.35,
                  filter: on ? `drop-shadow(0 0 8px ${color})` : "none",
                  transition: "all 0.5s",
                }}
              />
              <circle cx={x} cy={y} r="3.5" fill={color} style={{ opacity: on ? 1 : 0.35, transition: "opacity 0.5s" }} />
              <text
                x={x}
                y={y + (y > 140 ? 24 : -17)}
                textAnchor="middle"
                fill="white"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                style={{ opacity: on ? 0.9 : 0.22, transition: "opacity 0.5s" }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
