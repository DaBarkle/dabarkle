import { Eyebrow } from "@/components/ui/eyebrow";
import { GoDeeper } from "@/components/ui/go-deeper";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";
import { memory, substrate, VERIFIED_AT } from "@/data/system";

/* ----------------------------------------------------------------------------
 * Verbatim figures from the discovery dossier (harness → "Hermes Memory
 * Architecture") that don't live in src/data/system.ts.
 * ------------------------------------------------------------------------- */

// source: "33 daily JSONL files (30d reflex prune)" — ls .claude/memory/tool-log/
const TOOL_LOG_DAYS = 33;
const TOOL_LOG_PRUNE_DAYS = 30;
// source: "376 total (49 active + 327 archived)" — ls .claude/memory/ambient/ and ambient/archived/
const AMBIENT_ACTIVE = 49;
// source: "its own 325-line memsearch-capture.sh Stop hook (transcript → Haiku summary → daily markdown)" — memsearch-capture.sh header
const MEMSEARCH_CAPTURE_LINES = 325;
// source: "past-observations (Qdrant top-3, quality-weighted, 14-day staleness filter)" — user-prompt-router.sh lines 187–1010
const TOP_K_INJECTED = 3;
const STALENESS_FILTER_DAYS = 14;
// source: "all-MiniLM-L6-v2, 384-dim cosine + BM25 sparse (hybrid)" — hermes-bridge.py lines 38–41
const EMBED_DIMS = 384;
// source: "quality scoring 1-10 (impact, reversibility, cross-project scope, problem-solving signals)" — hermes-bridge.py compute_quality_score, line 306
const QUALITY_SCALE = "1–10";
// source: "Sync trigger rate limit: 3 inotify triggers / 30s, 15-min timer fallback, <100ms no-op exit" — reference_bridge_sync_timer.md
const SYNC_RATE_TRIGGERS = 3;
const SYNC_RATE_WINDOW_S = 30;
const SYNC_TIMER_FALLBACK_MIN = 15;
const SYNC_NOOP_EXIT_MS = 100;
// source: "a Stop-hook enforcer blocks session end at 8+ file modifications or 5+ SSH commands without a rich ambient entry" — reference_memory_architecture.md line 73
const ENFORCER_EDIT_THRESHOLD = 8;
const ENFORCER_SSH_THRESHOLD = 5;
// source: "session-end.sh writes a salvage ambient entry if substantive work (>3 file mods or >2 SSH calls) happened with zero memory capture" — session-end.sh lines 78–205
const SALVAGE_EDIT_THRESHOLD = 3;
const SALVAGE_SSH_THRESHOLD = 2;
// source: "113 (68 feedback rules, 34 project notes, 8 architecture references)" — ls ~/.claude/projects/-var-home-DaBarkle-hermes/memory/
const TOPIC_FEEDBACK = 68;
const TOPIC_PROJECT = 34;
const TOPIC_REFERENCE = 8;

/* ---- The 5-level capture pipeline ------------------------------------------
 * Levels + per-level mechanics verbatim from the dossier:
 * source: "Memory capture has 5 levels: L0 per-response summaries
 * (memsearch-capture.sh Stop hook → Haiku → daily markdown), L0.5
 * per-tool-execution JSONL logs (PostToolUse hook), L1 ambient WHY-reasoning
 * entries (semi-enforced), L2 session journals (closeout pipeline), L3 Qdrant
 * vector embeddings (hermes-bridge.py)" — reference_memory_architecture.md
 * lines 14–22; directory counts verified on disk.
 * ------------------------------------------------------------------------- */

interface CaptureLevel {
  level: string;
  name: string;
  desc: string;
  count: string;
  countNote: string;
  chip: { path: string; note?: string };
}

