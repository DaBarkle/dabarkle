"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Created once at module scope — never inside render.
const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5 rounded-lg",
  md: "h-11 px-6 text-sm gap-2 rounded-xl",
  lg: "h-12 px-7 text-[15px] gap-2 rounded-xl",
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-white font-semibold shadow-[0_8px_30px_-8px_rgba(94,105,210,0.6)] hover:bg-primary-hover hover:shadow-[0_10px_40px_-6px_rgba(130,143,255,0.7)]",
  secondary:
    "glass text-white font-medium hover:border-border-strong hover:bg-white/[0.05]",
  ghost:
    "text-text-secondary font-medium hover:text-white hover:bg-white/[0.04]",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
};

type AsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type AsLink = CommonProps & { href: string; external?: boolean };

/**
 * GlowButton — premium CTA. Primary = lavender fill + soft glow; secondary =
 * glass; ghost = text. Tactile hover lift + press, optional arrow that nudges on
 * hover. Renders as <button>, Next <Link>, or external <a>. Reduced-motion safe.
 */
export function GlowButton(props: AsButton | AsLink) {
  const reduced = useReducedMotion();
  const {
    children,
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
  } = props;

  const base = cn(
    "group/btn relative inline-flex select-none items-center justify-center whitespace-nowrap",
    "outline-none transition-colors duration-200 ease-[var(--ease-micro)]",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    SIZES[size],
    VARIANTS[variant],
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );

  const hoverProps = reduced
    ? {}
    : { whileHover: { y: -2 }, whileTap: { y: 0, scale: 0.98 }, transition: springs.press };

  if ("href" in props && props.href !== undefined) {
    const external = "external" in props && props.external;
    if (external) {
      return (
        <motion.a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          {...hoverProps}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <MotionLink href={props.href} className={base} {...hoverProps}>
        {inner}
      </MotionLink>
    );
  }

  // strip non-DOM props so only valid button attributes reach the element
  const {
    children: _c,
    variant: _v,
    size: _s,
    withArrow: _w,
    className: _cn,
    type = "button",
    ...rest
  } = props as AsButton;
  void _c; void _v; void _s; void _w; void _cn;
  return (
    <motion.button
      type={type}
      className={base}
      {...hoverProps}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {inner}
    </motion.button>
  );
}
