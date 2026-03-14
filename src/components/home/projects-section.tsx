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
  { label: "Designer", color: "#f59e0b" },
  { label: "Investigator", color: "#2dd4bf" },
  { label: "Formatter", color: "#14b8a6" },
];

const tags = [
  "Ambient Intelligence",
  "Intent Routing",
  "Self-Optimizing",
  "Semantic Memory",
];

const comingSoon = [
  {
    title: "Infrastructure Monitor",
    description: "Real-time observability dashboard for homelab metrics",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
  {
    title: "Agent Framework",
    description: "Reusable multi-agent toolkit for orchestration patterns",
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
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
                              value={9}
                              className="text-2xl font-bold text-white"
                            />
                            <span className="text-xs text-text-tertiary">
                              Capabilities
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <CountUp
                              value={12}
                              className="text-2xl font-bold text-white"
                            />
                            <span className="text-xs text-text-tertiary">
                              Agents
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <CountUp
                              value={3}
                              className="text-2xl font-bold text-white"
                            />
                            <span className="text-xs text-text-tertiary">
                              Memory Layers
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

          {/* Coming Soon */}
          <div className="grid gap-6 md:grid-cols-2">
            {comingSoon.map((project, i) => (
              <ScrollReveal key={project.title} delay={0.5 + i * 0.15}>
                <motion.div
                  whileHover={{ y: -2, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-1 p-8 transition-all duration-500 hover:border-white/[0.12] hover:shadow-lg hover:shadow-accent-500/5"
                >
                  {/* Gradient sweep on hover */}
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
                          className="h-5 w-5 text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary"
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
                      <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-text-muted">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
