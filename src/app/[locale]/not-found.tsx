import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/Logo";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="container-x flex min-h-dvh flex-col items-start justify-center gap-8">
      <Wordmark className="glow w-64" />
      <h1 className="inscription text-[clamp(2.4rem,6vw,4.5rem)]">{t("title")}</h1>
      <p className="max-w-md text-ash">{t("text")}</p>
      <Link
        href="/"
        className="border border-aurum/70 px-7 py-4 text-[0.8rem] tracking-[0.18em] uppercase transition-colors hover:border-ember hover:text-ember"
      >
        {t("cta")}
      </Link>
    </main>
  );
}
