# DaBarkle Site Uplift — Build Spec (2026-06-12)

This is the binding spec for the visual + content rebuild. Every implementation
agent reads this file, the data layer (`src/data/*.ts`), and the existing
foundations (`src/app/globals.css`, `src/lib/tokens.ts`, `src/lib/motion.ts`)
before writing code.

## 0. Non-negotiables

- **Stack:** Next 16.1.6 **webpack** (`next dev --webpack` / `next build --webpack` — NEVER unpin; Turbopack panics on this Tailwind v4 setup), React 19, Tailwind v4, framer-motion 12, @base-ui/react, lucide-react. **Zero new runtime dependencies.** No GSAP, no Lenis, no three/R3F/OGL, no React Flow. Everything is hand-rolled framer-motion + SVG + CSS.
- **Factual only.** Every number rendered on the site comes from `src/data/system.ts` (verified 2026-06-12) or from typed consts in your section file copied verbatim from the discovery dossier. NEVER invent, round up, or extrapolate a figure. If you need a fact, it must exist in the dossier (`/tmp/dabarkle-discovery.json`) or the data layer.
- **Attribution honesty.** Claude Code (Anthropic) platform features — the CLI/engine, hook lifecycle events, subagents, skills system, MCP protocol support, CLAUDE.md/auto-memory — are always labelled as the platform. Hermes engineering = the 56 hook scripts, Guardian/Sentinel, The Stage, intent router/retrieval, capability registry + self-integration, custom MCP servers, verifier/reflex/optimizer, documentation pipeline. When in doubt the component renders the attribution from `src/data/narrative.ts`, never ad-libs it.
- **Privacy rules (hard):**
  - No credential values anywhere (counts/paths fine).
  - No client names/addresses/employer names: the residential network project is "a residential new-build (anonymised)"; the work webapp is "an air-gapped onboarding expert for a workplace Mac pilot"; the remote network site is "a relative's remote site".
  - No third-party emails or family details beyond "my brother" / "my mum".
  - Only the pre-vetted quotes in `src/data/mind.ts` may be quoted from the self-model/dreams.
- **Accessibility / motion:** every animated component gates on `useReducedMotion()` (static final state when reduced); decoration is `aria-hidden`; interactive elements keep native focus semantics; respect the existing `prefers-reduced-motion` global CSS kill block. Animate **transform/opacity/SVG stroke only** — never blur, filter, box-shadow, or layout properties on scroll.
- **Performance:** server components by default, `"use client"` only on motion leaves. No setState-per-mousemove (CSS variable pattern, see `spotlight-card.tsx`). `viewport={{ once: true }}` for entrances; scroll-linked values via `useScroll`/`useTransform`/`useSpring` motion values only. Max ~3 `backdrop-blur` panes per viewport — prefer `bg-[rgba(16,16,22,0.8)]` fakes elsewhere.

## 1. Design language — "Aurora Glass 2.0"

Keep the existing token system wholesale (lavender `#5e6ad2`/`#828fff`, canvas `#060608`, glass surfaces, hairlines, Inter + JetBrains Mono). The uplift adds three layers on top:

1. **Technical Mono (receipts layer).** Engineering credibility as a visual
   motif: JetBrains Mono labels, `tabular-nums` tickers, dot-grid textures,
   and **PathChip receipts** — small mono chips citing real file paths
   (`hooks/user-prompt-router.sh · 1,010 lines`). Stats carry a
   `verified 2026-06-12` stamp. The functional palette (`tokens.ts`) may be
   used in diagrams/legends — never as marketing color.
2. **Living schematic (signature layer).** SVG system diagrams drawn from
   data: `pathLength` draw-on (once, in view), then perpetual low-cost pulses
   travelling the paths (small circles on `offsetDistance`/path animation,
   ≤8 concurrent, paused off-screen, disabled on reduced motion).
3. **Editorial scale-breaks.** The section metronome is dead. Vary: full-bleed
   `SectionBand`s, asymmetric 5/7 two-column splits, one pinned scrollytelling
   chapter, oversized numerals (`text-[clamp(3rem,8vw,7rem)]` mono) for the
   numbers band. Use SectionDivider sparingly (≤2 per page).

