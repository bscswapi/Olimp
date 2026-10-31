"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; r: number; vy: number; sway: number; phase: number; a: number };

/**
 * Золотая пыль в солнечных лучах первого экрана.
 * Лёгкий canvas: ставится на паузу вне экрана и при свёрнутой вкладке.
 */
export function GoldDust({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let motes: Mote[] = [];
    let frame = 0;
    let running = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spawn = (anywhere: boolean): Mote => ({
      // гуще справа - там, где солнце
      x: w * (0.25 + Math.pow(Math.random(), 0.6) * 0.75),
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.5 + Math.random() * 1.7,
      vy: 0.12 + Math.random() * 0.35,
      sway: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      a: 0.25 + Math.random() * 0.6,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 28 : 64;
      motes = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.y -= m.vy;
        m.x += Math.sin(t / 2200 + m.phase) * m.sway * 0.35;
        if (m.y < -10) Object.assign(m, spawn(false));
        const twinkle = 0.55 + 0.45 * Math.sin(t / 900 + m.phase * 3);
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
        g.addColorStop(0, `rgba(255, 226, 170, ${m.a * twinkle})`);
        g.addColorStop(1, "rgba(240, 180, 106, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
