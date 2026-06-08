import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { Reveal } from "@/components/ui/reveal";

const METRICS = [
  { value: 15, label: "Agents", caption: "Each with an explicit model assignment" },
  { value: 22, label: "MCP servers", caption: "Registered tool surfaces" },
  { value: 36, label: "Credentials", caption: "Structurally unreachable from the model" },
  { value: 5, label: "Memory layers", caption: "Capture levels feeding Qdrant" },
  { value: 14, label: "Stage publishers", caption: "Producing salience-ranked attention" },
  { value: 19, label: "Optimizations", caption: "Auto-applied, zero manual reverts" },
  { value: 155, label: "Days live", caption: "Operating in production", suffix: "+" },
  { value: 0, label: "Leaks reached the model", caption: "43 intercepted at the structural layer" },
];

export function Metrics() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          align="center"
          eyebrow="By the numbers"
          title="A real system, not a demo"
          lede="Hermes runs every day across a homelab, two networks, banking, voice and design — these are its current figures."
          className="mx-auto items-center"
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} direction="up" delay={(i % 4) * 0.06}>
              <StatCard
                value={m.value}
                label={m.label}
                caption={m.caption}
                suffix={m.suffix}
                accent="var(--color-brand-300)"
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
