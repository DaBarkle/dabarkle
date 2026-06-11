import { Eyebrow } from "@/components/ui/eyebrow";
import { GoDeeper } from "@/components/ui/go-deeper";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";
import { capabilities, selfImprovement, substrate, VERIFIED_AT } from "@/data/system";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
 * Verbatim figures from the discovery dossier (harness → "Hermes Substrate")
 * that don't live in src/data/system.ts.
 * ------------------------------------------------------------------------- */

// source: "session-start-core.sh (466 lines, full file)" — boot diagnostics hook
const SESSION_START_CORE_LINES = 466;
// source: "sentinel-guard.sh on a 200ms timeout across Bash|Read|Grep|Write|Edit|mcp__.*" — settings.local.json lines 376–409
const SENTINEL_GATE_TIMEOUT_MS = 200;
// source: "PostToolUse logging redacts credentials with 9 regex patterns before writing tool logs" — post-tool-logger-core.py lines 1–95
const REDACTION_REGEXES = 9;
// source: "a full RAG pipeline running inside a shell hook with an 8s budget" / "13% of prompts previously lost their retrieval block to the 8s router timeout" — user-prompt-router.sh; hermes-bridge.py lines 733–736
const ROUTER_BUDGET_S = 8;
// source: "Prompts shorter than 15 characters and system-bus XML envelopes (task-notification, subagent-notification) fast-fail the router" — user-prompt-router.sh lines 29–50
const FASTFAIL_MIN_CHARS = 15;
// source: "query median 20.8ms / p90 29.6ms (n=43) and capability-match median 0.1ms (n=263)" — computed from .claude/memory/metrics/bridge-daemon.jsonl
const WARM_QUERY_N = 43;
const CAPMATCH_N = 263;
// source: "clients probe $XDG_RUNTIME_DIR/hermes-bridge.sock with a 1s timeout and silently fall back to the cold subprocess path" — user-prompt-router.sh lines 290–317
const SOCKET_PROBE_TIMEOUT_S = 1;
// source: "the unit runs in background.slice with MemoryHigh=900M/MemoryMax=1200M/MemorySwapMax=0" — ~/.config/systemd/user/hermes-bridge-daemon.service
const DAEMON_MEMORY_CAPS = "MemoryHigh 900M · MemoryMax 1200M · MemorySwapMax 0";
// source: "The design went through an adversarial review (2 reviewers, 8 blocking issues, fixes marked [RVW] in code)" — hermes-bridge.py daemon section
const REVIEW_REVIEWERS = 2;
const REVIEW_BLOCKING_ISSUES = 8;
// source: "decline-judge (Haiku-judged false-decline detector, replacing a regex version with a 40% FP rate)" — settings.local.json lines 434–470
const DECLINE_JUDGE_REGEX_FP_PCT = 40;
// source: "20 hook command registrations span all 9 Claude Code hook lifecycle events" — settings.local.json lines 331–510
const TOTAL_LIFECYCLE_EVENTS = 9;

/* ----------------------------------------------------------------------------
 * The hook-event map — what Hermes wired into each platform lifecycle event.
 * Registration counts are verbatim from the dossier:
 * source: "20 hook command registrations span all 9 Claude Code hook lifecycle
 * events: SessionStart (4 hooks), SessionEnd (1), PreToolUse (3 matchers),
 * SubagentStart (1), PostToolUse (1), Stop (6), UserPromptSubmit (2),
 * SubagentStop (1), PreCompact (1)." — settings.local.json lines 331–510
 * ------------------------------------------------------------------------- */

interface HookEventRow {
  event: string;
  count: number;
  wired: string;
  chip?: { path: string; note?: string };
}

