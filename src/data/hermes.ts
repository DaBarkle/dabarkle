// All Hermes showcase data — privacy-safe, no real infrastructure details

// ============================================================
// AGENTS — 6 Hermes agents + 6 Trading Research agents
// ============================================================

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  model: "opus" | "sonnet" | "haiku";
  domain: "hermes" | "trading";
  color: string;
  capabilities: string[];
}

export const hermesAgents: Agent[] = [
  {
    id: "homelab-expert",
    name: "Homelab Expert",
    role: "Infrastructure Analysis",
    description:
      "Analyzes conversation transcripts, identifies every infrastructure change, and generates structured change specifications (SCSP). Read-only access ensures it can never accidentally modify anything.",
    model: "haiku",
    domain: "hermes",
    color: "#818cf8",
    capabilities: ["Change Detection", "SCSP Generation", "Pattern Matching"],
  },
  {
    id: "asbuilt-maintenance",
    name: "As-Built Surgeon",
    role: "Document Updates",
    description:
      "Applies changes using a 6-phase methodology: validate, inventory credentials, apply changes, format, version, verify. 40 credentials preserved across every session, zero fabricated values.",
    model: "sonnet",
    domain: "hermes",
    color: "#fbbf24",
    capabilities: ["6-Phase Methodology", "Credential Preservation", "Surgical Edits"],
  },
  {
    id: "asbuilt-housekeeping",
    name: "Formatter",
    role: "Visual Polish",
    description:
      "Improves visual presentation — converts ASCII diagrams to Mermaid, adds Obsidian callouts, fixes structure — without touching any technical content. IPs, ports, configs are inviolable.",
    model: "haiku",
    domain: "hermes",
    color: "#14b8a6",
    capabilities: ["Mermaid Diagrams", "Obsidian Callouts", "Structure Optimization"],
  },
  {
    id: "hermes-optimizer",
    name: "Optimizer",
    role: "Self-Improvement",
    description:
      "Evaluates the pipeline's own performance across four analysis layers and auto-applies safe improvements. 19 optimizations deployed — from 89.5% time reduction to compaction resilience.",
    model: "opus",
    domain: "hermes",
    color: "#6366f1",
    capabilities: ["4-Layer Analysis", "Auto-Deployment", "Regression Detection"],
  },
  {
    id: "web-designer",
    name: "Web Designer",
    role: "Portfolio Development",
    description:
      "Specializes in modern web development with Next.js, shadcn/ui, Aceternity UI, Tailwind, and Framer Motion. Handles the portfolio site architecture, UI/UX, and full project scaffolding.",
    model: "opus",
    domain: "hermes",
    color: "#f59e0b",
    capabilities: ["Next.js", "Component Design", "Animation Systems"],
  },
  {
    id: "investigation-teammate",
    name: "Investigation Teammate",
    role: "Parallel Diagnostics",
    description:
      "Read-only infrastructure investigator spawned during Agent Teams investigations. Enables parallel multi-system diagnostics without risk of modification.",
    model: "sonnet",
    domain: "hermes",
    color: "#2dd4bf",
    capabilities: ["Parallel Investigation", "Multi-System Diagnostics", "Read-Only"],
  },
];

export const tradingAgents: Agent[] = [
  {
    id: "strategy-researcher",
    name: "Strategy Researcher",
    role: "Market Analysis",
    description: "Researches and evaluates quantitative trading strategies including momentum, mean reversion, and statistical arbitrage approaches.",
    model: "opus",
    domain: "trading",
    color: "#818cf8",
    capabilities: ["Strategy Research", "Literature Review", "Hypothesis Testing"],
  },
  {
    id: "backtester",
    name: "Backtester",
    role: "Historical Testing",
    description: "Runs systematic backtests across multiple timeframes and market conditions using the Jesse framework.",
    model: "sonnet",
    domain: "trading",
    color: "#fbbf24",
    capabilities: ["Jesse Framework", "Multi-Timeframe", "Walk-Forward"],
  },
  {
    id: "risk-analyzer",
    name: "Risk Analyzer",
    role: "Risk Assessment",
    description: "Evaluates portfolio risk metrics including drawdown analysis, correlation studies, and position sizing optimization.",
    model: "sonnet",
    domain: "trading",
    color: "#14b8a6",
    capabilities: ["Drawdown Analysis", "Correlation", "Position Sizing"],
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    role: "Data Pipeline",
    description: "Manages data ingestion, cleaning, and storage pipelines for market data across exchanges and timeframes.",
    model: "haiku",
    domain: "trading",
    color: "#6366f1",
    capabilities: ["Data Ingestion", "Cleaning", "Storage"],
  },
  {
    id: "signal-generator",
    name: "Signal Generator",
    role: "Signal Processing",
    description: "Implements and optimizes trading signal generation logic from research hypotheses to production indicators.",
    model: "sonnet",
    domain: "trading",
    color: "#f59e0b",
    capabilities: ["Indicator Design", "Signal Logic", "Optimization"],
  },
  {
    id: "performance-monitor",
    name: "Performance Monitor",
    role: "Live Monitoring",
    description: "Monitors live strategy performance, tracks execution quality, and generates performance reports.",
    model: "haiku",
    domain: "trading",
    color: "#2dd4bf",
    capabilities: ["Live Tracking", "Execution Quality", "Reporting"],
  },
];

