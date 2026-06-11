import { selfImprovement, VERIFIED_AT } from "@/data/system";
import { selfModelQuotes } from "@/data/mind";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassCard } from "@/components/ui/glass-card";
import { GoDeeper } from "@/components/ui/go-deeper";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";

/* ----------------------------------------------------------------------------
   Dossier facts (everything else renders from system.ts → selfImprovement)
   -------------------------------------------------------------------------- */
// source: /tmp/dabarkle-discovery.json → harness[5].metrics — status.json
// last_run 2026-06-10T16:36Z, verdict "GREEN — 0 red, 0 yellow"
const LAST_RUN = "2026-06-10T16:36Z";
const RED_COUNT = 0;
const YELLOW_COUNT = 0;
// source: /tmp/dabarkle-discovery.json → harness[5].facts — "per-job failure
// streaks all at 0"
const FAILURE_STREAKS = 0;
// source: /tmp/dabarkle-discovery.json → harness[5].facts — verifier built on
// the rule that "exit 0 is NOT evidence of work"
const VERIFIER_AXIOM = "exit 0 is NOT evidence of work";
// source: /tmp/dabarkle-discovery.json → harness[5].facts — streak-based
// severity ladder: 1st fail MEDIUM, 2nd HIGH, 3rd CRITICAL phone wake
const ESCALATION_LADDER = ["MEDIUM", "HIGH", "CRITICAL"] as const;
// source: /tmp/dabarkle-discovery.json → harness[5].facts — weekly Sunday
// mutation probe injects known-bad fixtures the gates must catch
const MUTATION_PROBE = "weekly · must catch planted bad fixtures";
// source: /tmp/dabarkle-discovery.json → harness[5].facts — external dead-man
// switches: Healthchecks.io ping + Uptime Kuma push monitor
const DEADMAN_SWITCH = "Healthchecks.io + Uptime Kuma push";
// source: /tmp/dabarkle-discovery.json → harness[5].facts — "Round 2
// (2026-06-10/11) was an 8-subsystem review fan-out … 79 verified findings
// (1 critical / 3 high / 32 medium / 43 low)"
const ROUND2_DATES = "2026-06-10/11";
const ROUND2_SUBSYSTEMS = 8;
const ROUND2_SEVERITY = "1 critical · 3 high · 32 medium · 43 low";
// source: src/data/system.ts → selfImprovement round-2 review volume ("~7.1M")
// — kept verbatim as a display string plus a numeric mantissa for the ticker
const reviewVolume = "~7.1M";
const reviewMillions = 7.1;
// source: src/data/system.ts → selfImprovement round-2 findings closed
// ("79/79") — numerator/denominator for the ticker
const ROUND2_FINDINGS = 79;

const fmt = (n: number) => n.toLocaleString("en-US");

/** The honesty kicker — pre-vetted quote, mind.ts selfModelQuotes[2]. */
const HONESTY = selfModelQuotes[2];

/* ----------------------------------------------------------------------------
   Left rail — the four disciplines
   -------------------------------------------------------------------------- */
const DISCIPLINES: ReadonlyArray<{ k: string; tag: string; body: React.ReactNode }> = [
  {
    k: "01",
    tag: "verify",
    body: (
      <>
        A {fmt(selfImprovement.verifierLines)}-line verifier evidence-tests every autonomous job
        each night against <span className="text-ink">{selfImprovement.verifierContracts}</span>{" "}
        behavioral contracts plus {selfImprovement.syntheticChecks} synthetic checks — cadence,
        freshness, size, schema invariants. Latest verdict:{" "}
        <span className="font-mono text-success">{selfImprovement.nightlyVerdict}</span>.
      </>
    ),
  },
  {
    k: "02",
    tag: "tune",
    body: (
      <>
        A reflex autotuner baselines hook latency — ~
        <span className="text-ink">{selfImprovement.latencyBaselines}</span> per-hook, per-mode
        profiles, refreshed every six hours — and has logged{" "}
        <span className="text-ink">{selfImprovement.reflexActionsLogged}</span> housekeeping
        actions, every one on an audit trail. Behavioral changes it may only propose, never
        apply.
      </>
    ),
  },
  {
    k: "03",
    tag: "plan",
    body: (
      <>
        Substrate changes are plan-first:{" "}
        <span className="text-ink">{selfImprovement.planDocuments}</span> design documents on
        disk before code touches the layer that runs everything. No ad-hoc edits.
      </>
    ),
  },
  {
    k: "04",
    tag: "document",
    body: (
      <>
        A nightly pipeline maintains the as-built record —{" "}
        <span className="text-ink">{selfImprovement.asbuiltVersion}</span> today,{" "}
        {fmt(selfImprovement.asbuiltLines)} lines, {selfImprovement.asbuiltVersionsArchived}{" "}
        versions archived.
      </>
    ),
  },
];