const HOOK_EVENTS: HookEventRow[] = [
  {
    event: "SessionStart",
    count: 4,
    wired: `Boot-time self-diagnosis: Guardian health check, the pre-authenticated SSH socket to the Nyx VM, a credential-rotation drift scan, capability-registry + Stage injection — with a per-step timing report rendered to the operator on every session.`,
    chip: { path: ".claude/hooks/session-start-core.sh", note: `${SESSION_START_CORE_LINES} lines` },
  },
  {
    event: "UserPromptSubmit",
    count: 2,
    wired: `The ${substrate.routerLines.toLocaleString("en-US")}-line intent router (below) plus the digest-gated stage-delta injector — attention churn reaches the model only when it actually changed.`,
    chip: { path: ".claude/hooks/stage-delta-injector.sh", note: "digest-gated" },
  },
  {
    event: "PreToolUse",
    count: 3,
    wired: `Three gates: Sentinel credential rewriting on a ${SENTINEL_GATE_TIMEOUT_MS} ms timeout across Bash, Read, Grep, Write, Edit and every MCP tool — plus mutation gates for the home UDM and the remote network fleet.`,
    chip: { path: ".claude/hooks/sentinel-guard.sh", note: "+ gate-unifi / gate-fleet" },
  },
  {
    event: "PostToolUse",
    count: 1,
    wired: `Redacts credentials from tool logs with ${REDACTION_REGEXES} regex patterns, leak-scans Bash/Read/Grep output through Guardian, and auto-discovers every executable under .claude/hooks/ as protected substrate — no hardcoded list to drift stale.`,
    chip: { path: ".claude/hooks/post-tool-logger-core.py" },
  },
  {
    event: "SubagentStart",
    count: 1,
    wired: "Sentinel propagation — every spawned agent inherits credential protection before it runs a single tool call.",
  },
  {
    event: "SubagentStop",
    count: 1,
    wired: "Subagent capture — agent results flow into the memory pipeline, not just back to the parent session.",
  },
  {
    event: "Stop",
    count: 6,
    wired: "The six-hook capture chain (expanded below) — every assistant response is post-processed, judged, and remembered before the turn is allowed to end.",
  },
  {
    event: "PreCompact",
    count: 1,
    wired: "Snapshots the load-bearing state — current goal, open threads, unresolved findings — before the platform compacts the transcript; the router re-injects it exactly once afterwards via an mtime-gated handshake.",
    chip: { path: ".claude/hooks/pre-compact-preserve.sh" },
  },
  {
    event: "SessionEnd",
    count: 1,
    wired: "The self-observation chain: salvage memory capture, meta-observer anomaly snapshot, the reflex trend autotuner, then a full context rebuild from disk truth.",
    chip: { path: ".claude/hooks/session-end.sh" },
  },
];

/* ---- The 8 retrieval block types, by name ---------------------------------
 * source: block list + per-block behavior — user-prompt-router.sh lines
 * 187–1010 (block tags at lines 201, 234, 322, 381, 436, 546, 664, 944)
 * ------------------------------------------------------------------------- */

const RETRIEVAL_BLOCKS: ReadonlyArray<{ name: string; gloss: string }> = [
  { name: "weighted-by-current-goal", gloss: "the retrieval query itself is augmented with the session’s active goal" },
  { name: "past-observations", gloss: "Qdrant top-3 — quality-weighted, 14-day staleness filter" },
  {
    name: "capability-matches",
    gloss: `keyword matching + semantic paraphrase matches at cosine ≥ ${capabilities.semanticMatchThreshold.toFixed(2)}`,
  },
  { name: "recurring-pattern", gloss: "a 7-day scan over ambient memory for repeats" },
  { name: "active-rules", gloss: "behavioral feedback rules surfaced when keyword-relevant" },
  { name: "relevant-skills", gloss: "registered skills matched against the prompt" },
  { name: "operational-patterns", gloss: "runbook chunks with line-range citations" },
  { name: "proactive-suggestions", gloss: "surfaced by the system without being asked" },
];

/* ---- The 6-hook Stop chain -------------------------------------------------
 * source: hook names + roles — settings.local.json lines 434–470:
 * "decline-judge (Haiku-judged false-decline detector ...), feedback-judge,
 * working-memory-append, ambient-memory-enforcer (4 responsibilities incl.
 * auto-registering pending capability integrations), memsearch-capture
 * (transcript -> Haiku summary -> daily markdown ...), and promote-skill"
 * ------------------------------------------------------------------------- */

const STOP_CHAIN: ReadonlyArray<{ k: string; name: string; gloss: string }> = [
  { k: "01", name: "decline-judge", gloss: "Haiku-judged false-decline detector" },
  { k: "02", name: "feedback-judge", gloss: "turns corrections into durable rules" },
  { k: "03", name: "working-memory-append", gloss: "session scratchpad upkeep" },
  { k: "04", name: "ambient-memory-enforcer", gloss: "blocks turns that forget to remember" },
  { k: "05", name: "memsearch-capture", gloss: "transcript → Haiku → daily markdown" },
  { k: "06", name: "promote-skill", gloss: "part of the self-integration pipeline" },
];

