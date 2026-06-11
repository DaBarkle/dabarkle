// ============================================================
// NARRATIVE CONTENT — the homepage story spine.
// Explainer beats, the life-of-a-prompt walkthrough, the
// attribution boundary, the hero transcript, and the glossary.
// All factual claims verified 2026-06-12 (see src/data/system.ts).
// ============================================================

// ------------------------------------------------------------
// Hero terminal transcript — abridged from a real session.
// The tool named is real (hermes-services MCP); keep the
// "abridged" label rendered next to it. No invented output.
// ------------------------------------------------------------
export const heroTranscript = {
  title: "hermes — live session (abridged)",
  lines: [
    { prompt: true, text: "is it safe to restart the media stack?" },
    { dim: true, text: "→ intel_is_it_safe_to_restart · checking dependents, queue, VPN chain" },
    { text: "Not yet — the download client is mid-transfer on 2 items routed through" },
    { text: "the same VPN namespace, and a library import is pending. Gateway healthy." },
    { text: "Safe window once the queue drains (~12 min). Want me to wait and do it?" },
    { prompt: true, text: "yes, then check the leak monitor after" },
    { dim: true, text: "→ scheduled · restart + 60s egress-IP verification queued" },
  ],
} as const;

// ------------------------------------------------------------
// Act I — the explainer for engineers with zero LLM background
// ------------------------------------------------------------
export interface ExplainerBeat {
  k: string;
  title: string;
  body: string[];
  vignette: "sealed-box" | "cracks" | "harness-ring";
}

export const explainerBeats: ExplainerBeat[] = [
  {
    k: "01",
    title: "A language model is a stateless function.",
    body: [
      "Strip away the chat UI and a large language model is one function: text in, text out. It holds no state between calls — no memory of the last conversation, no ability to touch a file, call an API, or remember you exist.",
      "Each call gets a finite working set — the context window — and whatever isn't in it might as well not exist. Think of it as RAM that is wiped between every invocation.",
    ],
    vignette: "sealed-box",
  },
  {
    k: "02",
    title: "Give it a real job, and everything breaks.",
    body: [
      "Ask that function to run your infrastructure and the gaps appear immediately: it forgets everything each call. It can't execute anything. It has no idea what changed since yesterday. And the moment you paste a credential into its context to get something done, that secret is in the transcript — and in every log downstream.",
      "None of these are model problems. They're runtime problems — the same class of problem an OS solves for a process.",
    ],
    vignette: "cracks",
  },
  {
    k: "03",
    title: "A harness is the runtime around the model.",
    body: [
      "An AI harness wraps the stateless function in the machinery it lacks: memory that persists and is retrieved into context at the right moment, brokered access to tools (typed APIs the model can call), lifecycle hooks that inject state and intercept actions, and guardrails that make safety structural rather than polite.",
      "If the model is a process, the harness is the runtime plus the service mesh around it. Hermes is one harness, built on Claude Code, run in production on one person's real infrastructure since January 2026.",
    ],
    vignette: "harness-ring",
  },
];

// ------------------------------------------------------------
// Attribution boundary — never blur this line on the site
// ------------------------------------------------------------
export const attribution = {
  platform: {
    title: "The platform — Claude Code (Anthropic)",
    intro: "The engine and its extension points. Hermes invents none of this:",
    items: [
      "The model and CLI runtime — the reasoning engine itself",
      "Hook lifecycle events (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop…) — the extension API",
      "Subagents, skills, and the Task orchestration surface",
      "MCP — the open protocol for typed tool servers",
      "CLAUDE.md project instructions and the auto-memory mechanism",
    ],
  },
  hermes: {
    title: "The engineering — Hermes",
    intro: "What was built on those extension points:",
    items: [
      "56 hook scripts (19,287 lines) saturating all 9 lifecycle events into one pipeline",
      "A per-prompt retrieval router + resident warm-bridge daemon (20.8ms median semantic recall)",
      "The Stage — a 4-zone working memory that thinks between turns on a 60s heartbeat",
      "Guardian + Sentinel — structural credential security (the model never sees a secret)",
      "3 custom MCP servers, a 30-capability intent registry, and a nightly 23-contract self-verifier",
    ],
  },
  footline:
    "Roughly 34,000 lines of custom substrate code on the harness side of that line — every piece replaceable, none of it pretending to be the model.",
} as const;

// ------------------------------------------------------------
// Centerpiece — Life of a prompt (7 beats, real names + numbers)
// ------------------------------------------------------------
export interface PromptBeat {
  k: string;
  phase: string; // short label on the schematic
  hook: string; // real mechanism name, rendered mono
  title: string;
  body: string;
  metric?: { value: string; label: string };
}

