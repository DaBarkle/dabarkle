"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { bentoTiles } from "@/data/hermes";
import { cn } from "@/lib/utils";

function Tile({
  tile,
  index,
  className,
}: {
  tile: (typeof bentoTiles)[number];
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-1 p-6 transition-colors duration-300 hover:border-white/[0.14]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 80% 0%, ${tile.color}1c, transparent 60%)`,
        }}
      />
      <div className="relative">
        <div
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${tile.color}1a`,
            color: tile.color,
            boxShadow: `inset 0 0 0 1px ${tile.color}30`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d={tile.iconPath} />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{tile.title}</h3>
        <p className="text-sm leading-relaxed text-text-secondary">{tile.recruiterLine}</p>
      </div>
      <div className="relative mt-5 border-t border-white/[0.04] pt-4">
        <p className="font-mono text-[11px] leading-relaxed text-text-muted">{tile.technicalLine}</p>
      </div>
    </motion.div>
  );
}

export function WhatItDoesBento() {
  return (
    <section className="relative bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            overline="What it does"
            title="One system, every domain"
            subtitle="The system pillars — what an operator actually gets from running Hermes day to day. Recruiter top line · technical detail below."
            centered
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-fr">
          <Tile tile={bentoTiles[0]} index={0} className="md:col-span-2" />
          <Tile tile={bentoTiles[1]} index={1} />
          <Tile tile={bentoTiles[2]} index={2} />
          <Tile tile={bentoTiles[3]} index={3} />
          <Tile tile={bentoTiles[4]} index={4} />
          <Tile tile={bentoTiles[5]} index={5} className="md:col-span-2" />
        </div>
      </div>
    </section>
  );
}
