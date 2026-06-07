"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/brand-mark";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const EMAIL = "davidbarker774@gmail.com";

export function Footer() {
  function scrollToTop() {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="relative bg-bg pt-20 pb-16">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 30%, rgba(251,191,36,0.3) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-24 w-[60%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand + tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <BrandMark size={32} color="#818cf8" animated={false} />
              <span className="text-lg font-semibold text-white">DaBarkle</span>
            </div>
            <p className="mt-3 text-center text-sm text-text-tertiary md:text-left">
              AI Harness Builder. I design ambient intelligence systems and operate them in production.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col items-center gap-2">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Navigate
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-tertiary transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Contact
            </span>
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
              className="group inline-flex items-center gap-2 rounded-full border border-border-default px-3.5 py-1.5 font-mono text-[12px] text-text-secondary transition-all duration-300 hover:border-brand-400/40 hover:text-white"
            >
              <svg
                className="h-3.5 w-3.5 text-text-tertiary transition-colors duration-300 group-hover:text-brand-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              {EMAIL}
            </motion.a>
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-10 flex justify-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="group flex items-center gap-2 rounded-full border border-border-default px-4 py-2 text-xs font-medium text-text-tertiary transition-all duration-300 hover:border-border-strong hover:text-white"
          >
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Back to top
          </motion.button>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-10 mb-8 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        <div className="text-center">
          <p className="font-mono text-sm text-text-tertiary">
            Built with Next.js + Tailwind + Framer Motion &middot; Designed and shipped with Claude Code
          </p>
          <p className="mt-2 text-xs text-text-muted">DaBarkle &middot; 2026</p>
        </div>
      </div>
    </footer>
  );
}