const PIPELINE: CaptureLevel[] = [
  {
    level: "L0",
    name: "memsearch dailies",
    desc: `Per-response summaries — every turn runs transcript → Haiku → daily markdown through a ${MEMSEARCH_CAPTURE_LINES}-line Stop hook (a from-scratch replacement for a disabled plugin).`,
    count: memory.dailyCaptureFiles.toLocaleString("en-US"),
    countNote: "daily files",
    chip: { path: ".memsearch/memory/" },
  },
  {
    level: "L0.5",
    name: "tool-log",
    desc: `Per-tool-execution JSONL via PostToolUse — credential-redacted before it is ever written, pruned at ${TOOL_LOG_PRUNE_DAYS} days.`,
    count: TOOL_LOG_DAYS.toLocaleString("en-US"),
    countNote: "days of JSONL",
    chip: { path: ".claude/memory/tool-log/" },
  },
  {
    level: "L1",
    name: "ambient",
    desc: "WHY-reasoning entries — the layer that captures why a decision was made, not just what happened. Semi-enforced: the harness can refuse to end a turn without one (below).",
    count: memory.ambientEntries.toLocaleString("en-US"),
    countNote: `entries · ${AMBIENT_ACTIVE} active`,
    chip: { path: ".claude/memory/ambient/" },
  },
  {
    level: "L2",
    name: "session journals + working memory",
    desc: "Session journals from the closeout pipeline, plus per-session scratchpads with Haiku-curated sections that graduate to ambient memory at SessionEnd.",
    count: memory.workingScratchpads.toLocaleString("en-US"),
    countNote: "working scratchpads",
    chip: { path: ".claude/memory/{sessions,working}/" },
  },
  {
    level: "L3",
    name: "Qdrant vectors",
    desc: `Hybrid dense + BM25 embeddings in a local Qdrant store — synced event-driven, seconds after capture, by a ${substrate.bridgeLines.toLocaleString("en-US")}-line zero-LLM sync engine.`,
    count: memory.vectors.toLocaleString("en-US"),
    countNote: "vectors · status green",
    chip: { path: "localhost:6333/collections/hermes_memory" },
  },
];

/* ---- The retrieval stack ----------------------------------------------------
 * source: hybrid dense+BM25 + RRF + quality weighting + 30-day-half-life
 * temporal decay — hermes-bridge.py lines 621–730 (_hybrid_query); top-3 /
 * 14-day staleness — user-prompt-router.sh past-observations block.
 * ------------------------------------------------------------------------- */

const RETRIEVAL_STACK: ReadonlyArray<{ k: string; name: string; detail: string }> = [
  {
    k: "01",
    name: "embed",
    detail: `all-MiniLM-L6-v2 · ${EMBED_DIMS}-dim dense + BM25 sparse`,
  },
  {
    k: "02",
    name: "fuse",
    detail: "Reciprocal Rank Fusion — one ranked list from two signals",
  },
  {
    k: "03",
    name: "weight",
    detail: `quality score ${QUALITY_SCALE} — impact, reversibility, problem-solving signals`,
  },
  {
    k: "04",
    name: "decay",
    detail: `temporal re-rank — ${memory.temporalDecayHalfLifeDays}-day half-life`,
  },
  {
    k: "05",
    name: "inject",
    detail: `top-${TOP_K_INJECTED} into the prompt — ${STALENESS_FILTER_DAYS}-day staleness filter`,
  },
];

/* ---- Instrument row --------------------------------------------------------- */

const INSTRUMENTS: ReadonlyArray<{
  value: number;
  display?: string;
  label: string;
  receipt: { path: string; note?: string };
}> = [
  {
    value: memory.vectors,
    display: "8,734",
    label: "vectors live in Qdrant",
    receipt: { path: "localhost:6333/collections/hermes_memory", note: "status green" },
  },
  {
    value: substrate.bridgeLines,
    display: "2,198",
    label: "lines in the sync engine",
    receipt: { path: ".claude/hooks/hermes-bridge.py" },
  },
  {
    value: memory.intelligenceLayers,
    label: "intelligence layers — zero LLM by default",
    receipt: { path: "hermes-bridge.py", note: "layer markers · lines 49–1214" },
  },
  {
    value: memory.autoMemoryTopicFiles,
    label: "auto-memory topic files written by the system",
    receipt: {
      path: "~/.claude/projects/…/memory/",
      note: `${TOPIC_FEEDBACK} feedback · ${TOPIC_PROJECT} project · ${TOPIC_REFERENCE} reference`,
    },
  },
];