export const allAgents = [...hermesAgents, ...tradingAgents];

// Model color mapping for visualizations
export const modelColors: Record<string, string> = {
  opus: "#6366f1",
  sonnet: "#fbbf24",
  haiku: "#14b8a6",
};

// ============================================================
// CAPABILITIES — 9 registered capabilities
// ============================================================

export interface Capability {
  id: string;
  name: string;
  description: string;
  trigger: string;
  color: string;
}

export const capabilities: Capability[] = [
  {
    id: "infra-ops",
    name: "Infrastructure Operations",
    description: "SSH, container management, service health checks, troubleshooting",
    trigger: "\"Check if Sonarr is running\", \"What's my VPN config?\"",
    color: "#818cf8",
  },
  {
    id: "session-closeout",
    name: "Session Closeout",
    description: "4-agent documentation pipeline with tiered routing and validation",
    trigger: "\"Close out this session\", \"Update the docs\"",
    color: "#fbbf24",
  },
  {
    id: "web-dev",
    name: "Portfolio Development",
    description: "Next.js, shadcn/ui, Tailwind, Framer Motion site building",
    trigger: "\"Let's work on the portfolio\", \"Fix the hero section\"",
    color: "#f59e0b",
  },
  {
    id: "trading-research",
    name: "Trading Research",
    description: "Jesse framework strategy research, backtesting, analysis",
    trigger: "\"Research a momentum strategy\", \"Run a backtest\"",
    color: "#14b8a6",
  },
  {
    id: "agent-teams",
    name: "Agent Teams Investigation",
    description: "Parallel multi-system diagnostics with investigation teammates",
    trigger: "\"Check everything is healthy\", \"Full system investigation\"",
    color: "#2dd4bf",
  },
  {
    id: "ocr-cleanup",
    name: "Document OCR Cleanup",
    description: "Clean up scanned documents with OCR processing",
    trigger: "\"Clean up these scanned docs\"",
    color: "#818cf8",
  },
  {
    id: "memory-search",
    name: "Memory & Context",
    description: "Semantic search through session history and ambient entries",
    trigger: "\"What happened with Gluetun last week?\"",
    color: "#6366f1",
  },
  {
    id: "self-optimization",
    name: "Self-Optimization",
    description: "Analyze pipeline telemetry and apply safe improvements",
    trigger: "Auto-triggered after session-closeout",
    color: "#f59e0b",
  },
  {
    id: "monitoring",
    name: "System Monitoring",
    description: "Uptime Kuma, Homepage dashboard, Wazuh SIEM queries",
    trigger: "\"Is everything healthy?\", \"Check Uptime Kuma\"",
    color: "#14b8a6",
  },
];

// ============================================================
// CORE PRINCIPLES — The 5 ambient intelligence principles
// ============================================================

export interface Principle {
  id: string;
  title: string;
  contrast: string;
  description: string;
  analogy: string;
  color: string;
  icon: string;
}

