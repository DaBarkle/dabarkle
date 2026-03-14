"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/brand-mark";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
    size: "h-5 w-5",
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    size: "h-4 w-4",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    size: "h-4 w-4",
  },
];

export function Footer() {
  function scrollToTop() {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="relative bg-bg pt-20 pb-16">
      {/* Gradient separator line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 30%, rgba(251,191,36,0.3) 70%, transparent 100%)",
        }}
      />
      {/* Subtle glow underneath separator */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-24 w-[60%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* 3-column layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand + tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <BrandMark size={32} color="#818cf8" animated={false} />
              <span className="text-lg font-semibold text-white">DaBarkle</span>
            </div>
            <p className="mt-3 text-sm text-text-tertiary md:text-left text-center">
              Building intelligent systems that evolve themselves.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col items-center gap-2">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">Navigate</span>
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

          {/* Social links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">Connect</span>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default text-text-tertiary transition-all duration-300 hover:border-brand-400/40 hover:text-white hover:shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                  aria-label={link.label}
                >
                  <svg className={link.size} fill="currentColor" viewBox="0 0 24 24">
                    <path d={link.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
            Back to top
          </motion.button>
        </div>

        {/* Decorative divider */}
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
            Built with Next.js + Tailwind CSS + Framer Motion
          </p>
          <p className="mt-2 text-xs text-text-muted">
            DaBarkle
          </p>
        </div>
      </div>
    </footer>
  );
}
