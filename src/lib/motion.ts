import type { Transition, Variants } from "framer-motion";

/* ============================================================================
   MOTION SYSTEM
   Premium, restrained motion. Animate opacity + transform only. Every
   consumer should gate looping/large motion on prefers-reduced-motion.
   ========================================================================== */

export const springs = {
  snappy: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  smooth: { type: "spring", stiffness: 120, damping: 22 } as Transition,
  bouncy: { type: "spring", stiffness: 300, damping: 18 } as Transition,
  gentle: { type: "spring", stiffness: 60, damping: 16 } as Transition,
  // tactile press for magnetic / button interactions
  press: { type: "spring", stiffness: 500, damping: 28, mass: 0.6 } as Transition,
};

export const durations = {
  micro: 0.16,
  fast: 0.22,
  base: 0.32,
  medium: 0.5,
  slow: 0.7,
  cinematic: 1.2,
};

export const easings = {
  // premium cubic-beziers (match CSS vars in globals.css)
  entrance: [0.22, 1, 0.36, 1] as [number, number, number, number],
  smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  micro: [0.3, 0, 0.2, 1] as [number, number, number, number],
};

/** Shared viewport config for scroll-reveals — reveal once, with a little lead-in. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

/* ---- Reveal variants ---------------------------------------------------- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};
export const slideReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};
/** Soft blur-in — premium, used for hero sub-elements. */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/* ---- Stagger containers ------------------------------------------------- */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

/* ---- Default transitions ------------------------------------------------ */
export const tEntrance: Transition = { duration: durations.slow, ease: easings.entrance };
export const tBase: Transition = { duration: durations.base, ease: easings.smooth };
export const tFast: Transition = { duration: durations.fast, ease: easings.micro };

/** Direction-aware variants factory (for tabs / carousels). */
export const directional = (dir: 1 | -1): Variants => ({
  hidden: { opacity: 0, x: 24 * dir },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 * dir },
});

/* ---- Uplift additions (2026-06-12) — append-only ------------------------ */

/**
 * maskRise — word-level masked rise for SplitHeading. Each word lives inside
 * an `overflow-hidden` wrapper and travels y 110% → 0, so the text appears to
 * rise out of an invisible mask. Apply to the inner (word) span; put
 * `maskRiseContainer` on the parent for the word stagger.
 */
export const maskRise: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: durations.slow, ease: easings.entrance } },
};

/** Container counterpart for maskRise — staggers words at 45ms. */
export const maskRiseContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

/**
 * tickerSpring — overdamped spring for StatTicker count-ups. Damping ratio
 * ≈ 1.7 (no overshoot — a stat must never display a value above its truth),
 * settles in ~1.2s. Shape matches framer-motion's SpringOptions for
 * `useSpring`.
 */
export const tickerSpring = { stiffness: 80, damping: 30, mass: 1 } as const;
