import { Eyebrow } from "@/components/ui/eyebrow";
import { GoDeeper } from "@/components/ui/go-deeper";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";
import { TerminalWindow, type TerminalLine } from "@/components/ui/terminal-window";
import { fleet, memory, VERIFIED_AT } from "@/data/system";

/* ----------------------------------------------------------------------------
 * Verbatim figures from the discovery dossier (harness → "MCP Fleet & Tool
 * Surface") that don't live in src/data/system.ts.
 * ------------------------------------------------------------------------- */

// source: "339 lines Python, 304-tool static catalog, 30s cold-spawn budget, 300s idle teardown" — lazy proxy (IDLE_TIMEOUT=300, COLD_SPAWN_TIMEOUT=30)
const PROXY_LINES = 339;
const PROXY_COLD_SPAWN_S = 30;
const PROXY_IDLE_TEARDOWN_S = 300;
// source: "hermes-services: 18 tools, ~1,030 lines TypeScript" / "hermes-banking: 9 tools, ~720 lines TypeScript" — registerTool counts + wc -l
const SERVICES_LINES = "~1,030";
const BANKING_LINES = "~720";
// source: "(109 @playwright + 119 @upstash/context7 children in the OOM dump) → loadavg 177 → hard reboot" — project_workflow_oom_disable.md
const OOM_PLAYWRIGHT_CHILDREN = 109;
const OOM_CONTEXT7_CHILDREN = 119;
const OOM_LOADAVG = 177;
// source: "~1.7 GB → 252 MB" — fleet.leanMcpBefore/leanMcpAfter (system.ts); numeric values for the tickers
const LEAN_BEFORE_GB = 1.7;
const LEAN_AFTER_MB = 252;
// source: "proven under a 15-call concurrent burst — the exact pattern that previously OOM'd the machine" — project_better_email_resume.md
const BURST_CALLS = 15;
// source: "lean-MCP enforcement coverage: 6 wrapper callers + 3 direct spawn sites + 3 app spawn sites, fixture-tested" — test-r2-cs5-lean-mcp.py
const SPAWN_SITES_TOTAL = 12;
const SPAWN_SITES = "6 wrapper callers · 3 direct spawns · 3 app spawn sites";
// source: "The fix — `--strict-mcp-config --mcp-config '{\"mcpServers\":{}}'`" — project_workflow_oom_disable.md
const LEAN_FLAG = `claude -p --strict-mcp-config --mcp-config '{"mcpServers":{}}'`;
// source: "115-line default-deny PreToolUse gate on the unifi_execute dispatch path" — gate-unifi-mutation.sh
const MUTATION_GATE_LINES = 115;
// source: per-server tool counts — "playwright 23 + shadcn 7 + hermes-memory 2 + voicemode 3 + unifi-network 5 (lazy)" — live tool registry counts
const PLAYWRIGHT_TOOLS = 23;
const UNIFI_LAZY_META_TOOLS = 5;
const QDRANT_TOOLS = 2;
const VOICEMODE_TOOLS = 3;
// source: "exposing only 5 meta-tools to the session ... instead of ~300" — operational-patterns.md lines 578–579
const UNIFI_FULL_TOOLS = "~300";

/* ---- The fleet table ------------------------------------------------------ */

interface FleetRow {
  server: string;
  meta: string;
  builtBy: string;
  custom: boolean;
  exposes: React.ReactNode;
}

