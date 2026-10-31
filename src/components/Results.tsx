"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import olympus from "../../public/images/olympus.jpg";
import { RevealHeading } from "./fx/Reveal";

type Stat = { value: number; prefix: string; suffix: string; label: string };

function Counter({ stat }: { stat: Stat }) {
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const decimals = Number.isInteger(stat.value) ? 0 : 1;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCurrent(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setCurrent,
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  const formatted = current.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {stat.prefix}
        {stat.value.toLocaleString(locale)}
        {stat.suffix}
      </span>
      <span aria-hidden>
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </span>
    </span>
  );
}

export function Results() {
  const t = useTranslations("results");
  const stats = t.raw("stats") as Stat[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section id="results" ref={ref} className="relative isolate">
      {/* Олимп целиком, в родных пропорциях - с солнцем и колонной справа */}
      <div className="relative h-[36rem] overflow-hidden md:h-auto md:aspect-[16/9] md:max-h-[120svh]">
        <motion.div
          style={reduce ? undefined : { y: imageY }}
          className="absolute inset-x-0 -inset-y-[5%]"
        >
          <Image
            src={olympus}
            alt=""
            placeholder="blur"
            quality={90}
            sizes="100vw"
            className="h-full w-full object-cover object-[72%_center] md:object-center"
          />
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-nyx to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-nyx via-nyx/60 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-nyx)_0%,color-mix(in_oklab,var(--color-nyx)_55%,transparent)_28%,transparent_55%)] max-md:bg-nyx/45" />

        <div className="container-x relative flex h-full flex-col justify-center pt-16 pb-24 md:pt-0">
          <RevealHeading
            text={t("title")}
            className="inscription max-w-[12ch] text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02] text-marble"
          />
          <div className="mt-8 h-px w-16 bg-aurum/60" />
          <p className="mt-7 max-w-sm text-lg leading-relaxed text-marble/85">
            {t("text")}
          </p>
        </div>
      </div>

      <div className="container-x relative -mt-14 pb-6 md:-mt-24">
        <dl className="grid grid-cols-2 border-t hairline lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-3 pt-8 pb-2 pr-4 hairline lg:pt-10 ${
                i > 0 ? "lg:border-l lg:pl-8" : ""
              } ${i % 2 === 1 ? "border-l pl-5" : ""} ${i > 1 ? "max-lg:mt-6 max-lg:border-t" : ""}`}
            >
              <dt className="text-[0.82rem] tracking-[0.14em] text-ash uppercase">
                {stat.label}
              </dt>
              <dd className="order-first gilded font-display text-[clamp(2.6rem,5.5vw,4.5rem)] leading-none [background-position:30%_0]">
                <Counter stat={stat} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
