import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * Section — consistent case-study section shell: scroll-margin, vertical rhythm,
 * centered max-width container, and an optional SectionHeader. Keeps every
 * section on the same grid so the page reads as one designed document.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  align = "left",
  children,
  className,
  innerClassName,
  max = "6xl",
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  max?: "4xl" | "5xl" | "6xl";
}) {
  const maxCls = { "4xl": "max-w-4xl", "5xl": "max-w-5xl", "6xl": "max-w-6xl" }[max];
  return (
    <section id={id} className={cn("relative scroll-mt-24 px-6 py-24 sm:py-28", className)}>
      <div className={cn("mx-auto", maxCls, innerClassName)}>
        {(eyebrow || title) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            lede={lede}
            align={align}
            className={cn("mb-12 sm:mb-14", align === "center" && "mx-auto items-center")}
          />
        )}
        {children}
      </div>
    </section>
  );
}
