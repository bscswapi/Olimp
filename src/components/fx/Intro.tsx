"use client";

import { useEffect, useState } from "react";
import { STAR } from "../brand-paths";

const KEY = "olimp-intro-seen";
const MIN_MS = 1700;
const MAX_MS = 3200;

/**
 * Заставка при первом визите: звезда вспыхивает, нить заполняется,
 * затем занавес поднимается и на первом экране начинается рассвет.
 * Класс `is-intro` ставит inline-скрипт в <head> до первой отрисовки.
 */
export function Intro() {
  const [phase, setPhase] = useState<"idle" | "play" | "leave" | "done">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("is-intro")) {
      setPhase("done");
      return;
    }
    setPhase("play");

    const start = performance.now();
    let frame = 0;
    let ready = false;

    const hero = document.querySelector<HTMLImageElement>("[data-hero-image]");
    Promise.all([
      document.fonts?.ready,
      hero && !hero.complete ? hero.decode().catch(() => {}) : null,
    ]).then(() => {
      ready = true;
    });

    const tick = (now: number) => {
      const t = now - start;
      const goal = ready || t > MAX_MS ? 1 : 0.86;
      const p = Math.min(goal, t / MIN_MS);
      setProgress(p);
      if (p >= 1) {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        root.classList.remove("is-intro");
        setPhase("leave");
        window.setTimeout(() => setPhase("done"), 1100);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`${phase === "idle" ? "intro" : "flex"} fixed inset-0 z-[80] flex-col items-center justify-center bg-nyx transition-[clip-path] duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "leave" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
    >
      <svg viewBox="600 -40 266 266" className="intro-star h-20 w-20 md:h-24 md:w-24">
        <defs>
          <linearGradient id="intro-gold" x1="660" y1="10" x2="820" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff3cf" />
            <stop offset="0.35" stopColor="#e9c27a" />
            <stop offset="0.7" stopColor="#b8853c" />
            <stop offset="1" stopColor="#7a5220" />
          </linearGradient>
          <filter id="intro-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={STAR} fill="url(#intro-gold)" filter="url(#intro-glow)" />
      </svg>

      <div className="mt-10 h-px w-40 overflow-hidden bg-aurum/15">
        <div
          className="h-full origin-left bg-gradient-to-r from-aurum to-ember"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <p className="mt-5 font-display text-sm tracking-[0.5em] text-ash tabular-nums">
        {String(Math.round(progress * 100)).padStart(3, "0")}
      </p>
    </div>
  );
}

/** Ставит класс до отрисовки, чтобы заставка не мигала у тех, кто её уже видел */
export const introScript = `try{if(!sessionStorage.getItem("${KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("is-intro")}}catch(e){}`;
