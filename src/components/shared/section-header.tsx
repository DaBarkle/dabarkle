"use client";

import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  overline,
  title,
  subtitle,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={cn(centered && "text-center", className)}>
      {overline && (
        <p className="mb-3 text-overline font-mono text-accent-400">
          {overline}
        </p>
      )}
      <h2 className="text-h1 mb-4 text-white">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-lg text-text-secondary",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
