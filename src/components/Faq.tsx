"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "./Button";
import { RevealHeading } from "./fx/Reveal";

type Item = { q: string; a: string };

function Question({ item, open, onToggle }: { item: Item; open: boolean; onToggle: () => void }) {
  const id = useId();

  return (
    <li className="border-b hairline">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left"
        >
          <span
            className={`font-display text-[1.25rem] leading-snug tracking-[0.03em] transition-colors duration-300 md:text-[1.4rem] ${
              open ? "text-ember" : "text-marble group-hover:text-ember"
            }`}
          >
            {item.q}
          </span>
          {/* Плюс превращается в минус */}
          <span aria-hidden className="relative h-4 w-4 shrink-0 text-aurum">
            <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
            <span
              className={`absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-500 ease-[var(--ease-dawn)] ${
                open ? "scale-y-0" : ""
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-dawn)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-8 leading-[1.75] text-ash">{item.a}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RevealHeading text={t("title")} className="inscription text-[clamp(2.4rem,5vw,4rem)]" />
          <p className="mt-6 max-w-xs leading-relaxed text-ash">{t("lead")}</p>
          <ButtonLink href="#contact" className="mt-10">
            {t("cta")}
          </ButtonLink>
        </div>

        <ul className="border-t hairline lg:col-span-7 lg:col-start-6">
          {items.map((item, i) => (
            <Question
              key={item.q}
              item={item}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
