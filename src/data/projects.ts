// ============================================================
// PROJECT PORTFOLIO — built with / alongside Hermes.
// Privacy rules applied: no client names/addresses, no employer
// names, work projects described generically. Facts verified
// 2026-06-12 against the discovery dossier.
// ============================================================

export interface Project {
  id: string;
  name: string;
  tagline: string;
  hook: string; // the one concrete, factual line that earns the cell
  tech: string[];
  size: "lg" | "md" | "sm"; // bento weight = real significance
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "hermes-pane",
    name: "Hermes Pane",
    tagline: "Generative UI over the whole homelab",
    hook: "Composes a custom React panel per intent by spawning the model headless (stream-JSON) against the live MCP fleet — with a server-side action allowlist and confirm-flow for anything destructive. Runs as a systemd service; installs as a PWA on a phone.",
    tech: ["Next.js", "stream-json", "MCP", "systemd"],
    size: "lg",
    featured: true,
  },
  {
    id: "network-fleet",
    name: "Network fleet + remote audit",
    tagline: "Multi-site UniFi management with trust tiers",
    hook: "Audited a relative's remote network through an ephemeral WireGuard tunnel in an isolated network namespace — read-only by construction — and produced a 522-line severity-ranked report against NIST CSF 2.0 / CIS Controls v8. The remote MCP proxy lazy-spawns with a 304-tool catalog and tears itself down after 5 idle minutes.",
    tech: ["WireGuard", "netns", "MCP proxy", "NIST CSF"],
    size: "lg",
    featured: true,
  },
  {
    id: "better-email",
    name: "Email client, model-backed",
    tagline: "A Gmail client with the model as backend",
    hook: "Read-only is enforced server-side, not by prompt: a send attempt under its isolated OAuth profile returns 403. Also the origin of the lean-MCP lesson — headless model calls dropped from ~1.7 GB to 252 MB each once they stopped inheriting the full MCP fleet.",
    tech: ["Gmail API", "OAuth scopes", "headless Claude"],
    size: "md",
    featured: true,
  },
  {
    id: "logo-motion",
    name: "logo-motion",
    tagline: "Animated logo videos from any SVG",
    hook: "Brand-agnostic motion engine: 8 presets × 4 aspect formats, zero npm dependencies — Chromium driven over CDP, composited by ffmpeg. 11/11 functional and 12/12 security tests, including proof that a malicious SVG cannot execute.",
    tech: ["CDP", "ffmpeg", "SVG", "zero-dep"],
    size: "md",
    featured: true,
  },
  {
    id: "tartarus",
    name: "Tartarus guest portal",
    tagline: "Captive WiFi portal with a memory",
    hook: "Guests get approved from a phone push; SQLite remembers returning devices and auto-approves after 3 visits. Runs on the IoT VLAN it guards.",
    tech: ["Captive portal", "SQLite", "Pushover"],
    size: "sm",
    featured: true,
  },
  {
    id: "residential-unifi",
    name: "Residential network design",
    tagline: "Full network/camera/access design for a new-build",
    hook: "A 17-section, 27-page engineering master document — 57 structured cable runs specified — researched by a 16-investigation adversarially-verified workflow that caught and corrected 13 errors before handoff. (Client details anonymised.)",
    tech: ["UniFi", "PDF pipeline", "adversarial verification"],
    size: "md",
    featured: true,
  },
  {
    id: "onboarding-expert",
    name: "Air-gapped onboarding expert",
    tagline: "A local AI guide for a workplace device pilot",
    hook: "Standalone web app with a hybrid knowledge base: 17 modules, 203 cited steps, 96.6% of them verified against vendor documentation. Guidance-only by design — it never touches the systems it explains.",
    tech: ["Claude Code headless", "local KB", "tldraw"],
    size: "sm",
    featured: true,
  },
  {
    id: "slide-engine",
    name: "Slide compositor",
    tagline: "Branded deck generation as code",
    hook: "A compositor library (10 components, 8 layouts) with a design linter that audits 11 dimensions and auto-fixes its own output for up to 3 iterations before a human sees it.",
    tech: ["HTML decks", "design lint", "brand tokens"],
    size: "sm",
    featured: true,
  },
  {
    id: "this-site",
    name: "This website",
    tagline: "Built by the system it describes",
    hook: "Researched, written, designed, and verified by Hermes — including the multi-agent factual audit of its own architecture that produced every number on this page.",
    tech: ["Next 16", "Tailwind v4", "framer-motion"],
    size: "sm",
    featured: true,
  },
  {
    id: "watchers",
    name: "Ambient watchers",
    tagline: "Small autonomous timers with hard guardrails",
    hook: "Example: a race-week road-closure watcher that emails exactly three pre-frozen recipients, capped at two sends with a four-day cooldown, fail-closed — then disables itself after race day.",
    tech: ["systemd timers", "fail-closed design"],
    size: "sm",
    featured: false,
  },
];
