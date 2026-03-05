"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampProps {
  children: React.ReactNode;
  className?: string;
}

export function Lamp({ children, className }: LampProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg",
        className
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0.5, width: "30rem" } : { opacity: 0.5, width: "15rem" }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-to-r from-accent-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-bg [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-bg [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0.5, width: "30rem" } : { opacity: 0.5, width: "15rem" }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-to-l from-brand-500 via-transparent to-transparent [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-bg [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-bg [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 bg-bg blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <motion.div
          initial={prefersReducedMotion ? { width: "30rem" } : { width: "8rem" }}
          whileInView={prefersReducedMotion ? undefined : { width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-0.5 w-[30rem] -translate-y-[7rem] bg-gradient-to-r from-accent-400 via-brand-400 to-brand-300"
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-bg" />
      </div>
      <div className="relative z-50 flex -translate-y-40 flex-col items-center px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
