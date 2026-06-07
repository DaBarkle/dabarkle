// Hermes showcase data — May 14, 2026
// Privacy-safe. Reflects current system state; no live infrastructure details.

// ============================================================
// METRICS (system-wide, current)
// ============================================================

export const metrics = {
  agents: 15,
  mcpServers: 22,
  skills: 7,
  projects: 6,
  credentials: 32,
  memoryLayers: 5,
  intelligenceLayers: 5,
  stagePublishers: 14,
  stageZones: 4,
  optimizations: 19,
  reflexForbiddenPaths: 8,
  paneLibFunctions: 59,
  paneComponentTypes: 13,
  paneMcpServers: 3,
  fabricIcons: 313,
  fabricFonts: 21,
  guardianEndpoints: 9,
  sentinelRules: 21,
  asbuiltVersion: "v9.0",
  daysRunning: 130,
};

// ============================================================
// AGENTS (15, current model assignments)
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
      "Reads conversation transcripts and produces a structured change spec (SCSP). Read-only by design — it can analyze infrastructure but never touches it.",
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
      "Applies infrastructure changes to the as-built document using a 6-phase methodology. Validates credentials, applies surgical edits, preserves protected sections.",
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
      "Converts ASCII diagrams to Mermaid, adds Obsidian callouts, fixes structure — without touching technical content. IPs, ports, configs are inviolable.",
    model: "haiku",
    domain: "hermes",
    color: "#14b8a6",
    capabilities: ["Mermaid Diagrams", "Obsidian Callouts", "Structure Optimization"],
  },
  {
    id: "closeout-evaluator",
    name: "Closeout Evaluator",
    role: "Skeptical Review",
    description:
      "Standalone reviewer for session closeouts. Validates that the produced document aligns with the session's stated goal. Read-only, GO/NO-GO verdict.",
    model: "sonnet",
    domain: "hermes",
    color: "#2dd4bf",
    capabilities: ["Independent Review", "Intent Alignment", "Verdict Output"],
  },
  {
    id: "closeout-optimizer",
    name: "Closeout Optimizer",
    role: "Pipeline Self-Improvement",
    description:
      "Four-layer telemetry analysis of every closeout run. Auto-applies LOW-risk improvements with timestamped backups. 19 optimizations deployed to date.",
    model: "opus",
    domain: "hermes",
    color: "#6366f1",
    capabilities: ["4-Layer Analysis", "Auto-Deployment", "Regression Detection"],
  },
  {
    id: "config-analyst",
    name: "Config Analyst",
    role: "Drift Detection",
    description:
      "Configuration and integration mapping. Discovers config files, env vars, package inventories. Detects drift against documented baselines.",
    model: "sonnet",
    domain: "hermes",
    color: "#a5b4fc",
    capabilities: ["Config Discovery", "Drift Detection", "Inventory"],
  },
  {
    id: "deintegrator",
    name: "Deintegrator",
    role: "Capability Removal",
    description:
      "Clean removal of MCP servers, CLIs, agents, and skills with full dependency analysis. Protected-component guardrails prevent core capability damage.",
    model: "sonnet",
    domain: "hermes",
    color: "#fcd34d",
    capabilities: ["Dependency Analysis", "Protected Guardrails", "Clean Removal"],
  },
  {
    id: "discovery-lead",
    name: "Discovery Lead",
    role: "System Mapping",
    description:
      "Team lead for system discovery. Coordinates a parallel agent team, synthesizes findings, stores high-value vectors in Qdrant. Strictly read-only.",
    model: "opus",
    domain: "hermes",
    color: "#6366f1",
    capabilities: ["Team Orchestration", "Synthesis", "Read-Only"],
  },
  {
    id: "discovery-warden",
    name: "Discovery Warden",
    role: "Guardrail Enforcement",
    description:
      "Monitors read-only compliance, spot-checks findings, filters false positives. Standalone verification layer for discovery teams.",
    model: "sonnet",
    domain: "hermes",
    color: "#5eead4",
    capabilities: ["Compliance", "Verification", "False-Positive Filter"],
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
    capabilities: ["Parallel Investigation", "Multi-System", "Read-Only"],
  },
  {
    id: "network-consultant",
    name: "Network Consultant",
    role: "Remote Network Analysis",
    description:
      "Portable network analysis for remote networks. Generates platform-specific scan commands, builds topology, scores security posture, ships PDF reports.",
    model: "sonnet",
    domain: "hermes",
    color: "#fb923c",
    capabilities: ["Scan Generation", "Topology", "PDF Reports"],
  },
  {
    id: "network-fleet-expert",
    name: "Network Fleet Expert",
    role: "Multi-Site UniFi",
    description:
      "Queries, audits, and (with trust-tiered approval) mutates UniFi controllers across the fleet. Home reads silent, Buckland writes require Pushcut approval per change.",
    model: "sonnet",
    domain: "hermes",
    color: "#818cf8",
    capabilities: ["Target Inference", "Impact Analysis", "Approval Gating"],
  },
  {
    id: "security-auditor",
    name: "Security Auditor",
    role: "Vulnerability Assessment",
    description:
      "Scans for CVEs via OSV.dev and NVD. Audits container image currency, network exposure, TLS certs, credentials, and system hardening.",
    model: "opus",
    domain: "hermes",
    color: "#ef4444",
    capabilities: ["CVE Scanning", "Exposure Audit", "Hardening"],
  },
  {
    id: "service-mapper",
    name: "Service Mapper",
    role: "Dependency Discovery",
    description:
      "Maps all running services, containers, ports, dependencies, and resource usage across discovered hosts. Feeds the discovery report.",
    model: "sonnet",
    domain: "hermes",
    color: "#14b8a6",
    capabilities: ["Service Discovery", "Dependency Graph", "Resource Mapping"],
  },
  {
    id: "web-designer",
    name: "Web Designer",
    role: "Frontend Development",
    description:
      "Specializes in Next.js, shadcn/ui, Aceternity, Tailwind, and Framer Motion. Handles portfolio architecture, UI/UX, and full project scaffolding.",
    model: "opus",
    domain: "hermes",
    color: "#f59e0b",
    capabilities: ["Next.js", "Component Design", "Animation"],
  },
];

