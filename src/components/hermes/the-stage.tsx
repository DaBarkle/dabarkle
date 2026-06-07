import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { stageZones, stagePublishers, stageSalience } from "@/data/hermes";
import { harmonize, alpha } from "@/lib/tokens";

const DAY_SECONDS = 86_400;

function ZonesPanel() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2">
      {stageZones.map((zone) => {
        const accent = harmonize(zone.color);
        return (
          <StaggerItem key={zone.id}>
            <GlassCard tone="strong" className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: alpha(accent, 0.12),
                    color: accent,
                    boxShadow: `inset 0 0 0 1px ${alpha(accent, 0.28)}`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={zone.iconPath} />
                  </svg>
                </span>
                <span className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                  {zone.charBudget.toLocaleString()} chars
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-white">{zone.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {zone.description}
              </p>

              <div className="mt-4 flex items-start gap-2 border-t border-hairline pt-3">
                <span
                  aria-hidden="true"
                  className="mt-1 h-1.5 w-1.5 flex-none rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <span className="font-mono text-[11px] leading-relaxed text-text-tertiary">
                  {zone.cadence}
                </span>
              </div>
            </GlassCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

function PublishersPanel() {
  return (
    <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stagePublishers.map((pub) => {
        const accent = harmonize(pub.color);
        return (
          <StaggerItem key={pub.id}>
            <GlassCard className="flex h-full flex-col p-4">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 flex-none rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <span className="truncate font-mono text-[13px] text-brand-300">{pub.label}</span>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {pub.concern}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-text-tertiary">
                  {pub.cadence}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[10px]"
                  style={{
                    backgroundColor: alpha(accent, 0.12),
                    color: accent,
                  }}
                >
                  {pub.decayClass}
                </span>
              </div>
            </GlassCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

function SaliencePanel() {
  return (
    <Stagger className="flex flex-col gap-3">
      {stageSalience.map((s) => {
        const accent = harmonize(s.color);
        const barPct = Math.min(100, (s.decaySeconds / DAY_SECONDS) * 100);
        return (
          <StaggerItem key={s.className}>
            <GlassCard className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-none rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="font-mono text-[13px] text-brand-300">{s.className}</span>
                </div>
                <span className="font-mono text-sm font-semibold text-white">{s.halfLifeLabel}</span>
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-text-tertiary">{s.example}</p>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${barPct}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            </GlassCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function TheStage() {
  return (
    <Section
      id="the-stage"
      eyebrow="The Stage"
      title="Situated state, not context-on-load"
      lede="A four-zone blackboard that maintains what matters right now — assembled from fourteen publishers and decayed by salience class — instead of dumping raw context on every load."
    >
      <Reveal direction="up">
        <AnimatedTabs
          tabs={[
            { id: "zones", label: "4 zones", content: <ZonesPanel /> },
            { id: "publishers", label: "14 publishers", content: <PublishersPanel /> },
            { id: "salience", label: "Salience decay", content: <SaliencePanel /> },
          ]}
        />
      </Reveal>
    </Section>
  );
}
