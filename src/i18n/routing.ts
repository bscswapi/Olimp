import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  // Всегда открываем английскую версию, язык браузера не учитываем
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
