import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import heroImage from "../../public/images/hero-zeus.jpg";
import { Wordmark } from "./Logo";
import { ButtonLink } from "./Button";
import { GoldDust } from "./fx/GoldDust";
import { MouseParallax } from "./fx/MouseParallax";

export function Hero() {
  const t = useTranslations("hero");
  const pillars = t.raw("pillars") as string[];

  return (
    <section
      id="top"
      className="hero-stage relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Сцена */}
      <div className="absolute inset-0 -z-10">
        <MouseParallax depth={18} className="absolute -inset-6">
          <Image
            src={heroImage}
            alt=""
            priority
            data-hero-image
            placeholder="blur"
            sizes="100vw"
            quality={88}
            className="dawn h-full w-full object-cover object-[72%_30%] md:object-[60%_30%]"
          />
        </MouseParallax>
        <GoldDust className="absolute inset-0 h-full w-full mix-blend-screen" />
        <div className="absolute inset-0 veil-left" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-nyx via-nyx/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-nyx/80 to-transparent" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-center pt-32 pb-16 md:pt-36">
        <div className="max-w-xl">
          <h1>
            <span className="sr-only">OLIMP Agency - {t("tagline")}</span>
            <Wordmark
              animated
              className="glow w-[min(100%,36rem)] lg:w-[34rem] xl:w-[38rem]"
            />
          </h1>

          <div
            className="draw mt-10 h-px w-24 bg-aurum/60"
            style={{ animationDelay: "1.5s" }}
          />

          <p
            className="appear mt-8 font-display text-xl tracking-[0.04em] text-marble md:text-2xl"
            style={{ animationDelay: "1.6s" }}
          >
            {t("tagline")}
          </p>

          <ul
            className="appear mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.78rem] tracking-[0.22em] text-aurum uppercase"
            style={{ animationDelay: "1.75s" }}
          >
            {pillars.map((p, i) => (
              <li key={p} className="flex items-center gap-4">
                {i > 0 && (
                  <svg viewBox="0 0 10 10" className="h-1.5 w-1.5 text-aurum/60" aria-hidden>
                    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
                  </svg>
                )}
                {p}
              </li>
            ))}
          </ul>

          <p
            className="appear mt-7 max-w-md text-[1.02rem] leading-relaxed text-ash"
            style={{ animationDelay: "1.9s" }}
          >
            {t("lead")}
          </p>

          <div
            className="appear mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
            style={{ animationDelay: "2.05s" }}
          >
            <ButtonLink href="#contact">
              {t("primary")}
            </ButtonLink>
            <ButtonLink href="#approach" variant="ghost">
              {t("secondary")}
            </ButtonLink>
          </div>
        </div>

        <p
          className="appear absolute right-5 bottom-20 hidden max-w-[11rem] text-right font-display text-lg leading-snug tracking-[0.08em] text-marble/85 uppercase md:right-10 lg:block xl:right-14"
          style={{ animationDelay: "2.4s" }}
        >
          {t("motto")}
          <span className="mt-4 ml-auto block h-px w-10 bg-aurum/60" />
        </p>
      </div>

      {/* Партнёры */}
      <div
        className="appear relative border-t border-aurum/10 bg-nyx/40 backdrop-blur-sm"
        style={{ animationDelay: "2.5s" }}
      >
        <div className="container-x flex flex-col gap-5 py-6 md:flex-row md:items-center md:gap-12">
          <p className="shrink-0 text-[0.72rem] tracking-[0.22em] text-dust uppercase">
            {t("partners")}
          </p>
          <div className="marquee relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <ul className="marquee-track flex w-max items-center">
              {[...site.partners, ...site.partners, ...site.partners, ...site.partners].map((name, i) => (
                <li
                  key={i}
                  aria-hidden={i >= site.partners.length || undefined}
                  className="flex items-center gap-14 pr-14 text-[1.05rem] font-medium tracking-[0.04em] whitespace-nowrap text-marble/45 transition-colors duration-500 hover:text-marble md:text-lg"
                >
                  {name}
                  <svg viewBox="0 0 10 10" className="h-2 w-2 text-aurum/50" aria-hidden>
                    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