export const lifeOfAPrompt: PromptBeat[] = [
  {
    k: "01",
    phase: "Prompt",
    hook: "UserPromptSubmit",
    title: "A prompt arrives — and fires a pipeline before the model wakes.",
    body: "Every prompt triggers a 1,010-line intent router. Noise is filtered in milliseconds; real intent goes through retrieval. The user never sees any of this.",
  },
  {
    k: "02",
    phase: "Retrieval",
    hook: "hermes-bridge daemon",
    title: "Memory is recalled in 20.8 milliseconds.",
    body: "A resident daemon holds the embedding model and vector store warm behind a UNIX socket. Hybrid semantic + keyword search over 8,734 memories, capability matching, behavioral rules, runbook excerpts — up to 8 context blocks injected invisibly.",
    metric: { value: "20.8ms", label: "median retrieval (was 1.5–8s cold)" },
  },
  {
    k: "03",
    phase: "Situated state",
    hook: "stage-delta-injector",
    title: "The system already knows what it was paying attention to.",
    body: "Between turns, a 60-second heartbeat maintains The Stage — a 4-zone working memory with salience decay. If attention shifted since the last turn, the delta is injected. The model starts the turn situated, not amnesiac.",
    metric: { value: "39,201", label: "heartbeat cycles to date" },
  },
  {
    k: "04",
    phase: "Reasoning",
    hook: "model + tools",
    title: "The model reasons with context it didn't have to ask for.",
    body: "Armed with recalled memory and situated state, it routes intent to one of 30 registered capabilities and proposes tool calls — against a fleet of 9 MCP servers exposing ~371 typed tools across the homelab, network fleet, and beyond.",
  },
  {
    k: "05",
    phase: "Interception",
    hook: "Sentinel · PreToolUse",
    title: "Credential-touching calls are rewritten before they run.",
    body: "Sentinel intercepts every tool call. Commands that would expose a secret are structurally rewritten — values fetched from a 1Password-brokered daemon at execution time, never entering the model's context. Not a rule the model follows; a wall it can't see over.",
    metric: { value: "37", label: "credentials it can use but never read" },
  },
  {
    k: "06",
    phase: "Capture",
    hook: "PostToolUse → Stop chain",
    title: "Output is leak-scanned, logged, and judged.",
    body: "Tool output passes a leak scanner (it once caught a dashboard password — and wrote a new rule itself). At turn end, a 6-hook Stop chain decides what this turn taught the system and writes it to ambient memory.",
  },
  {
    k: "07",
    phase: "The loop closes",
    hook: "inotify → Qdrant sync",
    title: "The next prompt retrieves what this one learned.",
    body: "Within seconds, new memory is embedded and synced into the vector store. The pipeline that started this story will find it on the very next prompt. That closed loop — not any single component — is what makes it a system.",
  },
];

// ------------------------------------------------------------
// Glossary — plain-English, two sentences max, for JargonChip
// ------------------------------------------------------------
export const glossary: Record<string, string> = {
  LLM: "A large language model — a function that takes text in and produces text out, with no memory or abilities of its own between calls. Everything else you see here is built around that limitation.",
  "context window":
    "The finite working set a model can consider in a single call — its RAM, wiped between invocations. Deciding what goes into it is the core engineering problem of a harness.",
  MCP: "Model Context Protocol — an open standard for exposing typed tools (APIs) to a model. Think of an MCP server as a typed API gateway the model can call through its runtime.",
  hook: "A lifecycle extension point in Claude Code — a script that runs at moments like 'prompt submitted' or 'before a tool executes'. Hermes wires custom code into all nine of them.",
  subagent:
    "A fresh model instance spawned to do a scoped task with its own context, reporting back to the main session. Used for parallel work and independent review.",
  skill: "A packaged, invocable procedure the runtime can load on demand — closer to a runbook than a plugin.",
  "vector store":
    "A database that indexes text by meaning (as numeric embeddings) so you can search by similarity rather than keywords. Hermes runs Qdrant locally with 8,734 entries.",
  embedding:
    "A numeric fingerprint of text capturing its meaning, so 'restart the download stack' can match a memory that never used those words.",
  harness:
    "The runtime built around a stateless model: memory, tool brokering, lifecycle hooks, guardrails, scheduling. The model reasons; the harness makes it a system.",
  blackboard:
    "A classic AI architecture: independent processes read and write a shared working-memory surface. The Stage is a blackboard with four zones and attention that decays.",
  salience:
    "How strongly something holds attention. Stage entries decay at class-specific half-lives — credential events stay top-of-mind for ~a day, routine chatter fades in minutes.",
  "PreToolUse rewriting":
    "Intercepting a tool call after the model proposes it and before it executes — and changing it. This is how secrets get injected at runtime without ever existing in the model's context.",
};
