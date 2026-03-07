"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrandMark } from "@/components/brand/brand-mark";
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

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const activeSection = useActiveSection(
    useMemo(() => (isHomePage ? sectionIds : []), [isHomePage])
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function navigate(id: string) {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg bg-surface-1/80 backdrop-blur-xl border border-border-default md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span
          className={cn(
            "block h-0.5 w-5 rounded-full bg-white transition-all duration-300 origin-center",
            open && "translate-y-[4px] rotate-45"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-5 rounded-full bg-white transition-all duration-300",
            open && "opacity-0 scale-0"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-5 rounded-full bg-white transition-all duration-300 origin-center",
            open && "-translate-y-[4px] -rotate-45"
          )}
        />
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-lg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-10"
            >
              <BrandMark size={48} color="#f97316" animated={false} />
            </motion.div>

            {/* Decorative accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="mb-8 h-px w-16 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
            />

            <nav>
              <ul className="flex flex-col items-center gap-5">
                {isHomePage ? (
                  sections.map(({ id, label }, i) => (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                    >
                      <button
                        onClick={() => navigate(id)}
                        className={cn(
                          "relative text-2xl font-semibold transition-colors duration-200",
                          activeSection === id
                            ? "text-white"
                            : "text-text-secondary hover:text-white"
                        )}
                      >
                        {activeSection === id && (
                          <motion.span
                            layoutId="mobile-nav-active"
                            className="absolute -left-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-500"
                            style={{ boxShadow: "0 0 8px rgba(249,115,22,0.5)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                        {label}
                      </button>
                    </motion.li>
                  ))
                ) : (
                  <motion.li
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <a
                      href="/"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-2xl font-semibold text-text-secondary transition-colors duration-200 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                  </motion.li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
