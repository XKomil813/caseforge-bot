require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');

// --- SOZLAMALAR ---
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.BOT_WEBAPP_URL;
const ADMIN_ID = 5441584347; // O'zingizning ID-ingizni tekshirib ko'ring

// --- DATABASE ULANISHI ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB-ga muvaffaqiyatli ulandi"))
  .catch(err => console.error("❌ MongoDB ulanishida xato:", err));

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  coins: { type: Number, default: 0 },
  referredBy: { type: Number, default: null },
  inventory: { type: Array, default: [] }
});
const User = mongoose.model('User', UserSchema);

const bot = new Telegraf(BOT_TOKEN);
bot.use(session());

// --- ASOSIY START BUYRUG'I ---
bot.start(async (ctx) => {
  const telegramId = ctx.from.id;
  const inviterId = ctx.payload; // t.me/bot?start=12345 dagi 12345 qismi

  let user = await User.findOne({ telegramId });

  if (!user) {
    user = new User({
      telegramId,
      username: ctx.from.username || ctx.from.first_name,
      coins: 0
    });

    // Referal tizimi: Agar kimdir taklif qilgan bo'lsa
    if (inviterId && !isNaN(inviterId) && parseInt(inviterId) !== telegramId) {
      user.referredBy = parseInt(inviterId);
      
      // Taklif qilgan odamga 500 coin sovg'a
      await User.findOneAndUpdate(
        { telegramId: parseInt(inviterId) },
        { $inc: { coins: 500 } }
      );
      
      try {
        await bot.telegram.sendMessage(inviterId, `🎉 Tabriklaymiz! Do'stingiz qo'shildi va hisobingizga 500 coin tushdi.`);
      } catch (e) { console.log("Xabar yuborib bo'lmadi"); }
    }
    await user.save();
  }

  const refLink = `https://t.me/${ctx.botInfo.username}?start=${telegramId}`;

  await ctx.reply(
    `👋 Salom, ${ctx.from.first_name}!\n\n` +
    `💰 Balansingiz: ${user.coins} coin\n` +
    `🔗 Do'stlarni taklif qiling va 500 coin oling:\n${refLink}`,
    Markup.inlineKeyboard([
      [Markup.button.webApp("🕹 Case ochish (500 coin)", WEBAPP_URL)]
    ])
  );
});

// --- ADMIN PANEL (Balans to'ldirish) ---
bot.command('admin', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return ctx.reply("Siz admin emassiz!");
  ctx.session = { step: 'get_id' };
  ctx.reply("Admin: Foydalanuvchi ID-sini kiriting:");
});

bot.on('text', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID || !ctx.session) return;

  if (ctx.session.step === 'get_id') {
    ctx.session.targetId = ctx.message.text;
    ctx.session.step = 'get_amount';
    return ctx.reply(`ID ${ctx.session.targetId} uchun qancha coin qo'shmoqchisiz?`);
  }

  if (ctx.session.step === 'get_amount') {
    const amount = parseInt(ctx.message.text);
    if (isNaN(amount)) return ctx.reply("Faqat raqam yozing!");

    const updated = await User.findOneAndUpdate(
      { telegramId: parseInt(ctx.session.targetId) },
      { $inc: { coins: amount } },
      { new: true }
    );

    if (updated) {
      ctx.reply(`✅ Tayyor! ${updated.username} balansiga ${amount} coin qo'shildi.\nJami: ${updated.coins}`);
      try {
        await bot.telegram.sendMessage(ctx.session.targetId, `🎁 Admin hisobingizni ${amount} coinga to'ldirdi!`);
      } catch (e) {}
    } else {
      ctx.reply("Foydalanuvchi topilmadi.");
    }
    ctx.session = null;
  }
});

bot.launch().then(() => console.log("🚀 Bot Render-da muvaffaqiyatli ishga tushdi"));