export const tradingAgents: Agent[] = [
  {
    id: "strategy-researcher",
    name: "Strategy Researcher",
    role: "Market Analysis",
    description:
      "Researches quantitative trading strategies — momentum, mean reversion, statistical arbitrage.",
    model: "opus",
    domain: "trading",
    color: "#818cf8",
    capabilities: ["Literature Review", "Hypothesis", "Evaluation"],
  },
  {
    id: "backtester",
    name: "Backtester",
    role: "Historical Testing",
    description:
      "Runs systematic backtests across timeframes using the Jesse framework.",
    model: "sonnet",
    domain: "trading",
    color: "#fbbf24",
    capabilities: ["Jesse", "Multi-Timeframe", "Walk-Forward"],
  },
  {
    id: "risk-analyzer",
    name: "Risk Analyzer",
    role: "Risk Assessment",
    description:
      "Drawdown analysis, correlation studies, position-sizing optimization.",
    model: "sonnet",
    domain: "trading",
    color: "#14b8a6",
    capabilities: ["Drawdown", "Correlation", "Sizing"],
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    role: "Data Pipeline",
    description:
      "Manages ingestion, cleaning, and storage for market data across exchanges.",
    model: "haiku",
    domain: "trading",
    color: "#6366f1",
    capabilities: ["Ingestion", "Cleaning", "Storage"],
  },
  {
    id: "signal-generator",
    name: "Signal Generator",
    role: "Signal Processing",
    description:
      "Implements and tunes trading signal logic, from research to production indicators.",
    model: "sonnet",
    domain: "trading",
    color: "#f59e0b",
    capabilities: ["Indicators", "Logic", "Optimization"],
  },
  {
    id: "performance-monitor",
    name: "Performance Monitor",
    role: "Live Monitoring",
    description:
      "Monitors live strategy performance, execution quality, performance reports.",
    model: "haiku",
    domain: "trading",
    color: "#2dd4bf",
    capabilities: ["Live Tracking", "Execution", "Reporting"],
  },
];

export const allAgents = [...hermesAgents, ...tradingAgents];

export const modelColors: Record<string, string> = {
  opus: "#6366f1",
  sonnet: "#fbbf24",
  haiku: "#14b8a6",
};

// ============================================================
// CAPABILITIES (intent-routed)
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
    id: "infra-query",
    name: "Infrastructure Query",
    description: "Answer questions about homelab config, services, topology, documented settings",
    trigger: '"What\'s my VPN config?", "Is Sonarr running?"',
    color: "#818cf8",
  },
  {
    id: "infra-investigate",
    name: "Infrastructure Investigation",
    description: "Diagnose issues, check service health, troubleshoot live infrastructure",
    trigger: '"Downloads are stalled", "Check everything is healthy"',
    color: "#a5b4fc",
  },
  {
    id: "network-fleet",
    name: "Network Fleet",
    description: "Query, audit, mutate UniFi across home + Buckland with trust-tiered approval",
    trigger: '"Check the Buckland AP", "Show fleet health"',
    color: "#6366f1",
  },
  {
    id: "generative-pane",
    name: "Generative UI",
    description: "Compose a custom React panel bound to live MCP tools across the homelab",
    trigger: '"Open the pane", "Show me a queue dashboard"',
    color: "#fbbf24",
  },
  {
    id: "banking",
    name: "Banking",
    description: "Privacy-first Revolut analysis — categories, spend, merchants on demand",
    trigger: '"Show my spend this month", "How much on groceries?"',
    color: "#34d399",
  },
  {
    id: "session-closeout",
    name: "Documentation Maintenance",
    description: "Update the as-built document with infrastructure changes via the closeout pipeline",
    trigger: '"Close out this session", "Update the docs"',
    color: "#f59e0b",
  },
  {
    id: "fabric-design",
    name: "Fabric Design",
    description: "Brand-aware decks, one-pagers, posters — creative (HTML) or strict (Slides API)",
    trigger: '"Make a board pack on Q2", "Draft a one-pager"',
    color: "#fb923c",
  },
  {
    id: "voice",
    name: "Voice",
    description: "Conversational voice via local Whisper/Kokoro or remote VoiceMode Connect",
    trigger: '"Let\'s voice chat", "Read this aloud"',
    color: "#2dd4bf",
  },
  {
    id: "ocr-cleanup",
    name: "OCR Cleanup",
    description: "Clean up scanned documents — character-space artifacts, layout artifacts",
    trigger: '"Clean up these scanned docs"',
    color: "#14b8a6",
  },
  {
    id: "discovery",
    name: "System Discovery",
    description: "Comprehensive platform discovery — services, configs, dependencies, security posture",
    trigger: '"Discover this system", "Map the platform"',
    color: "#818cf8",
  },
  {
    id: "deintegration",
    name: "Deintegration",
    description: "Clean removal of MCP servers, agents, skills with full impact analysis",
    trigger: '"Remove the X capability"',
    color: "#fbbf24",
  },
  {
    id: "memory-recall",
    name: "Memory Recall",
    description: "Semantic search across all sessions, ambient entries, and tool logs",
    trigger: '"What happened with Gluetun last week?"',
    color: "#6366f1",
  },
];

