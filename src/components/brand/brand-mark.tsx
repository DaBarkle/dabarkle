"use client";

import { useEffect, useState, useId } from "react";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  animated?: boolean;
  microMovement?: boolean;
  inline?: boolean;
  className?: string;
}

const pathData =
  "m 2069.71,865.938 c 0,62.324 -12.28,114.242 -37.57,158.722 -23.86,41.96 -52.58,71.34 -87.8,89.83 -15.37,8.05 -40.17,16.89 -78.12,23.05 -28.09,4.55 -63.18,7.67 -108.04,7.67 h -148.42 c -0.27,0 -0.47,0.02 -0.73,0.02 h -190.14 v 59.65 h 190.14 c 86.09,0 153.29,-10.64 200.52,-31.4 21.84,-1.31 42.32,-3.39 61.45,-6.49 36,-5.86 65.35,-14.63 87.18,-26.08 18.81,-9.87 35.78,-22.62 51.43,-37.87 -37.65,64.42 -85.92,112.44 -145.13,143.52 -60.75,31.86 -145.89,47.8 -255.45,47.8 h -279.62 v -149.13 h -149.15 v -0.02 -279.272 -279.29 h 149.15 89.48 186.67 3.47 c 105.44,0 159.43,16.719 186.15,30.727 35.24,18.484 63.96,47.859 87.83,89.828 25.27,44.477 37.57,96.406 37.57,158.719 v 0.016 0.015 c 0,54.531 -10.03,100.742 -29.32,141.337 -0.79,0.45 -1.53,1.09 -2.31,1.51 -0.35,0.17 -7.86,4.05 -26.2,8.1 -24.68,5.48 -56.62,8.35 -94.43,8.81 13.52,-10.53 25.5,-25.24 36.89,-45.265 17.42,-30.632 25.88,-68.093 25.88,-114.492 v -0.015 -0.016 c 0,-46.402 -8.46,-83.863 -25.88,-114.488 -15.33,-26.981 -31.73,-44.391 -51.57,-54.793 -9.18,-4.821 -46.71,-20.512 -144.61,-20.512 v 0.082 l -4.18,-0.082 h -185.96 -89.48 -59.66 v 189.809 189.792 0.02 h 29.82 v 89.46 h 29.84 v -85.83 -3.63 -189.812 -0.016 -129.676 -30.285 h 89.48 v 349.789 89.46 h 29.82 v -89.46 h 160.32 c 0.26,0 0.46,-0.02 0.73,-0.02 h 148.42 c 53.36,0 88.36,-4.68 111.01,-9.7 18.93,-4.18 29.42,-8.62 33.58,-10.81 19.86,-10.4 36.24,-27.81 51.59,-54.794 12.82,-22.571 20.72,-48.926 24.02,-79.766 1.18,-11.015 1.85,-22.519 1.85,-34.722 v -0.016 c 0,-0.039 0,-0.078 0,-0.137 -0.02,-12.144 -0.67,-23.594 -1.83,-34.555 -4.11,-57.859 -18.03,-108.664 -43.54,-153.519 -19.53,-34.352 -42.42,-61.531 -68.58,-83.336 -13.57,-11.32 -27.77,-21.641 -43.39,-29.824 -44.41,-23.313 -111,-35.852 -197.9,-37.254 l -18.95,-0.317 h -187.15 v 29.836 h -89.48 V 437.512 h 279.62 16.79 l 0.63,0.308 c 101.06,1.653 180.58,17.348 238.03,47.485 60.73,31.863 110.14,81.258 148.16,148.179 38.04,66.883 57.05,144.321 57.07,232.301 v 0 c 0,0.059 0,0.098 0,0.153";