export const principles: Principle[] = [
  {
    id: "ambient",
    title: "Ambient, not explicit",
    contrast: "Memory capture happens automatically",
    description:
      "Every interaction naturally produces ambient entries — lightweight memory fragments that accumulate into comprehensive system knowledge without any manual effort.",
    analogy: "Like a teammate who takes notes without being asked.",
    color: "#818cf8",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    id: "intent",
    title: "Intent, not invocation",
    contrast: "Say what you want, system routes",
    description:
      "Natural language requests are matched against a capability registry. \"Let's work on the portfolio\" automatically routes to the right agent, tools, and context.",
    analogy: "Like saying 'check the servers' without knowing which dashboard.",
    color: "#fbbf24",
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  },
  {
    id: "unified",
    title: "Unified, not siloed",
    contrast: "All projects under one system",
    description:
      "Infrastructure ops, portfolio development, trading research, and document maintenance are all capabilities of one intelligent system — not separate tools to invoke.",
    analogy: "Like having one assistant who knows all your projects.",
    color: "#14b8a6",
    icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244",
  },
  {
    id: "proactive",
    title: "Proactive, not passive",
    contrast: "Surfaces relevant info without asking",
    description:
      "When investigating an issue, the system searches its memory for similar past problems. When a service is discussed, it checks whether it's actually running — don't assume, verify.",
    analogy: "Like a teammate who says 'I've seen this before — here's what worked.'",
    color: "#f59e0b",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  },
  {
    id: "self-integrating",
    title: "Self-integrating",
    contrast: "New capabilities auto-register",
    description:
      "When a new capability is created — an agent, skill, or workflow — it automatically registers into the capability registry via a self-integration protocol, making it immediately routable.",
    analogy: "Like a team that onboards new members automatically.",
    color: "#6366f1",
    icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
  },
];

// ============================================================
// INTENT ROUTING EXAMPLES
// ============================================================

export interface IntentExample {
  input: string;
  capability: string;
  capabilityId: string;
  method: string;
}

export const intentExamples: IntentExample[] = [
  {
    input: "Let's work on the portfolio",
    capability: "Web Designer Agent",
    capabilityId: "web-dev",
    method: "Agent spawn with project context",
  },
  {
    input: "Is Sonarr running?",
    capability: "Direct SSH Check",
    capabilityId: "infra-ops",
    method: "SSH + Uptime Kuma query",
  },
  {
    input: "Research a momentum strategy",
    capability: "Trading Research",
    capabilityId: "trading-research",
    method: "Routes to jesse-trading project",
  },
  {
    input: "What's my VPN configured as?",
    capability: "Homelab Expert",
    capabilityId: "infra-ops",
    method: "Read-only infrastructure query",
  },
  {
    input: "Check everything is healthy",
    capability: "Agent Teams",
    capabilityId: "agent-teams",
    method: "Parallel multi-system investigation",
  },
  {
    input: "Close out this session",
    capability: "Session Closeout",
    capabilityId: "session-closeout",
    method: "4-agent documentation pipeline",
  },
];

// ============================================================
// VALIDATION GATES
// ============================================================

export interface Gate {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  validates: string[];
}

export const gates: Gate[] = [
  {
    id: "gate1",
    name: "Schema Validation",
    shortName: "Schema",
    description:
      "7-point YAML validation: structure, required fields, routing enum, complexity enum, boolean checks, change-array consistency, routing-complexity alignment.",
    color: "#818cf8",
    validates: [
      "YAML Structure",
      "Required Fields",
      "Enum Values",
      "Type Safety",
      "Array Consistency",
      "Routing Alignment",
      "Boolean Checks",
    ],
  },
  {
    id: "gate2",
    name: "Document Integrity",
    shortName: "Integrity",
    description:
      "4-point integrity check: line count (\u22645% shrinkage), credential count (must match exactly \u2014 40/40), code block count, protected section checksums.",
    color: "#fbbf24",
    validates: [
      "Line Count",
      "Credential Count (40/40)",
      "Code Block Integrity",
      "Section Checksums",
    ],
  },
  {
    id: "gate3",
    name: "Regression Check",
    shortName: "Regression",
    description:
      "Per-tier regression detection: compares session duration against 5-session rolling average + 25% threshold. Separate baselines prevent false positives.",
    color: "#14b8a6",
    validates: [
      "Duration Baselines",
      "Rolling Averages",
      "Tier-Specific Thresholds",
      "False Positive Prevention",
    ],
  },
];

// ============================================================
// SAFETY GUARDRAILS
// ============================================================

export interface Guardrail {
  id: string;
  title: string;
  description: string;
  detail: string;
  color: string;
  icon: string;
}

