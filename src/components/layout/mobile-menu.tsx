"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { GlowButton } from "@/components/ui/glow-button";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "explainer", label: "How it works" },
  { id: "life-of-a-prompt", label: "The loop" },
  { id: "numbers", label: "Numbers" },
  { id: "projects", label: "Projects" },
  { id: "engineer", label: "The engineer" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);
const EMAIL = "davidbarker774@gmail.com";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(useMemo(() => (isHome ? SECTION_IDS : []), [isHome]));

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (open && e.key === "Escape") setOpen(false);
    },
    [open],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id: string) {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 220);
  }

  return (
    <>
      {/* hamburger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="glass fixed right-4 top-4 z-[90] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl active:scale-95 md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className={cn("block h-0.5 w-5 rounded-full bg-white transition-all duration-300", open && "translate-y-[7px] rotate-45")} />
        <span className={cn("block h-0.5 w-5 rounded-full bg-white transition-all duration-300", open && "scale-0 opacity-0")} />
        <span className={cn("block h-0.5 w-5 rounded-full bg-white transition-all duration-300", open && "-translate-y-[7px] -rotate-45")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[85] flex flex-col items-center justify-center bg-canvas/90 backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-8"
            >
              <BrandMark size={44} color="#828fff" animated={false} />
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="mb-8 h-px w-16 bg-gradient-to-r from-transparent via-brand-400/50 to-transparent"
            />

            <nav>
              <ul className="flex flex-col items-center gap-5">
                {isHome ? (
                  SECTIONS.map(({ id, label }, i) => (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    >
                      <button
                        onClick={() => go(id)}
                        className={cn(
                          "text-2xl font-semibold transition-colors duration-200",
                          active === id ? "text-white" : "text-text-secondary hover:text-white",
                        )}
                      >
                        {label}
                      </button>
                    </motion.li>
                  ))
                ) : (
                  <motion.li initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="text-2xl font-semibold text-text-secondary transition-colors hover:text-white"
                    >
                      ← Home
                    </Link>
                  </motion.li>
                )}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-10 flex flex-col items-center gap-5"
            >
              <GlowButton href={`mailto:${EMAIL}`} external size="md" withArrow>
                Get in touch
              </GlowButton>
              <a
                href="https://github.com/DaBarkle"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default text-text-tertiary transition-colors hover:border-border-strong hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