// ============================================================
// CORE PRINCIPLES (5 ambient intelligence principles)
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
    contrast: "Memory and context happen automatically",
    description:
      "Every interaction generates ambient memory entries. The operator never has to think about capture — five layers of state accumulate continuously.",
    analogy: "A teammate who takes notes without being asked.",
    color: "#818cf8",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    id: "intent",
    title: "Intent, not invocation",
    contrast: "Say what you want — the system routes",
    description:
      "Natural language maps to capabilities via a registry. \"Show me Revolut spend\" routes to banking; \"check Buckland\" routes to the network fleet. No agent names required.",
    analogy: "Saying 'check the servers' without knowing which dashboard.",
    color: "#fbbf24",
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  },
  {
    id: "unified",
    title: "Unified, not siloed",
    contrast: "All domains under one system",
    description:
      "Homelab ops, banking, trading research, network fleet, slide design, web dev — every domain is a capability of one intelligent system, not a separate tool to invoke.",
    analogy: "One assistant who knows all your projects.",
    color: "#14b8a6",
    icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244",
  },
  {
    id: "proactive",
    title: "Proactive, not passive",
    contrast: "Surfaces relevant context without asking",
    description:
      "When investigating an issue, the system searches semantic memory for similar past problems. The Stage publishes salience-ranked attention; reflex detects trends; watchdogs alert.",
    analogy: "A teammate who says 'I've seen this before — here's what worked.'",
    color: "#f59e0b",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  },
  {
    id: "self-integrating",
    title: "Self-integrating",
    contrast: "New capabilities auto-register",
    description:
      "Drop a new agent or skill into the right folder and the session-start hook discovers it, parses its frontmatter, and registers it. PostToolUse signals catch mid-session installs.",
    analogy: "A team that onboards new members automatically.",
    color: "#6366f1",
    icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
  },
];

// ============================================================
// INTENT ROUTING EXAMPLES (multi-domain)
// ============================================================

export interface IntentExample {
  input: string;
  capability: string;
  capabilityId: string;
  method: string;
}

export const intentExamples: IntentExample[] = [
  {
    input: "Show me Revolut spend this month",
    capability: "Banking",
    capabilityId: "banking",
    method: "hermes-banking MCP, categories-only by default",
  },
  {
    input: "Check the Buckland AP health",
    capability: "Network Fleet",
    capabilityId: "network-fleet",
    method: "Buckland UDM via ephemeral WireGuard netns",
  },
  {
    input: "Open the pane on my phone",
    capability: "Generative UI",
    capabilityId: "generative-pane",
    method: "Hermes Pane via Tailscale, PWA-installable",
  },
  {
    input: "Make a board pack on Q2",
    capability: "Fabric Design",
    capabilityId: "fabric-design",
    method: "Strict mode → Slides API working copy",
  },
  {
    input: "Downloads are stalled",
    capability: "Infrastructure Investigation",
    capabilityId: "infra-investigate",
    method: "intel_diagnose_queue_stall + Gluetun check",
  },
  {
    input: "Let's voice chat",
    capability: "Voice",
    capabilityId: "voice",
    method: "Whisper STT + Kokoro TTS, 600s window",
  },
  {
    input: "What happened with Gluetun last week?",
    capability: "Memory Recall",
    capabilityId: "memory-recall",
    method: "Qdrant semantic search + intent expansion",
  },
  {
    input: "Close out this session",
    capability: "Documentation Maintenance",
    capabilityId: "session-closeout",
    method: "4-agent pipeline + tiered routing + 3-gate validation",
  },
];

// ============================================================
// THE STAGE — 4-zone situated-state blackboard
// ============================================================

export interface StageZone {
  id: string;
  name: string;
  charBudget: number;
  description: string;
  cadence: string;
  color: string;
  iconPath: string;
}