/* ----------------------------------------------------------------------------
   Right rail — the verifier readout
   -------------------------------------------------------------------------- */

/** One labelled line of the instrument panel. */
function ReadoutRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/[0.04] py-2.5 last:border-0">
      <dt className="shrink-0 text-ink-faint">{label}</dt>
      <dd className="text-right text-ink-muted">{value}</dd>
    </div>
  );
}

/**
 * VerifierReadout — an instrument panel in the TerminalWindow idiom (glass
 * frame, traffic dots, mono type). Pure server markup; the GREEN lamp pulses
 * via the existing `glow-pulse` keyframe (opacity only, killed globally under
 * prefers-reduced-motion).
 */
function VerifierReadout() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-error/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/30" />
        </span>
        <span className="truncate font-mono text-xs text-ink-subtle">
          hermes-vitals · .claude/verifier/status.json
        </span>
      </div>

      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed sm:px-6">
        {/* Verdict lamp */}
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <span className="text-ink-faint">verdict</span>
          <span className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_14px_rgba(61,191,159,0.9)] animate-[glow-pulse_2.4s_ease-in-out_infinite]"
            />
            <span className="text-xl font-semibold tracking-[0.18em] text-success">
              {selfImprovement.nightlyVerdict}
            </span>
          </span>
        </div>

        <dl className="mt-2">
          <ReadoutRow
            label="contracts"
            value={`${selfImprovement.verifierContracts} behavioral · all green`}
          />
          <ReadoutRow
            label="synthetic"
            value={`${selfImprovement.syntheticChecks} checks · all green`}
          />
          <ReadoutRow label="red / yellow" value={`${RED_COUNT} / ${YELLOW_COUNT}`} />
          <ReadoutRow
            label="failure streaks"
            value={`${FAILURE_STREAKS} — every monitored job`}
          />
          <ReadoutRow label="last run" value={LAST_RUN} />
          <ReadoutRow
            label="escalation"
            value={
              <>
                <span className="text-ink-muted">{ESCALATION_LADDER[0]}</span>
                <span aria-hidden="true" className="text-ink-faint">
                  {" → "}
                </span>
                <span className="text-warning">{ESCALATION_LADDER[1]}</span>
                <span aria-hidden="true" className="text-ink-faint">
                  {" → "}
                </span>
                <span className="text-error">{ESCALATION_LADDER[2]}</span>
                <span className="text-ink-faint"> · phone</span>
              </>
            }
          />
          <ReadoutRow label="mutation probe" value={MUTATION_PROBE} />
          <ReadoutRow label="dead-man switch" value={DEADMAN_SWITCH} />
        </dl>

        <p className="mt-5 text-ink-faint">
          <span aria-hidden="true"># </span>
          {VERIFIER_AXIOM}
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Section
   -------------------------------------------------------------------------- */

/**
 * SelfMaintenance — "It audits itself nightly." Asymmetric 5/7 split: the four
 * maintenance disciplines on the left, a live-styled verifier readout on the
 * right, then the full-width round-2 self-review band with the honesty finding
 * that drove it. Server component; motion lives in imported primitives.
 */
