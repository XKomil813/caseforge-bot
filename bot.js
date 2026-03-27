require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- SOZLAMALAR ---
const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = 8446680998;

// --- DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB-ga muvaffaqiyatli ulandi"))
  .catch(err => console.error("❌ MongoDB xatosi:", err));

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  coins: { type: Number, default: 500 }, // Yangi foydalanuvchiga 500 coin
  totalOpened: { type: Number, default: 0 }
});
const User = mongoose.model('User', UserSchema);

// --- API (Frontend uchun) ---
app.get('/', (req, res) => res.send('v1.0.1: Server is alive! 🚀'));

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findOne({ telegramId: req.params.id });
  if (user) res.json({ success: true, coins: user.coins, totalOpened: user.totalOpened });
  else res.json({ success: false });
});

app.post('/api/open-case', async (req, res) => {
  const { userId, cost } = req.body;
  const user = await User.findOne({ telegramId: userId });
  if (user && user.coins >= cost) {
    user.coins -= cost;
    user.totalOpened += 1;
    await user.save();
    res.json({ success: true, newBalance: user.coins });
  } else {
    res.json({ success: false });
  }
});

// --- BOT LOGIKASI ---
const bot = new Telegraf(BOT_TOKEN);
bot.use(session());

bot.start(async (ctx) => {
  const telegramId = ctx.from.id;
  let user = await User.findOne({ telegramId });
  if (!user) {
    user = new User({ telegramId, username: ctx.from.first_name });
    await user.save();
  }
  ctx.reply(
    `✨ CaseForge v1.0.1\n💰 Balans: ${user.coins} coin`,
    Markup.inlineKeyboard([[Markup.button.webApp("🎮 O'yinni ochish", process.env.BOT_WEBAPP_URL)]])
  );
});

bot.command('admin', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  ctx.session = { step: 'get_id' };
  ctx.reply("Admin: Foydalanuvchi ID-sini kiriting:");
});

bot.on('text', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID || !ctx.session) return;
  if (ctx.session.step === 'get_id') {
    ctx.session.targetId = ctx.message.text;
    ctx.session.step = 'get_amount';
    ctx.reply(`ID: ${ctx.session.targetId} uchun miqdorni kiriting:`);
  } else if (ctx.session.step === 'get_amount') {
    const amount = parseInt(ctx.message.text);
    await User.findOneAndUpdate({ telegramId: ctx.session.targetId }, { $inc: { coins: amount } });
    ctx.reply("✅ Balans to'ldirildi.");
    ctx.session = null;
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
bot.launch();