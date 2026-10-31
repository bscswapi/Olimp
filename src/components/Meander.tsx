import { useId } from "react";

/** Греческий меандр - орнамент-разделитель с храмовых фризов. */
export function Meander({ className = "" }: { className?: string }) {
  const id = useId();

  return (
    <svg
      aria-hidden
      focusable="false"
      className={`block h-4 w-full text-aurum/35 ${className}`}
    >
      <defs>
        <pattern id={id} width="24" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M0 15.5 H24 M0 0.5 H24 M3.5 15.5 V3.5 H20.5 V12.5 H9.5 V7 H15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
