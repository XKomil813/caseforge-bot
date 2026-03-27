require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express'); // FAQAT BIR MARTA

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
  totalOpened: { type: Number, default: 0 }
});
const User = mongoose.model('User', UserSchema);

// --- CRON-JOB VA API ---
// Bu qism Cron-job-dagi "404" va "Output too large" xatolarini yo'qotadi
app.get('/', (req, res) => {
  res.send('v1.0.1: Bot is running! 🚀'); 
});

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findOne({ telegramId: req.params.id });
  if (user) res.json({ success: true, coins: user.coins, totalOpened: user.totalOpened });
  else res.json({ success: false });
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
  ctx.reply(
    `✨ CaseForge v1.0.1\n💰 Balans: ${user.coins} coin`,
    Markup.inlineKeyboard([[Markup.button.webApp("🎮 O'yinni ochish", process.env.BOT_WEBAPP_URL)]])
  );
});

// Admin panel buyrug'i
bot.command('admin', (ctx) => {
  if (ctx.from.id !== 8446680998) return;
  ctx.session = { step: 'get_id' };
  ctx.reply("Admin: Foydalanuvchi ID-sini yuboring:");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server ${PORT}-portda yondi`));
bot.launch();