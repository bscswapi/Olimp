"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Инерционный скролл, как на сайтах с Awwwards.
 * Останавливается сам, когда у <html> стоит overflow: hidden (меню, интро).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      autoRaf: true,
      autoToggle: true,
      anchors: { offset: -72 },
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
