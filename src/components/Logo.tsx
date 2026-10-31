import { useId, type CSSProperties } from "react";
import { AGENCY, LETTERS, STAR } from "./brand-paths";

type WordmarkProps = {
  className?: string;
  style?: CSSProperties;
  /** Показывать подпись AGENCY под словом */
  agency?: boolean;
  /** Анимация появления для первого экрана */
  animated?: boolean;
};

/**
 * Логотип OLIMP Agency в векторе: мраморные буквы и золотая звезда над «i».
 * Контуры оттрассированы из исходника заказчика.
 */
export function Wordmark({
  className = "",
  style,
  agency = true,
  animated = false,
}: WordmarkProps) {
  const id = useId();
  const marble = `${id}-marble`;
  const gold = `${id}-gold`;
  const halo = `${id}-halo`;
  const clip = `${id}-clip`;

  return (
    <svg
      viewBox={agency ? "0 0 1588 441" : "0 0 1588 330"}
      className={className}
      style={style}
      overflow="visible"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={marble} x1="0" y1="130" x2="0" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fdfbf6" />
          <stop offset="1" stopColor="#ddd5c8" />
        </linearGradient>
        <linearGradient id={gold} x1="660" y1="10" x2="820" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="0.35" stopColor="#e9c27a" />
          <stop offset="0.7" stopColor="#b8853c" />
          <stop offset="1" stopColor="#7a5220" />
        </linearGradient>
        <filter id={halo} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.1  0 0.8 0 0 0.05  0 0 0.5 0 0  0 0 0 0.9 0"
            result="warm"
          />
          <feMerge>
            <feMergeNode in="warm" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={clip}>
          <rect x="0" y="120" width="1588" height="212" />
        </clipPath>
      </defs>

      <g clipPath={animated ? `url(#${clip})` : undefined} fill={`url(#${marble})`} fillRule="evenodd">
        {LETTERS.map(([letter, d], i) => (
          <path
            key={letter}
            d={d}
            className={animated ? "rise-svg" : undefined}
            style={animated ? { animationDelay: `${0.45 + i * 0.09}s` } : undefined}
          />
        ))}
      </g>

      <path
        d={STAR}
        fill={`url(#${gold})`}
        fillRule="evenodd"
        filter={animated ? `url(#${halo})` : undefined}
        className={animated ? "flare" : undefined}
        style={animated ? { animationDelay: "1.25s" } : undefined}
      />

      {agency && (
        <path
          d={AGENCY}
          fill="#e7e0d4"
          fillRule="evenodd"
          className={animated ? "appear" : undefined}
          style={animated ? { animationDelay: "1.6s" } : undefined}
        />
      )}
    </svg>
  );
}

/** Компактный логотип для шапки и футера */
export function Logo({ className = "", agency = false }: { className?: string; agency?: boolean }) {
  return (
    <Wordmark
      agency={agency}
      className={`${agency ? "h-12" : "h-[1.35rem] md:h-6"} w-auto ${className}`}
    />
  );
}