export const stageZones: StageZone[] = [
  {
    id: "self",
    name: "Self",
    charBudget: 3072,
    description:
      "Identity, infrastructure managed, operator stance, open commitments, recent capability gaps.",
    cadence: "Regenerated daily 03:00 by stage-reflect (Sonnet) or every 20 turns.",
    color: "#818cf8",
    iconPath: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  },
  {
    id: "situation",
    name: "Situation",
    charBudget: 1228,
    description:
      "Live snapshot: Guardian health, SSH socket state, memsearch line count, recent ambient one-liners, current_goal.",
    cadence: "Regenerated every 60s by stage-heartbeat.",
    color: "#fbbf24",
    iconPath: "M3 3v18h18M9 13l3-3 3 3 4-4",
  },
  {
    id: "attention",
    name: "Attention",
    charBudget: 819,
    description:
      "Top-K (default 7) salience-gated candidates from 14 publishers. Decay constants per class — credential 24h, infra 6h, reasoning 2h, routine 30min.",
    cadence: "Recomputed every heartbeat from attention-inbox.jsonl.",
    color: "#14b8a6",
    iconPath: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    id: "monologue",
    name: "Inner Monologue",
    charBudget: 1024,
    description:
      "First-person rolling paragraph. Reasons over Self + Situation + Attention.",
    cadence: "Regenerates on Attention churn (≥2 IDs shifted or top-3 scores moved >30%), throttled 5min.",
    color: "#6366f1",
    iconPath: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
];

export interface StagePublisher {
  id: string;
  label: string;
  concern: string;
  cadence: string;
  decayClass: "credential" | "infra" | "reasoning" | "integration" | "routine";
  color: string;
}

export const stagePublishers: StagePublisher[] = [
  { id: "reflex", label: "hermes-reflex", concern: "Substrate trends (failure rate climbing, drift)", cadence: "SessionEnd", decayClass: "reasoning", color: "#818cf8" },
  { id: "meta-observer", label: "meta-observer", concern: "Snapshot anomalies in this session", cadence: "Stop hook", decayClass: "reasoning", color: "#fbbf24" },
  { id: "post-tool-logger", label: "post-tool-logger", concern: "High-significance tool executions", cadence: "PostToolUse", decayClass: "routine", color: "#14b8a6" },
  { id: "decline-judge", label: "decline-judge", concern: "Capability blindness ('I can't' when capability exists)", cadence: "Stop hook", decayClass: "reasoning", color: "#f59e0b" },
  { id: "feedback-judge", label: "feedback-judge", concern: "Behavioral feedback from operator", cadence: "Stop hook", decayClass: "reasoning", color: "#fbbf24" },
  { id: "ambient-enforcer", label: "ambient-enforcer", concern: "Missing rich entries after major work", cadence: "Stop hook", decayClass: "routine", color: "#6366f1" },
  { id: "gate-fleet", label: "gate-fleet", concern: "Network-fleet mutation approval gating", cadence: "PreToolUse", decayClass: "infra", color: "#a5b4fc" },
  { id: "working-memory", label: "working-memory", concern: "Activity delta synthesis (Haiku cycles)", cadence: "Stop hook", decayClass: "routine", color: "#5eead4" },
  { id: "promote-skill", label: "promote-skill", concern: "Capability success patterns", cadence: "Stop hook", decayClass: "integration", color: "#34d399" },
  { id: "user-prompt-router", label: "user-prompt-router", concern: "User intent classification", cadence: "UserPromptSubmit", decayClass: "routine", color: "#fbbf24" },
  { id: "subagent-capture", label: "subagent-capture", concern: "Teammate activity surfacing", cadence: "SubagentStop", decayClass: "routine", color: "#818cf8" },
  { id: "hermes-bridge", label: "hermes-bridge", concern: "Memory sync events and Qdrant health", cadence: "inotify + 15m", decayClass: "infra", color: "#6366f1" },
  { id: "pattern-analyzer", label: "pattern-analyzer", concern: "Behavior patterns across sessions", cadence: "Periodic", decayClass: "reasoning", color: "#f59e0b" },
  { id: "stage-health-watchdog", label: "stage-health-watchdog", concern: "Reflection staleness, dream generation, inbox backlog", cadence: "Every 5min", decayClass: "infra", color: "#14b8a6" },
];

export interface StageSalience {
  className: string;
  decaySeconds: number;
  halfLifeLabel: string;
  example: string;
  color: string;
}

export const stageSalience: StageSalience[] = [
  { className: "credential", decaySeconds: 86400, halfLifeLabel: "24 hours", example: "Credential leak detected", color: "#ef4444" },
  { className: "integration", decaySeconds: 43200, halfLifeLabel: "12 hours", example: "New capability registered", color: "#fbbf24" },
  { className: "infra", decaySeconds: 21600, halfLifeLabel: "6 hours", example: "Service degradation, mutation gate", color: "#818cf8" },
  { className: "reasoning", decaySeconds: 7200, halfLifeLabel: "2 hours", example: "Behavioral feedback, pattern detection", color: "#a5b4fc" },
  { className: "routine", decaySeconds: 1800, halfLifeLabel: "30 minutes", example: "Tool execution, activity delta", color: "#5eead4" },
];

export const stageSnapshot = {
  heartbeat: 1847,
  selfVersion: 2,
  lastReflect: "2026-05-12 03:00",
  lastDream: "2026-05-12 04:00",
  killSwitch: "STAGE_ENABLED=0",
  attentionTop: [
    {
      id: "hook-failure-rising",
      source: "hermes-reflex",
      score: 8.44,
      classification: "hook-failure-rising/high",
      snippet: "Hook 'session-start-core' failure rate climbed to 18% (was 3% over prior week).",
    },
    {
      id: "credential-leaks-intercepted",
      source: "guardian-sentinel",
      score: 7.21,
      classification: "credential/medium",
      snippet: "43 leak(s) detected in previous sessions. Sentinel cache loaded 30 values in 1762ms.",
    },
    {
      id: "stage-healthy",
      source: "stage-health-watchdog",
      score: 4.12,
      classification: "watchdog/healthy/low",
      snippet: "Reflection on cadence (03:00). Dream generated 04:00. Inbox at 28/200.",
    },
  ],
  innerMonologue:
    "I'm back on dabarkle after a 25-day gap. The page reads stale — 12 agents, 9 capabilities, no Guardian, no Stage, no Pane. I've shipped a lot since: Sentinel intercepting credentials at the structural layer, the Stage giving me situated state instead of context-on-load, generative panels bound to live MCP tools. The operator wants a complete rework. Plan: four flagships anchor the page, recruiter layer scans up top, technical depth below.",
};

// ============================================================
// GUARDIAN + SENTINEL — credential security
// ============================================================

export interface GuardianEndpoint {
  method: "GET" | "POST";
  path: string;
  purpose: string;
  primary?: boolean;
}

export const guardianEndpoints: GuardianEndpoint[] = [
  { method: "POST", path: "/execute", purpose: "Run command with credentials injected as env vars", primary: true },
  { method: "POST", path: "/provision-credential", purpose: "Create 1Password item with generated password (per-credential phone approval)" },
  { method: "POST", path: "/read-redacted", purpose: "Read file with credentials replaced by [GUARDIAN:key]" },
  { method: "POST", path: "/exec-redacted", purpose: "Run command with credentials redacted from output" },
  { method: "POST", path: "/edit-protected", purpose: "Structured edit of a credential-protected file — diff summary only" },
  { method: "POST", path: "/scan-for-leaks", purpose: "Scan text for credential values" },
  { method: "POST", path: "/vault-sync", purpose: "Compare 1Password vault against credential-map" },
  { method: "POST", path: "/notify", purpose: "Priority notification: CRITICAL/HIGH/MEDIUM/LOW (Pushcut + ntfy)" },
  { method: "GET", path: "/health", purpose: "Status, session state, Sentinel cache" },
];

export interface CredentialDomain {
  label: string;
  count: number;
  examples: string[];
  color: string;
}

export const credentialDomains: CredentialDomain[] = [
  { label: "SSH + Sudo", count: 2, examples: ["ssh.nyx", "sudo.nyx"], color: "#818cf8" },
  { label: "Service APIs", count: 12, examples: ["sabnzbd", "sonarr", "radarr", "prowlarr", "overseerr", "plex", "tdarr", "tautulli", "tmdb", "pushcut", "openai", "truelayer"], color: "#fbbf24" },
  { label: "Wi-Fi", count: 3, examples: ["olympus", "styx", "tartarus"], color: "#14b8a6" },
  { label: "UniFi", count: 4, examples: ["udm.home", "buckland.sso", "buckland.admin.1", "buckland.admin.2"], color: "#6366f1" },
  { label: "Network Fleet", count: 2, examples: ["wireguard.buckland.1", "wireguard.buckland.2"], color: "#a5b4fc" },
  { label: "Hermes Pane", count: 2, examples: ["pane.auth", "pane.cookie"], color: "#f59e0b" },
  { label: "Wazuh", count: 2, examples: ["wazuh.dashboard", "wazuh.api"], color: "#ef4444" },
  { label: "VPN + Other", count: 5, examples: ["nordvpn.wireguard", "eweka.user", "eweka.pass", "kuma.api", "homepage"], color: "#fb923c" },
];

export const sentinelStats = {
  protectedCredentials: 32,
  totalRules: 21,
  learnedRules: 0,
  leaksIntercepted: 43,
  e2eTests: "15/15 passing",
  vaultAccess: "Read+Write on Guardian vault only",
  llmCredentialAccess: "Never — values never enter LLM context",
};

// ============================================================
// HERMES PANE + IRIS — generative UI
// ============================================================

export const hermesPaneStats = {
  port: 3102,
  componentTypes: 13,
  libFunctions: 59,
  mcpServers: 3,
  mcpList: ["hermes-services", "hermes-memory", "unifi-network"],
  pollIntervalSeconds: 12,
  auth: "1Password signed cookie via Tailscale Serve",
  pwa: true,
  liveSince: "2026-05-09",
  framework: "Next.js 16 + React 19 + shadcn/ui + Framer Motion",
};

export const paneComponentTypes: { id: string; label: string }[] = [
  { id: "metric", label: "metric" },
  { id: "chart-spark", label: "chart-spark" },
  { id: "queue-table", label: "queue-table" },
  { id: "monitor-grid", label: "monitor-grid" },
  { id: "action-button", label: "action-button" },
  { id: "incident-card", label: "incident-card" },
  { id: "health-pill", label: "health-pill" },
  { id: "text-block", label: "text-block" },
  { id: "code-block", label: "code-block" },
  { id: "quick-actions", label: "quick-actions" },
  { id: "section", label: "section" },
  { id: "stack", label: "stack" },
  { id: "diagnosis-card", label: "diagnosis-card" },
];

export const irisStats = {
  port: 3101,
  base: "claude-code-viewer v0.6.0 (d-kimuson)",
  purpose: "Browse Claude Code session history and live tail",
  customizations: ["Hermes capability injection preview", "Stage-aware sidebar"],
  v3Since: "2026-04-08",
};

// ============================================================
// MULTI-DOMAIN REACH — banking, network fleet, voice, fabric
// ============================================================

export interface DomainCapability {
  id: string;
  label: string;
  tagline: string;
  blurb: string;
  stats: { label: string; value: string }[];
  flair: string;
  color: string;
  accent: string;
}

export const domainCapabilities: DomainCapability[] = [
  {
    id: "banking",
    label: "Banking",
    tagline: "Privacy-first transaction intelligence",
    blurb:
      "Revolut CSV drops into ~/hermes-banking/inbox/ — inotify ingests, SQLite caches. The MCP returns categories by default; raw merchants only with an explicit flag. IBANs and account numbers never leave the database.",
    stats: [
      { label: "MCP tools", value: "8" },
      { label: "Categories", value: "30+" },
      { label: "Third-party APIs", value: "0" },
      { label: "Ingestion", value: "inotify + 15m fallback" },
    ],
    flair: "No TrueLayer. No GoCardless. Local SQLite, SHA-256 hashes, opaque short IDs.",
    color: "#34d399",
    accent: "rgba(52, 211, 153, 0.15)",
  },
  {
    id: "network-fleet",
    label: "Network Fleet",
    tagline: "Two UniFi sites, trust-tiered approval",
    blurb:
      "Home UDM reads silent. Buckland UDM (parents') runs inside an ephemeral WireGuard container — never on the host. Every Buckland write requires a Pushcut tap. Target inference picks the right site from the prompt.",
    stats: [
      { label: "Sites", value: "Home + Buckland" },
      { label: "Trust tiers", value: "2" },
      { label: "Mutation gate", value: "Per-write Pushcut" },
      { label: "Tunnel scope", value: "Ephemeral netns only" },
    ],
    flair: "Hard rule: WireGuard ONLY in a --network=none container. Logged after the 2026-05-10 incident.",
    color: "#818cf8",
    accent: "rgba(129, 140, 248, 0.15)",
  },
  {
    id: "voice",
    label: "Voice",
    tagline: "Local-first conversation",
    blurb:
      "Whisper STT and Kokoro TTS run on Bazzite. The phone connects via VoiceMode Connect — OpenAI is only the remote-path fallback. 600-second listen window, 5-second minimum, VAD level 2 so it doesn't cut you off.",
    stats: [
      { label: "STT", value: "Whisper (local)" },
      { label: "TTS", value: "Kokoro (local)" },
      { label: "Remote path", value: "VoiceMode Connect" },
      { label: "Listen window", value: "600s" },
    ],
    flair: "Voice + memory + intent routing = ambient conversation that remembers across days.",
    color: "#2dd4bf",
    accent: "rgba(45, 212, 191, 0.15)",
  },
  {
    id: "fabric",
    label: "Fabric Design",
    tagline: "Brand-aware deck and asset generation",
    blurb:
      "Two modes from one skill. Path I composes a standalone HTML deck via the deck-stage runtime — creative, philosophy-driven. Path J renders into a tokenised Slides API working copy for template-strict work. Mode picked from explicit phrases at Phase 1.6.",
    stats: [
      { label: "Modes", value: "Creative / Strict" },
      { label: "Icon catalogue", value: "313" },
      { label: "Local fonts", value: "21" },
      { label: "Model", value: "Opus 4.7 pinned" },
    ],
    flair: "Vision-QA wired in. Refinement pass exactly one, anti-additive. End-to-end, no follow-up.",
    color: "#fb923c",
    accent: "rgba(251, 146, 60, 0.15)",
  },
];

// ============================================================
// BENTO TILES — what it does
// ============================================================

export interface BentoTile {
  id: string;
  title: string;
  recruiterLine: string;
  technicalLine: string;
  iconPath: string;
  color: string;
  size: "small" | "medium" | "large";
}

export const bentoTiles: BentoTile[] = [
  {
    id: "ambient-memory",
    title: "Continuous memory across sessions",
    recruiterLine: "Never forgets — captures every interaction, every tool call, every decision.",
    technicalLine: "5 capture levels × 5 intelligence layers → Qdrant vector store, real-time inotify sync.",
    iconPath: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375",
    color: "#818cf8",
    size: "large",
  },
  {
    id: "intent-routing",
    title: "Say what you want, system routes",
    recruiterLine: "Plain English maps to the right capability — no need to name agents or tools.",
    technicalLine: "Capability registry + decline-judge structural enforcement, auto-registers new entries.",
    iconPath: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    color: "#fbbf24",
    size: "medium",
  },
  {
    id: "generative-ui",
    title: "Generates UI on demand",
    recruiterLine: "A mobile-first panel that composes itself from your live infrastructure.",
    technicalLine: "Hermes Pane on port 3102, 13 component types bound to 3 MCP servers, PWA-installable.",
    iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "#6366f1",
    size: "medium",
  },
  {
    id: "credential-security",
    title: "Credentials never enter the LLM",
    recruiterLine: "Structural protection — passwords are physically unreachable from the AI.",
    technicalLine: "Guardian broker + Sentinel PreToolUse rewriting + 1Password vault isolation.",
    iconPath: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
    color: "#f59e0b",
    size: "medium",
  },
  {
    id: "network-fleet",
    title: "Two UniFi sites, one assistant",
    recruiterLine: "Manages my network and my parents' network with the right approval at each.",
    technicalLine: "Trust-tiered: home silent, Buckland Pushcut-approved, tunnel in ephemeral netns.",
    iconPath: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
    color: "#14b8a6",
    size: "medium",
  },
  {
    id: "multi-domain",
    title: "Banking. Slides. Voice. Trading.",
    recruiterLine: "One system reaches across every domain I work in — not just homelab.",
    technicalLine: "Capability registry: 22 MCP servers, 15 agents, 7 skills, 6 projects.",
    iconPath: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
    color: "#fb923c",
    size: "large",
  },
];

// ============================================================
// SELF-IMPROVEMENT — two systems, never conflated
// ============================================================

export interface SelfImprovementSystem {
  id: string;
  label: string;
  classification: string;
  scope: string;
  trigger: string;
  observes: string;
  actsOn: string;
  guardrails: string[];
  stats: { label: string; value: string }[];
  killSwitch: string;
  color: string;
}

export const selfImprovementSystems: SelfImprovementSystem[] = [
  {
    id: "closeout-optimizer",
    label: "closeout-optimizer",
    classification: "Capability component",
    scope: "Session-closeout pipeline + as-built documentation maintenance",
    trigger: "Automatically after every session-closeout run",
    observes: ".claude/optimizer/telemetry/*.json — duration, token cost, gate pass rates per session",
    actsOn: "SKILL.md instructions and agent definitions for the closeout pipeline only",
    guardrails: [
      "Cannot modify agent methodologies",
      "Cannot touch credential rules or safety validations",
      "Auto-applies LOW risk only; MEDIUM/HIGH logged for manual review",
      "Every change creates timestamped backup",
    ],
    stats: [
      { label: "Optimizations applied", value: "19" },
      { label: "Failed deployments", value: "0" },
      { label: "Manual reverts", value: "0" },
    ],
    killSwitch: "touch .claude/optimizer/DISABLED",
    color: "#6366f1",
  },
  {
    id: "hermes-reflex",
    label: "hermes-reflex",
    classification: "Substrate autotuner (not a capability)",
    scope: "The ambient intelligence itself — hooks, context injection, memory layers, working memory",
    trigger: "Automatically at SessionEnd",
    observes: "hooks-daily.jsonl, meta-observations.jsonl, working-memory scratchpads, Qdrant growth, intent-router hit rate",
    actsOn: "Reports + LOW-risk data housekeeping only (V1). No substrate writes until V2.",
    guardrails: [
      ".claude/skills/, .claude/agents/, .credentials/, docs/asbuilt/ — forbidden",
      ".claude/optimizer/, .claude/capabilities.yaml, .claude/hooks/, settings.json — forbidden",
      "Detects TRENDS over time; meta-observer handles SNAPSHOT anomalies",
      "Cannot touch the closeout pipeline OR capabilities OR its own scripts",
    ],
    stats: [
      { label: "Forbidden paths", value: "8" },
      { label: "V1 actions", value: "Observation + housekeeping" },
      { label: "Reports written", value: "Daily" },
    ],
    killSwitch: "Disable SessionEnd hook in settings.json",
    color: "#fbbf24",
  },
];

// ============================================================
// MEMORY (existing components — refreshed values)
// ============================================================

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
    description:
      "Every response turn is summarized by Haiku via a Stop hook and written to daily Markdown. Zero configuration.",
    automation: "Automatic",
    llmFree: false,
    color: "#818cf8",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    id: "l05",
    level: "L0.5",
    label: "PostToolUse Logger",
    tagline: "Per-tool capture, no LLM",
    description:
      "SSH commands, Docker operations, config edits — all logged with significance ratings. Pure heuristic, zero LLM.",
    automation: "Automatic",
    llmFree: true,
    color: "#14b8a6",
    icon: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z",
  },
  {
    id: "l1",
    level: "L1",
    label: "Ambient Memory",
    tagline: "Rich reasoning (the WHY)",
    description:
      "Decision-grade entries with frontmatter and 2-5 line reasoning. A Stop hook enforcer blocks responses if major work happened without one.",
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
    description:
      "Comprehensive summaries produced at closeout. Includes a salvage path: if ambient entries were missed, the journal auto-generates them.",
    automation: "On-demand",
    llmFree: false,
    color: "#f59e0b",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    id: "l3",
    level: "L3",
    label: "Vector Store",
    tagline: "Real-time semantic embeddings",
    description:
      "inotify watches every memory file; hermes-bridge.py syncs to Qdrant in real time. fastembed + qdrant-client, zero LLM.",
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
    example: "hermes · infrastructure · jesse-trading · dabarkle-site",
    color: "#818cf8",
  },
  {
    id: "infra-enrichment",
    index: 2,
    label: "Infrastructure Enrichment",
    description: "Annotates with dependency-chain context",
    example: "Gluetun change → Sonarr, Radarr, Prowlarr affected",
    color: "#14b8a6",
  },
  {
    id: "intent-retrieval",
    index: 3,
    label: "Intent-Based Retrieval",
    description: "Expands search queries via domain aliases",
    example: '"downloads" → VPN, SABnzbd, Gluetun, Sonarr, NZB',
    color: "#fbbf24",
  },
  {
    id: "quality-scoring",
    index: 4,
    label: "Quality Scoring",
    description: "Rates observations 1-10 on multiple dimensions",
    example: "Impact · reversibility · novelty · cross-project scope",
    color: "#f59e0b",
  },
  {
    id: "pattern-detection",
    index: 5,
    label: "Proactive Pattern Detection",
    description: "Surfaces repetition, drift, and dependency risk",
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
  { step: "2", trigger: "Tool executes", level: "L0.5", action: "PostToolUse logs SSH command with significance rating", color: "#14b8a6" },
  { step: "3", trigger: "Decision made", level: "L1", action: "Ambient entry records reasoning and implications", color: "#fbbf24" },
  { step: "4", trigger: "File changes", level: "L3", action: "inotify fires; bridge syncs with 5 intelligence layers", color: "#6366f1" },
  { step: "5", trigger: "Session ends", level: "L2", action: "Journal written with structured summary", color: "#f59e0b" },
  { step: "6", trigger: "Next session", level: "All", action: "Context auto-injected; Stage publishes attention", color: "#a5b4fc" },
];

