"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Кинокадр: картинка раскрывается из окна до краёв экрана по мере прокрутки
 * и одновременно плавно «отъезжает» назад.
 */
export function CinematicReveal({
  src,
  position = "center",
  children,
}: {
  src: StaticImageData;
  position?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(12% 14% 12% 14%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={reduce ? undefined : { clipPath }}
        className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]"
      >
        <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
          <Image
            src={src}
            alt=""
            placeholder="blur"
            quality={90}
            sizes="100vw"
            className="h-full w-full object-cover"
            style={{ objectPosition: position }}
          />
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-nyx/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-nyx via-nyx/50 to-transparent" />
        {children}
      </motion.div>
    </div>
  );
}
