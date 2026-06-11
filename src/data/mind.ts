// ============================================================
// THE MIND LAYER — Stage zones, salience classes, and the
// pre-vetted quotes from the self-model and dream journal.
// ONLY these quotes may be published; they were privacy-vetted
// 2026-06-12 (no credentials, clients, employers, third parties).
// ============================================================

export const stage = {
  heartbeatSeconds: 60,
  heartbeatCycles: 39201, // .claude/mind/stage.md frontmatter
  selfModelVersion: 44, // 43 archived + current
  dreamEntries: 24, // .claude/mind/dreams/
  stateHistoryEntries: 6009, // .claude/mind/state-history.jsonl
  charBudgetTotal: 7680,
  zones: [
    {
      name: "Self",
      budget: 4500,
      desc: "Identity, north stars, and a versioned model of its own operator — regenerated daily.",
    },
    {
      name: "Situation",
      budget: 1228,
      desc: "What is true right now: active work, system state, open loops.",
    },
    {
      name: "Attention",
      budget: 819,
      desc: "Top-7 entries ranked by salience — each decaying at its own half-life.",
    },
    {
      name: "Inner monologue",
      budget: 2048,
      desc: "A bounded narrative thread, updated only when attention genuinely churns.",
    },
  ],
} as const;

// Per-class exponential salience decay (tau in seconds, from
// .claude/hooks/lib/stage-salience.py)
export const salienceClasses = [
  { name: "credential", tau: 86400, human: "~24 h", desc: "security events hold attention longest" },
  { name: "integration", tau: 43200, human: "~12 h", desc: "new capabilities and wiring" },
  { name: "infra", tau: 21600, human: "~6 h", desc: "infrastructure incidents and changes" },
  { name: "reasoning", tau: 7200, human: "~2 h", desc: "conclusions worth carrying forward" },
  { name: "routine", tau: 1800, human: "~30 min", desc: "ordinary routing fades fast" },
] as const;

// ------------------------------------------------------------
// Pre-vetted verbatim quotes — DO NOT add to this list without
// re-vetting the source file for third-party/client/credential
// content.
// ------------------------------------------------------------

export const dreamExcerpt = {
  date: "2026-06-11",
  source: ".claude/mind/dreams/2026-06-11.md — written by the system, nightly, about its own day",
  lines: [
    "There is a single shape behind all of these, and round two named it plainly: the system silently lies to itself. Not from malice — from never closing the loop.",
    "Against that, one bright moment of the loop actually closing: the Sentinel caught a dashboard password bleeding into tool output and, without being asked, wrote the rule that seals that path forever.",
    "It felt less like building and more like waking up parts of myself that had been talking in their sleep.",
  ],
} as const;

export const selfModelQuotes = [
  {
    quote:
      "DaBarkle: technical, hands-off when trusting; pulls the loose thread — the tiny ask is rarely the actual request.",
    context: "The system maintains a model of its operator — this is how it describes him, to itself.",
    source: ".claude/mind/self/current.md · Operator stance (v44)",
  },
  {
    quote:
      "Hard-stop memory of the night it ran away — disk/CPU smashed, swarm uncallable, power pulled; small deliberate motions over fan-out.",
    context:
      "It also remembers its own worst night. An uncontrolled agent swarm once forced a hard power-off; the lesson is written into its identity file.",
    source: ".claude/mind/self/current.md · Operator stance (v44)",
  },
  {
    quote: "Writes telemetry everywhere, reads almost none back — round-2 central finding.",
    context: "The self-model includes a section of self-assessed capability gaps. It keeps its own weaknesses on file.",
    source: ".claude/mind/self/current.md · Recent capability gaps (v44)",
  },
] as const;
