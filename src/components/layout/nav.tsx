"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/brand/brand-mark";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const sectionIds = sections.map((s) => s.id);

export function Nav() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProjectPage = pathname.startsWith("/projects/");
  const { progress, isScrolled } = useScrollProgress();
  const activeSection = useActiveSection(
    useMemo(() => (isHomePage ? sectionIds : []), [isHomePage])
  );
  const prefersReducedMotion = useReducedMotion();

  // Extract project name for breadcrumb
  const projectName = isProjectPage
    ? pathname.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : null;

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[70] h-[2px] w-full"
      >
        <div
          className="relative h-full transition-[width] duration-150 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, var(--color-brand-500), var(--color-brand-400) 40%, var(--color-accent-400) 80%, var(--color-teal-400))",
          }}
        >
          {/* Leading glow */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-12 rounded-full blur-md"
            style={{
              background:
                progress > 5
                  ? "rgba(99, 102, 241, 0.5)"
                  : "transparent",
            }}
          />
          {/* Trailing soft glow line */}
          <div
            className="absolute inset-0 h-full"
            style={{
              boxShadow:
                progress > 2
                  ? "0 0 8px rgba(99,102,241,0.3), 0 0 2px rgba(251,191,36,0.2)"
                  : "none",
            }}
          />
        </div>
      </div>

      {/* Desktop nav - floating pill */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { y: -20, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: -20, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 z-[5000] hidden -translate-x-1/2 rounded-full border border-white/[0.06] px-2 py-1.5 md:block"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(16px) saturate(180%)",
              background: "rgba(10, 10, 10, 0.8)",
            }}
          >
            <ul className="flex items-center gap-1">
              <li className="mr-1 flex items-center pl-1.5">
                <a href="/">
                  <BrandMark size={24} animated={false} color="#818cf8" />
                </a>
              </li>
              {isHomePage ? (
                sections.map(({ id, label }) => (
                  <li key={id} className="relative">
                    <a
                      href={`#${id}`}
                      className={cn(
                        "relative block rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                        activeSection === id
                          ? "text-white"
                          : "text-text-secondary hover:bg-white/[0.03] hover:text-white"
                      )}
                    >
                      {activeSection === id && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "rgba(99, 102, 241, 0.12)",
                            boxShadow: "0 1px 0 rgba(99, 102, 241, 0.3), inset 0 0 0 1px rgba(99, 102, 241, 0.08)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a
                      href="/"
                      className="rounded-full px-2.5 py-1.5 text-xs font-medium text-text-tertiary transition-all duration-200 hover:text-white"
                    >
                      D
                    </a>
                  </li>
                  {isProjectPage && (
                    <>
                      <li className="text-text-muted text-[10px]">&rsaquo;</li>
                      <li>
                        <a
                          href="/#projects"
                          className="rounded-full px-2.5 py-1.5 text-xs font-medium text-text-tertiary transition-all duration-200 hover:text-white"
                        >
                          Projects
                        </a>
                      </li>
                      <li className="text-text-muted text-[10px]">&rsaquo;</li>
                      <li>
                        <span className="rounded-full px-2.5 py-1.5 text-xs font-medium text-white">
                          {projectName}
                        </span>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
            {/* Bottom border glow */}
            <div
              className="absolute -bottom-px left-4 right-4 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(251,191,36,0.2), transparent)",
              }}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