export interface OpenClawComparison {
  dimension: string;
  openClaw: string;
  hermes: string;
  shared: boolean;
}

export const openClawComparisons: OpenClawComparison[] = [
  { dimension: "Foundation", openClaw: "memsearch plugin for per-turn capture", hermes: "Same memsearch summarization (plugin disabled — zombie issue, capture hook replicates it)", shared: true },
  { dimension: "Storage Format", openClaw: "Human-readable Markdown files", hermes: "Same Markdown + Qdrant vector store", shared: true },
  { dimension: "Capture Depth", openClaw: "4 layers (ephemeral → daily → MEMORY.md → SQLite)", hermes: "5 levels (L0 → L0.5 → L1 → L2 → L3) with per-tool granularity", shared: false },
  { dimension: "Capture Trigger", openClaw: "Agent must be told to write memories", hermes: "Automatic multi-layer capture on every interaction", shared: false },
  { dimension: "Intelligence", openClaw: "Raw text in, raw text out", hermes: "5 enrichment layers applied during sync", shared: false },
  { dimension: "Cross-Project", openClaw: "Per-workspace, no cross-project awareness", hermes: "All projects correlated in one vector space", shared: false },
  { dimension: "Retrieval", openClaw: "Basic vector similarity search", hermes: "Intent-based expansion with domain aliases", shared: false },
  { dimension: "Proactive Analysis", openClaw: "No pattern detection", hermes: "11-check pattern analyzer finds repetition, drift, risk", shared: false },
  { dimension: "Sync Pipeline", openClaw: "Embedding API dependency", hermes: "Zero-LLM sync via fastembed + qdrant-client + inotify", shared: false },
];

