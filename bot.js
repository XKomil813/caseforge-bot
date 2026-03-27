require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// --- DATABASE ULANISHI ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB-ga muvaffaqiyatli ulandi"))
  .catch(err => console.error("❌ MongoDB ulanishida xato:", err));

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  coins: { type: Number, default: 0 },
  totalOpened: { type: Number, default: 0 }
});
const User = mongoose.model('User', UserSchema);

const bot = new Telegraf(process.env.BOT_TOKEN);

// --- EXPRESS API (O'yin bilan bog'lanish uchun) ---
const app = express();
app.use(cors());
app.use(express.json());

// Foydalanuvchi ma'lumotlarini olish API
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: parseInt(req.params.id) });
    if (user) res.json({ success: true, coins: user.coins, totalOpened: user.totalOpened });
    else res.status(404).json({ success: false });
  } catch (err) { res.status(500).json({ success: false }); }
});

// Keys ochganda balansni kamaytirish API
app.post('/api/open-case', async (req, res) => {
  const { userId, cost } = req.body;
  try {
    const user = await User.findOne({ telegramId: parseInt(userId) });
    if (user && user.coins >= cost) {
      user.coins -= cost;
      user.totalOpened += 1;
      await user.save();
      res.json({ success: true, newBalance: user.coins });
    } else {
      res.status(400).json({ success: false, message: "Mablag' yetarli emas" });
    }
  } catch (err) { res.status(500).json({ success: false }); }
});

// --- TELEGRAM BOT QISMI ---
bot.start(async (ctx) => {
  try {
    const telegramId = ctx.from.id;
    let user = await User.findOne({ telegramId });

    if (!user) {
      // Yangi foydalanuvchi yaratish
      user = new User({
        telegramId,
        username: ctx.from.first_name || "O'yinchi",
        coins: 500 // Bonus 500 coin
      });
      await user.save();
      console.log(`Yangi foydalanuvchi saqlandi: ${telegramId}`);
    }

    // BU XABAR HAR DOIM CHIQISHI KERAK (if ichida emas, tashqarida)
    return ctx.reply(
      `Salom, ${ctx.from.first_name}!\n\n💰 Balansingiz: ${user.coins} coin.`,
      Markup.inlineKeyboard([
        [Markup.button.webApp("🎮 CaseForge-ni ochish", process.env.BOT_WEBAPP_URL)]
      ])
    );
  } catch (error) {
    console.error("Start xatosi:", error);
    ctx.reply("Bot ishga tushishida xatolik yuz berdi.");
  }
});

// Botni va API-ni birga yurgizish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
bot.launch();