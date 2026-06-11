// ============================================================
// VERIFIED SYSTEM METRICS — single source of truth for every
// number rendered on the site. All figures verified against the
// live system / repo on 2026-06-12 (sources noted per field).
// NEVER edit a value without re-verifying it on disk.
// ============================================================

export const VERIFIED_AT = "2026-06-12";

export interface Stat {
  label: string;
  value: number;
  display?: string; // when the raw number needs framing (e.g. "~33,900")
  suffix?: string;
  source: string; // file path / live endpoint that proves it
  note?: string;
}

// ------------------------------------------------------------
// Hero numbers — the five strongest, for the Technical Mono band
// ------------------------------------------------------------
export const heroNumbers: Stat[] = [
  {
    label: "lines of custom substrate code",
    value: 33900,
    display: "~33,900",
    source: ".claude/{hooks,tools,tests,verifier,network-fleet} + .credentials (wc -l)",
    note: "19,287 of them in 56 hook scripts — plus ~1,750 lines of custom TypeScript MCP servers",
  },
  {
    label: "heartbeat cycles of between-turn cognition",
    value: 39201,
    display: "39,201",
    source: ".claude/mind/stage.md frontmatter (heartbeat_counter)",
    note: "a 60-second systemd heartbeat maintains working memory whether or not anyone is talking to it",
  },
  {
    label: "ms median semantic retrieval, every prompt",
    value: 20.8,
    display: "20.8",
    source: ".claude/memory/metrics/bridge-daemon.jsonl (n=43, p90 29.6ms)",
    note: "down from a 1.5–8s cold start — a resident daemon holds the embedding model warm",
  },
  {
    label: "memory vectors live in Qdrant",
    value: 8734,
    display: "8,734",
    source: "live: localhost:6333/collections/hermes_memory (status green)",
    note: "hybrid dense + BM25 retrieval, fed by a 5-level capture pipeline",
  },
  {
    label: "behavioral contracts audited nightly",
    value: 23,
    display: "23",
    source: ".claude/verifier/contracts/ (23 YAML files; latest verdict GREEN)",
    note: "plus an 80-test security regression suite and a 130-agent self-review that closed 79/79 findings",
  },
];

// ------------------------------------------------------------
// Substrate (hooks, router, bridge, Stage)
// ------------------------------------------------------------
export const substrate = {
  hookScripts: 56, // ls .claude/hooks (51 top-level + 5 lib)
  hookLines: 19287, // wc -l
  lifecycleEventsUsed: 9, // of 9 Claude Code hook events
  hookRegistrations: 20, // settings.local.json
  routerLines: 1010, // user-prompt-router.sh
  retrievalBlockTypes: 8, // router block tags
  bridgeLines: 2198, // hermes-bridge.py
  warmQueryMedianMs: 20.8, // bridge-daemon.jsonl, n=43
  warmQueryP90Ms: 29.6,
  capMatchMedianMs: 0.1, // n=263
  coldPathSeconds: "1.5–8", // pre-daemon cold start
  promptsLostToTimeoutPct: 13, // before the warm daemon
  heartbeatSeconds: 60,
  heartbeatCycles: 39201,
  stageZones: 4,
  stageCharBudget: 7680,
  attentionTopK: 7,
  stopChainHooks: 6,
  systemdUnitFiles: 44, // ~/.config/systemd/user, ~14 functional families
  inotifyPathUnits: 3, // banking inbox, bridge-sync, stage-reflect
} as const;

// ------------------------------------------------------------
// Memory
// ------------------------------------------------------------
export const memory = {
  vectors: 8734, // live Qdrant points_count, status green
  captureLevels: 5, // L0 memsearch → L3 vectors
  intelligenceLayers: 5,
  embeddingModel: "all-MiniLM-L6-v2 (384-dim) + BM25 sparse, RRF fusion",
  temporalDecayHalfLifeDays: 30,
  dailyCaptureFiles: 101,
  ambientEntries: 376, // 49 active + 327 archived
  workingScratchpads: 280,
  autoMemoryTopicFiles: 113, // 68 feedback, 34 project, 8 reference + index
} as const;