/* ---- systemd unit families -------------------------------------------------
 * source: "14 dedicated systemd user service/timer families (bridge-daemon,
 * bridge-sync, stage-heartbeat, stage-reflect, stage-dream, stage-watchdog,
 * reflex, vitals, vitals-mutation-probe, auto-closeout, context-precompute,
 * ssh-keepalive, banking-fetch, pane)" — ls ~/.config/systemd/user/
 * pathUnit flags: system.ts substrate.inotifyPathUnits — banking inbox,
 * bridge-sync, stage-reflect.
 * ------------------------------------------------------------------------- */

const UNIT_FAMILIES: ReadonlyArray<{ name: string; pathUnit?: boolean }> = [
  { name: "bridge-daemon" },
  { name: "bridge-sync", pathUnit: true },
  { name: "stage-heartbeat" },
  { name: "stage-reflect", pathUnit: true },
  { name: "stage-dream" },
  { name: "stage-watchdog" },
  { name: "reflex" },
  { name: "vitals" },
  { name: "vitals-mutation-probe" },
  { name: "auto-closeout" },
  { name: "context-precompute" },
  { name: "ssh-keepalive" },
  { name: "banking-fetch", pathUnit: true },
  { name: "pane" },
];

// source: system.ts substrate.systemdUnitFiles comment — "~14 functional families"
const UNIT_FAMILY_COUNT = 14;

/**
 * DeepSubstrate — the always-on hook layer as a docs-register section: the
 * 9-event hook map as table rows, the per-prompt router with its 8 retrieval
 * blocks by name, the warm-bridge daemon as an explicit BEFORE/AFTER
 * instrument panel, the 6-hook Stop chain, and the systemd clockwork with the
 * inotify .path units called out. GoDeeper holds the failure-mode design,
 * router fast-fail, and latency-mode tagging.
 */