/**
 * DeepMemory — the 5-level capture pipeline as a connected vertical flow with
 * live counts, the hybrid retrieval stack as a 5-step panel, an instrument
 * row, and GoDeeper blocks for hybrid-search rationale, the inotify sync
 * engine, and the Stop-hook ambient enforcer.
 */
export function DeepMemory() {
  return (
    <Section id="memory" max="6xl">
      {/* Header */}
      <Reveal className="max-w-3xl">
        <Eyebrow>Memory architecture</Eyebrow>
        <SplitHeading as="h2" className="text-h1 mt-4 text-white">
          Memory that compounds.
        </SplitHeading>
        <p className="text-body-lg mt-5 text-pretty text-text-secondary">
          Every turn, every tool execution, and every substantive piece of reasoning is captured
          into a {memory.captureLevels}-level pipeline that ends as searchable vectors — and a
          hybrid retrieval stack feeds the result back into every prompt. Three of the five
          levels run with zero LLM dependency: memory accrues even if every model call fails.
        </p>
      </Reveal>

      {/* 5-level capture pipeline — connected vertical flow */}
      <Reveal className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
            The capture pipeline — {memory.captureLevels} levels, raw to retrievable
          </p>
          <PathChip path="reference_memory_architecture.md" note="lines 14–22" />
        </div>
      </Reveal>
      <Stagger as="ul" className="relative mt-4" gap={0.07}>
        {/* connector spine */}
        <span
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-[23px] w-px bg-hairline"
        />
        {PIPELINE.map((stage) => (
          <Reveal asChild as="li" key={stage.level} className="relative">
            <div className="grid grid-cols-[48px_1fr] gap-x-4 py-5 sm:grid-cols-[48px_1fr_auto] sm:gap-x-6">
              {/* node */}
              <span className="relative z-10 inline-flex h-10 w-12 items-center justify-center rounded-lg border border-hairline bg-surface-1 font-mono text-[11px] text-brand-300">
                {stage.level}
              </span>
              <div>
                <h3 className="text-h3 text-white">{stage.name}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-subtle">{stage.desc}</p>
                <div className="mt-2.5">
                  <PathChip path={stage.chip.path} note={stage.chip.note} />
                </div>
              </div>
              <div className="col-start-2 mt-3 sm:col-start-auto sm:mt-0 sm:text-right">
                <p className="font-mono text-xl font-medium text-white tabular-nums">
                  {stage.count}
                </p>
                <p className="mt-0.5 font-mono text-[11px] whitespace-nowrap text-ink-faint">
                  {stage.countNote}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </Stagger>

      {/* Retrieval stack */}
      <Reveal className="mt-12">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
              The retrieval stack — hybrid, fused, decayed
            </p>
            <PathChip path="hermes-bridge.py:621–730" note="_hybrid_query" />
          </div>
          <div className="mt-5 grid divide-y divide-hairline sm:grid-cols-5 sm:divide-x sm:divide-y-0">
            {RETRIEVAL_STACK.map((step) => (
              <div key={step.k} className="py-4 sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0">
                <p className="font-mono text-[11px] text-ink-faint">{step.k}</p>
                <p className="mt-1 font-mono text-[13px] text-brand-300">{step.name}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-subtle">{step.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-hairline pt-5 text-[13px] leading-relaxed text-ink-subtle">
            Three retrieval entry points share this stack — the per-prompt router, the
            qdrant-find MCP tool, and the memory-recall skill — so the same ranking discipline
            applies whether the system recalls something invisibly or is asked to.
          </p>
        </div>
      </Reveal>

      {/* Instrument row */}
      <Stagger className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
        {INSTRUMENTS.map((stat) => (
          <Reveal asChild key={stat.label}>
            <div>
              <p className="font-mono text-4xl font-medium text-white">
                <StatTicker value={stat.value} display={stat.display} />
              </p>
              <p className="mt-2 text-[13px] text-ink-subtle">{stat.label}</p>
              <div className="mt-3">
                <PathChip path={stat.receipt.path} note={stat.receipt.note} />
              </div>
            </div>
          </Reveal>
        ))}
      </Stagger>
      <Reveal className="mt-6">
        <p className="font-mono text-[11px] text-ink-faint">verified {VERIFIED_AT}</p>
      </Reveal>

      {/* Expert detail */}
      <div className="mt-14 space-y-6">
        <GoDeeper summary="why hybrid search — semantic and exact-term, fused">
          <p>
            Dense embeddings match meaning: “restart the download stack” finds memories that
            never used those words. BM25 matches the exact terms embeddings blur — service names,
            error strings, flags. Reciprocal Rank Fusion merges the two rankings inside Qdrant,
            so neither signal has to be trusted alone. The sparse-hash function was migrated from
            a builtin hash to blake2b, with every vector regenerated rather than left
            inconsistent.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path="hermes-bridge.py:38–41" note="named dense + sparse vectors" />
            <PathChip path="qdrant" note="Podman quadlet · localhost only" />
          </div>
        </GoDeeper>

        <GoDeeper summary="the sync engine — inotify, not polling">
          <p>
            A systemd .path unit inotify-watches the capture directories and triggers sync in
            real time, rate-limited to {SYNC_RATE_TRIGGERS} triggers per {SYNC_RATE_WINDOW_S} s,
            with a {SYNC_TIMER_FALLBACK_MIN}-minute persistent timer as fallback; when nothing
            changed, the oneshot exits in under {SYNC_NOOP_EXIT_MS} ms. The design history is
            itself in memory: polling was recognized as the wrong architecture for an
            event-driven system and replaced.
          </p>
          <p className="mt-3">
            At embed time the engine applies {memory.intelligenceLayers} deterministic
            intelligence layers — cross-project correlation, infrastructure dependency enrichment
            (gluetun entries are tagged with every downstream service that loses network if it
            fails), intent expansion, quality scoring {QUALITY_SCALE}, and pattern detection —
            with zero LLM dependency, so enrichment runs in milliseconds and cannot fail open.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path="hermes-bridge-sync.path" note="+ .timer + .service" />
            <PathChip path="hermes-bridge.py" note="layer markers · lines 49–1214" />
          </div>
        </GoDeeper>

        <GoDeeper summary="ambient enforcement — the system is forced to remember">
          <p>
            The Stop-hook enforcer blocks the turn from ending at {ENFORCER_EDIT_THRESHOLD}+ file
            edits or {ENFORCER_SSH_THRESHOLD}+ SSH commands without a rich ambient entry —
            reasoning capture is enforced by the harness, not by discipline. A second net sits at
            SessionEnd: if substantive work (&gt;{SALVAGE_EDIT_THRESHOLD} file modifications or
            &gt;{SALVAGE_SSH_THRESHOLD} SSH calls) somehow produced zero capture, a salvage entry
            is written automatically. No significant session can silently leave no memory.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path=".claude/hooks/ambient-memory-enforcer.sh" />
            <PathChip path=".claude/memory/ambient-enforcer-state.json" note="enforcer state" />
            <PathChip path="session-end.sh:78–205" note="salvage net" />
          </div>
        </GoDeeper>
      </div>
    </Section>
  );
}
