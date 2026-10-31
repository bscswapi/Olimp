import { useTranslations } from "next-intl";
import laurel from "../../public/images/laurel-head.jpg";
import { ButtonLink } from "./Button";
import { CinematicReveal } from "./CinematicReveal";
import { RevealHeading, StatementText } from "./fx/Reveal";

export function About() {
  const t = useTranslations("about");
  const values = t.raw("values") as string[];
  const body = t.raw("body") as string[];

  return (
    <section id="about" className="relative pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Типографика: заголовок слева, заявление справа */}
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <RevealHeading
            text={t("title")}
            className="inscription text-[clamp(2.4rem,5vw,4rem)] text-marble"
          />
          <div className="mt-8 h-px w-16 bg-aurum/60" />
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <StatementText
            text={t("text")}
            className="font-display text-[clamp(1.5rem,2.6vw,2.35rem)] leading-[1.38] tracking-[0.01em] text-marble"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-10">
            {body.map((p) => (
              <p key={p} className="leading-[1.75] text-ash">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-8 border-t hairline pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-display text-lg leading-[1.55] tracking-[0.01em] text-marble/85">
              {t("text2")}
            </p>
            <ButtonLink href="#contact" className="shrink-0">
              {t("cta")}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Кинокадр с фризом ценностей по нижнему краю */}
      <div className="mt-20 md:mt-28">
        <CinematicReveal src={laurel} position="76% 30%">
          <div className="absolute inset-x-0 bottom-0 hidden border-t border-aurum/25 sm:block">
            <ul className="container-x grid grid-cols-4">
              {values.map((v, i) => (
                <li
                  key={v}
                  className={`py-7 text-center font-display text-lg tracking-[0.2em] text-marble/90 uppercase lg:text-xl ${
                    i > 0 ? "border-l border-aurum/25" : ""
                  }`}
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </CinematicReveal>

        <ul className="container-x mt-6 grid grid-cols-2 sm:hidden">
          {values.map((v, i) => (
            <li
              key={v}
              className={`border-b hairline py-4 text-center font-display text-[0.95rem] tracking-[0.14em] text-marble/85 uppercase ${
                i % 2 === 1 ? "border-l" : ""
              }`}
            >
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
