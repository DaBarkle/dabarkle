/* ============================================================================
   DESIGN TOKENS (TS mirror)
   Single source for values used in inline styles / SVG / canvas where Tailwind
   utilities can't reach. Keep in sync with globals.css.
   ========================================================================== */

export const color = {
  canvas: "#060608",
  bgElevated: "#0b0b10",
  surface0: "#0a0a0e",
  surface1: "#101016",
  surface2: "#16161e",
  surface3: "#1e1e28",

  primary: "#5e6ad2",
  primaryHover: "#828fff",
  primaryDeep: "#4f59c0",

  ink: "rgba(247,248,251,0.96)",
  inkMuted: "rgba(228,230,240,0.68)",
  inkSubtle: "rgba(210,214,230,0.45)",
  inkFaint: "rgba(210,214,230,0.26)",

  hairline: "rgba(255,255,255,0.08)",
  hairlineStrong: "rgba(255,255,255,0.14)",

  success: "#3dbf9f",
  warning: "#d8ab57",
  error: "#e5687a",
} as const;

/**
 * Functional palette — for multi-series diagrams / legends ONLY. A cohesive,
 * desaturated family centred on lavender so technical graphics never devolve
 * into a rainbow. Marketing surfaces use `color.primary` + ink only.
 */
export const functional = {
  lavender: "#828fff",
  iris: "#5e6ad2",
  periwinkle: "#a7afec",
  teal: "#3dbf9f",
  gold: "#d8ab57",
  rose: "#e5687a",
  steel: "#6f7bb5",
} as const;

/**
 * Maps the legacy saturated hex values still embedded in data/hermes.ts to the
 * new cohesive functional palette. Use `harmonize(oldHex)` when rendering data
 * colours so diagrams adopt the new system without rewriting the content file.
 */
const HARMONIZE: Record<string, string> = {
  "#818cf8": functional.lavender,
  "#a5b4fc": functional.periwinkle,
  "#6366f1": functional.iris,
  "#4f46e5": functional.iris,
  "#fbbf24": functional.gold,
  "#fcd34d": functional.gold,
  "#f59e0b": functional.gold,
  "#fb923c": functional.gold,
  "#14b8a6": functional.teal,
  "#2dd4bf": functional.teal,
  "#5eead4": functional.teal,
  "#34d399": functional.teal,
  "#ef4444": functional.rose,
};

export function harmonize(hex: string): string {
  return HARMONIZE[hex?.toLowerCase?.()] ?? HARMONIZE[hex] ?? hex;
}

/** Convert a hex to an rgba() string at the given alpha. */
export function alpha(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const durationsMs = {
  micro: 160,
  fast: 220,
  base: 320,
  slow: 600,
} as const;
