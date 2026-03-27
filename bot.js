require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

// --- DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB ulandi"))
  .catch(err => console.error("❌ MongoDB xatosi:", err));

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  coins: { type: Number, default: 500 },
  totalOpened: { type: Number, default: 0 },
  // Invertar uchun yangi maydon
  inventory: [{
    name: String,
    price: Number,
    date: { type: Date, default: Date.now }
  }]
});
const User = mongoose.model('User', UserSchema);

// --- API ---
app.get('/', (req, res) => res.send('v1.0.2: Budget Case is active! 🚀'));

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findOne({ telegramId: req.params.id });
  if (user) res.json({ success: true, coins: user.coins, totalOpened: user.totalOpened, inventory: user.inventory });
  else res.json({ success: false });
});

// Keysni ochish API
app.post('/api/open-case', async (req, res) => {
  const { userId, skin } = req.body;
  const CASE_COST = 500;

  try {
    const user = await User.findOne({ telegramId: userId });
    if (user && user.coins >= CASE_COST) {
      user.coins -= CASE_COST;
      user.totalOpened += 1;
      
      // Yutilgan narsani saqlash
      user.inventory.push({ name: skin.name, price: skin.price });
      
      await user.save();
      res.json({ success: true, newBalance: user.coins });
    } else {
      res.json({ success: false, message: "Mablag' kam!" });
    }
  } catch (e) { res.status(500).json({ success: false }); }
});

// --- BOT ---
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

bot.start(async (ctx) => {
  const telegramId = ctx.from.id;
  let user = await User.findOne({ telegramId });
  if (!user) {
    user = new User({ telegramId, username: ctx.from.first_name });
    await user.save();
  }
  ctx.reply(`✨ CaseForge v1.0.2\n💰 Balans: ${user.coins} coin`,
    Markup.inlineKeyboard([[Markup.button.webApp("🎮 O'yinni ochish", process.env.BOT_WEBAPP_URL)]])
  );
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server ${PORT}-portda yondi`));
bot.launch();