const ROWS: FleetRow[] = [
  {
    server: "hermes-services",
    meta: `${fleet.servicesToolCount} tools · ${SERVICES_LINES} lines TS`,
    builtBy: "custom",
    custom: true,
    exposes: (
      <>
        Media-stack operations with judgment built in:{" "}
        <code className="font-mono text-[12px] text-brand-300">intel_is_it_safe_to_restart</code>{" "}
        computes restart blast radius over a dependency graph and live-checks active downloads
        before answering;{" "}
        <code className="font-mono text-[12px] text-brand-300">intel_diagnose_queue_stall</code>{" "}
        walks VPN → downloader → indexers → queue in dependency order and returns a root cause.
      </>
    ),
  },
  {
    server: "hermes-banking",
    meta: `${fleet.bankingToolCount} tools · ${BANKING_LINES} lines TS`,
    builtBy: "custom",
    custom: true,
    exposes: (
      <>
        Read-only finance, privacy-first by construction: categories by default, merchant names
        masked unless the caller passes explicit{" "}
        <code className="font-mono text-[12px] text-brand-300">reveal_merchants=true</code>; the
        SQLite handle is opened read-only with PRAGMA query_only, so even a buggy tool cannot
        mutate the cache.
      </>
    ),
  },
  {
    server: "remote-site proxy",
    meta: `${PROXY_LINES} lines Python`,
    builtBy: "custom",
    custom: true,
    exposes: (
      <>
        Lazy proxy to a relative’s remote network: answers tools/list instantly from a static{" "}
        {fleet.lazyProxyCatalog}-tool catalog without spawning anything, cold-starts an ephemeral
        WireGuard container only on the first real call ({PROXY_COLD_SPAWN_S} s budget), and tears
        itself down after {PROXY_IDLE_TEARDOWN_S} s idle.
      </>
    ),
  },
  {
    server: "qdrant",
    meta: `${QDRANT_TOOLS} tools`,
    builtBy: "third-party · official mcp-server-qdrant",
    custom: false,
    exposes: (
      <>
        Semantic memory — find and store over the{" "}
        {memory.vectors.toLocaleString("en-US")}-vector store.
      </>
    ),
  },
  {
    server: "unifi (home)",
    meta: `${UNIFI_LAZY_META_TOOLS} meta-tools`,
    builtBy: "third-party · sirkirby/unifi-network-mcp",
    custom: false,
    exposes: (
      <>
        The home controller in lazy mode: {UNIFI_LAZY_META_TOOLS} meta-tools stand in for{" "}
        {UNIFI_FULL_TOOLS} — the opposite strategy to the remote proxy, chosen per transport cost.
      </>
    ),
  },
  {
    server: "playwright",
    meta: `${PLAYWRIGHT_TOOLS} tools`,
    builtBy: "third-party",
    custom: false,
    exposes: <>Browser automation — navigation, snapshots, form-filling.</>,
  },
  {
    server: "context7",
    meta: "docs lookup",
    builtBy: "third-party",
    custom: false,
    exposes: <>Live, version-accurate library documentation.</>,
  },
  {
    server: "shadcn",
    meta: "registry",
    builtBy: "third-party",
    custom: false,
    exposes: <>UI component registry search and retrieval.</>,
  },
  {
    server: "voicemode",
    meta: `${VOICEMODE_TOOLS} tools · plugin`,
    builtBy: "third-party plugin",
    custom: false,
    exposes: <>Voice conversation in and out of the terminal.</>,
  },
];

const LEAN_TERMINAL_LINES: ReadonlyArray<TerminalLine> = [
  {
    dim: true,
    text: `# before: every headless spawn inherited and cold-booted ${fleet.serversLive} servers (${fleet.leanMcpBefore} each)`,
  },
  { text: LEAN_FLAG },
  {
    dim: true,
    text: `# after: ${fleet.leanMcpAfter} · 0 MCP boots under a ${BURST_CALLS}-call burst`,
  },
];

/**
 * DeepFleet — the 9-server / ~371-tool MCP surface as a docs-register table
 * (server → built-by → what it exposes), plus the lean-MCP lesson rendered
 * as a cautionary instrument: the OOM incident, the one-flag fix, and the
 * fixture that keeps it fixed.
 */
