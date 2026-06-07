import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

/**
 * SectionHeader — eyebrow + title + optional lede, with consistent rhythm and a
 * scroll reveal. `align` controls left vs centered layouts.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-h1 text-balance text-white", titleClassName)}>{title}</h2>
      {lede && (
        <p
          className={cn(
            "text-body-lg text-pretty text-text-secondary",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
