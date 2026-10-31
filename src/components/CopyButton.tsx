"use client";

import { useEffect, useState } from "react";

/** Копирует текст в буфер и на пару секунд показывает «Скопировано» */
export function CopyButton({
  value,
  label,
  done,
  className = "",
}: {
  value: string;
  label: string;
  done: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => setCopied(true), () => {});
      }}
      className={`relative inline-flex items-center gap-2 border px-3 py-1.5 text-[0.7rem] tracking-[0.16em] uppercase transition-colors duration-300 ${
        copied
          ? "border-ember/60 text-ember"
          : "border-aurum/30 text-ash hover:border-aurum/70 hover:text-marble"
      } ${className}`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        {copied ? (
          <path d="M3 8.5 6.5 12 13 4.5" />
        ) : (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" />
            <path d="M10.5 5.5v-3h-8v8h3" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