export function DeepFleet() {
  return (
    <Section id="fleet" max="6xl">
      {/* Header */}
      <Reveal className="max-w-3xl">
        <Eyebrow>MCP fleet</Eyebrow>
        <SplitHeading as="h2" className="text-h1 mt-4 text-white">
          The tool fleet.
        </SplitHeading>
        <p className="text-body-lg mt-5 text-pretty text-text-secondary">
          A session opens with {fleet.serversLive} MCP servers exposing ~{fleet.totalTools} typed
          tools — media stack, finance, memory, browsers, two networks. MCP itself is the
          platform’s open protocol; the {fleet.customBuilt} custom servers and the discipline
          around all {fleet.serversLive} are the engineering. None holds a credential: every
          credentialed server boots through a Guardian wrapper that injects secrets as env vars at
          spawn time.
        </p>
      </Reveal>

      {/* Fleet table */}
      <Reveal className="mt-12">
        <div className="overflow-x-auto rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)]">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-hairline-strong">
                <th scope="col" className="px-5 py-3.5 font-mono text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                  Server
                </th>
                <th scope="col" className="px-5 py-3.5 font-mono text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                  Built
                </th>
                <th scope="col" className="px-5 py-3.5 font-mono text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                  Exposes
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.server} className="border-b border-hairline align-top last:border-b-0">
                  <td className="px-5 py-4">
                    <p className={`font-mono text-[13px] ${row.custom ? "text-brand-300" : "text-ink"}`}>
                      {row.server}
                    </p>
                    <p className="mt-1 font-mono text-[11px] whitespace-nowrap text-ink-faint">{row.meta}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className={`text-[13px] ${row.custom ? "text-ink" : "text-ink-subtle"}`}>
                      {row.builtBy}
                    </p>
                  </td>
                  <td className="max-w-md px-5 py-4">
                    <p className="text-[13px] leading-relaxed text-ink-muted">{row.exposes}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PathChip
            path="hermes-services-mcp/src/"
            note={`${fleet.servicesToolCount} registerTool calls`}
          />
          <PathChip
            path="hermes-banking-mcp/src/"
            note={`${fleet.bankingToolCount} registerTool calls`}
          />
          <PathChip
            path=".claude/network-fleet/proxy/"
            note={`${fleet.lazyProxyCatalog}-tool catalog`}
          />
          <p className="font-mono text-[11px] text-ink-faint">verified {VERIFIED_AT}</p>
        </div>
      </Reveal>

      {/* The lean-MCP lesson — cautionary instrument */}
      <Reveal className="mt-16">
        <div className="rounded-2xl border border-warning/25 bg-[rgba(16,16,22,0.8)] p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.14em] text-warning uppercase">
            The lean-MCP lesson
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
            <div>
              <div className="flex items-end gap-4">
                <p className="font-mono text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-medium text-white">
                  <StatTicker value={LEAN_BEFORE_GB} display={fleet.leanMcpBefore} decimals={1} />
                </p>
                <span aria-hidden="true" className="pb-1 font-mono text-xl text-ink-faint">
                  →
                </span>
                <p className="font-mono text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-medium text-teal-400">
                  <StatTicker value={LEAN_AFTER_MB} display={fleet.leanMcpAfter} />
                </p>
              </div>
              <p className="mt-3 text-[13px] text-ink-subtle">
                memory per headless model call, before → after
              </p>
              <div className="mt-6">
                <TerminalWindow title="the fix — one flag on every spawn site" lines={LEAN_TERMINAL_LINES} />
              </div>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-ink-muted">
                Every headless model call that inherited the session’s MCP config cold-booted the
                entire fleet — {fleet.leanMcpBefore} per process. One app did it in a loop:{" "}
                {OOM_PLAYWRIGHT_CHILDREN} playwright and {OOM_CONTEXT7_CHILDREN} context7 children
                in the OOM dump, load average {OOM_LOADAVG}, hard reboot.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                The fix is a single flag forcing zero MCP servers on every spawn:{" "}
                {fleet.leanMcpAfter} per process and 0 MCP boots under a {BURST_CALLS}-call
                concurrent burst — the exact pattern that previously took the host down. A fixture
                now enforces it across {SPAWN_SITES_TOTAL} spawn sites ({SPAWN_SITES}), so the
                lesson can’t quietly regress.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <PathChip
                  path=".claude/tests/test-r2-cs5-lean-mcp.py"
                  note={`${SPAWN_SITES_TOTAL} spawn sites`}
                />
                <PathChip path="hooks/bounded-llm-call.sh" note="central flag injection" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Expert detail */}
      <div className="mt-14 space-y-6">
        <GoDeeper summary="the wrong diagnosis is on file too">
          <p>
            The first root-cause call blamed dev-time workflow fan-out — and it was wrong. Deep
            transcript forensics re-opened the incident a day later: an app’s bridge process was
            spawning non-bare headless calls without the strict-MCP flag, each one inheriting and
            cold-booting the full fleet. Both the wrong first call and the corrected diagnosis are
            kept in the system’s memory, and the lesson was generalized rather than patched:{" "}
            <em>any</em> multi-spawn of the model is heavy via MCP cold-boot, so every spawn site
            in the tree now carries the flag, verified by fixture.
          </p>
          <div className="mt-3">
            <PathChip path="memory/project_workflow_oom_disable.md" note="cause corrected 2026-06-10" />
          </div>
        </GoDeeper>

        <GoDeeper summary="lazy dispatch defeats tool-name deny-lists">
          <p>
            A deny-list of tool names is useless against a server that routes everything through
            one generic dispatcher — the real operation arrives as an <em>argument</em>, not a
            tool name. Hermes hit exactly this with lazy-mode UniFi and answered structurally: a{" "}
            {MUTATION_GATE_LINES}-line default-deny PreToolUse gate parses the dispatched
            operation out of the call’s input and recognizes read patterns; anything unrecognized
            is treated as a write and blocked with an audit log.
          </p>
          <div className="mt-3">
            <PathChip
              path=".claude/hooks/gate-unifi-mutation.sh"
              note={`${MUTATION_GATE_LINES} lines · default-deny`}
            />
          </div>
        </GoDeeper>
      </div>
    </Section>
  );
}
