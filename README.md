# DaBarkle — portfolio (Aurora Glass redesign)

A premium, dark, glassmorphism portfolio for **David Barker (DaBarkle)** — *AI Harness Builder* — with **Hermes** (an ambient intelligence platform) as the flagship case study.

The design language is a mature, restrained glassmorphism harmonised to the Hermes brand: a near-black canvas, a single lavender-blue accent (`#5e6ad2`), hairline borders, frosted-glass panels, layered aurora/mesh/grain backdrops, and intelligent, reduced-motion-safe animation. The bar is Linear / Vercel / Stripe / Raycast.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19, RSC) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens) + design-token CSS variables |
| Base components | shadcn/ui, customised heavily |
| UI animation | Motion for React (`framer-motion`) |
| Scroll storytelling | `useScroll` / `useTransform` (word reveal, timeline fill) |
| Charts/visuals | Hand-built SVG (agent constellation, pipelines, salience bars) |
| Icons | `lucide-react` |
| Fonts | Inter (display + text) · JetBrains Mono (mono) via `next/font` |

> **Build tooling note:** the project pins **webpack** (`next dev --webpack` / `next build --webpack`). Next 16's default Turbopack hits an internal CSS panic (`Unexpected type in cell`) parsing the generated Tailwind v4 output on this version; webpack compiles the identical CSS cleanly. `dev:turbo` is kept as an escape hatch to retry Turbopack on future Next releases. Vercel runs the `build` script, so it uses webpack automatically.

---

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000  (webpack dev server)
npm run build        # production build (webpack)
npm run start        # serve the production build
npm run lint
```

---

## Project structure

```
src/
  app/
    layout.tsx              # fonts, metadata/OG, chrome (nav, ambient, background)
    page.tsx                # homepage — narrative section composition
    globals.css             # design tokens (@theme), glass utilities, keyframes, type scale
    projects/hermes/
      page.tsx              # Hermes case study — section composition
      template.tsx          # scroll-to-top guard for in-page navigation
  components/
    ui/                     # design system: GlassCard, SpotlightCard, GlowButton,
                            #   Bento, Reveal/Stagger, SectionHeader, Section,
                            #   AnimatedTabs, InteractiveAccordion, ProcessTimeline,
                            #   StatCard, CountUp, GradientBadge, Eyebrow, Magnetic, Marquee
    visuals/                # SiteBackground, AuroraBackground, GridOverlay, NoiseOverlay, Spotlight
    layout/                 # FloatingNav, MobileMenu, Footer, AmbientLayer
    brand/                  # BrandMark (the animated "D")
    home/                   # homepage sections
    hermes/                 # Hermes case-study sections
  data/hermes.ts            # ALL case-study content (metrics, agents, Stage, Guardian, memory…)
  hooks/                    # useScrollProgress, useActiveSection, useReducedMotion
  lib/
    tokens.ts               # TS mirror of tokens + harmonize()/alpha() helpers
    motion.ts               # shared springs, easings, variants
    utils.ts                # cn()
```

### Where things live

- **Content** — `src/data/hermes.ts` is the single source of truth for the case study. Homepage copy lives inline in `src/components/home/*`.
- **Design tokens** — `src/app/globals.css` (`@theme inline` block) defines colours, surfaces, glass, hairlines, ink, radius and animation hooks. `src/lib/tokens.ts` mirrors the key values for inline styles / SVG.
- **Animation settings** — `src/lib/motion.ts` (durations, easings, variants). Per-component motion is local and always gated on `prefers-reduced-motion`.

---

## Design system notes

- **Single accent.** Lavender `#5e6ad2` (`brand-*`) and white ink carry all emphasis. Multi-series diagrams use a cohesive, desaturated *functional* palette; legacy data colours are remapped through `harmonize()` so nothing turns into a rainbow.
- **Glass.** `.glass` / `.glass-strong` utilities (backdrop blur + hairline + edge highlight). `GlassCard` / `SpotlightCard` wrap them; `SpotlightCard` adds a cursor-following glow (CSS vars, no per-frame React renders).
- **Layered backdrop.** `SiteBackground` (fixed, behind everything) + per-section `AuroraBackground` / `GridOverlay` / `Spotlight` + `AmbientLayer` (desktop cursor spotlight).

### Reduced motion

`prefers-reduced-motion: reduce` is respected everywhere: a global CSS block neutralises transitions/animations, `Reveal`/`Stagger`/`CountUp`/`ProcessTimeline`/`Magnetic`/`AmbientLayer` all short-circuit to a static state, and looping/parallax effects are disabled while all content and interface feedback remain.

### Disabling / simplifying advanced visuals

- Remove `<AmbientLayer />` from `layout.tsx` to drop the cursor spotlight.
- Remove `<SiteBackground />` (or lower its opacities) for a flatter canvas.
- Drop `<AuroraBackground />` / `<Spotlight />` from a hero/section for a calmer backdrop.
- `<NoiseOverlay opacity={…}/>` and `<GridOverlay opacity={…}/>` are tunable per use.

---

## Performance

- Server Components by default; `"use client"` only where interactivity is needed.
- Both routes prerender as static content.
- Animation is opacity/transform-only; no layout-thrashing; backgrounds are CSS, not canvas (except the optional brand-mark draw).
- Fonts via `next/font` (self-hosted, swap). Heavy effects are isolated to the components that use them.

---

## Accessibility & SEO

- Semantic landmarks, skip-link, logical heading order, visible focus rings, keyboard-navigable nav/tabs/accordions, `aria-label`/`aria-hidden` on icons and decoration.
- Per-route metadata, Open Graph + Twitter cards, canonical URL, theme-color, descriptive titles. Content is crawlable despite the visual richness.

---

## Assumptions made

- **Brand** harmonised to the Hermes design system (lavender, near-black) per the documented house default; the previous indigo+amber+teal palette was consolidated to a single accent.
- **Content** taken from the existing site + `data/hermes.ts`; copy was sharpened but figures preserved. GitHub is linked as `github.com/DaBarkle`; the only contact channel is `davidbarker774@gmail.com` (plain email, no form — by request).
- The deep Hermes case study keeps its information architecture; each section was rebuilt onto the new component system.
