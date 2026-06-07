import { KeyRound, ShieldCheck, ShieldX, Ban } from "lucide-react";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { CountUp } from "@/components/ui/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { harmonize, alpha } from "@/lib/tokens";
import { sentinelStats, credentialDomains, guardianEndpoints } from "@/data/hermes";

/**
 * GuardianSentinel — structural credential protection. A highlight row of four
 * stat chips (the last is the punchline: the model can NEVER reach values), a
 * grid of credential domains tinted by harmonised data colour, and the Guardian
 * API surface as a glass endpoint list. Single lavender accent throughout; data
 * colours appear only as small dots / chip tints.
 */

type Highlight = {
  id: string;
  Icon: typeof KeyRound;
  label: string;
  value: React.ReactNode;
  caption: string;
  punchline?: boolean;
};

const HIGHLIGHTS: Highlight[] = [
  {
    id: "protected",
    Icon: KeyRound,
    label: "Protected credentials",
    value: <CountUp value={sentinelStats.protectedCredentials} />,
    caption: "Brokered via 1Password",
  },
  {
    id: "rules",
    Icon: ShieldCheck,
    label: "Sentinel rules",
    value: <CountUp value={sentinelStats.totalRules} />,
    caption: "PreToolUse rewriting",
  },
  {
    id: "leaks",
    Icon: ShieldX,
    label: "Leaks intercepted",
    value: <CountUp value={sentinelStats.leaksIntercepted} />,
    caption: "Across prior sessions",
  },
  {
    id: "llm-access",
    Icon: Ban,
    label: "LLM credential access",
    value: "Never",
    caption: "Values never enter context",
    punchline: true,
  },
];

export function GuardianSentinel() {
  return (
    <Section
      id="guardian-sentinel"
      eyebrow="Guardian + Sentinel"
      title="Credentials the model can't reach"
      lede="Credential protection is structural, not behavioural. A 1Password-brokered service injects secrets; a PreToolUse layer rewrites credential-exposing commands. Values never enter the model's context."
    >
      <div className="flex flex-col gap-6">
        {/* (1) Highlight row */}
        <Reveal direction="up">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ id, Icon, label, value, caption, punchline }) => (
              <StaggerItem key={id}>
                <GlassCard
                  tone={punchline ? "strong" : "default"}
                  interactive
                  gradientBorder={punchline}
                  className="h-full p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        punchline ? "bg-primary-soft" : "bg-white/[0.05]",
                      )}
                    >
                      <Icon
                        className={cn("h-4 w-4", punchline ? "text-brand-300" : "text-text-tertiary")}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                      {label}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "mt-4 text-[2rem] font-semibold leading-none tracking-tight tabular-nums sm:text-[2.4rem]",
                      punchline ? "text-gradient" : "text-white",
                    )}
                  >
                    {value}
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-text-tertiary">{caption}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* (2) Credential domains */}
        <Reveal direction="up" delay={0.05}>
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {credentialDomains.map((domain) => {
              const c = harmonize(domain.color);
              const shown = domain.examples.slice(0, 3);
              const extra = domain.examples.length - shown.length;
              return (
                <StaggerItem key={domain.label}>
                  <GlassCard interactive className="flex h-full flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: c, boxShadow: `0 0 8px ${alpha(c, 0.7)}` }}
                        />
                        <h3 className="truncate text-base font-medium text-white">{domain.label}</h3>
                      </div>
                      <span className="font-mono text-lg font-semibold tabular-nums text-white">
                        {domain.count}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {shown.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-md border px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                          style={{
                            borderColor: alpha(c, 0.22),
                            background: alpha(c, 0.06),
                          }}
                        >
                          {ex}
                        </span>
                      ))}
                      {extra > 0 && (
                        <span className="rounded-md border border-hairline px-2 py-0.5 font-mono text-[10px] text-text-tertiary">
                          +{extra}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>

        {/* (3) Guardian API surface */}
        <Reveal direction="up" delay={0.1}>
          <GlassCard tone="strong" className="overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
                guardian broker · {guardianEndpoints.length} endpoints
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-brand-300">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                1Password-backed
              </span>
            </div>
            <Stagger className="divide-y divide-hairline">
              {guardianEndpoints.map((ep) => {
                const isPost = ep.method === "POST";
                return (
                  <StaggerItem key={ep.path}>
                    <div
                      className={cn(
                        "relative flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-4",
                        ep.primary &&
                          "bg-primary-soft/40 ring-1 ring-inset ring-[rgba(94,105,210,0.35)]",
                      )}
                    >
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={cn(
                            "inline-flex w-14 justify-center rounded-md border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
                            isPost
                              ? "border-[rgba(94,105,210,0.3)] bg-primary-soft text-brand-200"
                              : "border-hairline bg-white/[0.04] text-text-tertiary",
                          )}
                        >
                          {ep.method}
                        </span>
                        <code className="font-mono text-sm text-white">{ep.path}</code>
                      </div>
                      <p className="text-sm leading-relaxed text-text-tertiary sm:ml-auto sm:max-w-md sm:text-right">
                        {ep.purpose}
                      </p>
                      {ep.primary && (
                        <span className="absolute right-3 top-3 rounded-full border border-[rgba(94,105,210,0.35)] bg-primary-soft px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-brand-200 sm:static sm:order-last sm:right-auto sm:top-auto">
                          primary
                        </span>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
