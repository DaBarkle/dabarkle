import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Reveal } from "@/components/ui/reveal";
import { harmonize, alpha } from "@/lib/tokens";
import { domainCapabilities, type DomainCapability } from "@/data/hermes";

function DomainPanel({ domain }: { domain: DomainCapability }) {
  const accent = harmonize(domain.color);

  return (
    <GlassCard tone="strong" className="p-6 sm:p-8">
      {/* tagline eyebrow with a small data-colour dot */}
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="font-mono text-[11px] uppercase tracking-widest text-brand-300">
          {domain.tagline}
        </span>
      </div>

      <h3 className="mt-3 text-h3 text-white">{domain.label}</h3>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
        {domain.blurb}
      </p>

      {/* stat chips */}
      <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-4">
        {domain.stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 bg-surface-1/60 px-4 py-3.5 backdrop-blur-sm"
          >
            <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
              {s.label}
            </dt>
            <dd className="text-sm font-medium leading-snug text-white">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* flair note with a thin data-colour left accent + faint tint */}
      <p
        className="mt-6 rounded-r-md border-l-2 py-1 pl-4 font-mono text-xs italic leading-relaxed text-text-tertiary"
        style={{ borderColor: accent, backgroundColor: alpha(accent, 0.06) }}
      >
        {domain.flair}
      </p>
    </GlassCard>
  );
}

export function MultiDomainReach() {
  const tabs = domainCapabilities.map((d) => ({
    id: d.id,
    label: d.label,
    content: <DomainPanel domain={d} />,
  }));

  return (
    <Section
      id="multi-domain-reach"
      eyebrow="Multi-domain reach"
      title="Far beyond the homelab"
      lede="One system reaches across every domain its operator works in — banking, two UniFi networks, local-first voice, and brand-aware design."
    >
      <Reveal direction="up">
        <AnimatedTabs tabs={tabs} />
      </Reveal>
    </Section>
  );
}
