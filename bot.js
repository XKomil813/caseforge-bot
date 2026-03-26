require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.BOT_WEBAPP_URL || 'https://case-forge.netlify.app';

if (!BOT_TOKEN) {
  console.error('Error: BOT_TOKEN is required in .env');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

const cases = [
  { name: 'Common', chance: 5, value: 15 },
  { name: 'Rare', chance: 10, value: 35 },
  { name: 'Epic', chance: 10, value: 80 },
  { name: 'Legendary', chance: 75, value: 220 },
];

function pickCaseItem() {
  const r = Math.random() * 100;
  let acc = 0;
  for (const item of cases) {
    acc += item.chance;
    if (r <= acc) return item;
  }
  return cases[0];
}

bot.start(async (ctx) => {
  await ctx.reply(
    '👋 Salom! CS2 case ochishga xush kelibsiz. Web app orqali ochish uchun pastdagi tugmani bosing.',
    Markup.inlineKeyboard([
      Markup.button.webApp('Web App orqali ochish', WEBAPP_URL),
    ])
  );
});


bot.launch().then(() => console.log('Telegram bot ishga tushdi')).catch(console.error);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));