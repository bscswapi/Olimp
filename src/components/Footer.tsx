import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { Logo, Wordmark } from "./Logo";
import { Meander } from "./Meander";

const sections = ["about", "approach", "results", "services", "faq"] as const;

const linkClass = "text-ash transition-colors duration-300 hover:text-marble";
const headingClass = "font-display text-sm tracking-[0.18em] text-aurum uppercase";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");

  return (
    <footer className="bg-basalt">
      <Meander />
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo agency />
          <p className="mt-6 max-w-xs leading-relaxed text-ash">{t("about")}</p>
        </div>

        <nav aria-label={t("nav")} className="lg:col-span-2">
          <p className={headingClass}>{t("nav")}</p>
          <ul className="mt-6 space-y-3">
            {sections.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {nav(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className={headingClass}>{t("platform")}</p>
          <ul className="mt-6 space-y-3">
            {(["advertiser", "publisher"] as const).map((key) => (
              <li key={key}>
                <a href={site.register[key]} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {contact(`${key}.cta`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className={headingClass}>{t("contacts")}</p>
          <ul className="mt-6 space-y-3">
            {site.contacts.team.map(({ id, telegram }) => (
              <li key={id}>
                <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <span className="text-marble/80">{contact(`team.${id}.name`)}</span>
                  <span className="text-aurum"> @{telegram}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.contacts.email}`} className={linkClass}>
                {site.contacts.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Ссылки на SEO-проекты: появятся, как только их добавят в src/config/site.ts */}
        {site.projects.length > 0 && (
          <div className="lg:col-span-3">
            <p className={headingClass}>{t("projects")}</p>
            <ul className="mt-6 space-y-3">
              {site.projects.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className={linkClass}>
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Большая подпись бренда, уходящая за нижний край */}
      <div aria-hidden className="container-x pointer-events-none -mb-[3.5vw] overflow-hidden select-none">
        <Wordmark agency={false} className="w-full translate-y-[12%] opacity-[0.07]" />
      </div>

      <div className="relative border-t hairline bg-basalt">
        <div className="container-x flex flex-col gap-2 py-7 text-sm text-dust sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t("rights")}
          </p>
          <p>{t("responsible")}</p>
        </div>
      </div>
    </footer>
  );
}
