"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { TextReveal } from "@/components/aceternity/text-reveal";
import { principles } from "@/data/hermes";

function PrincipleCard({ principle }: { principle: (typeof principles)[number] }) {
  return (
    <CardSpotlight className="h-full" spotlightColor={`${principle.color}12`}>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ background: `${principle.color}15` }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={principle.color}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={principle.icon}
              />
            </svg>
          </div>
          <h4 className="text-sm font-semibold" style={{ color: principle.color }}>
            {principle.title}
          </h4>
        </div>
        <p
          className="mb-2 text-xs font-medium"
          style={{ color: `${principle.color}cc` }}
        >
          {principle.contrast}
        </p>
        <p className="mb-3 text-xs leading-relaxed text-text-secondary">
          {principle.description}
        </p>
        <div
          className="rounded-lg px-3 py-2"
          style={{
            background: `${principle.color}08`,
            borderLeft: `2px solid ${principle.color}40`,
          }}
        >
          <p className="text-[11px] italic leading-relaxed text-text-muted">
            {principle.analogy}
          </p>
        </div>
      </div>
    </CardSpotlight>
  );
}

export function AmbientVision() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* TextReveal intro */}
        <div className="mb-16 sm:mb-20">
          <TextReveal
            text="What if your AI assistant didn't just respond to commands, but continuously learned, self-maintained, and acted proactively?"
            className="mx-auto max-w-4xl"
          />
        </div>

        <SectionHeader
          overline="Core Principles"
          title="Ambient Intelligence"
        />

        {/* Top row: 3 cards */}
        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-3">
          {principles.slice(0, 3).map((principle, i) => (
            <ScrollReveal key={principle.id} delay={i * 0.1}>
              <PrincipleCard principle={principle} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="mt-4 grid gap-4 sm:mx-auto sm:max-w-[66.666%] sm:grid-cols-2">
          {principles.slice(3, 5).map((principle, i) => (
            <ScrollReveal key={principle.id} delay={0.3 + i * 0.1}>
              <PrincipleCard principle={principle} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
