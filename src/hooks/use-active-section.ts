"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      const offsets = sectionIds.map((id) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top : Infinity };
      });

      if (offsets.length === 0) return;
      const current = offsets.reduce((closest, section) =>
        Math.abs(section.top) < Math.abs(closest.top) ? section : closest
      );
      setActiveSection(current.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return activeSection;
}
