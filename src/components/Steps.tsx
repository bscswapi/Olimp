import { useTranslations } from "next-intl";
import { RevealHeading } from "./fx/Reveal";
import { Meander } from "./Meander";

export function Steps() {
  const t = useTranslations("steps");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="relative bg-basalt">
      <Meander />
      <div className="container-x py-24 md:py-28">
        <RevealHeading
          text={t("title")}
          className="inscription max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)]"
        />

        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {/* Нить, связывающая шаги */}
          <span
            aria-hidden
            className="absolute top-[1.4rem] right-0 left-0 hidden h-px bg-gradient-to-r from-aurum/50 via-aurum/25 to-transparent md:block"
          />
          {items.map((item, i) => (
            <li key={item.title} className="relative">
              <span className="relative flex h-11 w-11 items-center justify-center border border-aurum/60 bg-basalt font-display text-lg text-aurum">
                {i + 1}
              </span>
              <h3 className="mt-7 font-display text-xl tracking-[0.1em] text-marble uppercase">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xs leading-relaxed text-ash">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <Meander />
    </section>
  );
}
