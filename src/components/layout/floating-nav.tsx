"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/brand/brand-mark";
import { GlowButton } from "@/components/ui/glow-button";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);
const EMAIL = "davidbarker774@gmail.com";

export function FloatingNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProject = pathname.startsWith("/projects/");
  const { progress, isScrolled } = useScrollProgress();
  const reduced = useReducedMotion();
  const active = useActiveSection(useMemo(() => (isHome ? SECTION_IDS : []), [isHome]));

  const projectName = isProject
    ? pathname
        .split("/")
        .pop()
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : null;

  return (
    <>
      {/* scroll progress */}
      <div aria-hidden="true" className="fixed left-0 top-0 z-[80] h-0.5 w-full">
        <div
          className="h-full origin-left transition-[width] duration-150 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #5e6ad2, #828fff 60%, #a7afec)",
            boxShadow: progress > 1 ? "0 0 12px rgba(94,105,210,0.6)" : "none",
          }}
        />
      </div>

      {/* desktop floating pill */}
      <motion.nav
        aria-label="Primary"
        initial={reduced ? { opacity: 1 } : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-1/2 top-4 z-[70] hidden -translate-x-1/2 items-center gap-1 rounded-full p-1.5 pl-2 md:flex",
          "transition-[background,border-color,box-shadow,backdrop-filter] duration-500",
          isScrolled
            ? "glass-strong border-hairline-strong"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          aria-label="DaBarkle — home"
          className="flex items-center rounded-full px-2 py-1 transition-opacity hover:opacity-80"
        >
          <BrandMark size={22} animated={false} color="#828fff" />
        </Link>

        <span aria-hidden className="mx-0.5 h-4 w-px bg-hairline" />

        <ul className="flex items-center gap-0.5">
          {isHome ? (
            SECTIONS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative">
                  <a
                    href={`#${id}`}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200",
                      isActive ? "text-white" : "text-text-secondary hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-primary-soft ring-1 ring-inset ring-[rgba(94,105,210,0.35)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              );
            })
          ) : (
            <>
              <li>
                <Link
                  href="/#work"
                  className="rounded-full px-3 py-1.5 text-[13px] font-medium text-text-secondary transition-colors hover:text-white"
                >
                  Work
                </Link>
              </li>
              {isProject && projectName && (
                <>
                  <li aria-hidden className="text-text-muted">
                    ›
                  </li>
                  <li>
                    <span className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white">
                      {projectName}
                    </span>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        <span aria-hidden className="mx-0.5 h-4 w-px bg-hairline" />

        <GlowButton href={isHome ? "#contact" : `mailto:${EMAIL}`} size="sm" variant="primary" className="ml-0.5">
          Get in touch
        </GlowButton>
      </motion.nav>
    </>
  );
}
