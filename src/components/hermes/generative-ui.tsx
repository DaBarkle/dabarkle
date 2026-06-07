import {
  Activity,
  Boxes,
  Layers,
  Server,
  Smartphone,
  ShieldCheck,
  History,
  ArrowDownToLine,
  Eye,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { cn } from "@/lib/utils";
import { color, alpha } from "@/lib/tokens";
import { hermesPaneStats, paneComponentTypes, irisStats } from "@/data/hermes";

const PANE_STATS: { Icon: typeof Activity; label: string; value: number }[] = [
  { Icon: Server, label: "Port", value: hermesPaneStats.port },
  { Icon: Boxes, label: "Component types", value: hermesPaneStats.componentTypes },
  { Icon: Layers, label: "Lib functions", value: hermesPaneStats.libFunctions },
  { Icon: Activity, label: "MCP servers", value: hermesPaneStats.mcpServers },
];

const PANE_META: { Icon: typeof ShieldCheck; label: string; value: string }[] = [
  { Icon: ShieldCheck, label: "Auth", value: hermesPaneStats.auth },
  { Icon: Boxes, label: "Framework", value: hermesPaneStats.framework },
  { Icon: History, label: "Live since", value: hermesPaneStats.liveSince },
];

const FAUX_HEALTH: { l: string; ok: boolean }[] = [
  { l: "sonarr", ok: true },
  { l: "gluetun", ok: true },
  { l: "sab", ok: false },
];

const FAUX_QUEUE: { w: string; p: string }[] = [
  { w: "82%", p: "92%" },
  { w: "64%", p: "54%" },
  { w: "73%", p: "21%" },
];

export function GenerativeUI() {
  return (
    <Section
      id="generative-ui"
      eyebrow="Generative UI"
      title="Panels that compose themselves"
      lede="Hermes Pane builds a custom React panel for every operator intent — a JSON render tree bound to live MCP tools, phone-first and PWA-installable."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        {/* Hermes Pane — the system */}
        <Reveal direction="up">
          <GlassCard tone="strong" className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
                hermes-pane · render tree
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
                {hermesPaneStats.pollIntervalSeconds}s poll
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-6 p-5 sm:p-6">
              {/* Stat row */}
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PANE_STATS.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-2 rounded-xl border border-hairline bg-white/[0.02] p-3.5"
                  >
                    <Icon className="h-4 w-4 text-brand-300" aria-hidden />
                    <dd className="text-xl font-semibold leading-none text-white sm:text-2xl">
                      <CountUp value={value} />
                    </dd>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      {label}
                    </dt>
                  </div>
                ))}
              </dl>

              {/* MCP bindings */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                  bound to live MCP tools
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {hermesPaneStats.mcpList.map((mcp) => (
                    <span
                      key={mcp}
                      className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-brand-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400/80" aria-hidden />
                      {mcp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta rows */}
              <dl className="divide-y divide-hairline border-t border-hairline">
                {PANE_META.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 py-2.5">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-text-muted" aria-hidden />
                    <dt className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      {label}
                    </dt>
                    <dd className="font-mono text-xs text-text-secondary">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Component-type vocabulary */}
              <div className="mt-auto">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                  {paneComponentTypes.length} composable component types
                </span>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {paneComponentTypes.map((c) => (
                    <span
                      key={c.id}
                      className="rounded-md border border-hairline bg-white/[0.025] px-2 py-1 font-mono text-[11px] text-text-secondary"
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Abstract device mock */}
        <Reveal direction="up" delay={0.1}>
          <SpotlightCard tone="strong" className="flex h-full flex-col p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-brand-300" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
                composed for · &ldquo;show me a queue dashboard&rdquo;
              </span>
            </div>

            {/* Faux phone frame (decorative) */}
            <div
              aria-hidden
              className="mx-auto flex aspect-[9/19] w-full max-w-[260px] flex-col gap-3 rounded-[2rem] border border-hairline bg-canvas/60 p-3 shadow-[var(--edge-highlight)] backdrop-blur-md"
            >
              {/* status bar */}
              <div className="flex items-center justify-between px-1.5 pt-0.5">
                <span className="font-mono text-[9px] text-text-muted">9:41</span>
                <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-brand-300">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-brand-400" />
                  live
                </span>
              </div>

              {/* metric tile */}
              <div className="rounded-xl border border-hairline bg-white/[0.03] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted">
                    download queue
                  </span>
                  <Activity className="h-3 w-3 text-brand-300" />
                </div>
                <div className="mt-1.5 flex items-end gap-1.5">
                  <span className="text-2xl font-semibold leading-none text-white">4</span>
                  <span className="mb-0.5 font-mono text-[9px] text-text-tertiary">active</span>
                </div>
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "68%",
                      background: `linear-gradient(90deg, ${color.primary}, ${color.primaryHover})`,
                    }}
                  />
                </div>
              </div>

              {/* health-pill row */}
              <div className="grid grid-cols-3 gap-1.5">
                {FAUX_HEALTH.map((p) => (
                  <span
                    key={p.l}
                    className="flex items-center gap-1 rounded-lg border border-hairline bg-white/[0.025] px-1.5 py-1.5 font-mono text-[8px] text-text-secondary"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: p.ok ? color.success : color.warning }}
                    />
                    {p.l}
                  </span>
                ))}
              </div>

              {/* mini queue list */}
              <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-hairline bg-white/[0.02]">
                <div className="border-b border-hairline px-2.5 py-1.5">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted">
                    queue-table
                  </span>
                </div>
                <div className="divide-y divide-hairline">
                  {FAUX_QUEUE.map((row, i) => (
                    <div key={i} className="flex items-center gap-2 px-2.5 py-2">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: alpha(color.primaryHover, 0.9) }}
                      />
                      <div className="flex-1">
                        <div className="h-1.5 rounded-full bg-white/[0.08]" style={{ width: row.w }} />
                        <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/[0.05]">
                          <div
                            className="h-full rounded-full"
                            style={{ width: row.p, background: alpha(color.primary, 0.7) }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* action button */}
              <div
                className="rounded-xl border border-hairline py-2 text-center font-mono text-[9px] uppercase tracking-wider text-brand-200"
                style={{ background: alpha(color.primary, 0.12) }}
              >
                resume all
              </div>
            </div>

            <p className="mt-6 text-center text-xs leading-relaxed text-text-tertiary">
              A JSON render tree — not a fixed dashboard. Each component binds to a live tool and
              refreshes on a {hermesPaneStats.pollIntervalSeconds}-second poll.
            </p>
          </SpotlightCard>
        </Reveal>
      </div>

      {/* Iris — companion viewer */}
      <Reveal direction="up" delay={0.15}>
        <GlassCard className="mt-6 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
              <Eye className="h-5 w-5 text-brand-300" aria-hidden />
            </span>
            <div>
              <h3 className="text-base font-semibold text-white">Iris</h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                companion viewer · port {irisStats.port}
              </p>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-hairline sm:block" aria-hidden />

          <div className="flex-1">
            <p className="text-sm leading-relaxed text-text-secondary">{irisStats.purpose}</p>
            <p className="mt-1.5 font-mono text-[11px] text-text-tertiary">
              {irisStats.base} · v3 since {irisStats.v3Since}
            </p>
          </div>

          <Stagger className="flex flex-wrap gap-2 sm:max-w-[44%] sm:justify-end" gap={0.06}>
            {irisStats.customizations.map((c) => (
              <StaggerItem key={c}>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-hairline",
                    "bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-brand-200",
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400/80" aria-hidden />
                  {c}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </GlassCard>
      </Reveal>

      {/* PWA footnote */}
      {hermesPaneStats.pwa && (
        <Reveal direction="up" delay={0.2}>
          <div className="mt-6 flex justify-center">
            <GradientBadge tone="primary" icon={<ArrowDownToLine className="h-3.5 w-3.5" />}>
              PWA-installable · add to home screen on phone
            </GradientBadge>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
