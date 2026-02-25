# Ora Technology — Курсы

Фронтенд страницы «Курсы» для Ora Technology. Next.js 16, React 19, Tailwind CSS.

## Локальный запуск

```bash
# Установка зависимостей (pnpm или npm)
pnpm install
# или
npm install

# Режим разработки
pnpm dev
# или
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
pnpm build
pnpm start
```

## Деплой на Vercel

1. Залейте проект в GitHub (репозиторий **OraTechnology**).
2. Зайдите на [vercel.com](https://vercel.com) и войдите через GitHub.
3. **Add New Project** → выберите репозиторий **OraTechnology**.
4. Оставьте настройки по умолчанию (Framework: Next.js) и нажмите **Deploy**.
5. После деплоя сайт будет доступен по ссылке вида `https://ora-technology-*.vercel.app` (или ваш домен).

При пуше в ветку `main` Vercel будет автоматически пересобирать и публиковать проект.