export const memoryStats = {
  captureLevels: 5,
  intelligenceLayers: 5,
  vectorsStored: 380,
  patternChecks: 11,
  llmSyncDependency: "Zero",
};

// ============================================================
// SAFETY GUARDRAILS (refreshed — structural protection forward)
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
    id: "structural-creds",
    title: "Credentials are structurally unreachable",
    description:
      "Sentinel rewrites credential-exposing commands at PreToolUse; values never enter the LLM context. 1Password vault is read+write for the Guardian service account only.",
    detail: "32 credentials protected · 43 leaks intercepted across prior sessions · 0 reached the model.",
    color: "#fbbf24",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    id: "approval",
    title: "Explicit approval for risky ops",
    description:
      "Service restarts, config writes, deletions, and network mutations require explicit user confirmation. Buckland writes additionally require a per-write Pushcut tap.",
    detail: "Every risky action follows a WARNING format: what · why · impact · risk level · rollback.",
    color: "#818cf8",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    id: "immutable-os",
    title: "Bazzite immutable-OS aware",
    description:
      "Hermes knows its host is an immutable Fedora Atomic desktop. Uses brew for CLI, Flatpak for GUI, ~/.config for user state, systemd user units, podman quadlets.",
    detail: "Never modifies /usr · Never casual rpm-ostree · Suggests immutable-friendly alternatives.",
    color: "#14b8a6",
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  },
  {
    id: "doc-integrity",
    title: "Documentation integrity is cardinal",
    description:
      "Every as-built update passes a 3-gate validation: schema, integrity (credential count + line count + checksums), regression detection. Incomplete > fabricated.",
    detail: "If credential count drops, the pipeline aborts and alerts the operator.",
    color: "#f59e0b",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    id: "substrate-isolation",
    title: "Substrate isolation",
    description:
      "hermes-reflex (the substrate autotuner) cannot touch capabilities, skills, agents, credentials, or its own scripts. 8 forbidden paths hard-coded. V1 is observation-only.",
    detail: "The optimizer (a capability) and reflex (substrate) are architecturally separate — never conflated.",
    color: "#a5b4fc",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    id: "killswitch",
    title: "Kill switches everywhere",
    description:
      "Optimizer disabled in one touch. Stage reverts to legacy injection with one env var. Every optimization creates a timestamped tarball for instant rollback.",
    detail: "STAGE_ENABLED=0 · touch .claude/optimizer/DISABLED · 0 failed deployments to date.",
    color: "#6366f1",
    icon: "M5.636 5.636a9 9 0 1012.728 0M12 3v9",
  },
];

