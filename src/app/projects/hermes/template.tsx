"use client";

import { useState, useLayoutEffect } from "react";

/**
 * Prevents scroll-based animations from firing during navigation scroll-to-top.
 *
 * When navigating from the homepage (scrolled partway down) to the Hermes page,
 * the browser scrolls to top, which causes IntersectionObserver-based animations
 * (whileInView, useInView with once:true) to fire prematurely as sections pass
 * through the viewport during the scroll.
 *
 * Fix: Don't mount children until after we've scrolled to top and the browser
 * has had a frame to settle. This ensures no observers exist during the scroll.
 */
export default function HermesTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // Wait one frame for the scroll to fully settle before mounting children
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReady(true);
      });
    });
  }, []);

  if (!ready) {
    // Render nothing — no observers to trigger during scroll-to-top
    return null;
  }

  return <>{children}</>;
}