export const guardrails: Guardrail[] = [
  {
    id: "approval",
    title: "Explicit Approval Required",
    description: "Service restarts, config changes, deletions, and network modifications require explicit user confirmation before execution.",
    detail: "Every risky action follows a WARNING format: what, why, impact, risk level, rollback plan.",
    color: "#818cf8",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    id: "validation",
    title: "3-Gate Validation Pipeline",
    description: "Every document update passes through schema validation, integrity checking, and regression detection before being committed.",
    detail: "Gate 2 enforces: credential count must be exactly 40/40. One missing credential = abort.",
    color: "#fbbf24",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    id: "optimizer-limits",
    title: "Optimizer Cannot Modify Safety",
    description: "The self-improvement engine can rewrite orchestration flow but cannot touch its own safety rules, credential validation, or gate logic.",
    detail: "Guardrail violations are automatically rejected. The optimizer improves within bounds.",
    color: "#14b8a6",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    id: "credentials",
    title: "Credential Preservation Is Cardinal",
    description: "An incomplete document is better than a fabricated one. 40 credentials preserved across every single session with zero fabricated values.",
    detail: "If credential count drops, the entire pipeline aborts and alerts the user.",
    color: "#f59e0b",
    icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
  },
  {
    id: "killswitch",
    title: "Kill Switch Available",
    description: "One command disables the optimizer entirely. Every optimization creates a timestamped backup for instant rollback.",
    detail: "touch .claude/optimizer/DISABLED — 0 failed deployments, 0 manual reverts needed.",
    color: "#6366f1",
    icon: "M5.636 5.636a9 9 0 1012.728 0M12 3v9",
  },
];

// ============================================================
// METRICS
// ============================================================

export const metrics = {
  sessions: 15,
  tokenSavings: 64,
  dataIntegrity: 100,
  credentialPreservation: "40/40",
  credentialPreservationPct: 100,
  optimizationsApplied: 19,
  documentLines: 3392,
  dataLossIncidents: 0,
  gatePassRate: 100,
  systemUptime: 65,
  capabilities: 9,
  agents: 12,
  memoryLayers: 5,
};

// ============================================================
// MEMORY SYSTEM — 5 capture levels + 5 intelligence layers
// ============================================================

// Legacy exports (used by old components — remove after migration)
export interface MemoryLayer {
  id: string;
  level: number;
  label: string;
  description: string;
  detail: string;
  color: string;
}

export const memoryLayers: MemoryLayer[] = [];
export const memoryLifecycle: { step: string; label: string; desc: string; color: string }[] = [];

// --- New memory system data ---

export interface CaptureLevel {
  id: string;
  level: string;
  label: string;
  tagline: string;
  description: string;
  automation: "Automatic" | "Semi-enforced" | "On-demand";
  llmFree: boolean;
  color: string;
  icon: string;
}

export const captureLevels: CaptureLevel[] = [
  {
    id: "l0",
    level: "L0",
    label: "memsearch",
    tagline: "Per-response summaries",
    description: "Every response turn is automatically summarized via a Stop hook and written to daily Markdown files. Zero configuration required.",
    automation: "Automatic",
    llmFree: false,
    color: "#818cf8",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    id: "l05",
    level: "L0.5",
    label: "PostToolUse Logger",
    tagline: "Per-tool execution capture",
    description: "Every SSH command, Docker operation, and config edit is logged with significance ratings. Zero LLM dependency.",
    automation: "Automatic",
    llmFree: true,
    color: "#14b8a6",
    icon: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z",
  },
  {
    id: "l1",
    level: "L1",
    label: "Ambient Memory",
    tagline: "Rich contextual reasoning",
    description: "WHY entries capturing decisions, implications, and reasoning. A Stop hook enforcer blocks if major work happens without entries.",
    automation: "Semi-enforced",
    llmFree: false,
    color: "#fbbf24",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  },
  {
    id: "l2",
    level: "L2",
    label: "Session Journals",
    tagline: "Session-level summaries",
    description: "Comprehensive summaries at session end with structured frontmatter. Safety net auto-generates salvage entries if ambient entries were missed.",
    automation: "On-demand",
    llmFree: false,
    color: "#f59e0b",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    id: "l3",
    level: "L3",
    label: "Vector Store",
    tagline: "Semantic embeddings in Qdrant",
    description: "A SessionEnd hook runs hermes-bridge.py to parse all observations, apply 5 intelligence layers, embed with fastembed, and push to Qdrant. Zero LLM dependency.",
    automation: "Automatic",
    llmFree: true,
    color: "#6366f1",
    icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
  },
];

