import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The custom type-scale classes in globals.css share the `text-` prefix with
 * Tailwind's color utilities. Without registration, tailwind-merge classifies
 * unknown `text-*` tokens as colors and silently drops e.g. `text-h1` when a
 * real color like `text-white` appears in the same cn() call. Registering them
 * in the font-size group makes them conflict with each other (correct) and
 * never with colors.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display",
        "text-display-sm",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-body-lg",
        "text-overline",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
