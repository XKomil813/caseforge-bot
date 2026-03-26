# CS2 Case-Open Telegram Bot + Web App

Ushbu loyihada siz:
- Telegram bot yaratib, /start va case ochish tugmasi bilan ishlash
- Web App (HTML + JS) orqali case ochish va natijani ko‘rsatish
- Netlify (statik veb) va serverga (Bot) yopish

## 1) Tayyorlash
- `npm install telegraf express node-fetch dotenv`
- `.env` faylni yaratib, `BOT_TOKEN` qo‘ying
- `node bot.js` ni ishga tushiring

## 2) Netlify ga Deploy
- `src/index.html` + `src/main.js` faqat frontend (Client)
- `netlify.toml` konfiguratsiyasi bor
- Netlify Functions backend zarur bo‘lsa, `netlify/functions/open-case.js` qo‘shiladi

## 3) Ishga tushirish
1. `BOT_TOKEN`ni BotFather orqali ishlab oling.
2. `bot.js`ni ishga tushiring.
3. Telegramda botga `/start` yuboring, `Open Case` tugmasini bosing.
4. Web App uchun `https://your-site.netlify.app` ga o‘ting.

## Eslatma
Bot va Web App uchun URLlar alohida bo‘ladi. Netlify asosan frontend uchun, bot uchun esa Heroku/Render/Your VPS kerak bo‘ladi.
