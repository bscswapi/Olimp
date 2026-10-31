"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";

const sections = ["about", "approach", "results", "services", "faq"] as const;

function LocaleSwitch({ onSwitch }: { onSwitch?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center gap-1 text-[0.75rem] tracking-[0.2em]"
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="h-3 w-px bg-ash/30" aria-hidden />}
          <Link
            href={pathname}
            locale={l}
            onClick={onSwitch}
            aria-current={l === locale ? "true" : undefined}
            className={`px-1.5 py-2 uppercase transition-colors ${
              l === locale ? "text-aurum" : "text-ash hover:text-marble"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
        scrolled || open
          ? "border-b border-aurum/10 bg-nyx/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6 md:h-20">
        <a href="#top" aria-label="OLIMP Agency" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {sections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="relative py-2 text-[0.8rem] tracking-[0.16em] text-ash uppercase transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-aurum after:transition-transform after:duration-500 hover:text-marble hover:after:scale-x-100"
                >
                  {t(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <LocaleSwitch />
          </div>
          <div className="hidden md:block">
            <ButtonLink href="#contact" className="!px-5 !py-3">
              {t("contact")}
            </ButtonLink>
          </div>
          <button
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-px w-6 bg-marble transition-transform duration-500 ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-marble transition-transform duration-500 ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-dawn)] lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
        inert={!open}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="container-x flex h-[calc(100dvh-4.5rem-1px)] flex-col overflow-y-auto pt-6 pb-8">
            <ul className="flex flex-col">
              {sections.map((id) => (
                <li key={id} className="border-b border-aurum/10">
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="inscription block py-5 text-2xl text-marble"
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-6 pt-10">
              <LocaleSwitch onSwitch={() => setOpen(false)} />
              <ButtonLink href="#contact" onClick={() => setOpen(false)}>
                {t("contact")}
              </ButtonLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