export interface IntelligenceLayer {
  id: string;
  index: number;
  label: string;
  description: string;
  example: string;
  color: string;
}

export const intelligenceLayers: IntelligenceLayer[] = [
  {
    id: "cross-project",
    index: 1,
    label: "Cross-Project Correlation",
    description: "Tags every observation with project scope",
    example: "hermes, infrastructure, jesse-trading, dabarkle-site",
    color: "#818cf8",
  },
  {
    id: "infra-enrichment",
    index: 2,
    label: "Infrastructure Enrichment",
    description: "Annotates with dependency chain context",
    example: "Gluetun change -> Sonarr, Radarr, Prowlarr affected",
    color: "#14b8a6",
  },
  {
    id: "intent-retrieval",
    index: 3,
    label: "Intent-Based Retrieval",
    description: "Expands search queries using domain aliases",
    example: '"downloads" -> VPN, SABnzbd, Gluetun, Sonarr',
    color: "#fbbf24",
  },
  {
    id: "quality-scoring",
    index: 4,
    label: "Quality Scoring",
    description: "Rates observations 1-10 on multiple dimensions",
    example: "Impact, reversibility, novelty, cross-project scope",
    color: "#f59e0b",
  },
  {
    id: "pattern-detection",
    index: 5,
    label: "Proactive Pattern Detection",
    description: "Identifies repetition, drift, and dependency risk",
    example: "11 pattern checks across observation history",
    color: "#6366f1",
  },
];

export interface MemoryDataFlowStep {
  step: string;
  trigger: string;
  level: string;
  action: string;
  color: string;
}

export const memoryDataFlow: MemoryDataFlowStep[] = [
  { step: "1", trigger: "User runs SSH", level: "L0", action: "memsearch captures per-response summary", color: "#818cf8" },
  { step: "2", trigger: "Tool executes", level: "L0.5", action: "PostToolUse logs SSH command with significance", color: "#14b8a6" },
  { step: "3", trigger: "Decision made", level: "L1", action: "Ambient entry records reasoning and implications", color: "#fbbf24" },
  { step: "4", trigger: "Session ends", level: "L2", action: "Session journal written with structured summary", color: "#f59e0b" },
  { step: "5", trigger: "Bridge syncs", level: "L3", action: "5 intelligence layers applied, embedded, pushed to Qdrant", color: "#6366f1" },
  { step: "6", trigger: "Next session", level: "All", action: "Context auto-injected with patterns and relevant history", color: "#818cf8" },
];

export interface OpenClawComparison {
  dimension: string;
  openClaw: string;
  hermes: string;
  shared: boolean;
}

export const openClawComparisons: OpenClawComparison[] = [
  {
    dimension: "Foundation",
    openClaw: "memsearch plugin for per-turn capture",
    hermes: "Same memsearch plugin as base layer",
    shared: true,
  },
  {
    dimension: "Storage Format",
    openClaw: "Human-readable Markdown files",
    hermes: "Same Markdown + Qdrant vector store",
    shared: true,
  },
  {
    dimension: "Capture Depth",
    openClaw: "4 layers (ephemeral -> daily -> MEMORY.md -> SQLite)",
    hermes: "5 levels (L0 -> L0.5 -> L1 -> L2 -> L3) with sub-tool granularity",
    shared: false,
  },
  {
    dimension: "Capture Trigger",
    openClaw: "Agent must be told to write memories",
    hermes: "Automatic multi-layer capture on every interaction",
    shared: false,
  },
  {
    dimension: "Intelligence",
    openClaw: "Raw text in, raw text out",
    hermes: "5 enrichment layers applied during sync",
    shared: false,
  },
  {
    dimension: "Cross-Project",
    openClaw: "Per-workspace, no cross-project awareness",
    hermes: "All projects correlated in one vector space",
    shared: false,
  },
  {
    dimension: "Retrieval",
    openClaw: "Basic vector similarity search",
    hermes: "Intent-based expansion with domain aliases",
    shared: false,
  },
  {
    dimension: "Proactive Analysis",
    openClaw: "No pattern detection",
    hermes: "11-check pattern analyzer finds repetition, drift, risk",
    shared: false,
  },
  {
    dimension: "Sync Pipeline",
    openClaw: "Embedding API dependency",
    hermes: "Zero-LLM sync via fastembed + qdrant-client",
    shared: false,
  },
];