**Motion vocabulary (in priority order):** masked word-rise headings (split at
word level, `overflow-hidden` + y:110%→0 stagger) for h1/h2 only · whileInView
entrances (existing Reveal/Stagger) · ONE scroll-scrubbed centerpiece
(life-of-a-prompt) · SVG draw-on + pulses · layoutId shared transitions (tabs,
toggles) · count-up tickers · type-on terminal · magnetic only on primary CTAs.

## 2. Page composition

### `/` (rebuilt) — one narrative: the system first, the engineer after
1. `narrative/hero.tsx` — **Hero**: eyebrow "David Barker — software engineer · operator of Hermes". Masked-rise headline introducing Hermes (an ambient AI system run on his own infrastructure). Right/below: `TerminalWindow` playing the abridged real session (`narrative.ts → heroTranscript`). Quiet stat pills (live numbers from system.ts). "Already know LLM harnesses? Skip to the architecture ↓" anchor link (respect-the-reader device). Behind: existing aurora + dot grid + a subtle scroll-parallax on layers.
2. `narrative/explainer.tsx` — **Act I "From stateless function to ambient system"** for engineers with zero LLM background, 3 beats (data in `narrative.ts → explainerBeats`): the model is a stateless function → what breaks the moment you give it a real job → the harness is the runtime around the model (analogy mapping: context window ≈ RAM, MCP ≈ typed API gateway, harness ≈ runtime + service mesh). Each beat: asymmetric split, small inline SVG vignette (sealed box → cracks → ring of subsystems). JargonChips from here on.
3. `narrative/attribution.tsx` — **"The platform vs. what I built"**: two-column honest split (data: `narrative.ts → attribution`), Claude Code column branded neutrally. One line of scale at the bottom (~34k lines custom substrate code).
4. `narrative/life-of-a-prompt.tsx` — **CENTERPIECE**: pinned scrollytelling, `h-[500vh]` container, sticky `h-screen` panel; a single schematic accretes per beat (data: `narrative.ts → lifeOfAPrompt`, 7 beats with real hook names + measured latencies), dot travels the path; right rail = beat copy. Scrubbed via `useScroll({target})` + `useTransform`. **Mobile/reduced-motion fallback: stepped vertical cards, no pinning.** End beat closes the loop ("the next prompt retrieves what this one learned").
5. `narrative/mind.tsx` — **"It thinks between turns"**: The Stage as a living diagram — 4 zones, salience decay bars animating at their real per-class half-lives (sped up ×600 with a legend admitting it), heartbeat tick (39,201 cycles), self-model v44 panel + vetted operator-stance quote, and the dream-journal panel with the vetted 2026-06-11 excerpt (`mind.ts`). This section is the soul — give it room, full-bleed band, distinct (slightly deeper) background.
6. `narrative/guardrails.tsx` — **"Credentials the model can't reach"**: structural-vs-behavioral framing, PreToolUse rewrite flow mini-schematic (3-step), kill-chain story ("Sentinel caught a password in tool output and wrote the rule itself — 1 of 25 rules is machine-learned"), stat row (37 credentials · 25 rules · 80/80 regression suite).
7. `narrative/self-maintenance.tsx` — **"It audits itself nightly"**: verifier GREEN (23 contracts), reflex baselines, the 130-agent / ~7.1M-token round-2 self-review → 79/79 closed, plan-first discipline (8 design docs), as-built pipeline at v9.3 with 40 versions archived.
8. `narrative/by-the-numbers.tsx` — **full-bleed Technical Mono band**: oversized tickers of the hero numbers (`system.ts → heroNumbers`), `verified 2026-06-12` stamp, PathChip receipts under each.
9. `narrative/built-with-it.tsx` — **Projects bento** (data: `projects.ts`): cell size = real significance; every cell has a concrete factual hook, no filler.
10. `narrative/engineer.tsx` — **"The engineer behind it"**: David, operator-not-user philosophy (reuse the strong existing micro-copy), how he works (plan-first, verification, the hard-stop swarm lesson — vetted quote), then contact CTA. Footer.

