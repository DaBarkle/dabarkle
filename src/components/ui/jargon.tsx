"use client";

import { Popover } from "@base-ui/react/popover";
import { glossary } from "@/data/narrative";
import { cn } from "@/lib/utils";

/**
 * JargonChip — inline term with a dotted lavender underline that opens a
 * plain-English definition (from `narrative.ts → glossary`) on hover, focus,
 * or click. Built on @base-ui/react Popover: native-button trigger (keyboard
 * accessible by default), Escape closes, focus returns to the trigger.
 * If the term has no glossary entry, children render unmodified.
 */
export function JargonChip({
  term,
  children,
  className,
}: {
  term: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const definition = glossary[term];
  if (!definition) return <>{children ?? term}</>;

  return (
    <Popover.Root>
      <Popover.Trigger
        openOnHover
        delay={120}
        closeDelay={80}
        className={cn(
          // Reset the native button into inline prose flow.
          "inline cursor-help appearance-none border-0 bg-transparent p-0 text-left align-baseline text-inherit [font:inherit]",
          "underline decoration-brand-400/50 decoration-dotted underline-offset-[3px]",
          "transition-colors duration-150 hover:text-ink hover:decoration-brand-400 focus-visible:decoration-brand-400",
          className,
        )}
      >
        {children ?? term}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" align="center" sideOffset={10} collisionPadding={16} className="z-50">
          <Popover.Popup
            className={cn(
              "glass-strong max-w-xs rounded-xl px-4 py-3",
              "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-[var(--ease-micro)]",
              "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0",
            )}
          >
            <Popover.Title className="font-mono text-[11px] tracking-[0.14em] text-brand-300 uppercase">
              {term}
            </Popover.Title>
            <Popover.Description className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              {definition}
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
