"use client";

import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden",
        className
      )}
    >
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={i % 2 === 0 ? "rgba(99,102,241,0.08)" : "rgba(251,191,36,0.05)"}
            strokeWidth="0.5"
            className="beam-path"
            style={{
              strokeDasharray: "8 16",
              animation: `beam-flow ${12 + i * 2}s linear infinite`,
              animationDelay: `${i * -1.5}s`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes beam-flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -48; }
        }
        @media (prefers-reduced-motion: reduce) {
          .beam-path { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
