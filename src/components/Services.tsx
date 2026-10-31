import { useTranslations } from "next-intl";
import { RevealHeading } from "./fx/Reveal";
import { Meander } from "./Meander";
import { STAR } from "./brand-paths";

/* Иконки - тонкая золотая линия, по одной на каждую «колонну» */
function SpearIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M8 40 L36 12" />
      <path d="M30 10 L40 8 L38 18 Z" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
      <path d="M8 30 L16 30 M18 40 L18 32" opacity="0.5" />
      <circle cx="24" cy="24" r="16" opacity="0.25" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M24 5 L39 10 V22 C39 32 32 39 24 43 C16 39 9 32 9 22 V10 Z" strokeLinejoin="round" />
      <path d="M15 30 L24 18 L33 30 M20 30 L24 25 L28 30" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="640 -4 190 190" className="h-12 w-12" aria-hidden>
      <path d={STAR} fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="733" cy="86" r="88" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.25" />
    </svg>
  );
}

const icons = [SpearIcon, ShieldIcon, StarIcon];

export function Services() {
  const t = useTranslations("services");
  const groups = t.raw("groups") as { title: string; items: string[] }[];

  return (
    <section id="services" className="relative overflow-hidden py-28 md:py-36">
      {/* Тёплый свет за храмом */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(240_180_106/0.09),transparent_65%)]"
      />

      <div className="container-x">
        <div className="mx-auto max-w-6xl">
          {/* Фронтон с надписью */}
          <div className="relative flex min-h-[15rem] flex-col items-center justify-end px-[14%] pb-8 text-center md:aspect-[1200/300] md:min-h-0 md:pb-10">
            <svg
              aria-hidden
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-aurum"
            >
              <path d="M0 299 L600 1 L1200 299" fill="none" stroke="currentColor" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
              <path d="M70 286 L600 22 L1130 286" fill="none" stroke="currentColor" strokeOpacity="0.2" vectorEffect="non-scaling-stroke" />
            </svg>
            <RevealHeading text={t("title")} className="inscription relative text-[clamp(2.2rem,5vw,4rem)]" />
            <p className="relative mt-4 max-w-md text-[0.98rem] leading-relaxed text-ash">
              {t("lead")}
            </p>
          </div>

          {/* Фриз */}
          <div className="border-y hairline py-2">
            <Meander className="opacity-80" />
          </div>

          {/* Колонны */}
          <div className="grid gap-6 px-[3%] pt-6 md:grid-cols-3 md:gap-8 md:px-[5%] lg:gap-12">
            {groups.map((group, i) => {
              const Icon = icons[i];
              return (
                <article key={group.title} className="group relative flex flex-col">
                  {/* Капитель */}
                  <div className="mx-[-6%] h-px bg-aurum/45" />
                  <div className="mx-[-3%] mt-1.5 h-px bg-aurum/25" />

                  <div className="relative flex-1 overflow-hidden border-x hairline bg-basalt/60 px-7 pt-12 pb-14 text-center">
                    {/* Каннелюры - вертикальные желобки колонны */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgb(200_161_95/0.06)_0_1px,transparent_1px_26px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                    />
                    {/* Свет сверху при наведении */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(240_180_106/0.16),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />

                    <div className="relative">
                      <div className="mx-auto flex w-fit text-aurum transition-colors duration-500 group-hover:text-ember">
                        <Icon />
                      </div>
                      <h3 className="mt-7 font-display text-[1.45rem] leading-snug tracking-[0.1em] text-marble uppercase">
                        {group.title}
                      </h3>
                      <div className="mx-auto mt-6 h-px w-10 bg-aurum/50" />
                      <ul className="mt-6 space-y-3.5">
                        {group.items.map((item) => (
                          <li key={item} className="text-[1.02rem] text-marble/80">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* База колонны */}
                  <div className="mx-[-3%] h-px bg-aurum/25" />
                  <div className="mx-[-6%] mt-1.5 h-px bg-aurum/45" />
                </article>
              );
            })}
          </div>

          {/* Ступени храма */}
          <div aria-hidden className="mt-6 space-y-2">
            <div className="mx-[2%] h-px bg-aurum/30" />
            <div className="mx-[1%] h-px bg-aurum/40" />
            <div className="h-px bg-aurum/55" />
          </div>
        </div>
      </div>
    </section>
  );
}
