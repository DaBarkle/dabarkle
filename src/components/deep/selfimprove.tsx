import { Eyebrow } from "@/components/ui/eyebrow";
import { GoDeeper } from "@/components/ui/go-deeper";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";
import { selfImprovement, VERIFIED_AT } from "@/data/system";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
 * Verbatim figures from the discovery dossier (harness → "Self-Improvement &
 * Verification") that don't live in src/data/system.ts.
 * ------------------------------------------------------------------------- */

// source: "Per-run JSON results since 2026-05-15 (31+ files) + judge transcripts" — .claude/verifier/history/
const HISTORY_SINCE = "2026-05-15";
// source: "30+ probes (size/freshness/invariant/glob-resolution per contract + adversarial judge prompt-injection)" — verifier.py:916–1032
const WEEKLY_MUTATION_PROBES = "30+";
// source: "runs every 6h via systemd timer + at SessionEnd" — hermes-reflex.timer
const REFLEX_CADENCE_HOURS = 6;
// source: "~30 per-hook/per-mode baselines (e.g. post-tool-logger median 49ms over 4,330 samples)" — .claude/reflex/state.json
const REFLEX_EXAMPLE = "median 49 ms · 4,330 samples";
// source: "optimizer knowledge-base 931 lines + 222-line config" — wc -l .claude/optimizer/knowledge-base.md
const OPTIMIZER_KB_LINES = 931;
// source: .claude/agents/closeout-optimizer.md:17 "4-Layer Analysis Architecture" (telemetry → agent → flow → strategic), verified on disk 2026-06-12
const OPTIMIZER_LAYERS = 4;
// source: "max 1 optimization per session, auto-apply only with required validation tests and auto-rollback on failure" — .claude/optimizer/config.yaml:11–119
const OPTIMIZER_MAX_PER_SESSION = 1;
// source: "a Vitals synthetic check (optimizer-killswitch) goes RED and escalates if the switch persists >7 days" — verifier.py:91–97
const KILLSWITCH_ESCALATION_DAYS = 7;
// source: "reflex's FORBIDDEN_PATHS hard-guardrail (8 path prefixes incl. .claude/optimizer/, .credentials/, .claude/hooks/)" — hermes-reflex.py
const FORBIDDEN_PREFIXES = 8;
// source: ".claude/mind/build-log.jsonl (31 entries)" — dossier gap G4, autonomous substrate build
const BUILD_LOG_ENTRIES = 31;

/* ---- The trio — three architecturally separate systems -------------------- */

interface PanelStat {
  label: string;
  value: string;
  tone?: "success";
}

interface WatchSystem {
  name: string;
  role: string;
  receipt: { path: string; note: string };
  body: string;
  stats: PanelStat[];
  deeper: { summary: string; content: React.ReactNode };
}

const TRIO: WatchSystem[] = [
  {
    name: "Hermes Vitals",
    role: "nightly verifier",
    receipt: {
      path: ".claude/verifier/verifier.py",
      note: `${selfImprovement.verifierLines.toLocaleString("en-US")} lines`,
    },
    body: "Evidence-tests every autonomous job, nightly, against declarative YAML contracts — built on the rule that exit 0 is not evidence of work.",
    stats: [
      {
        label: "contracts",
        value: `${selfImprovement.verifierContracts} YAML + ${selfImprovement.syntheticChecks} synthetic`,
      },
      { label: "latest verdict", value: selfImprovement.nightlyVerdict, tone: "success" },
      { label: "run history", value: `JSON per run · since ${HISTORY_SINCE}` },
      { label: "weekly probes", value: `${WEEKLY_MUTATION_PROBES} incl. judge prompt-injection` },
    ],
    deeper: {
      summary: "how the verifier is verified",
      content: (
        <>
          <p>
            Checks run a three-tier ladder: deterministic Python gates first — existence, size,
            freshness, invariants, no LLM involved — then a Haiku judge, with Sonnet escalation
            only on ambiguous results. The judge prompt is injection-hardened: the artifact is
            wrapped in delimiters and the judge&apos;s instructions come after it.
          </p>
          <p className="mt-3">
            The weekly mutation probe feeds it known-bad fixtures — 0-byte files, stale
            timestamps, an artifact that instructs the judge to return PASS. If any gate misses
            its planted failure, the verifier writes its own DISABLED flag and fires a critical
            push. It fails closed rather than report a false GREEN.
          </p>
        </>
      ),
    },
  },
  {
    name: "hermes-reflex",
    role: "substrate autotuner",
    receipt: {
      path: ".claude/hooks/hermes-reflex.py",
      note: `${selfImprovement.reflexLines.toLocaleString("en-US")} lines`,
    },
    body: `Baselines the substrate's own latency and failure telemetry every ${REFLEX_CADENCE_HOURS} hours, detects week-over-week drift, and auto-applies only what is provably safe.`,
    stats: [
      {
        label: "latency baselines",
        value: `~${selfImprovement.latencyBaselines} · per hook, per mode`,
      },
      { label: "e.g. post-tool-logger", value: REFLEX_EXAMPLE },
      {
        label: "actions logged",
        value: `${selfImprovement.reflexActionsLogged} · applied.jsonl`,
      },
    ],
    deeper: {
      summary: "the autonomy boundary",
      content: (
        <p>
          Actions split into two classes. Class A — data housekeeping like pruning telemetry — is
          auto-applied immediately, every action logged. Class B — anything behavioral — is never
          applied by reflex itself: findings are delivered into the next session&apos;s context,
          and the model decides. Only provably-safe work is autonomous; judgment calls are routed
          upward with full evidence attached.
        </p>
      ),
    },
  },
  {
    name: "closeout-optimizer",
    role: "docs-pipeline optimizer",
    receipt: {
      path: ".claude/optimizer/knowledge-base.md",
      note: `${OPTIMIZER_KB_LINES} lines`,
    },
    body: "Improves exactly one thing — the documentation pipeline — and keeps measured evidence of which optimizations actually held.",
    stats: [
      { label: "analysis", value: `${OPTIMIZER_LAYERS} layers · telemetry → strategy` },
      { label: "knowledge base", value: `${OPTIMIZER_KB_LINES} lines, measured patterns` },
      { label: "rate limit", value: `${OPTIMIZER_MAX_PER_SESSION} optimization per session` },
    ],
    deeper: {
      summary: "fail-safe asymmetry",
      content: (
        <p>
          When the pipeline hard-fails it writes an AUTO-DISABLED flag that nothing in the
          codebase ever clears — re-arming is a documented operator-only procedure. The nightly
          verifier goes RED if the switch persists past {KILLSWITCH_ESCALATION_DAYS} days, so a
          disabled optimizer can&apos;t be silently forgotten: the machine can stop itself, but
          only a human can restart it.
        </p>
      ),
    },
  },
];

/* ---- The receipts band — the harness improvement program ------------------ */

const RECEIPTS: ReadonlyArray<{ figure: React.ReactNode; label: string }> = [
  { figure: selfImprovement.round1ChangeSets, label: "round-1 change-sets landed" },
  { figure: selfImprovement.round2FindingsClosed, label: "round-2 findings closed" },
  {
    figure: <StatTicker value={selfImprovement.round2Agents} />,
    label: "agents in the review fan-out",
  },
  { figure: selfImprovement.round2ReviewTokens, label: "tokens of adversarial review" },
  {
    figure: <StatTicker value={selfImprovement.round2Auditors} />,
    label: "independent auditors",
  },
];

/**
 * DeepSelfImprove — the verification trio as three clearly separated
 * instrument panels (the separation is a design rule of the real system,
 * enforced by FORBIDDEN_PATHS), the harness-review receipts band with the
 * dead-code-HIGH story, and the autonomous-build discipline as GoDeeper.
 */
export function DeepSelfImprove() {
  return (
    <Section id="self-improvement" max="6xl">
      {/* Header */}
      <Reveal className="max-w-3xl">
        <Eyebrow>Self-improvement &amp; verification</Eyebrow>
        <SplitHeading as="h2" className="text-h1 mt-4 text-white">
          Systems that watch the systems.
        </SplitHeading>
        <p className="text-body-lg mt-5 text-pretty text-text-secondary">
          Hermes treats its own automation as untrusted until evidence-tested. Three separate
          systems close that loop — a nightly verifier, a substrate autotuner, and a documentation
          optimizer. The separation is itself a design rule, enforced in code rather than by
          convention.
        </p>
      </Reveal>

      {/* The trio */}
      <Stagger className="mt-14 grid items-stretch gap-5 lg:grid-cols-3" gap={0.09}>
        {TRIO.map((sys) => (
          <Reveal asChild key={sys.name} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)] p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-brand-300 uppercase">
                {sys.role}
              </p>
              <h3 className="text-h3 mt-2 text-white">{sys.name}</h3>
              <div className="mt-3">
                <PathChip path={sys.receipt.path} note={sys.receipt.note} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{sys.body}</p>
              <dl className="mt-5 space-y-2.5 border-t border-hairline pt-5">
                {sys.stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-4">
                    <dt className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-ink-faint uppercase">
                      {stat.label}
                    </dt>
                    <dd
                      className={cn(
                        "text-right font-mono text-[12px]",
                        stat.tone === "success" ? "text-success" : "text-ink-muted",
                      )}
                    >
                      {stat.tone === "success" && (
                        <span
                          aria-hidden="true"
                          className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success align-middle"
                        />
                      )}
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {/* spacer keeps a minimum gap when grid equalizes card heights */}
              <div aria-hidden="true" className="min-h-6 grow" />
              <div className="border-t border-hairline pt-5">
                <GoDeeper summary={sys.deeper.summary}>{sys.deeper.content}</GoDeeper>
              </div>
            </article>
          </Reveal>
        ))}
      </Stagger>

      {/* Why three systems, stated structurally */}
      <Reveal className="mt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-hairline bg-white/[0.02] px-5 py-4">
          <p className="min-w-[16rem] flex-1 text-[13px] leading-relaxed text-ink-subtle">
            The separation is structural, not stylistic: the autotuner ships a FORBIDDEN_PATHS
            guardrail — {FORBIDDEN_PREFIXES} path prefixes covering the optimizer, the credential
            layer, and its own code — so one self-improvement system physically cannot rewrite
            another.
          </p>
          <PathChip
            path=".claude/hooks/hermes-reflex.py"
            note={`FORBIDDEN_PATHS · ${FORBIDDEN_PREFIXES} prefixes`}
          />
        </div>
      </Reveal>

      {/* Receipts band */}
      <Reveal className="mt-14">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
          The receipts — two harness review rounds
        </p>
      </Reveal>
      <Stagger className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" gap={0.06}>
        {RECEIPTS.map((r) => (
          <Reveal asChild key={r.label}>
            <div className="rounded-xl border border-hairline bg-white/[0.02] p-4">
              <p className="font-mono text-2xl font-medium tracking-tight text-white tabular-nums sm:text-3xl">
                {r.figure}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-ink-subtle">{r.label}</p>
            </div>
          </Reveal>
        ))}
      </Stagger>

      {/* The audit that earned the band its credibility */}
      <Reveal className="mt-6">
        <div className="rounded-xl border border-hairline bg-white/[0.02] px-5 py-4">
          <p className="text-sm leading-relaxed text-ink-muted">
            One of the {selfImprovement.round2Auditors} auditors caught a HIGH the system&apos;s
            own fixtures had missed: the autotuner&apos;s flagship
            deliver-findings-at-session-start path was dead code — parked in a branch that could
            never execute in production. It was made unconditional, live-proven, and the audit-fix
            comment is still in the source.
          </p>
          <div className="mt-3">
            <PathChip
              path=".claude/hooks/session-start-core.sh:352–354"
              note="r2 AUDIT FIX 2026-06-11"
            />
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-6">
        <p className="font-mono text-[11px] text-ink-faint">verified {VERIFIED_AT}</p>
      </Reveal>

      {/* Expert detail — the build discipline behind all of it */}
      <div className="mt-14">
        <GoDeeper summary="the substrate is built the way it's audited">
          <p>
            The Stage — the system&apos;s working memory — was built by an autonomous executor
            from a written plan, under explicit HALT conditions. Every divergence from that plan
            was logged with its reasoning in adaptations.md: plan-spec versus actual, and the
            constraint envelope it stayed inside. A {BUILD_LOG_ENTRIES}-entry build log and a
            rollback script sat on disk the whole time.
          </p>
          <p className="mt-3">
            That is the house discipline, not a one-off: substrate changes start as design
            documents — {selfImprovement.planDocuments} of them live in .claude/plans/ — and land
            end-to-end with fixtures and auto-revert. No phased rollouts.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path=".claude/mind/adaptations.md" note="divergence log" />
            <PathChip path=".claude/mind/build-log.jsonl" note={`${BUILD_LOG_ENTRIES} entries`} />
            <PathChip path=".claude/mind/stage-rollback.sh" note="escape hatch" />
            <PathChip
              path=".claude/plans/"
              note={`${selfImprovement.planDocuments} design docs`}
            />
          </div>
        </GoDeeper>
      </div>
    </Section>
  );
}
