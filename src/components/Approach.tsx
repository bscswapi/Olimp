import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import globe from "../../public/images/globe.jpg";
import knight from "../../public/images/knight.jpg";
import crystal from "../../public/images/marble-crystal.jpg";
import growth from "../../public/images/columns-growth.jpg";
import { ApproachStory } from "./ApproachStory";
import { RevealHeading } from "./fx/Reveal";

const NUMERALS = ["I", "II", "III", "IV"];

const images: { src: StaticImageData; position: string }[] = [
  { src: globe, position: "object-[50%_40%]" },
  { src: knight, position: "object-[45%_center]" },
  { src: crystal, position: "object-[45%_center]" },
  { src: growth, position: "object-[84%_center]" },
];

export function Approach() {
  const t = useTranslations("approach");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <section id="approach" className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <RevealHeading
            text={t("title")}
            className="inscription text-[clamp(2.4rem,5vw,4rem)] md:col-span-7"
          />
          <p className="max-w-sm leading-relaxed text-ash md:col-span-4 md:col-start-9 md:justify-self-end md:text-right">
            {t("lead")}
          </p>
        </div>

        <ApproachStory steps={steps} shots={images} />

        <ol className="mt-16 grid gap-px border hairline bg-aurum/15 sm:grid-cols-2 lg:hidden">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group relative flex flex-col overflow-hidden bg-basalt"
            >
              <div className="relative z-10 px-7 pt-8 pb-6 md:px-8 md:pt-10">
                <span
                  aria-hidden
                  className="gilded font-display text-[2.6rem] leading-none [background-position:30%_0]"
                >
                  {NUMERALS[i]}
                </span>
                <h3 className="mt-6 font-display text-2xl tracking-[0.12em] text-marble uppercase">
                  {step.title}
                </h3>
                <p className="mt-3 min-h-[3.2rem] text-[0.95rem] leading-relaxed text-ash">
                  {step.text}
                </p>
              </div>

              <div className="relative mt-auto aspect-[4/3.4] overflow-hidden">
                <Image
                  src={images[i].src}
                  alt=""
                  placeholder="blur"
                  quality={90}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className={`h-full w-full object-cover ${images[i].position} transition-[transform,filter] duration-[1.6s] ease-[var(--ease-dawn)] [filter:brightness(.8)_saturate(.85)] group-hover:scale-[1.06] group-hover:[filter:brightness(1)_saturate(1)]`}
                />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-basalt to-transparent" />
              </div>

              {/* Золотая кромка загорается при наведении */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-aurum via-ember to-transparent transition-transform duration-700 ease-[var(--ease-dawn)] group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
