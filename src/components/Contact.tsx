import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealHeading } from "./fx/Reveal";
import { site } from "@/config/site";
import helmet from "../../public/images/helmet-shield.jpg";
import { ButtonFace } from "./Button";
import { CopyButton } from "./CopyButton";

function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden>
      <path d="M21.5 3.5 2.5 11l6 2 9 7 4-16.5Z" />
      <path d="m8.5 13 13-9.5M8.5 13l1.5 6 2.5-3.8" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

/** Стрелка «откроется на другом сайте» */
function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
      <path d="M3.5 1.5h7v7M10.5 1.5 1.5 10.5" />
    </svg>
  );
}

const iconFrame =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-aurum/40 text-aurum transition-colors duration-500";

export function Contact() {
  const t = useTranslations("contact");

  const doors = [
    { key: "advertiser", href: site.register.advertiser },
    { key: "publisher", href: site.register.publisher },
  ] as const;

  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div className="relative -z-10 h-[24rem] md:absolute md:inset-0 md:h-auto">
        <Image
          src={helmet}
          alt=""
          placeholder="blur"
          quality={90}
          sizes="100vw"
          className="h-full w-full object-cover object-[78%_center] md:object-[75%_center]"
        />
        <div className="absolute inset-0 hidden veil-left md:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-nyx/40 via-transparent to-nyx md:from-nyx md:to-nyx/90" />
      </div>

      <div className="container-x -mt-20 flex flex-col justify-center pb-24 md:mt-0 md:min-h-[56rem] md:py-28">
        <RevealHeading
          text={t("title")}
          className="inscription max-w-[10ch] text-[clamp(2.8rem,7vw,6rem)] leading-[1.02]"
        />
        <div className="mt-8 h-px w-16 bg-aurum/60" />
        <p className="mt-7 max-w-sm text-lg leading-relaxed text-marble/80">
          {t("text")}
        </p>

        {/* Регистрация в партнёрской платформе: отдельно рекламодателям и вебмастерам */}
        <h3 className="sr-only">{t("register")}</h3>
        <ul className="mt-14 grid max-w-3xl gap-px border border-aurum/20 bg-aurum/20 sm:grid-cols-2">
          {doors.map(({ key, href }) => (
            <li key={key} className="bg-nyx/75 backdrop-blur-md">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col p-7 transition-colors duration-500 hover:bg-umber/55 md:p-9"
              >
                {/* Золотая нить сверху, вытягивается при наведении */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px w-12 bg-aurum transition-[width] duration-700 ease-[var(--ease-dawn)] group-hover:w-full"
                />
                <span className="font-display text-[1.6rem] leading-tight tracking-[0.08em] text-marble uppercase">
                  {t(`${key}.title`)}
                </span>
                <span className="mt-4 mb-9 leading-relaxed text-ash">{t(`${key}.text`)}</span>
                <ButtonFace className="mt-auto self-start max-sm:w-full max-sm:justify-between max-sm:px-5 max-sm:tracking-[0.12em] max-sm:whitespace-normal">{t(`${key}.cta`)}</ButtonFace>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.75rem] tracking-[0.06em] text-dust transition-colors duration-500 group-hover:text-ash">
                  <ExternalIcon className="h-2.5 w-2.5" />
                  {t("platform")}: {new URL(href).host}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Прямой контакт с основателями */}
        <div className="mt-14 max-w-3xl">
          <div className="flex items-center gap-6">
            <h3 className="shrink-0 font-display text-xl tracking-[0.1em] text-marble uppercase">
              {t("direct")}
            </h3>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-aurum/40 to-transparent" />
          </div>
          <p className="mt-3 max-w-md leading-relaxed text-ash">{t("directText")}</p>

          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {site.contacts.team.map(({ id, telegram }) => (
              <li key={id}>
                <a
                  href={`https://t.me/${telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5"
                >
                  <span className={`${iconFrame} group-hover:border-ember group-hover:bg-aurum/10 group-hover:text-ember`}>
                    <TelegramIcon className="h-5 w-5 -translate-x-px" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg leading-tight tracking-[0.04em] text-marble">
                      {t(`team.${id}.name`)}
                    </span>
                    <span className="mt-1 block text-[0.72rem] tracking-[0.14em] text-dust uppercase">
                      {t(`team.${id}.role`)}
                    </span>
                    <span className="mt-1 block truncate text-aurum transition-colors duration-300 group-hover:text-ember">
                      @{telegram}
                    </span>
                  </span>
                </a>
              </li>
            ))}

            <li className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t hairline pt-6 sm:col-span-2">
              <a href={`mailto:${site.contacts.email}`} className="group flex min-w-0 items-center gap-5">
                <span className={`${iconFrame} group-hover:border-ember group-hover:bg-aurum/10 group-hover:text-ember`}>
                  <MailIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.72rem] tracking-[0.14em] text-dust uppercase">
                    {t("email")}
                  </span>
                  <span className="mt-1 block truncate text-lg text-marble transition-colors duration-300 group-hover:text-ember">
                    {site.contacts.email}
                  </span>
                </span>
              </a>
              <CopyButton
                value={site.contacts.email}
                label={t("copy")}
                done={t("copied")}
                className="ml-[4.25rem] sm:ml-2"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