export function SelfMaintenance() {
  return (
    <Section id="self-maintenance" max="6xl">
      {/* Header */}
      <div className="mb-12 max-w-3xl sm:mb-14">
        <Reveal>
          <Eyebrow>Vitals · Reflex · plan-first discipline</Eyebrow>
        </Reveal>
        <SplitHeading as="h2" className="text-h1 mt-4 text-balance text-white">
          It audits itself nightly.
        </SplitHeading>
        <Reveal delay={0.15}>
          <p className="text-body-lg mt-5 text-pretty text-ink-muted">
            Autonomy you can’t audit is a liability. Three architecturally separate systems —
            a verifier, an autotuner, and a documentation pipeline — check the substrate while
            the operator sleeps, and none of them trusts an exit code.
          </p>
        </Reveal>
      </div>

      {/* 5/7 asymmetric split */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <Stagger className="flex flex-col gap-8 lg:col-span-5">
          {DISCIPLINES.map((d) => (
            <StaggerItem key={d.k} className="border-l border-hairline pl-5">
              <p className="font-mono text-overline text-brand-300">
                {d.k} · {d.tag}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal direction="left" className="lg:col-span-7">
          <VerifierReadout />
        </Reveal>
      </div>

      {/* Round-2 self-review band */}
      <Reveal className="mt-16">
        <GlassCard tone="strong" gradientBorder className="p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-overline text-brand-300">
                round-2 self-review · {ROUND2_DATES}
              </p>
              <h3 className="text-h2 mt-3 text-balance text-white">
                It reviewed itself with {selfImprovement.round2Agents} agents and {reviewVolume}{" "}
                tokens.
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                {selfImprovement.round2Auditors} independent auditors fanned out across{" "}
                {ROUND2_SUBSYSTEMS} subsystems and returned {ROUND2_FINDINGS} verified findings —{" "}
                {ROUND2_SEVERITY}. All {ROUND2_FINDINGS} are closed.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
                <div>
                  <StatTicker
                    value={selfImprovement.round2Agents}
                    className="font-mono text-2xl font-medium text-ink sm:text-3xl"
                  />
                  <p className="mt-1.5 text-[12px] leading-snug text-ink-subtle">review agents</p>
                </div>
                <div>
                  <StatTicker
                    value={reviewMillions}
                    display={`~${reviewMillions}`}
                    suffix="M"
                    className="font-mono text-2xl font-medium text-ink sm:text-3xl"
                  />
                  <p className="mt-1.5 text-[12px] leading-snug text-ink-subtle">
                    tokens of independent review
                  </p>
                </div>
                <div>
                  <StatTicker
                    value={ROUND2_FINDINGS}
                    suffix={`/${ROUND2_FINDINGS}`}
                    className="font-mono text-2xl font-medium text-ink sm:text-3xl"
                  />
                  <p className="mt-1.5 text-[12px] leading-snug text-ink-subtle">
                    findings closed
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <GoDeeper summary="the audit caught the flagship loop as dead code">
                  {/* source: dossier harness[5].facts — reflex's deliver-findings path sat in a
                      disabled branch and had never fired in production; moved unconditional, and
                      telemetry-to-action loops now close end-to-end (Stage publish + phone
                      escalation for severe findings) */}
                  <p>
                    Reflex’s headline feature — delivering its findings to the model at session
                    start — turned out to sit in a disabled branch: it had never fired in
                    production. The system’s own fixtures missed it; the independent audit
                    didn’t. The path now runs unconditionally, findings publish into working
                    memory, and severe ones escalate to the operator’s phone.
                  </p>
                </GoDeeper>
              </div>
            </div>

            {/* The finding that drove it — pre-vetted self-model quote */}
            <div className="lg:col-span-5 lg:border-l lg:border-hairline lg:pl-10">
              <p className="font-mono text-overline text-brand-300">the finding that drove it</p>
              <blockquote className="mt-4 text-lg leading-snug text-ink">
                “{HONESTY.quote}”
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-ink-subtle">{HONESTY.context}</p>
              <p className="mt-5 font-mono text-[11px] text-ink-faint">{HONESTY.source}</p>
            </div>
          </div>
        </GlassCard>
      </Reveal>

      {/* Receipts */}
      <Reveal className="mt-10 flex flex-wrap items-center gap-2">
        <PathChip
          path=".claude/verifier/verifier.py"
          note={`${fmt(selfImprovement.verifierLines)} lines`}
        />
        <PathChip
          path=".claude/hooks/hermes-reflex.py"
          note={`${fmt(selfImprovement.reflexLines)} lines`}
        />
        <PathChip path=".claude/plans/" note={`${selfImprovement.planDocuments} design docs`} />
        {/* path verified on disk 2026-06-12 */}
        <PathChip
          path="docs/asbuilt/current/Nyx_Media_Stack_AsBuilt_v9.3.md"
          note={`${fmt(selfImprovement.asbuiltLines)} lines · ${selfImprovement.asbuiltVersionsArchived} versions`}
        />
        <span className="font-mono text-[11px] text-ink-faint">verified {VERIFIED_AT}</span>
      </Reveal>
    </Section>
  );
}
