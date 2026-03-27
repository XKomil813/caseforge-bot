require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const http = require('http'); // Port uchun kerak

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.BOT_WEBAPP_URL || 'https://case-forge.netlify.app';

// Render uchun "sog'lomlik" tekshiruvi (Health Check)
// Bu qism Render so'rayotgan portni ochib beradi
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CaseForge Bot is running!');
}).listen(port, '0.0.0.0', () => {
  console.log(`Server ${port}-portda ishlamoqda`);
});

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
    '🌟 Salom! CS2 case ochishga xush kelibsiz. CaseForge ni oching va bepul skinlarni yutib oling!',
    Markup.inlineKeyboard([  
      Markup.button.webApp('CaseForge ni ochish', WEBAPP_URL),
    ])
  );
});

bot.launch().then(() => console.log('Telegram bot ishga tushdi')).catch(console.error);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));