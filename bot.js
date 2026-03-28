const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

// --- DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB ulandi"))
  .catch(err => console.error("❌ MongoDB xatosi:", err));

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  coins: { type: Number, default: 500 },
  totalOpened: { type: Number, default: 0 },
  inventory: [{
    name: String,
    price: Number,
    date: { type: Date, default: Date.now }
  }]
});
const User = mongoose.model('User', UserSchema);

// --- API ---
app.get('/', (req, res) => res.send('v1.0.4: CaseForge is Live! 🚀'));

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findOne({ telegramId: req.params.id });
  if (user) res.json({ success: true, coins: user.coins, totalOpened: user.totalOpened, inventory: user.inventory });
  else res.json({ success: false });
});

// Add logging to debug case opening issues
app.post('/api/open-case', async (req, res) => {
  const { userId, skin } = req.body;
  const CASE_COST = 500; // cases.js dagi narx bilan bir xil

  try {
    console.log("Foydalanuvchi ID: ", userId);
    console.log("Skin ma'lumotlari: ", skin);

    const user = await User.findOne({ telegramId: userId });
    if (!user) {
      console.log("Foydalanuvchi topilmadi.");
      return res.json({ success: false, message: "Foydalanuvchi topilmadi." });
    }

    console.log("Foydalanuvchi balans: ", user.coins);
    console.log("Case narxi: ", CASE_COST);

    if (user.coins < CASE_COST) {
      console.log("Mablag' yetarli emas.");
      return res.json({ success: false, message: "Mablag' kam!" });
    }

    user.coins -= CASE_COST;
    user.totalOpened += 1;
    user.inventory.push({ name: skin.name, price: skin.price });
    await user.save();

    console.log("Case ochildi. Yangi balans: ", user.coins);
    res.json({ success: true, newBalance: user.coins });
  } catch (e) {
    console.error("Xatolik yuz berdi:", e);
    res.status(500).json({ success: false, message: "Ichki server xatosi." });
  }
});

// --- BOT ---
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

const ADMIN_ID = 8446680998; 

bot.start(async (ctx) => {
  const telegramId = ctx.from.id;
  let user = await User.findOne({ telegramId });
  if (!user) {
    user = new User({ telegramId, username: ctx.from.first_name });
    await user.save();
  }
  ctx.reply(`✨ CaseForge v1.0.5\n💰 Balans: ${user.coins} coin`,
    Markup.inlineKeyboard([[Markup.button.webApp("🎮 O'yinni ochish", process.env.BOT_WEBAPP_URL)]])
  );
});

// Moved 'bot.command' to ensure proper initialization
bot.command('admin', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return ctx.reply(`Siz admin emassiz. ID: ${ctx.from.id}`);
  ctx.session = { step: 'waiting_for_id' };
  ctx.reply("Admin panel! Coin berish uchun foydalanuvchi ID-sini yuboring:");
});

bot.on('text', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID || !ctx.session) return;
  if (ctx.session.step === 'waiting_for_id') {
    ctx.session.targetId = ctx.message.text;
    ctx.session.step = 'waiting_for_amount';
    return ctx.reply(`ID ${ctx.session.targetId} uchun qancha coin bermoqchisiz?`);
  }
  if (ctx.session.step === 'waiting_for_amount') {
    const amount = parseInt(ctx.message.text);
    if (isNaN(amount)) return ctx.reply("Faqat raqam yuboring!");
    const user = await User.findOne({ telegramId: ctx.session.targetId });
    if (user) {
      user.coins += amount;
      await user.save();
      ctx.reply("Bajarildi!");
      bot.telegram.sendMessage(ctx.session.targetId, `🎁 Admin sizga ${amount} coin berdi!`);
    } else { ctx.reply("Foydalanuvchi topilmadi."); }
    ctx.session = null;
  }
});

// Moved 'bot.command' to ensure proper initialization
bot.command('checkbalance', async (ctx) => {
  const telegramId = ctx.from.id;
  const user = await User.findOne({ telegramId });
  if (user) {
    ctx.reply(`Sizning balansingiz: ${user.coins} coin`);
  } else {
    ctx.reply("Foydalanuvchi topilmadi.");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server yondi: ${PORT}`));
bot.launch();