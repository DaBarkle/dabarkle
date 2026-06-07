"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { BentoGrid } from "@/components/aceternity/bento-grid";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { TextReveal } from "@/components/aceternity/text-reveal";
import { GridBackground } from "@/components/aceternity/grid-background";

const skillAreas = [
  {
    title: "Harness Design",
    description:
      "Designing the scaffolding around AI — capability registries, intent routing, 5-level ambient memory, situated state, self-integration protocols.",
    skills: ["Intent Routing", "Ambient Memory", "Self-Integration"],
    color: "#818cf8",
    spotlightColor: "rgba(129, 140, 248, 0.08)",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    span: "md:col-span-2",
    hasVisualization: true,
  },
  {
    title: "Ambient Infrastructure",
    description:
      "Two UniFi sites, a media stack, a SIEM, a banking pipeline, a voice stack — all reachable through one operator.",
    skills: ["Bazzite", "UniFi Fleet", "Wazuh"],
    color: "#2dd4bf",
    spotlightColor: "rgba(45, 212, 191, 0.08)",
    icon: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
    span: "md:col-span-1",
    hasVisualization: false,
  },
  {
    title: "Generative UI",
    description:
      "Phone-first panels that compose themselves. JSON render trees bound to live MCP tools, PWA-installable.",
    skills: ["Next.js", "MCP", "Tailscale"],
    color: "#6366f1",
    spotlightColor: "rgba(99, 102, 241, 0.08)",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    span: "md:col-span-1",
    hasVisualization: false,
  },
  {
    title: "Credential Security",
    description:
      "Structural credential protection. 1Password-brokered execution, PreToolUse rewriting, self-learning leak detection. The model never sees a secret.",
    skills: ["Guardian", "Sentinel", "1Password"],
    color: "#fbbf24",
    spotlightColor: "rgba(251, 191, 36, 0.08)",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
    span: "md:col-span-2",
    hasVisualization: false,
  },
];

function AgentFlowVisualization() {
  return (
    <svg
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Agent flow visualization showing connected nodes"
    >
      {/* Connection lines */}
      <line
        x1="50"
        y1="40"
        x2="110"
        y2="25"
        stroke="#818cf8"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <line
        x1="50"
        y1="40"
        x2="110"
        y2="55"
        stroke="#818cf8"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <line
        x1="110"
        y1="25"
        x2="170"
        y2="40"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <line
        x1="110"
        y1="55"
        x2="170"
        y2="40"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <line
        x1="170"
        y1="40"
        x2="230"
        y2="25"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <line
        x1="170"
        y1="40"
        x2="230"
        y2="55"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      {/* Animated pulses along lines */}
      <circle r="2" fill="#818cf8" opacity="0.8">
        <animateMotion
          dur="2.5s"
          repeatCount="indefinite"
          path="M50,40 L110,25"
        />
      </circle>
      <circle r="2" fill="#6366f1" opacity="0.8">
        <animateMotion
          dur="2.5s"
          repeatCount="indefinite"
          begin="0.8s"
          path="M110,55 L170,40"
        />
      </circle>
      <circle r="2" fill="#4f46e5" opacity="0.8">
        <animateMotion
          dur="2.5s"
          repeatCount="indefinite"
          begin="1.6s"
          path="M170,40 L230,25"
        />
      </circle>

      {/* Intent node */}
      <circle
        cx="50"
        cy="40"
        r="12"
        fill="#818cf820"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
      <text
        x="50"
        y="44"
        textAnchor="middle"
        fill="#818cf8"
        fontSize="8"
        fontWeight="600"
      >
        IN
      </text>

      {/* Router nodes */}
      <circle
        cx="110"
        cy="25"
        r="10"
        fill="#6366f120"
        stroke="#6366f1"
        strokeWidth="1.5"
      />
      <text
        x="110"
        y="29"
        textAnchor="middle"
        fill="#6366f1"
        fontSize="7"
        fontWeight="600"
      >
        R1
      </text>
      <circle
        cx="110"
        cy="55"
        r="10"
        fill="#6366f120"
        stroke="#6366f1"
        strokeWidth="1.5"
      />
      <text
        x="110"
        y="59"
        textAnchor="middle"
        fill="#6366f1"
        fontSize="7"
        fontWeight="600"
      >
        R2
      </text>

      {/* Orchestrator node */}
      <circle
        cx="170"
        cy="40"
        r="14"
        fill="#4f46e520"
        stroke="#4f46e5"
        strokeWidth="2"
      />
      <text
        x="170"
        y="44"
        textAnchor="middle"
        fill="#4f46e5"
        fontSize="7"
        fontWeight="700"
      >
        ORC
      </text>

      {/* Agent nodes */}
      <circle
        cx="230"
        cy="25"
        r="10"
        fill="#2dd4bf20"
        stroke="#2dd4bf"
        strokeWidth="1.5"
      />
      <text
        x="230"
        y="29"
        textAnchor="middle"
        fill="#2dd4bf"
        fontSize="7"
        fontWeight="600"
      >
        A1
      </text>
      <circle
        cx="230"
        cy="55"
        r="10"
        fill="#fbbf2420"
        stroke="#fbbf24"
        strokeWidth="1.5"
      />
      <text
        x="230"
        y="59"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="7"
        fontWeight="600"
      >
        A2
      </text>

      {/* Glow effect on orchestrator */}
      <circle
        cx="170"
        cy="40"
        r="14"
        fill="none"
        stroke="#4f46e5"
        strokeWidth="1"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="14;20;14"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function SkillCardContent({
  area,
}: {
  area: (typeof skillAreas)[number];
}) {
  return (
    <div className="flex h-full flex-col justify-between p-5">
      {/* Visualization header for AI Orchestration */}
      {area.hasVisualization && (
        <div className="mb-4 h-20 w-full overflow-hidden rounded-lg border border-border-subtle bg-bg/50 p-2">
          <AgentFlowVisualization />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${area.color}15`,
          }}
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
          <h3 className="mb-1 text-lg font-bold text-white">{area.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-text-secondary">
            {area.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {area.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105"
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
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg">
      {/* Scroll-linked text reveal */}
      <div className="px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <TextReveal text="I design ambient intelligence systems and operate them in production. Platforms that continuously learn, route intent naturally, and act proactively. My work sits where harness design meets infrastructure operation." />
        </div>
      </div>

      {/* Bento grid skills */}
      <GridBackground variant="dots" className="pb-32 pt-16">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <ScrollReveal className="mb-12">
            <p className="text-overline mb-3 font-mono text-accent-400">
              Capabilities
            </p>
            <h2 className="text-h1 text-white">What I Build With</h2>
          </ScrollReveal>

          <BentoGrid className="max-w-5xl md:auto-rows-[20rem]">
            {skillAreas.map((area, i) => (
              <ScrollReveal
                key={area.title}
                delay={0.1 + i * 0.1}
                className={area.span}
              >
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                  className="h-full"
                >
                  <CardSpotlight
                    className="h-full"
                    spotlightColor={area.spotlightColor}
                  >
                    <SkillCardContent area={area} />
                  </CardSpotlight>
                </motion.div>
              </ScrollReveal>
            ))}
          </BentoGrid>
        </div>
      </GridBackground>
    </section>
  );
}
