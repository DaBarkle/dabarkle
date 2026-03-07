import type { Transition, Variants } from "framer-motion";

export const springs = {
  snappy: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  smooth: { type: "spring", stiffness: 100, damping: 20 } as Transition,
};

export const durations = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.7,
};

export const easings = {
  entrance: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};