export function DeepSubstrate() {
  return (
    <Section id="substrate" max="6xl">
      {/* Header */}
      <Reveal className="max-w-3xl">
        <Eyebrow>The hook layer</Eyebrow>
        <SplitHeading as="h2" className="text-h1 mt-4 text-white">
          The substrate.
        </SplitHeading>
        <p className="text-body-lg mt-5 text-pretty text-text-secondary">
          {substrate.hookScripts} hook scripts — {substrate.hookLines.toLocaleString("en-US")}{" "}
          lines — saturate all {substrate.lifecycleEventsUsed} lifecycle events the platform
          exposes, with a retrieval router on every prompt, a resident daemon underneath it, and{" "}
          {substrate.systemdUnitFiles} systemd units running the loop between sessions. The events
          are Claude Code’s extension API; every line wired into them is Hermes.
        </p>
      </Reveal>

      {/* Hook-event map */}
      <Reveal className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
            The hook-event map — {substrate.lifecycleEventsUsed}/{TOTAL_LIFECYCLE_EVENTS} events ·{" "}
            {substrate.hookRegistrations} registrations
          </p>
          <PathChip path=".claude/settings.local.json" note="lines 331–510" />
        </div>
      </Reveal>
      <Stagger as="ul" className="mt-4 border-t border-hairline" gap={0.05}>
        {HOOK_EVENTS.map((row) => (
          <Reveal asChild as="li" key={row.event}>
            <div className="grid gap-2 border-b border-hairline py-5 sm:grid-cols-[180px_56px_1fr] sm:gap-6">
              <p className="font-mono text-[13px] text-ink">{row.event}</p>
              <p className="font-mono text-[12px] text-brand-300">×{row.count}</p>
              <div>
                <p className="text-[13px] leading-relaxed text-ink-subtle">{row.wired}</p>
                {row.chip && (
                  <div className="mt-2.5">
                    <PathChip path={row.chip.path} note={row.chip.note} />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </Stagger>

      {/* Per-prompt router */}
      <Reveal className="mt-14">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
              The per-prompt router — {substrate.retrievalBlockTypes} retrieval block types
            </p>
            <PathChip
              path=".claude/hooks/user-prompt-router.sh"
              note={`${substrate.routerLines.toLocaleString("en-US")} lines`}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Every prompt fires a {substrate.routerLines.toLocaleString("en-US")}-line intent
            router — a full retrieval pipeline inside a shell hook with an {ROUTER_BUDGET_S}-second
            budget, per-block debounce and digest gates, and per-block JSONL telemetry. Up to{" "}
            {substrate.retrievalBlockTypes} block types are assembled into one context payload the
            operator never sees:
          </p>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {RETRIEVAL_BLOCKS.map((block, i) => (
              <li key={block.name} className="flex gap-3 border-t border-hairline py-3">
                <span className="pt-0.5 font-mono text-[11px] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[13px] text-brand-300">{block.name}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-subtle">
                    {block.gloss}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-hairline pt-5">
            <PathChip path="user-prompt-router.sh" note="block tags · lines 201–948" />
            <PathChip path="router-block-telemetry.jsonl" note="fired / scores / tokens per block" />
            <PathChip path="router-errors.jsonl" note="no silent failures" />
          </div>
        </div>
      </Reveal>

      {/* Warm-bridge daemon — BEFORE / AFTER instrument panel */}
      <Reveal className="mt-14">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
          The warm-bridge daemon — before / after
        </p>
      </Reveal>
      <Reveal className="mt-4">
        <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_56px_1fr]">
          {/* BEFORE */}
          <div className="rounded-2xl border border-hairline bg-white/[0.02] p-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
              before — cold subprocess
            </p>
            <p className="mt-3 font-mono text-4xl font-medium text-ink-muted tabular-nums">
              {substrate.coldPathSeconds}
              <span className="ml-1.5 text-xl text-ink-subtle">s</span>
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-subtle">
              Every retrieval cold-booted the embedding model and the Qdrant client in a fresh
              subprocess.
            </p>
            <p className="mt-4 border-t border-hairline pt-4 text-[13px] leading-relaxed text-ink-subtle">
              <span className="font-mono text-error/90">{substrate.promptsLostToTimeoutPct}%</span>{" "}
              of prompts lost their retrieval block entirely to the {ROUTER_BUDGET_S} s router
              timeout — a measured failure mode.
            </p>
          </div>

          {/* connector */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center font-mono text-xl text-ink-faint"
          >
            <span className="hidden lg:inline">→</span>
            <span className="lg:hidden">↓</span>
          </div>

          {/* AFTER */}
          <div className="rounded-2xl border border-brand-500/35 bg-brand-500/[0.04] p-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-brand-300 uppercase">
              after — resident daemon · UNIX socket
            </p>
            <p className="mt-3 font-mono text-4xl font-medium text-white">
              <StatTicker value={substrate.warmQueryMedianMs} decimals={1} />
              <span className="ml-1.5 text-xl text-ink-muted">ms median</span>
            </p>
            <p className="mt-2 font-mono text-[12px] text-ink-subtle tabular-nums">
              p90 {substrate.warmQueryP90Ms} ms · n={WARM_QUERY_N} · capability-match median{" "}
              {substrate.capMatchMedianMs} ms (n={CAPMATCH_N})
            </p>
            <dl className="mt-4 space-y-2 border-t border-hairline pt-4">
              {(
                [
                  ["fail-open", `${SOCKET_PROBE_TIMEOUT_S} s socket probe → silent cold fallback`],
                  ["single-instance", "fcntl lock · FD_CLOEXEC"],
                  ["bounded", `background.slice · ${DAEMON_MEMORY_CAPS}`],
                  ["self-refreshing", "restarts warm when its source changes on disk"],
                  [
                    "reviewed",
                    `adversarial — ${REVIEW_REVIEWERS} reviewers, ${REVIEW_BLOCKING_ISSUES} blocking issues fixed`,
                  ],
                ] as const
              ).map(([term, def]) => (
                <div key={term} className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-ink-faint uppercase">
                    {term}
                  </dt>
                  <dd className="text-right font-mono text-[12px] text-ink-muted">{def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-3">
        <div className="flex flex-wrap gap-2">
          <PathChip
            path=".claude/hooks/hermes-bridge.py"
            note={`${substrate.bridgeLines.toLocaleString("en-US")} lines · daemon mode`}
          />
          <PathChip path="hermes-bridge-daemon.service" note="systemd user unit" />
          <PathChip path=".claude/memory/metrics/bridge-daemon.jsonl" note="live telemetry" />
        </div>
      </Reveal>

      {/* The Stop chain */}
      <Reveal className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
            The Stop chain — {substrate.stopChainHooks} hooks on every response
          </p>
          <PathChip path="settings.local.json" note="lines 434–470" />
        </div>
      </Reveal>
      <Stagger className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6" gap={0.05}>
        {STOP_CHAIN.map((step) => (
          <Reveal asChild key={step.k}>
            <div className="rounded-xl border border-hairline bg-white/[0.02] p-4">
              <p className="font-mono text-[11px] text-ink-faint">{step.k}</p>
              <p className="mt-1 font-mono text-[12px] break-words text-ink">{step.name}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink-subtle">{step.gloss}</p>
            </div>
          </Reveal>
        ))}
      </Stagger>
      <Reveal className="mt-4">
        <p className="max-w-3xl text-[13px] leading-relaxed text-ink-subtle">
          Two of the six are Haiku LLM-as-judge stages — the decline judge replaced a regex
          detector that ran a {DECLINE_JUDGE_REGEX_FP_PCT}% false-positive rate. The enforcer is
          covered in the memory section: it can refuse to let the turn end.
        </p>
      </Reveal>

      {/* systemd clockwork */}
      <Reveal className="mt-14">
        <div className="rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)] p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
            The clockwork — the loop between sessions
          </p>
          <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-3xl font-medium text-white">
                <StatTicker value={substrate.systemdUnitFiles} />
              </p>
              <p className="mt-1.5 text-[12px] text-ink-subtle">systemd user unit files</p>
            </div>
            <div>
              <p className="font-mono text-3xl font-medium text-white">
                <StatTicker value={UNIT_FAMILY_COUNT} display="~14" />
              </p>
              <p className="mt-1.5 text-[12px] text-ink-subtle">functional families</p>
            </div>
            <div>
              <p className="font-mono text-3xl font-medium text-white">
                <StatTicker value={substrate.inotifyPathUnits} />
              </p>
              <p className="mt-1.5 text-[12px] text-ink-subtle">
                inotify .path units — the event-driven layer
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-6">
            {UNIT_FAMILIES.map((family) => (
              <span
                key={family.name}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] leading-none",
                  family.pathUnit
                    ? "border-brand-500/40 text-brand-300"
                    : "border-hairline text-ink-subtle",
                )}
              >
                {family.pathUnit && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-400" />
                )}
                {family.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-faint">
            <span aria-hidden="true" className="mr-1.5 inline-block h-1 w-1 rounded-full bg-brand-400 align-middle" />
            ships an inotify .path unit (banking inbox · bridge-sync · stage-reflect) — file
            events trigger work in real time; timers are the fallback, not the mechanism. The
            ambient part is real: most of the intelligence loop runs between sessions, not inside
            the chat process.
          </p>
          <div className="mt-4">
            <PathChip path="~/.config/systemd/user/" note="hermes-* units" />
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-6">
        <p className="font-mono text-[11px] text-ink-faint">verified {VERIFIED_AT}</p>
      </Reveal>

      {/* Expert detail */}
      <div className="mt-14 space-y-6">
        <GoDeeper summary="the daemon’s failure-mode design — “it can never make things worse”">
          <p>
            The header comment states the contract — “it can never make things worse” — and the
            code structurally enforces it. Clients probe the UNIX socket with a{" "}
            {SOCKET_PROBE_TIMEOUT_S} s timeout and silently fall back to the cold subprocess path
            if anything is off; a single-instance fcntl lock (FD_CLOEXEC) prevents duplicate
            daemons; per-connection deadlines bound every request; and when its own source file
            changes on disk it restarts itself warm. The worst possible outcome is the old
            latency — never a new failure mode. The design went through adversarial review:{" "}
            {REVIEW_REVIEWERS} reviewers, {REVIEW_BLOCKING_ISSUES} blocking issues, fixes marked
            [RVW] in the code.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path="hermes-bridge.py:733–948" note="_run_daemon · [RVW] markers" />
            <PathChip path="user-prompt-router.sh:290–317" note="probe + fallback" />
          </div>
        </GoDeeper>

        <GoDeeper summary="router fast-fail — retrieval budget is never burned on noise">
          <p>
            Prompts shorter than {FASTFAIL_MIN_CHARS} characters and system-bus XML envelopes
            (task-notification, subagent-notification) fast-fail the router before any retrieval
            runs — the {ROUTER_BUDGET_S}-second budget is reserved for prompts that can actually
            use it. A “yes” costs the pipeline nothing.
          </p>
          <div className="mt-3">
            <PathChip path="user-prompt-router.sh:29–50" note="fast-fail gate" />
          </div>
        </GoDeeper>

        <GoDeeper summary="latency-mode tagging — telemetry that feeds the reflex baselines">
          <p>
            The fast-fail path and the heavy retrieval path are labeled separately in the
            latency telemetry, so the distribution the substrate autotuner consumes is bimodal by
            design rather than by accident. hermes-reflex maintains ~
            {selfImprovement.latencyBaselines} per-hook, per-mode baselines from that stream and
            flags week-over-week drift — the substrate generates the very time-series its own
            tuner consumes.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path="user-prompt-router.sh:29–50" note="mode labels" />
            <PathChip
              path=".claude/reflex/state.json"
              note={`~${selfImprovement.latencyBaselines} baselines`}
            />
          </div>
        </GoDeeper>
      </div>
    </Section>
  );
}
