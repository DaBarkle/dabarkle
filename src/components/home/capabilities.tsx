"use client";

import { Network, Server, LayoutPanelTop, ShieldCheck, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { BentoGrid, BentoCell } from "@/components/ui/bento";
import { Reveal } from "@/components/ui/reveal";
import { GridOverlay } from "@/components/visuals/grid-overlay";

interface Capability {
  title: string;
  description: string;
  tags: string[];
  Icon: LucideIcon;
  span: string;
  glow: string;
  hasViz?: boolean;
}

const CAPS: Capability[] = [
  {
    title: "Harness Design",
    description:
      "The scaffolding around the model — a capability registry, natural-language intent routing, five-level ambient memory, situated state, and a self-integration protocol that registers new skills automatically.",
    tags: ["Intent Routing", "Ambient Memory", "Self-Integration"],
    Icon: Network,
    span: "md:col-span-4",
    glow: "rgba(130,143,255,0.16)",
    hasViz: true,
  },
  {
    title: "Ambient Infrastructure",
    description:
      "Two UniFi sites, a media stack, a SIEM, a banking pipeline and a voice stack — all reachable through one operator.",
    tags: ["Bazzite", "UniFi Fleet", "Wazuh"],
    Icon: Server,
    span: "md:col-span-2",
    glow: "rgba(94,105,210,0.16)",
  },
  {
    title: "Generative UI",
    description:
      "Phone-first panels that compose themselves — JSON render trees bound to live MCP tools, PWA-installable.",
    tags: ["Next.js", "MCP", "Tailscale"],
    Icon: LayoutPanelTop,
    span: "md:col-span-2",
    glow: "rgba(130,143,255,0.16)",
  },
  {
    title: "Credential Security",
    description:
      "Structural credential protection — 1Password-brokered execution, PreToolUse command rewriting, and self-learning leak detection. The model never sees a secret.",
    tags: ["Guardian", "Sentinel", "1Password"],
    Icon: ShieldCheck,
    span: "md:col-span-4",
    glow: "rgba(94,105,210,0.16)",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 px-6 py-28">
      <GridOverlay variant="dots" size={28} opacity={0.4} className="opacity-50" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Capabilities"
          title="What I build with"
          lede="Four disciplines that compose into a single intelligent system — not a folder of disconnected tools."
        />

        <div className="mt-14">
          <BentoGrid>
            {CAPS.map((cap, i) => (
              <Reveal key={cap.title} direction="up" delay={i * 0.06} className={cap.span}>
                <BentoCell glow={cap.glow} span="" className="h-full">
                  <div className="flex h-full flex-col gap-5 p-6 sm:p-7">
                    {cap.hasViz && <AgentFlow />}
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft ring-1 ring-inset ring-[rgba(94,105,210,0.25)] transition-transform duration-300 group-hover:scale-110">
                        <cap.Icon className="h-5 w-5 text-brand-300" />
                      </span>
                      <div className="flex-1">
                        <h3 className="text-h3 text-white">{cap.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {cap.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline bg-white/[0.025] px-2.5 py-1 text-[11px] font-medium text-text-tertiary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </BentoCell>
              </Reveal>
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

/** Small animated intent → router → orchestrator → agents pipeline. */
function AgentFlow() {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl border border-hairline bg-black/30 p-2">
      <svg viewBox="0 0 300 90" className="h-full w-full" aria-label="Intent routing pipeline" role="img">
        {[
          { x1: 40, y1: 45, x2: 115, y2: 28 },
          { x1: 40, y1: 45, x2: 115, y2: 62 },
          { x1: 115, y1: 28, x2: 185, y2: 45 },
          { x1: 115, y1: 62, x2: 185, y2: 45 },
          { x1: 185, y1: 45, x2: 260, y2: 28 },
          { x1: 185, y1: 45, x2: 260, y2: 62 },
        ].map((l, i) => (
          <line key={i} {...l} stroke="#5e6ad2" strokeWidth="1" strokeOpacity="0.35" />
        ))}
        {[
          { path: "M40,45 L115,28", begin: "0s" },
          { path: "M115,62 L185,45", begin: "0.7s" },
          { path: "M185,45 L260,28", begin: "1.4s" },
        ].map((p, i) => (
          <circle key={i} r="2.2" fill="#828fff">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={p.begin} path={p.path} />
          </circle>
        ))}
        {/* nodes */}
        <Node x={40} y={45} r={13} label="IN" />
        <Node x={115} y={28} r={10} label="R1" dim />
        <Node x={115} y={62} r={10} label="R2" dim />
        <Node x={185} y={45} r={15} label="ORC" strong />
        <Node x={260} y={28} r={10} label="A1" dim />
        <Node x={260} y={62} r={10} label="A2" dim />
      </svg>
    </div>
  );
}

function Node({
  x,
  y,
  r,
  label,
  strong,
  dim,
}: {
  x: number;
  y: number;
  r: number;
  label: string;
  strong?: boolean;
  dim?: boolean;
}) {
  const color = strong ? "#828fff" : "#5e6ad2";
  return (
    <g>
      {strong && (
        <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values={`${r};${r + 6};${r}`} dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
      )}
      <circle cx={x} cy={y} r={r} fill={`${color}22`} stroke={color} strokeWidth={strong ? 1.6 : 1.2} opacity={dim ? 0.7 : 1} />
      <text x={x} y={y + 3} textAnchor="middle" fill={color} fontSize="7.5" fontWeight="700" fontFamily="var(--font-mono)">
        {label}
      </text>
    </g>
  );
}