### `/projects/hermes` (rebuilt) — the deep dive
Keep route. Header strip linking back to the narrative. Sections, docs-register
but still Aurora Glass: `deep/substrate.tsx` (hook table: 9/9 lifecycle events,
20 registrations, router's 8 retrieval blocks, warm bridge 20.8ms story with
explicit before/after framing), `deep/memory.tsx` (5-level capture pipeline +
hybrid retrieval: MiniLM + BM25 + RRF + temporal decay, 8,734 vectors),
`deep/security.tsx` (Guardian endpoints/session model/entropy thresholds,
Sentinel 5-event mesh, learned-rule lifecycle), `deep/capabilities.tsx`
(30 capabilities / 32 tools / 16 agents / 10 skills, semantic matching at 0.30,
self-integration + deintegration with protected components), `deep/fleet.tsx`
(9 MCP servers, ~371 tools, 3 custom-built, lean-MCP lesson 1.7GB→252MB,
lazy proxy with 304-tool catalog), `deep/selfimprove.tsx` (vitals/reflex/
optimizer trio, mutation probes, autonomous build under HALT conditions with
divergence log), `deep/infrastructure.tsx` (Bazzite+Nyx topology, 7-service
media stack inside Gluetun namespace, double-VPN, 3 kill-switch layers, SIEM,
15 monitors, 60s leak checks, as-built doc 4,413 lines), `deep/attribution-table.tsx`
(the full two-column boundary). Use `GoDeeper` collapsibles for expert detail
(server-rendered `<details>`), TerminalWindow for traces/config excerpts.

## 3. Component contracts (primitives — built first, import from these exact paths)

- `@/components/ui/terminal-window` — `TerminalWindow({ title, lines, typeOn?, className })`; `lines: { prompt?: boolean; text: string; dim?: boolean }[]`; traffic-light dots, JetBrains Mono, glass frame; type-on starts in view, instant when reduced-motion.
- `@/components/ui/jargon` — `JargonChip({ term, children })`; dotted-underline span; @base-ui/react popover with 2-sentence plain-English definition from `narrative.ts → glossary` (keyed by `term`).
- `@/components/ui/go-deeper` — `GoDeeper({ summary, children })`; styled native `<details>`, server-renderable, mono "Go deeper —" affordance.
- `@/components/ui/stat-ticker` — `StatTicker({ value, suffix?, decimals?, className })`; count-up on view via `useMotionValue`+`useSpring`+`useTransform`, `tabular-nums`, reduced-motion = static.
- `@/components/ui/section-band` — `SectionBand({ tone: "default"|"deep"|"mono", children, className })`; full-bleed band with edge hairlines + tone backgrounds.
- `@/components/ui/path-chip` — `PathChip({ path, note? })`; mono receipt chip.
- `@/components/ui/split-heading` — `SplitHeading({ as?, children, className })`; word-masked rise, aria-safe (visually-hidden full text + aria-hidden animated words).

Existing primitives to keep using: `Section`, `SectionHeader`, `Eyebrow`, `GlassCard`, `SpotlightCard`, `GlowButton`, `Magnetic`, `AnimatedTabs`, `Reveal`/`Stagger`, `Marquee`, `GradientBadge`, `CountUp` (superseded by StatTicker — don't use in new code).

## 4. File ownership (no agent touches another's files)

- Primitives agent: the 7 new `ui/` files above + add scroll-scrub helpers to `src/lib/motion.ts` (append only).
- Section agents: ONLY their listed `narrative/` or `deep/` files.
- Assembly (main session): `src/app/page.tsx`, `src/app/projects/hermes/page.tsx`, `src/app/layout.tsx`, `globals.css` additions, deletions of dead files.

Every component: TypeScript strict, named export, server component unless it
animates, data imported from `@/data/*` — copy NOTHING numeric inline unless it
is a typed const at the top of the file with a `// source:` comment.
