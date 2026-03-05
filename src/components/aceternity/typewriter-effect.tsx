"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterWord {
  text: string;
  className?: string;
}

interface TypewriterEffectProps {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
}

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: TypewriterEffectProps) {
  const prefersReducedMotion = useReducedMotion();

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  if (prefersReducedMotion) {
    return (
      <div className={cn("text-center text-base font-bold sm:text-xl md:text-3xl lg:text-5xl", className)}>
        {wordsArray.map((word, i) => (
          <span key={`word-${i}`} className="inline-block">
            {word.text.map((char, ci) => (
              <span key={`char-${ci}`} className={cn("text-white", word.className)}>
                {char}
              </span>
            ))}
            &nbsp;
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("text-center text-base font-bold sm:text-xl md:text-3xl lg:text-5xl", className)}>
      {wordsArray.map((word, wordIndex) => (
        <span className="inline-block" key={`word-${wordIndex}`}>
          {word.text.map((char, charIndex) => {
            const flatIndex =
              wordsArray
                .slice(0, wordIndex)
                .reduce((acc, w) => acc + w.text.length, 0) + charIndex;
            return (
              <motion.span
                key={`char-${charIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.08,
                  delay: flatIndex * 0.06,
                  ease: "easeInOut",
                }}
                className={cn("inline-block text-white", word.className)}
              >
                {char}
              </motion.span>
            );
          })}
          &nbsp;
        </span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-4 w-[4px] rounded-sm bg-brand-500 md:h-6 lg:h-10",
          cursorClassName
        )}
      />
    </div>
  );
}