// ============================================================
// VALIDATION GATES (closeout pipeline)
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
    validates: ["YAML Structure", "Required Fields", "Enum Values", "Type Safety", "Array Consistency", "Routing Alignment", "Boolean Checks"],
  },
  {
    id: "gate2",
    name: "Document Integrity",
    shortName: "Integrity",
    description:
      "4-point integrity check: line count (≤5% shrinkage), credential count (exact match), code-block count, protected-section checksums.",
    color: "#fbbf24",
    validates: ["Line Count", "Credential Count", "Code Block Integrity", "Section Checksums"],
  },
  {
    id: "gate3",
    name: "Regression Check",
    shortName: "Regression",
    description:
      "Per-tier regression detection: session duration vs 5-session rolling average with 25% threshold. Separate baselines prevent false positives.",
    color: "#14b8a6",
    validates: ["Duration Baselines", "Rolling Averages", "Tier-Specific Thresholds", "False-Positive Prevention"],
  },
];

// ============================================================
// SYSTEM METRICS CHART (refreshed — system breadth not closeout-only)
// ============================================================

export interface SystemMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  caption: string;
  color: string;
}

export const systemMetrics: SystemMetric[] = [
  { id: "agents", label: "Agents", value: 15, caption: "Each with explicit model assignment", color: "#818cf8" },
  { id: "mcp", label: "MCP servers", value: 22, caption: "Registered tool surfaces", color: "#fbbf24" },
  { id: "credentials", label: "Credentials", value: 32, caption: "Protected by Guardian + Sentinel", color: "#14b8a6" },
  { id: "memory", label: "Memory layers", value: 5, caption: "Capture levels feeding Qdrant", color: "#6366f1" },
  { id: "intelligence", label: "Intelligence layers", value: 5, caption: "Applied during real-time sync", color: "#a5b4fc" },
  { id: "publishers", label: "Stage publishers", value: 14, caption: "Producing attention candidates", color: "#fb923c" },
  { id: "icons", label: "Fabric icons", value: 313, caption: "Catalogue for Slides API binding", color: "#f59e0b" },
  { id: "optimizations", label: "Optimizations", value: 19, caption: "Auto-applied to closeout pipeline", color: "#5eead4" },
];

