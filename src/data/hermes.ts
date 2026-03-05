// All Hermes showcase data — privacy-safe, no real infrastructure details

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  why: string;
  color: string;
  capabilities: string[];
}

export const agents: Agent[] = [
  {
    id: "analyst",
    name: "Analyst",
    role: "Query & Analysis",
    description:
      "Analyzes the conversation transcript, identifies every infrastructure change, and generates a structured change specification (SCSP). Read-only access means it can never accidentally modify anything.",
    why: "Separation of analysis from action. The agent that identifies changes has no write access.",
    color: "#a78bfa",
    capabilities: ["Change Detection", "Pattern Matching", "SCSP Generation"],
  },
  {
    id: "surgeon",
    name: "Surgeon",
    role: "Precision Updates",
    description:
      "Applies changes using a 6-phase methodology: validate input, inventory credentials, apply changes, format, version, verify. 40 credentials preserved across every session, zero fabricated values.",
    why: "Credential preservation is the cardinal rule. An incomplete document is better than a fabricated one.",
    color: "#fb923c",
    capabilities: [
      "6-Phase Methodology",
      "Credential Preservation",
      "Surgical Edits",
    ],
  },
  {
    id: "formatter",
    name: "Formatter",
    role: "Visual Polish",
    description:
      "Improves visual presentation \u2014 converts ASCII diagrams to Mermaid, adds Obsidian callouts, fixes structure \u2014 without touching any technical content. IPs, ports, configs, credentials are inviolable.",
    why: "Content and presentation are separate concerns. The formatter has no authority to change facts.",
    color: "#fbbf24",
    capabilities: [
      "Mermaid Diagrams",
      "Obsidian Callouts",
      "Structure Optimization",
    ],
  },
  {
    id: "optimizer",
    name: "Optimizer",
    role: "Self-Improvement",
    description:
      "Evaluates the pipeline\u2019s own performance and auto-applies safe improvements. 17 optimizations deployed across 13 sessions \u2014 from 89.5% time reduction to compaction resilience.",
    why: "The system that monitors itself improves itself. But it cannot modify its own safety rules.",
    color: "#8b5cf6",
    capabilities: [
      "4-Layer Analysis",
      "Auto-Deployment",
      "Regression Detection",
    ],
  },
];

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
    color: "#34d399",
    description:
      "Session had no infrastructure changes \u2014 skip maintenance, run formatting only.",
    avgTime: "~62s",
    avgTokens: "~60K",
    frequency: "15%",
    note: "2 of 13 sessions",
  },
  {
    id: "tier2",
    name: "Surgical",
    label: "Tier 2",
    color: "#fbbf24",
    description:
      "Targeted changes \u2014 update only affected sections, preserve everything else.",
    avgTime: "~497s",
    avgTokens: "~155K",
    frequency: "62%",
    note: "8 of 13 sessions",
  },
  {
    id: "tier3",
    name: "Comprehensive",
    label: "Tier 3",
    color: "#a78bfa",
    description:
      "Full document rewrite \u2014 complete analysis, all sections updated, full verification.",
    avgTime: "~820s",
    avgTokens: "~305K",
    frequency: "0%",
    note: "System routes efficiently enough to avoid this",
  },
];

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
    color: "#a78bfa",
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
      "4-point integrity check: line count (\u22645% shrinkage allowed), credential count (must match exactly \u2014 40/40), code block count, protected section checksums (Sections 3.2, 7.2, 9.7).",
    color: "#fb923c",
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
      "Per-tier regression detection: compares session duration against 5-session rolling average + 25% threshold. Separate baselines for each tier prevent false positives from tier switching.",
    color: "#fbbf24",
    validates: [
      "Duration Baselines",
      "Rolling Averages",
      "Tier-Specific Thresholds",
      "False Positive Prevention",
    ],
  },
];

export const metrics = {
  sessions: 13,
  tokenSavings: 64,
  dataIntegrity: 100,
  credentialPreservation: "40/40",
  credentialPreservationPct: 100,
  optimizationsApplied: 17,
  documentLines: 3392,
  dataLossIncidents: 0,
  gatePassRate: 100,
  systemUptime: 53,
};

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

export interface TimelineMilestone {
  version: string;
  label: string;
  description: string;
  date: string;
}

export const timeline: TimelineMilestone[] = [
  {
    version: "v1.0",
    label: "Baseline",
    description: "Initial 4-agent pipeline",
    date: "Jan 8",
  },
  {
    version: "v1.4",
    label: "Tiered Routing",
    description: "3-tier complexity routing",
    date: "Jan 10",
  },
  {
    version: "v1.8",
    label: "3-Gate Validation",
    description: "Schema + integrity + regression checks",
    date: "Feb 7",
  },
  {
    version: "v2.0",
    label: "Living Memory",
    description: "Session journals + vector search",
    date: "Mar 1",
  },
  {
    version: "v2.5",
    label: "Current",
    description: "Self-improving optimizer + SCSP inference",
    date: "Mar 2",
  },
];

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
];

export interface SystemMode {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  color: string;
}

export const systemModes: SystemMode[] = [
  {
    id: "live-ops",
    name: "Live Operations",
    description:
      "Claude Code runs directly on the host with terminal access. SSH into VMs, manage containers, read logs, verify configs, fix problems in real-time. The AI doesn\u2019t just advise \u2014 it operates.",
    capabilities: [
      "Direct SSH",
      "Container Management",
      "Log Analysis",
      "Config Verification",
    ],
    color: "#fb923c",
  },
  {
    id: "doc-pipeline",
    name: "Documentation Pipeline",
    description:
      "After every session, a 4-agent pipeline updates 3,392 lines of as-built documentation. Each agent has a single responsibility, specific tools, and strict safety constraints.",
    capabilities: [
      "Change Detection",
      "Surgical Updates",
      "Format Polish",
      "Self-Optimization",
    ],
    color: "#a78bfa",
  },
];

