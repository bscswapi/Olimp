# OLIMP Agency — сайт

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · next-intl (RU / EN) · Motion.

## Запуск

Нужна Node.js 20+ (в проекте `.nvmrc` → 22).

```bash
npm install
npm run dev      # http://localhost:3000 → редирект на /en (английский по умолчанию)
npm run build    # продакшн-сборка
```

## Где что менять

| Что | Файл |
| --- | --- |
| Тексты на русском / английском | `src/messages/ru.json`, `src/messages/en.json` |
| Telegram, почта, домен, партнёры | `src/config/site.ts` |
| Ссылки на SEO-сайты в футере | `src/config/site.ts` → `projects` (пока пусто — блок скрыт) |
| Картинки | `public/images/*.jpg` |
| Цвета и шрифты | `src/app/globals.css` (`@theme`) |
| Логотип (вектор) | `src/components/Logo.tsx`, контуры — `src/components/brand-paths.ts` |

## Деплой на Vercel

1. Залить проект в GitHub.
2. На vercel.com → **Add New → Project** → выбрать репозиторий → **Deploy** (настройки по умолчанию).
3. В **Settings → Environment Variables** добавить `NEXT_PUBLIC_SITE_URL=https://ваш-домен` (для sitemap, canonical и OG-превью).
4. В **Settings → Domains** подключить домен.
