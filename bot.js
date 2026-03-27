require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// .env dan ma'lumotlarni olamiz
const BOT_TOKEN = process.env.BOT_TOKEN;
// AGAR .env topilmasa, GitHub havolasini asosiy qilib belgilaymiz
const WEBAPP_URL = process.env.BOT_WEBAPP_URL || 'https://xkomil813.github.io/caseforge-bot/';

// Health Check (Render uchun)
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CaseForge Bot is running!');
}).listen(port, '0.0.0.0', () => {
  console.log(`✅ Server ${port}-portda ishlamoqda`);
});

if (!BOT_TOKEN) {
  console.error('❌ XATO: BOT_TOKEN topilmadi! .env faylini tekshiring.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Bot buyruqlari
bot.start(async (ctx) => {
  try {
    await ctx.reply( 
      '🌟 Salom! CS2 case ochishga xush kelibsiz. CaseForge ni oching va bepul skinlarni yutib oling!',
      Markup.inlineKeyboard([  
        // WebApp tugmasi endi to'g'ri URL ga bog'langan
        [Markup.button.webApp('CaseForge ni ochish', WEBAPP_URL)]
      ])
    );
  } catch (error) {
    console.error('Start xatoligi:', error);
  }
});

// Botni ishga tushirish
bot.launch().then(() => {
  console.log('🚀 Telegram bot ishga tushdi');
  console.log('🔗 Ishlatilayotgan URL:', WEBAPP_URL);
}).catch(console.error);

// Xavfsiz to'xtatish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));