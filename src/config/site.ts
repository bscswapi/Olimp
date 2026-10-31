/**
 * Всё, что заказчик будет менять чаще всего, лежит здесь:
 * домен, контакты, партнёры и ссылки на сайты-сателлиты в футере.
 * Тексты страницы - в src/messages/ru.json и src/messages/en.json.
 */

export const site = {
  name: "OLIMP Agency",
  // TODO: заменить на боевой домен после подключения в Vercel
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://olimp.agency",

  contacts: {
    email: "olimpagency.info@gmail.com",
    // Имена и должности - в src/messages/*.json (contact.team.<id>)
    team: [
      { id: "alexandr", telegram: "Alexandr_OlimpOwner" },
      { id: "nikita", telegram: "nick_olimp" },
    ],
  },

  // Регистрация в CRM-платформе партнёрской сети
  register: {
    advertiser: "https://olimp.insivaro.com/advertiser/register",
    publisher: "https://olimp.insivaro.com/register",
  },

  // Бренды в полосе партнёров на первом экране
  partners: ["BetBoom", "1win", "Parimatch", "Pin-Up", "Mostbet", "Stake"],

  /**
   * Ссылки на SEO-сайты в футере. Пока список пуст, блок не показывается.
   * Пример: { label: "Обзоры казино", href: "https://example.com" }
   */
  projects: [] as { label: string; href: string }[],
} as const;
