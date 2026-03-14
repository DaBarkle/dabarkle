"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  /** Primary color stops for the aurora - provide 3-5 CSS colors */
  colors?: string[];
  /** Speed multiplier for aurora movement (0 = frozen, 1 = default) */
  speed?: number;
  /** Whether to show floating particles */
  particles?: boolean;
  /** Number of particles */
  particleCount?: number;
  /** Blur amount for aurora orbs in px */
  blur?: number;
  /** Overall intensity/opacity of the aurora */
  intensity?: number;
  /** Enable animated mesh gradient overlay for premium look */
  meshGradient?: boolean;
  className?: string;
  children?: React.ReactNode;
  containerClassName?: string;
}

export function AuroraBackground({
  colors = [
    "rgba(139, 92, 246, 0.35)",
    "rgba(99, 102, 241, 0.3)",
    "rgba(249, 115, 22, 0.2)",
    "rgba(167, 139, 250, 0.25)",
    "rgba(79, 70, 229, 0.2)",
  ],
  speed = 1,
  particles = true,
  particleCount = 40,
  blur = 80,
  intensity = 0.5,
  meshGradient = true,
  className,
  children,
  containerClassName,
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const reducedMotion = useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  // Particle canvas with connected-dots effect
  useEffect(() => {
    if (!particles || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();

    const pts = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3 * speed,
      vy: (Math.random() - 0.5) * 0.15 * speed - 0.08 * speed,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.35 + 0.08,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const connectionDist = 120;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      time += 1;

      // Draw connection lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.06;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const twinkle =
          Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.5 + 0.5;
        const alpha = p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
    };
  }, [particles, particleCount, speed, reducedMotion]);

  const orbDurations = [20, 25, 30, 22, 28];
  const orbDelays = [0, -5, -10, -3, -15];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full overflow-hidden bg-[#050505]",
        containerClassName
      )}
    >
      {/* Animated mesh gradient base layer */}
      {meshGradient && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: reducedMotion ? 0.3 : 0.2,
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, ${colors[0] || "rgba(139,92,246,0.2)"} 0%, transparent 70%),
              radial-gradient(ellipse 60% 80% at 80% 30%, ${colors[1] || "rgba(99,102,241,0.15)"} 0%, transparent 70%),
              radial-gradient(ellipse 70% 50% at 50% 80%, ${colors[2] || "rgba(249,115,22,0.1)"} 0%, transparent 70%)
            `,
          }}
          aria-hidden="true"
        />
      )}

      {/* Aurora orbs layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: intensity,
          filter: `blur(${blur}px)`,
        }}
        aria-hidden="true"
      >
        {colors.map((color, i) => {
          const dur = orbDurations[i % orbDurations.length] / speed;
          const delay = orbDelays[i % orbDelays.length];
          const size = 50 + (i % 3) * 15;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                top: `${20 + ((i * 10) % 30)}%`,
                left: `${10 + ((i * 15) % 50)}%`,
                background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
                animation: reducedMotion
                  ? "none"
                  : `aurora-orb-${i % 3} ${dur}s ease-in-out ${delay}s infinite`,
                transformOrigin: "center center",
                mixBlendMode: "screen",
              }}
            />
          );
        })}
      </div>

      {/* Subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* Radial vignette - tighter for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(5,5,5,0.5) 65%, rgba(5,5,5,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Particle canvas */}
      {particles && !reducedMotion && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