export const memoryStats = {
  captureLevels: 5,
  intelligenceLayers: 5,
  vectorsStored: 47,
  patternChecks: 11,
  llmSyncDependency: "Zero",
};

// ============================================================
// TIERS & ROUTING
// ============================================================

export interface Tier {
  id: string;
  name: string;
  label: string;
  color: string;
  description: string;
  avgTime: string;
  avgTokens: string;
  frequency: string;
  note: string;
}

export const tiers: Tier[] = [
  {
    id: "tier1",
    name: "No Changes",
    label: "Tier 1",
    color: "#14b8a6",
    description: "Session had no infrastructure changes — skip maintenance, run formatting only.",
    avgTime: "~62s",
    avgTokens: "~60K",
    frequency: "15%",
    note: "2 of 15 sessions",
  },
  {
    id: "tier2",
    name: "Surgical",
    label: "Tier 2",
    color: "#fbbf24",
    description: "Targeted changes — update only affected sections, preserve everything else.",
    avgTime: "~497s",
    avgTokens: "~155K",
    frequency: "62%",
    note: "9 of 15 sessions",
  },
  {
    id: "tier3",
    name: "Comprehensive",
    label: "Tier 3",
    color: "#818cf8",
    description: "Full document rewrite — complete analysis, all sections updated, full verification.",
    avgTime: "~820s",
    avgTokens: "~305K",
    frequency: "0%",
    note: "System routes efficiently enough to avoid this",
  },
];

// ============================================================
// SESSION DATA
// ============================================================

export interface SessionDataPoint {
  session: string;
  time: number;
  tokens: number;
  tier: number;
}

export const sessionData: SessionDataPoint[] = [
  { session: "S1", time: 890, tokens: 312000, tier: 3 },
  { session: "S2", time: 62, tokens: 28000, tier: 1 },
  { session: "S3", time: 520, tokens: 198000, tier: 2 },
  { session: "S4", time: 480, tokens: 175000, tier: 2 },
  { session: "S5", time: 445, tokens: 162000, tier: 2 },
  { session: "S6", time: 410, tokens: 148000, tier: 2 },
  { session: "S7", time: 58, tokens: 26000, tier: 1 },
  { session: "S8", time: 395, tokens: 142000, tier: 2 },
  { session: "S9", time: 375, tokens: 135000, tier: 2 },
  { session: "S10", time: 480, tokens: 170000, tier: 2 },
  { session: "S11", time: 450, tokens: 158000, tier: 2 },
  { session: "S12", time: 410, tokens: 145000, tier: 2 },
  { session: "S13", time: 375, tokens: 132000, tier: 2 },
  { session: "S14", time: 390, tokens: 138000, tier: 2 },
  { session: "S15", time: 365, tokens: 128000, tier: 2 },
];

// ============================================================
// FEEDBACK LOOP
// ============================================================

export interface FeedbackStep {
  id: string;
  label: string;
  color: string;
}

export const feedbackLoopSteps: FeedbackStep[] = [
  { id: "complete", label: "Session Completes", color: "#818cf8" },
  { id: "telemetry", label: "Telemetry Collected", color: "#fbbf24" },
  { id: "analysis", label: "4-Layer Analysis", color: "#14b8a6" },
  { id: "opportunity", label: "Opportunity Identified", color: "#f59e0b" },
  { id: "risk", label: "Risk Assessed", color: "#6366f1" },
  { id: "apply", label: "Auto-Applied", color: "#fbbf24" },
  { id: "benefit", label: "Next Session Benefits", color: "#14b8a6" },
];

export interface HighlightOptimization {
  id: string;
  label: string;
  metric: string;
  metricLabel: string;
  description: string;
}

export const highlightOptimizations: HighlightOptimization[] = [
  {
    id: "opt1",
    label: "Document Size Awareness",
    metric: "89.5%",
    metricLabel: "time reduction",
    description: "Detects document size upfront and routes to optimal maintenance strategy, eliminating redundant full-document reads.",
  },
  {
    id: "opt6",
    label: "Chunked-Read + Inference",
    metric: "93%",
    metricLabel: "context reduction",
    description: "Reads only affected sections instead of the full document, combined with intelligent inference of what should be documented.",
  },
  {
    id: "opt7",
    label: "Compaction Resilience",
    metric: "100%",
    metricLabel: "recovery rate",
    description: "Checkpoint/recovery for mid-workflow context loss. Validated in production when compaction occurred during maintenance.",
  },
];

