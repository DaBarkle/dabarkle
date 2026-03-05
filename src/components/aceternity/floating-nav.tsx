"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingNavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: FloatingNavItem[];
  className?: string;
  logo?: React.ReactNode;
}

export function FloatingNav({ navItems, className, logo }: FloatingNavProps) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setVisible(false);
        lastScrollY = currentScrollY;
        return;
      }
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.nav
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: -100, opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "fixed inset-x-0 top-4 z-[5000] mx-auto flex max-w-fit items-center justify-center gap-1 rounded-full border border-white/[0.06] px-2 py-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]",
            className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            background: "rgba(10, 10, 10, 0.8)",
          }}
        >
          {logo && <span className="mr-1 pl-1.5">{logo}</span>}
          {navItems.map((navItem) => (
            <a
              key={navItem.name}
              href={navItem.link}
              className={cn(
                "relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              {navItem.icon && <span>{navItem.icon}</span>}
              <span>{navItem.name}</span>
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
