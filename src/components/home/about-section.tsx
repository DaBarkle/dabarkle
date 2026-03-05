"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { GlowingStarsCard } from "@/components/aceternity/glowing-stars";
import { TextReveal } from "@/components/aceternity/text-reveal";
import { GridBackground } from "@/components/aceternity/grid-background";

const skillAreas = [
  {
    title: "AI Orchestration",
    description:
      "Multi-agent systems, tiered routing, self-improving feedback loops, and structured protocol design.",
    skills: ["Multi-Agent Systems", "Prompt Engineering", "Pipeline Design"],
    color: "#a78bfa",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    span: "md:col-span-2",
  },
  {
    title: "Infrastructure",
    description:
      "Docker, KVM, VPN tunnels, SIEM, and production homelab automation.",
    skills: ["Docker", "Linux", "IaC"],
    color: "#fb923c",
    icon: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
    span: "md:col-span-1",
  },
  {
    title: "Development",
    description: "Modern web stacks, type safety, and purposeful design.",
    skills: ["Next.js", "TypeScript", "React"],
    color: "#34d399",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    span: "md:col-span-1",
  },
  {
    title: "Security & Monitoring",
    description:
      "Wazuh SIEM, layered VPN architectures, threat detection, and real-time observability.",
    skills: ["Wazuh", "VPN", "Monitoring"],
    color: "#fbbf24",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    span: "md:col-span-2",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg">
      {/* Scroll-linked text reveal */}
      <div className="py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <TextReveal text="I design and build self-improving systems. Multi-agent orchestrations that maintain, optimize, and evolve themselves. My work sits at the intersection of AI engineering and infrastructure automation." />
        </div>
      </div>

      {/* Bento grid skills */}
      <GridBackground variant="dots" className="pb-32 pt-16">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <ScrollReveal className="mb-12">
            <p className="mb-3 text-overline font-mono text-accent-400">
              Capabilities
            </p>
            <h2 className="text-h1 text-white">What I Build With</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {skillAreas.map((area, i) => (
              <ScrollReveal
                key={area.title}
                delay={0.1 + i * 0.1}
                className={area.span}
              >
                <GlowingStarsCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${area.color}15` }}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={area.color}
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={area.icon}
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold text-white">
                        {area.title}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                        {area.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200"
                            style={{
                              background: `${area.color}10`,
                              color: area.color,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowingStarsCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
