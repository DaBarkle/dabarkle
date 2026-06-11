"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/**
 * Anchor targets on /projects/hermes. The ids are owned by the section
 * components (assembly wires them); this nav only points at them.
 */
const SECTIONS = [
  { id: "substrate", label: "substrate" },
  { id: "memory", label: "memory" },
  { id: "security", label: "security" },
  { id: "capabilities", label: "capabilities" },
  { id: "fleet", label: "fleet" },
  { id: "self-improvement", label: "self-improvement" },
  { id: "infrastructure", label: "infrastructure" },
  { id: "attribution", label: "attribution" },
];

// Module-level so the array identity is stable across renders
// (useActiveSection keeps it in its effect deps).
const SECTION_IDS = SECTIONS.map((s) => s.id);

/**
 * DeepNav — sticky in-page section rail for the deep dive. Sits at top-20 so
 * it clears both the desktop floating pill and the mobile menu button.
 * Server-rendered as plain anchor links (works without JS — active tracking
 * and the layoutId underline are progressive enhancements); near-opaque
 * background fake instead of another backdrop-blur pane. Horizontal scroll
 * on mobile with edge fades; reduced motion gets a static underline.
 */
export function DeepNav() {
  const active = useActiveSection(SECTION_IDS);
  const reduced = useReducedMotion();

  return (
    <nav
      aria-label="On this page"
      className="sticky top-20 z-40 border-y border-hairline bg-[rgba(8,8,12,0.88)]"
    >
      <div className="relative mx-auto max-w-6xl">
        <ul className="flex items-center overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block whitespace-nowrap px-3 py-3 font-mono text-[12px] tracking-wide transition-colors duration-200",
                    isActive ? "text-white" : "text-ink-subtle hover:text-ink-muted",
                  )}
                >
                  {label}
                  {/* hairline underline — rides the nav's bottom border */}
                  {isActive &&
                    (reduced ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 h-px bg-brand-400"
                      />
                    ) : (
                      <motion.span
                        aria-hidden="true"
                        layoutId="deep-nav-underline"
                        className="absolute inset-x-3 bottom-0 h-px bg-brand-400 shadow-[0_0_8px_rgba(130,143,255,0.55)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ))}
                </a>
              </li>
            );
          })}
        </ul>

        {/* edge fades — only meaningful where the rail can overflow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[rgba(8,8,12,0.95)] to-transparent md:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[rgba(8,8,12,0.95)] to-transparent md:hidden"
        />
      </div>
    </nav>
  );
}
