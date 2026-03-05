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
  const { progress, isScrolled } = useScrollProgress();
  const activeSection = useActiveSection(
    useMemo(() => (isHomePage ? sectionIds : []), [isHomePage])
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[70] h-[2px] w-full"
      >
        <div
          className="relative h-full bg-gradient-to-r from-accent-500 via-brand-500 to-accent-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-8 rounded-full bg-white/40 blur-sm" />
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
                <BrandMark size={24} animated={false} color="#f97316" />
              </li>
              {isHomePage ? (
                sections.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={cn(
                        "block rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                        activeSection === id
                          ? "bg-white/[0.06] text-white"
                          : "text-text-secondary hover:bg-white/[0.03] hover:text-white"
                      )}
                    >
                      {label}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <a
                    href="/"
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-text-secondary transition-all duration-200 hover:bg-white/[0.03] hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Home
                  </a>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