export function BrandMark({
  size = 80,
  color = "currentColor",
  delay = 0,
  duration = 900,
  animated = true,
  microMovement = false,
  inline = false,
  className,
}: BrandMarkProps) {
  const id = useId();
  const [visible, setVisible] = useState(!animated);
  const [drawComplete, setDrawComplete] = useState(!animated);

  useEffect(() => {
    if (!animated) return;

    const timer = setTimeout(() => setVisible(true), delay);
    let completeTimer: ReturnType<typeof setTimeout>;

    if (microMovement) {
      completeTimer = setTimeout(
        () => setDrawComplete(true),
        delay + duration + 400
      );
    }

    return () => {
      clearTimeout(timer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [animated, delay, duration, microMovement]);

  const fillGroup = (
    <g transform="matrix(1.9211538,0,0,1.9211538,197.38145,190.14661)">
      <g paintOrder="stroke">
        <g transform="scale(0.23102163,-0.23102163)">
          <path
            style={{ fillRule: "nonzero" }}
            fill={color}
            paintOrder="stroke"
            transform="translate(-1624.985,-865.936)"
            d={pathData}
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
  );

  const strokeGroup = (
    <g transform="matrix(1.9211538,0,0,1.9211538,197.38145,190.14661)">
      <g>
        <g transform="scale(0.23102163,-0.23102163)">
          <path
            style={{ fillRule: "nonzero" }}
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
            transform="translate(-1624.985,-865.936)"
            d={pathData}
            pathLength={1000}
          />
        </g>
      </g>
    </g>
  );

  return (
    <svg
      width={size}
      height={inline ? undefined : size}
      viewBox="0 0 395 381"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={
        {
          "--brand-glow": color,
          contain: "layout style paint",
        } as React.CSSProperties
      }
      className={cn(
        "brand-mark",
        visible && "brand-visible",
        microMovement && drawComplete && "brand-breathing",
        inline && "brand-inline",
        className
      )}
      role="img"
      aria-label="DaBarkle logo"
    >
      <defs>
        <clipPath id={`${id}-clip-1`}>
          <polygon points="53,-1 400,-1 400,63 112,63 112,262 53,262" />
        </clipPath>
        <clipPath id={`${id}-clip-2`}>
          <polygon points="-1,63 53,63 53,264 -1,264" />
          <polygon points="112,118 328,118 330,130 335,150 340,170 342,190 340,210 336,230 330,250 323,272 112,272" />
          <polygon points="-1,262 323,262 310,300 265,316 -1,316" />
        </clipPath>
        <clipPath id={`${id}-clip-3`}>
          <polygon points="112,63 112,100 265,106 328,118 330,130 335,150 340,170 342,190 340,210 336,230 330,250 323,272 318,282 308,300 290,320 265,332 53,340 53,382 400,382 400,63" />
        </clipPath>
      </defs>

      {/* Assembly layer */}
      <g
        className="assembly-layer"
        style={{
          opacity: drawComplete ? 0 : undefined,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <g clipPath={`url(#${id}-clip-1)`}>
          <g
            className="line-reveal line-1"
            style={
              {
                "--reveal-delay": "0ms",
                "--reveal-duration": `${Math.round(duration * 0.4)}ms`,
              } as React.CSSProperties
            }
          >
            {fillGroup}
          </g>
        </g>
        <g clipPath={`url(#${id}-clip-2)`}>
          <g
            className="line-reveal line-2"
            style={
              {
                "--reveal-delay": `${Math.round(duration * 0.2)}ms`,
                "--reveal-duration": `${Math.round(duration * 0.45)}ms`,
              } as React.CSSProperties
            }
          >
            {fillGroup}
          </g>
        </g>
        <g clipPath={`url(#${id}-clip-3)`}>
          <g
            className="line-reveal line-3"
            style={
              {
                "--reveal-delay": `${Math.round(duration * 0.4)}ms`,
                "--reveal-duration": `${Math.round(duration * 0.6)}ms`,
              } as React.CSSProperties
            }
          >
            {fillGroup}
          </g>
        </g>
      </g>

      {/* Idle layer */}
      <g
        className="idle-layer"
        style={{
          opacity: drawComplete ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        {fillGroup}
        <g clipPath={`url(#${id}-clip-1)`} className="trace trace-1">
          {strokeGroup}
        </g>
        <g clipPath={`url(#${id}-clip-2)`} className="trace trace-2">
          {strokeGroup}
        </g>
        <g clipPath={`url(#${id}-clip-3)`} className="trace trace-3">
          {strokeGroup}
        </g>
      </g>

      <style>{`
        .brand-mark .line-reveal {
          opacity: 0;
          will-change: transform, opacity;
          transition:
            opacity var(--reveal-duration) cubic-bezier(0.22, 1, 0.36, 1),
            transform var(--reveal-duration) cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay);
        }
        .brand-mark .line-1 { transform: translateY(-12px); }
        .brand-mark .line-2 { transform: translateX(-16px); }
        .brand-mark .line-3 { transform: translateX(16px); }
        .brand-visible .line-reveal {
          opacity: 1;
          transform: translate(0, 0);
        }
        .brand-inline {
          display: inline-block;
          vertical-align: baseline;
        }
        .trace path {
          stroke-dasharray: 100 900;
          stroke-dashoffset: 1000;
          opacity: 0;
          filter: drop-shadow(0 0 4px var(--brand-glow, white)) drop-shadow(0 0 8px var(--brand-glow, white));
        }
        .brand-breathing .trace-1 path {
          animation: trace-flow 3.5s ease-in-out infinite, trace-breathe 3s ease-in-out infinite alternate;
        }
        .brand-breathing .trace-2 path {
          animation: trace-flow 4.5s ease-in-out 1.2s infinite, trace-breathe 3s ease-in-out 1s infinite alternate;
        }
        .brand-breathing .trace-3 path {
          animation: trace-flow 5.5s ease-in-out 2.5s infinite, trace-breathe 3s ease-in-out 2s infinite alternate;
        }
        @keyframes trace-flow {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes trace-breathe {
          from { opacity: 0.5; }
          to { opacity: 0.8; }
        }
        .brand-breathing .idle-layer {
          animation: logo-float 7s ease-in-out infinite;
        }
        @keyframes logo-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-mark .line-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .brand-breathing .idle-layer,
          .brand-breathing .trace-1 path,
          .brand-breathing .trace-2 path,
          .brand-breathing .trace-3 path {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
