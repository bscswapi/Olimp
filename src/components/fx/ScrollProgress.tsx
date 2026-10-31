"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Тонкая золотая нить прогресса прокрутки над шапкой */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-gradient-to-r from-aurum/40 via-ember to-aurum"
    />
  );
}