// ============================================================
// BUILT WITH CLAUDE (refreshed callouts)
// ============================================================

export const builtWithAiCallouts = [
  {
    text: "Every architectural decision — the Stage, Guardian, intent routing, multi-layer memory — was paired-designed with Claude.",
    color: "#818cf8",
  },
  {
    text: "Capabilities are conversational: I describe what I want; Hermes registers the agent or skill that delivers it.",
    color: "#fbbf24",
  },
  {
    text: "The safety guarantees — structural credential protection, kill switches, substrate isolation — were built from the start, not bolted on.",
    color: "#14b8a6",
  },
];

// ============================================================
// AGENT ICONS (used by agent-ecosystem.tsx)
// ============================================================

export const agentIcons: Record<string, string> = {
  "homelab-expert":
    "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  "asbuilt-maintenance":
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
  "asbuilt-housekeeping":
    "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  "closeout-evaluator":
    "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "closeout-optimizer":
    "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  "config-analyst":
    "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
  "deintegrator":
    "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  "discovery-lead":
    "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
  "discovery-warden":
    "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  "investigation-teammate":
    "M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "network-consultant":
    "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  "network-fleet-expert":
    "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
  "security-auditor":
    "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  "service-mapper":
    "M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M16.5 3.75V12m-8.25-8.25V12",
  "web-designer":
    "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
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
