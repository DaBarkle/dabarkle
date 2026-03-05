"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
  containerClassName?: string;
}

export function BackgroundGradientAnimation({
  gradientBackgroundStart = "rgb(5, 5, 5)",
  gradientBackgroundEnd = "rgb(10, 10, 10)",
  firstColor = "139, 92, 246",
  secondColor = "249, 115, 22",
  thirdColor = "167, 139, 250",
  fourthColor = "251, 191, 36",
  fifthColor = "52, 211, 153",
  pointerColor = "139, 92, 246",
  size = "80%",
  blendingValue = "hard-light",
  interactive = true,
  className,
  children,
  containerClassName,
}: BackgroundGradientAnimationProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart, gradientBackgroundEnd,
    firstColor, secondColor, thirdColor, fourthColor, fifthColor,
    pointerColor, size, blendingValue,
  ]);

  useEffect(() => {
    let animationFrame: number;
    function move() {
      if (!interactiveRef.current) {
        animationFrame = requestAnimationFrame(move);
        return;
      }
      setCurX((prev) => prev + (tgX - prev) / 20);
      setCurY((prev) => prev + (tgY - prev) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      animationFrame = requestAnimationFrame(move);
    }
    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.parentElement?.getBoundingClientRect();
      if (rect) {
        setTgX(event.clientX - rect.left);
        setTgY(event.clientY - rect.top);
      }
    }
  };

  return (
    <div
      className={cn(
        "relative h-screen w-full overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className="gradients-container absolute inset-0 overflow-hidden opacity-70"
        style={{
          filter: "url(#blurMe) blur(40px)",
        }}
      >
        <div
          className="absolute animate-first opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--first-color), 0.8) 0, rgba(var(--first-color), 0) 50%) no-repeat`,
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            mixBlendMode: "var(--blending-value)" as React.CSSProperties["mixBlendMode"],
            transformOrigin: "center center",
          }}
        />
        <div
          className="absolute animate-second opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--second-color), 0.8) 0, rgba(var(--second-color), 0) 50%) no-repeat`,
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            mixBlendMode: "var(--blending-value)" as React.CSSProperties["mixBlendMode"],
            transformOrigin: "calc(50% - 400px)",
          }}
        />
        <div
          className="absolute animate-third opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--third-color), 0.8) 0, rgba(var(--third-color), 0) 50%) no-repeat`,
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2 + 200px)",
            left: "calc(50% - var(--size) / 2 - 500px)",
            mixBlendMode: "var(--blending-value)" as React.CSSProperties["mixBlendMode"],
            transformOrigin: "calc(50% + 400px)",
          }}
        />
        <div
          className="absolute animate-fourth opacity-70"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--fourth-color), 0.8) 0, rgba(var(--fourth-color), 0) 50%) no-repeat`,
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            mixBlendMode: "var(--blending-value)" as React.CSSProperties["mixBlendMode"],
            transformOrigin: "calc(50% - 200px)",
          }}
        />
        <div
          className="absolute animate-fifth opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--fifth-color), 0.8) 0, rgba(var(--fifth-color), 0) 50%) no-repeat`,
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            mixBlendMode: "var(--blending-value)" as React.CSSProperties["mixBlendMode"],
            transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
          }}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            className="absolute -top-1/2 -left-1/2 opacity-70"
            style={{
              background: `radial-gradient(circle at center, rgba(var(--pointer-color), 0.8) 0, rgba(var(--pointer-color), 0) 50%) no-repeat`,
              width: "100%",
              height: "100%",
              mixBlendMode: "var(--blending-value)" as React.CSSProperties["mixBlendMode"],
            }}
          />
        )}
      </div>
    </div>
  );
}
