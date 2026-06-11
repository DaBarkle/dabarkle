import { Eyebrow } from "@/components/ui/eyebrow";
import { GoDeeper } from "@/components/ui/go-deeper";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";
import { capabilities, substrate, VERIFIED_AT } from "@/data/system";

/* ----------------------------------------------------------------------------
 * Verbatim figures from the discovery dossier (harness → "Capability Layer")
 * that don't live in src/data/system.ts.
 * ------------------------------------------------------------------------- */

// source: "Keyword match gate: >= 3 non-stopword overlaps for first place, +5 name-mention boost, top 3 emitted" — user-prompt-router.sh lines 264–321
const KEYWORD_GATE_OVERLAPS = 3;
const NAME_MENTION_BOOST = 5;
const KEYWORD_TOP_EMITTED = 3;
// source: "cosine >= 0.30 (calibrated vs live range 0.24-0.58), max 2 semantic adds per prompt" — user-prompt-router.sh lines 283–317
const SEMANTIC_LIVE_RANGE = "0.24–0.58";
const SEMANTIC_MAX_ADDS = 2;
// source: "Capability-match latency (measured): median 0.1ms (n=263, cached)" — bridge-daemon.jsonl (computed)
const CAPMATCH_SAMPLE_N = 263;
// source: "check_capmatch_yield() flags if 7 days of capmatch traffic produced zero matches clearing the 0.30 gate" — hermes-reflex.py lines 716–746
const CAPMATCH_DEADLETTER_DAYS = 7;
// source: "Self-integration protocol length: 416 lines" — wc -l .claude/self-integration-protocol.md
const PROTOCOL_LINES = 416;
// source: "Capability registry size: 1,156 lines (capabilities.yaml)" — wc -l .claude/capabilities.yaml
const REGISTRY_LINES = "1,156";
// source: "Auto-registered capabilities: 7 of 30 (23%)" — capabilities.yaml entries with auto_registered: true
const AUTO_REGISTERED_COUNT = 7;
// source: "Structurally blocked mutation tools on network-fleet-expert: 24 (12 per UniFi controller x 2)" — agent frontmatter disallowedTools
const BLOCKED_MUTATION_TOOLS = 24;
// source: "16 (2 haiku / 9 sonnet / 4 opus / 1 inherited)" — .claude/agents/*.md frontmatter
const AGENT_MODEL_SPLIT = "2 haiku · 9 sonnet · 4 opus · 1 inherited";

/* ---- The two matching channels, spec-sheet style -------------------------- */

interface SpecRow {
  label: string;
  value: string;
}

const KEYWORD_CHANNEL: SpecRow[] = [
  { label: "scoring", value: "stopword-filtered keyword overlap" },
  { label: "scope", value: `all ${capabilities.registered} capability descriptions` },
  { label: "first-place gate", value: `≥ ${KEYWORD_GATE_OVERLAPS} non-stopword overlaps` },
  { label: "name mention", value: `+${NAME_MENTION_BOOST} boost` },
  { label: "emitted", value: `top ${KEYWORD_TOP_EMITTED}` },
];

const SEMANTIC_CHANNEL: SpecRow[] = [
  { label: "embedding", value: "MiniLM, warm daemon over a Unix socket" },
  {
    label: "admit",
    value: `cosine ≥ ${capabilities.semanticMatchThreshold.toFixed(2)}, max ${SEMANTIC_MAX_ADDS} adds`,
  },
  { label: "calibration", value: `live true-match range ${SEMANTIC_LIVE_RANGE}` },
  { label: "median latency", value: `${substrate.capMatchMedianMs} ms (n=${CAPMATCH_SAMPLE_N})` },
  { label: "failure mode", value: "fails open — keyword-only, never blocks" },
];

/* ---- Inventory strip ------------------------------------------------------ */

const INVENTORY: ReadonlyArray<{ value: number; label: string; note?: string }> = [
  { value: capabilities.registered, label: "capabilities" },
  { value: capabilities.tools, label: "tools" },
  { value: capabilities.agents, label: "agents", note: AGENT_MODEL_SPLIT },
  { value: capabilities.skills, label: "skills" },
  { value: capabilities.federatedProjects, label: "federated projects" },
];

/**
 * DeepCapabilities — the intent-routing thesis: a registry the operator never
 * has to name, the two-channel matcher (keyword + calibrated semantic), the
 * enforced self-integration loop, and the deintegrator's hard-stop list.
 */