export const challengePoints = {
  without: [
    {
      label: "Stale Documentation",
      description: "Docs drift from reality after every change",
    },
    {
      label: "Manual Updates",
      description: "Tedious, error-prone, always deprioritized",
    },
    {
      label: "Tribal Knowledge",
      description: "Critical details live only in your head",
    },
  ],
  with: [
    {
      label: "Live Updates",
      description: "Documentation updated after every session",
    },
    {
      label: "Automated Pipeline",
      description: "4 agents with strict safety constraints",
    },
    {
      label: "Persistent Memory",
      description: "Patterns and solutions survive across sessions",
    },
  ],
};

export interface FeedbackStep {
  id: string;
  label: string;
  color: string;
}

export const feedbackLoopSteps: FeedbackStep[] = [
  { id: "complete", label: "Session Completes", color: "#a78bfa" },
  { id: "telemetry", label: "Telemetry Collected", color: "#fb923c" },
  { id: "analysis", label: "4-Layer Analysis", color: "#fbbf24" },
  { id: "opportunity", label: "Opportunity Identified", color: "#34d399" },
  { id: "risk", label: "Risk Assessed", color: "#a78bfa" },
  { id: "apply", label: "Auto-Applied", color: "#fb923c" },
  { id: "benefit", label: "Next Session Benefits", color: "#34d399" },
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
    description:
      "Detects document size upfront and routes to optimal maintenance strategy, eliminating redundant full-document reads.",
  },
  {
    id: "opt6",
    label: "Chunked-Read + Inference",
    metric: "93%",
    metricLabel: "context reduction",
    description:
      "Reads only affected sections instead of the full document, combined with intelligent inference of what should be documented.",
  },
  {
    id: "opt7",
    label: "Compaction Resilience",
    metric: "100%",
    metricLabel: "recovery rate",
    description:
      "Checkpoint/recovery for mid-workflow context loss. Validated in Session 12 when compaction occurred during maintenance.",
  },
];

export interface TimelineAnnotation {
  session: string;
  label: string;
  description: string;
}

export const timelineAnnotations: TimelineAnnotation[] = [
  {
    session: "S1",
    label: "Baseline",
    description: "First session, full Tier 3 run",
  },
  {
    session: "S3",
    label: "Opt #1 Applied",
    description: "89.5% time reduction",
  },
  {
    session: "S7",
    label: "3-Gate Validation",
    description: "Added validation gates",
  },
  {
    session: "S12",
    label: "Compaction Recovery",
    description: "Opt #7 validated in production",
  },
];

export const memoryStores = [
  {
    id: "journals",
    label: "Session Journals",
    description:
      "Markdown files with structured frontmatter. Category, services touched, tier executed, unresolved items.",
    color: "#a78bfa",
  },
  {
    id: "patterns",
    label: "Pattern Files",
    description:
      "Reusable solutions: symptoms, root cause, fix steps, affected services.",
    color: "#fb923c",
  },
  {
    id: "vector",
    label: "Vector Store",
    description:
      "Semantic search via Qdrant. Find relevant context by meaning, not just keywords.",
    color: "#34d399",
  },
];

export const flowSteps = [
  {
    step: "1",
    label: "Capture",
    desc: "Session events journaled with structured frontmatter and service tags",
    color: "#a78bfa",
  },
  {
    step: "2",
    label: "Index",
    desc: "Patterns vectorized for semantic search across all historical sessions",
    color: "#34d399",
  },
  {
    step: "3",
    label: "Recall",
    desc: "Next session retrieves relevant context automatically in under 1 second",
    color: "#fbbf24",
  },
  {
    step: "4",
    label: "Apply",
    desc: "Historical solutions accelerate resolution, anticipation hints surface proactively",
    color: "#fb923c",
  },
];

export const scspCallouts = [
  {
    lineRange: [0, 3] as [number, number],
    label: "Session Context",
    description:
      "Unique ID, timestamp, and session type for traceability",
    color: "#a78bfa",
  },
  {
    lineRange: [5, 12] as [number, number],
    label: "Change Manifest",
    description:
      "Every infrastructure change with component, type, section, and severity",
    color: "#fb923c",
  },
  {
    lineRange: [14, 17] as [number, number],
    label: "Routing Decision",
    description:
      "Tier assignment with reason and list of affected document sections",
    color: "#fbbf24",
  },
  {
    lineRange: [19, 22] as [number, number],
    label: "Validation Results",
    description: "Pass/fail status from all three validation gates",
    color: "#34d399",
  },
];

export const builtWithAiCallouts = [
  {
    text: "The orchestration patterns \u2014 SCSP, tiered routing, validation gates \u2014 solve real coordination problems",
    color: "#a78bfa",
  },
  {
    text: "The safety guarantees \u2014 credential preservation, protected sections, checksums \u2014 prevent real data loss",
    color: "#fb923c",
  },
  {
    text: "The self-improvement \u2014 the optimizer rewrites its own orchestration while respecting inviolable guardrails",
    color: "#34d399",
  },
];

export const agentIcons: Record<string, string> = {
  analyst:
    "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  surgeon:
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
  formatter:
    "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  optimizer:
    "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
};