// ------------------------------------------------------------
// Security (Guardian + Sentinel)
// ------------------------------------------------------------
export const security = {
  credentials: 37, // credential-map.yaml entries; values only in 1Password
  sentinelRules: 25, // sentinel-rules.yaml: 15 rewrite, 10 block, 1 learned
  learnedRules: 1,
  guardianLines: 2811,
  guardianEndpoints: 16, // localhost:3400 only
  preToolUseGuardLines: 491,
  hookEventsInMesh: 5, // SessionStart, PreToolUse, PostToolUse, SubagentStart, Stop
  sessionTtlMinutes: 240, // sliding, RAM-only tmpfs
  regressionTests: 80, // 80/80 green across 9 groups
  rotationHandlers: 14, // ~, per-service
  learnedRuleRetentionDays: 90,
} as const;

// ------------------------------------------------------------
// Self-improvement & verification
// ------------------------------------------------------------
export const selfImprovement = {
  verifierContracts: 23,
  syntheticChecks: 6,
  nightlyVerdict: "GREEN",
  verifierLines: 1667,
  reflexLines: 1853,
  reflexActionsLogged: 510,
  latencyBaselines: 30, // ~, per-hook/per-mode
  round2FindingsClosed: "79/79",
  round2ReviewTokens: "~7.1M",
  round2Agents: 130,
  round2Auditors: 6,
  round1ChangeSets: "8/8",
  planDocuments: 8, // .claude/plans/*.md
  asbuiltVersion: "v9.3",
  asbuiltLines: 4413,
  asbuiltVersionsArchived: 40, // 39 archived + 1 current
} as const;

// ------------------------------------------------------------
// Capability layer
// ------------------------------------------------------------
export const capabilities = {
  registered: 30,
  tools: 32,
  agents: 16, // 2 haiku / 9 sonnet / 4 opus / 1 inherited
  skills: 10,
  federatedProjects: 6,
  semanticMatchThreshold: 0.3, // cosine, calibrated vs live 0.24–0.58
  autoRegisteredPct: 23, // 7 of 30 via self-integration protocol
  protectedFromRemoval: "1 MCP server · 11 hooks · 5 agents · 2 skills · 7 capabilities",
} as const;

// ------------------------------------------------------------
// MCP fleet
// ------------------------------------------------------------
export const fleet = {
  serversLive: 9, // 8 configured + 1 plugin
  totalTools: 371, // ~, in-session surface
  customBuilt: 3, // hermes-services, hermes-banking, remote-site lazy proxy
  servicesToolCount: 18, // hermes-services (~1,030 lines TS)
  bankingToolCount: 9, // hermes-banking (~720 lines TS)
  lazyProxyCatalog: 304, // tool_catalog.json (counted 2026-06-12)
  leanMcpBefore: "~1.7 GB",
  leanMcpAfter: "252 MB", // verified per headless claude call
} as const;

// ------------------------------------------------------------
// Infrastructure under management
// ------------------------------------------------------------
export const infrastructure = {
  mediaStackServices: 7, // VPN gateway + 6 automation services (TV, film, downloads, indexing, requests, quality-sync)
  containersInVpnNamespace: 6,
  vlans: 4,
  stackedVpnTunnels: 2, // UDM split-vpn + gateway-container WireGuard
  killSwitchLayers: 3,
  uptimeKumaMonitors: 15,
  leakCheckIntervalSeconds: 60,
  mediaLibraryTb: 25, // ~, across 3 drives
  cascadeFailuresAfterFix: 0, // was 3 boot-race incidents in 2 months
} as const;

// ------------------------------------------------------------
// Scale rollup (for "by the numbers" supplements)
// ------------------------------------------------------------
export const scale = {
  dreamJournalEntries: 24,
  selfModelVersion: 44,
  stateHistoryEntries: 6009,
  daysSinceFirstCapture: null, // derive at render from launch date if needed
} as const;
