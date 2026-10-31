"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type Step = { title: string; text: string };
type Shot = { src: StaticImageData; position: string };

const NUMERALS = ["I", "II", "III", "IV"];

function StepBlock({
  step,
  index,
  active,
  onActive,
}: {
  step: Step;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className={`flex min-h-[72vh] flex-col justify-center transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-25"
      }`}
    >
      <span aria-hidden className="gilded font-display text-[4.5rem] leading-none [background-position:30%_0]">
        {NUMERALS[index]}
      </span>
      <h3 className="mt-6 font-display text-[clamp(2rem,3.4vw,3rem)] tracking-[0.1em] text-marble uppercase">
        {step.title}
      </h3>
      <div
        className={`mt-6 h-px bg-aurum/60 transition-[width] duration-1000 ease-[var(--ease-dawn)] ${
          active ? "w-24" : "w-8"
        }`}
      />
      <p className="mt-6 max-w-sm text-lg leading-relaxed text-ash">{step.text}</p>
    </li>
  );
}

/** Закреплённая сцена: картинка этапа меняется, пока листаешь шаги */
export function ApproachStory({ steps, shots }: { steps: Step[]; shots: Shot[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative mt-10 hidden lg:grid lg:grid-cols-12 lg:gap-16">
      <div className="order-2 col-span-6 col-start-7">
        <div className="sticky top-[14vh] h-[72vh]">
          <div className="relative h-full overflow-hidden border hairline">
            {shots.map((shot, i) => (
              <Image
                key={i}
                src={shot.src}
                alt=""
                placeholder="blur"
                quality={90}
                sizes="50vw"
                className={`absolute inset-0 h-full w-full object-cover ${shot.position} transition-[opacity,transform,filter] duration-[1.4s] ease-[var(--ease-dawn)] ${
                  i === active
                    ? "scale-100 opacity-100 [filter:brightness(1)]"
                    : "scale-110 opacity-0 [filter:brightness(.6)]"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-nyx/70 via-transparent to-nyx/20" />
            {/* Внутренняя рамка - как паспарту */}
            <div className="absolute inset-5 border border-marble/10" />

            <div className="absolute right-8 bottom-7 left-8 flex items-end justify-between">
              <p className="font-display text-lg tracking-[0.3em] text-marble/90 tabular-nums">
                <span className="text-ember">{NUMERALS[active]}</span>
                <span className="text-marble/40"> / IV</span>
              </p>
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-px transition-all duration-700 ${i === active ? "w-10 bg-ember" : "w-4 bg-marble/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol className="order-1 col-span-5 col-start-1 row-start-1 py-[14vh]">
        {steps.map((step, i) => (
          <StepBlock key={step.title} step={step} index={i} active={i === active} onActive={setActive} />
        ))}
      </ol>
    </div>
  );
}
