"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/three-d-card";
import { GridBackground } from "@/components/aceternity/grid-background";
import { CountUp } from "@/components/shared/count-up";

const agents = [
  { label: "Expert", color: "#818cf8" },
  { label: "Surgeon", color: "#fbbf24" },
  { label: "Optimizer", color: "#6366f1" },
  { label: "Fleet", color: "#a5b4fc" },
  { label: "Designer", color: "#f59e0b" },
  { label: "Investigator", color: "#2dd4bf" },
  { label: "Formatter", color: "#14b8a6" },
  { label: "Auditor", color: "#ef4444" },
];

const tags = [
  "Ambient Intelligence",
  "Situated State",
  "Guardian + Sentinel",
  "Generative UI",
];

const subProjects = [
  {
    title: "Hermes Pane",
    description:
      "Mobile-first generative UI that composes a custom React panel for every operator intent, bound to live MCP tools across the homelab.",
    href: "/projects/hermes#generative-ui",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    tag: "Generative UI",
  },
  {
    title: "Fabric Design",
    description:
      "Brand-aware deck generator with two pipelines — creative HTML composition for novel formats, strict Slides API mode for template-locked work.",
    href: "/projects/hermes#multi-domain-reach",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
    tag: "Slide System",
  },
];

export function ProjectsSection() {
  const [activeNode, setActiveNode] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % agents.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section id="projects" className="relative overflow-hidden bg-bg py-32">
      <GridBackground variant="grid" gridSize={64} color="rgba(255,255,255,0.02)">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <p className="mb-3 text-overline font-mono text-accent-400">
              Selected Work
            </p>
            <h2 className="text-h1 mb-4 text-white">
              Systems That Think
            </h2>
            <p className="mb-16 max-w-lg text-lg text-text-secondary">
              Built with precision engineering and driven by AI orchestration.
            </p>
          </ScrollReveal>

          {/* Featured: Hermes - 3D Card */}
          <ScrollReveal delay={0.2} className="mb-12">
            <Link href="/projects/hermes" className="block">
              <CardContainer containerClassName="w-full">
                <CardBody className="group relative w-full rounded-2xl border border-white/[0.08] bg-surface-1 p-8 md:p-10 hover:border-white/[0.15] transition-colors duration-300 hover:shadow-2xl hover:shadow-accent-500/5">
                  <div className="flex flex-col gap-8 md:flex-row md:items-center">
                    {/* Left: Pipeline visualization */}
                    <CardItem translateZ={50} className="md:w-2/5">
                      <div className="flex items-center justify-center">
                        <svg
                          viewBox="0 0 280 280"
                          className="h-56 w-full max-w-[280px]"
                        >
                          {/* Central hub */}
                          <circle cx="140" cy="140" r="28" fill="rgba(99,102,241,0.15)" stroke="#818cf8" strokeWidth="2" />
                          <text x="140" y="137" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="700" className="font-mono">H</text>
                          <text x="140" y="150" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">hub</text>

                          {/* Radial agent nodes */}
                          {agents.map((agent, i) => {
                            const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
                            const r = 95;
                            const x = 140 + Math.cos(angle) * r;
                            const y = 140 + Math.sin(angle) * r;
                            const isActive = activeNode === i;
                            return (
                              <g key={agent.label}>
                                {/* Connection line */}
                                <line x1="140" y1="140" x2={x} y2={y}
                                  stroke={agent.color} strokeWidth={isActive ? 2 : 0.5}
                                  strokeDasharray={isActive ? "none" : "3 3"}
                                  style={{ opacity: isActive ? 0.6 : 0.1, transition: "all 0.5s" }}
                                />
                                {/* Pulse ring */}
                                {isActive && (
                                  <circle cx={x} cy={y} r="16" fill="none" stroke={agent.color} strokeWidth="1" opacity="0.4">
                                    <animate attributeName="r" values="16;26;16" dur="1.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
                                  </circle>
                                )}
                                {/* Node */}
                                <circle cx={x} cy={y} r="14" fill={isActive ? `${agent.color}20` : "rgba(10,10,10,0.8)"}
                                  stroke={agent.color} strokeWidth={isActive ? 2 : 1}
                                  style={{ opacity: isActive ? 1 : 0.3, filter: isActive ? `drop-shadow(0 0 8px ${agent.color})` : "none", transition: "all 0.5s" }}
                                />
                                <circle cx={x} cy={y} r="4" fill={agent.color}
                                  style={{ opacity: isActive ? 1 : 0.3, transition: "opacity 0.5s" }}
                                />
                                {/* Label */}
                                <text x={x} y={y + (y > 140 ? 24 : -18)} textAnchor="middle"
                                  fill="white" fontSize="9" className="font-mono"
                                  style={{ opacity: isActive ? 0.9 : 0.2, transition: "opacity 0.5s" }}
                                >
                                  {agent.label}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </CardItem>

                    {/* Right: Info */}
                    <CardItem translateZ={30} className="flex-1">
                      <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
                        Featured Project
                      </span>
                      <h3 className="mb-3 text-3xl font-bold text-white">
                        Hermes
                      </h3>
                      <p className="mb-6 text-base leading-relaxed text-text-secondary">
                        An ambient intelligence platform that continuously
                        learns, routes intent naturally, and acts proactively.
                      </p>

                      <CardItem translateZ={60} className="w-full">
                        <div className="mb-6 flex flex-wrap gap-6">
                          <div className="flex items-baseline gap-1.5">
                            <CountUp
                              value={22}
                              className="text-2xl font-bold text-white"
                            />
                            <span className="text-xs text-text-tertiary">
                              MCP Servers
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <CountUp
                              value={15}
                              className="text-2xl font-bold text-white"
                            />
                            <span className="text-xs text-text-tertiary">
                              Agents
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <CountUp
                              value={32}
                              className="text-2xl font-bold text-white"
                            />
                            <span className="text-xs text-text-tertiary">
                              Credentials
                            </span>
                          </div>
                        </div>
                      </CardItem>

                      <div className="mb-5 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-text-tertiary transition-colors duration-200 hover:border-accent-500/20 hover:text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <CardItem translateZ={70}>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-400 transition-all duration-200 group-hover:gap-3">
                          View Case Study
                          <svg
                            className="h-4 w-4"
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
                        </span>
                      </CardItem>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </Link>
          </ScrollReveal>

          {/* Sub-projects within Hermes */}
          <div className="grid gap-6 md:grid-cols-2">
            {subProjects.map((project, i) => (
              <ScrollReveal key={project.title} delay={0.5 + i * 0.15}>
                <Link href={project.href} className="block">
                  <motion.div
                    whileHover={{ y: -2, transition: { duration: 0.25 } }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-1 p-8 transition-all duration-500 hover:border-white/[0.12] hover:shadow-lg hover:shadow-accent-500/5"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 50%, rgba(251,191,36,0.05) 100%)",
                      }}
                    />
                    <div className="relative">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] transition-colors duration-300 group-hover:bg-white/[0.06]">
                          <svg
                            className="h-5 w-5 text-brand-400 transition-colors duration-300 group-hover:text-brand-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={project.icon}
                            />
                          </svg>
                        </div>
                        <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-brand-300">
                          {project.tag}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-white">
                        {project.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-400 transition-all duration-200 group-hover:gap-2">
                        Inside Hermes
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
