"use client";

import Link from "next/link";
import { Github, Mail, ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Reveal } from "@/components/ui/reveal";

const EMAIL = "davidbarker774@gmail.com";

const nav = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach" },
  { label: "Contact", href: "/#contact" },
];

const projects = [
  { label: "Hermes", href: "/projects/hermes" },
  { label: "Hermes Pane", href: "/projects/hermes#generative-ui" },
  { label: "Fabric Design", href: "/projects/hermes#multi-domain-reach" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline pb-12 pt-20">
      {/* layered glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(94,105,210,0.4) 30%, rgba(130,143,255,0.4) 70%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(94,105,210,0.10), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          {/* brand */}
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <BrandMark size={30} color="#828fff" animated={false} />
              <span className="text-lg font-semibold text-white">DaBarkle</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-tertiary">
              I build the scaffolding around AI — memory, routing, guardrails, interfaces.
              Not just a user of AI; an operator of it.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default text-text-tertiary transition-colors hover:border-border-strong hover:text-white"
                aria-label="Email David"
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://github.com/DaBarkle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default text-text-tertiary transition-colors hover:border-border-strong hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-overline font-mono text-text-tertiary">Navigate</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {nav.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-overline font-mono text-text-tertiary">Work</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {projects.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 sm:flex-row">
          <p className="font-mono text-xs text-text-muted">
            © {2026} David Barker · Built with Claude Code
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 font-mono text-xs text-text-tertiary transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </Reveal>
      </div>
    </footer>
  );
}
