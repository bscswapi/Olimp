import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-4 overflow-hidden whitespace-nowrap text-[0.8rem] font-normal tracking-[0.18em] uppercase transition-colors duration-500";

const variants: Record<Variant, string> = {
  primary:
    "border border-aurum/70 px-7 py-4 text-marble hover:text-nyx hover:border-ember",
  ghost: "py-4 text-ash hover:text-marble",
};

/** Тонкая стрела, которая вытягивается при наведении */
export function Spear({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block h-px w-6 bg-current transition-[width] duration-500 ease-[var(--ease-dawn)] group-hover:w-10 ${className}`}
    >
      <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-t border-r border-current" />
    </span>
  );
}

/** Заливка золотом, которая проезжает слева направо при наведении на ближайший .group */
function Sweep() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gradient-to-r from-aurum to-ember transition-transform duration-500 ease-[var(--ease-dawn)] group-hover:scale-x-100"
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {variant === "primary" && <Sweep />}
      <span className="relative">{children}</span>
      <Spear className="relative" />
    </a>
  );
}

/** Та же кнопка, но без ссылки: для карточек, которые целиком являются ссылкой */
export function ButtonFace({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <span className={`${base} ${variants.primary} group-hover:border-ember group-hover:text-nyx ${className}`}>
      <Sweep />
      <span className="relative">{children}</span>
      <Spear className="relative" />
    </span>
  );
}