export function DeepCapabilities() {
  return (
    <Section id="capabilities" max="6xl">
      {/* Header */}
      <Reveal className="max-w-3xl">
        <Eyebrow>Capability layer</Eyebrow>
        <SplitHeading as="h2" className="text-h1 mt-4 text-white">
          Intent, not invocation.
        </SplitHeading>
        <p className="text-body-lg mt-5 text-pretty text-text-secondary">
          No slash commands, no agent names. The operator describes an outcome; a{" "}
          {substrate.routerLines.toLocaleString("en-US")}-line router scores it against a registry
          of {capabilities.registered} capabilities and injects the matches before the model
          wakes. Subagents and skills are platform primitives — the registry, the router, and the
          enforcement loop around them are the engineering.
        </p>
      </Reveal>

      {/* Matching pipeline — two channels */}
      <Stagger className="mt-14 grid gap-6 md:grid-cols-2" gap={0.1}>
        {(
          [
            { title: "Channel A — keyword", rows: KEYWORD_CHANNEL },
            { title: "Channel B — semantic", rows: SEMANTIC_CHANNEL },
          ] as const
        ).map((channel) => (
          <Reveal asChild key={channel.title}>
            <div className="glass rounded-2xl p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-[0.14em] text-brand-300 uppercase">
                {channel.title}
              </p>
              <dl className="mt-4">
                {channel.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline py-2.5 last:border-b-0"
                  >
                    <dt className="shrink-0 text-[13px] text-ink-subtle">{row.label}</dt>
                    <dd className="text-right font-mono text-[13px] text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </Stagger>
      <Reveal className="mt-5">
        <p className="max-w-3xl text-[13px] leading-relaxed text-ink-subtle">
          The {capabilities.semanticMatchThreshold.toFixed(2)} threshold was calibrated against
          live traffic — true matches measured {SEMANTIC_LIVE_RANGE}; the originally-drafted 0.5
          would have been a dead letter. An autotuner now watches the telemetry:{" "}
          {CAPMATCH_DEADLETTER_DAYS} days of zero-yield capmatch traffic flags the gate.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <PathChip
            path="hooks/user-prompt-router.sh"
            note={`${substrate.routerLines.toLocaleString("en-US")} lines`}
          />
          <PathChip path="hooks/hermes-reflex.py" note="check_capmatch_yield()" />
        </div>
      </Reveal>

      {/* Inventory strip */}
      <Stagger className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-hairline py-10 sm:grid-cols-3 lg:grid-cols-5" gap={0.06}>
        {INVENTORY.map((item) => (
          <Reveal asChild key={item.label}>
            <div>
              <p className="font-mono text-4xl font-medium text-white">
                <StatTicker value={item.value} />
              </p>
              <p className="mt-2 text-[13px] text-ink-subtle">{item.label}</p>
              {item.note && (
                <p className="mt-1 font-mono text-[11px] text-ink-faint">{item.note}</p>
              )}
            </div>
          </Reveal>
        ))}
      </Stagger>
      <Reveal className="mt-5 flex flex-wrap items-center gap-3">
        <PathChip path=".claude/capabilities.yaml" note={`${REGISTRY_LINES} lines`} />
        <p className="font-mono text-[11px] text-ink-faint">verified {VERIFIED_AT}</p>
      </Reveal>

      {/* Self-integration — enforced, not voluntary */}
      <div className="mt-16 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-12">
        <Reveal>
          <h3 className="text-h2 text-white">Registration is enforced, not voluntary.</h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            A PostToolUse detector spots integration signals — a new agent file, a new SKILL.md, a
            CLI install, an MCP addition — and a Stop hook blocks the turn from ending until the
            new capability is written into the registry. The {PROTOCOL_LINES}-line protocol then
            requires proof that it routes from natural language <em>without</em> naming the
            implementation.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            <span className="font-mono text-brand-300">
              {AUTO_REGISTERED_COUNT} of {capabilities.registered}
            </span>{" "}
            capabilities ({capabilities.autoRegisteredPct}%) arrived through that loop.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <PathChip path=".claude/self-integration-protocol.md" note={`${PROTOCOL_LINES} lines`} />
            <PathChip path="memory/.pending-integrations.jsonl" />
          </div>
        </Reveal>

        {/* Deintegration + protected components */}
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-2xl p-6 sm:p-7">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
              Deintegration — the formally specified uninstaller
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Removal is symmetric: a skill performs full dependency analysis before anything is
              touched, and a hard-coded HARD STOP list names the components no amount of prompting
              can remove — including the deintegrator and the deintegration skill themselves.
              Self-protection is on the list.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {capabilities.protectedFromRemoval.split(" · ").map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-hairline bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-ink-muted"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] text-ink-faint">
              protected from removal — deintegrator.md HARD STOP list
            </p>
          </div>
        </Reveal>
      </div>

      {/* Expert detail */}
      <div className="mt-14 space-y-6">
        <GoDeeper summary={`registry mechanics — the ${REGISTRY_LINES}-line capabilities.yaml`}>
          <p>
            Every capability entry carries natural-language trigger patterns, an implementation
            method (nine distinct methods across the registry — agent, skill, direct, agent-teams,
            web-ui-redirect, service, project, harness-native, router-block), use_when routing
            hints, and step-by-step recovery runbooks; the whole file is injected at session
            start, so the system can route intent and self-recover using its own documentation.
            Curation is dated and on file: one pass added two skills that existed on disk but were
            unroutable; a 2026-06-11 pass deleted three redundant auto-registered stubs because
            duplicate entries “diluted intent matching.”
          </p>
          <div className="mt-3">
            <PathChip
              path=".claude/capabilities.yaml"
              note={`${capabilities.registered} capabilities · ${capabilities.tools} tools · ${capabilities.federatedProjects} projects`}
            />
          </div>
        </GoDeeper>

        <GoDeeper summary="model assignment is per-role, and constraints are structural">
          <p>
            The 16 agents are pinned to models by judgment load, not cost default: 2 on haiku for
            mechanical housekeeping, 9 on sonnet for the working majority, 4 on opus where a wrong
            call is expensive — security audit, discovery lead, design, the closeout optimizer —
            and 1 investigation teammate that inherits the session model. Constraints live in
            frontmatter, not in prompts: the network agent’s definition denies{" "}
            {BLOCKED_MUTATION_TOOLS} specific mutation tools (12 per controller), so it can audit
            both networks but structurally cannot change them.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path=".claude/agents/" note={`${capabilities.agents} definitions`} />
            <PathChip
              path="network-fleet-expert.md"
              note={`${BLOCKED_MUTATION_TOOLS} disallowedTools`}
            />
          </div>
        </GoDeeper>
      </div>
    </Section>
  );
}