// ============================================================
// TIMELINE
// ============================================================

export interface TimelineMilestone {
  version: string;
  label: string;
  description: string;
  date: string;
}

export const timeline: TimelineMilestone[] = [
  { version: "v1.0", label: "Baseline", description: "Initial 4-agent pipeline", date: "Jan 8" },
  { version: "v1.4", label: "Tiered Routing", description: "3-tier complexity routing", date: "Jan 10" },
  { version: "v1.8", label: "3-Gate Validation", description: "Schema + integrity + regression", date: "Feb 7" },
  { version: "v2.0", label: "Living Memory", description: "Session journals + vector search", date: "Mar 1" },
  { version: "v2.5", label: "Ambient Intelligence", description: "Intent routing + 5-level memory + self-integration", date: "Mar 14" },
];

export interface TimelineAnnotation {
  session: string;
  label: string;
  description: string;
}

export const timelineAnnotations: TimelineAnnotation[] = [
  { session: "S1", label: "Baseline", description: "First session, full Tier 3 run" },
  { session: "S3", label: "Opt #1 Applied", description: "89.5% time reduction" },
  { session: "S7", label: "3-Gate Validation", description: "Added validation gates" },
  { session: "S12", label: "Compaction Recovery", description: "Opt #7 validated in production" },
  { session: "S14", label: "Ambient Evolution", description: "System rewritten as ambient intelligence" },
];

// ============================================================
// SCSP EXAMPLE
// ============================================================

export const scspExample = `session:
  id: "session-042"
  timestamp: "2026-02-15T14:32:00Z"
  type: closeout

changes:
  - component: "Gateway Service"
    type: configuration
    section: "7.2"
    detail: "Updated routing rules"
    severity: minor

  - component: "Monitoring Agent"
    type: deployment
    section: "3.2"
    detail: "Version upgrade to 4.9"
    severity: moderate

routing:
  tier: 2
  reason: "Surgical \u2014 2 targeted changes"
  affected_sections: ["3.2", "7.2"]

validation:
  gate_1: passed
  gate_2: passed
  gate_3: passed`;

export const scspCallouts = [
  {
    lineRange: [0, 3] as [number, number],
    label: "Session Context",
    description: "Unique ID, timestamp, and session type for traceability",
    color: "#818cf8",
  },
  {
    lineRange: [5, 12] as [number, number],
    label: "Change Manifest",
    description: "Every infrastructure change with component, type, section, and severity",
    color: "#fbbf24",
  },
  {
    lineRange: [14, 17] as [number, number],
    label: "Routing Decision",
    description: "Tier assignment with reason and list of affected document sections",
    color: "#f59e0b",
  },
  {
    lineRange: [19, 22] as [number, number],
    label: "Validation Results",
    description: "Pass/fail status from all three validation gates",
    color: "#14b8a6",
  },
];

// ============================================================
// BUILT WITH AI CALLOUTS
// ============================================================

export const builtWithAiCallouts = [
  {
    text: "The orchestration patterns \u2014 SCSP, tiered routing, validation gates \u2014 solve real coordination problems",
    color: "#818cf8",
  },
  {
    text: "The ambient intelligence \u2014 intent routing, 5-level memory, self-integration \u2014 creates a system that genuinely understands context",
    color: "#fbbf24",
  },
  {
    text: "The safety guarantees \u2014 credential preservation, protected sections, kill switches \u2014 prevent real data loss",
    color: "#14b8a6",
  },
];

// ============================================================
// AGENT ICONS
// ============================================================

export const agentIcons: Record<string, string> = {
  "homelab-expert":
    "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  "asbuilt-maintenance":
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
  "asbuilt-housekeeping":
    "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  "hermes-optimizer":
    "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  "web-designer":
    "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  "investigation-teammate":
    "M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "strategy-researcher":
    "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  backtester:
    "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  "risk-analyzer":
    "M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z",
  "data-engineer":
    "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
  "signal-generator":
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  "performance-monitor":
    "M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z",
};
