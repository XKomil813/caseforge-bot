require('dotenv').config();
const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { CASES_DATA } = require('./cases.js');

const app = express();
app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB ulandi"))
  .catch(err => console.error("❌ MongoDB xatosi:", err));

const User = mongoose.model('User', new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  coins: { type: Number, default: 500 },
  totalOpened: { type: Number, default: 0 },
  inventory: [{ name: String, price: Number, date: { type: Date, default: Date.now } }]
}));

function getRandomSkin(items) {
    const rand = Math.random() * 100;
    let cumulative = 0;
    for (const item of items) {
        cumulative += item.chance;
        if (rand < cumulative) return item;
    }
    return items[items.length - 1];
}

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.id });
    if (user) res.json({ success: true, coins: user.coins, totalOpened: user.totalOpened });
    else res.json({ success: false });
  } catch (e) { res.status(500).json({ success: false }); }
});

app.post('/api/open-case', async (req, res) => {
    const { userId } = req.body;
    const CASE_COST = CASES_DATA.budget.price; // 500

    try {
        const user = await User.findOne({ telegramId: userId });
        if (user && user.coins >= CASE_COST) {
            const wonSkin = getRandomSkin(CASES_DATA.budget.items);
            
            user.coins -= CASE_COST;
            user.totalOpened += 1;
            user.inventory.push({ name: wonSkin.name, price: wonSkin.price });
            await user.save();

            res.json({ success: true, newBalance: user.coins, skin: wonSkin });
        } else {
            res.json({ success: false, message: "Mablag' kam!" });
        }
    } catch (e) { res.status(500).json({ success: false }); }
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

const ADMIN_ID = 8446680998;

bot.start(async (ctx) => {
  const user = await User.findOneAndUpdate(
    { telegramId: ctx.from.id },
    { username: ctx.from.first_name },
    { upsert: true, new: true }
  );
  ctx.reply(`✨ CaseForge v1.0.4\n💰 Balans: ${user.coins} coin`,
    Markup.inlineKeyboard([[Markup.button.webApp("🎮 O'yinni ochish", process.env.BOT_WEBAPP_URL)]])
  );
});

bot.command('admin', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  ctx.session = { step: 'waiting_id' };
  ctx.reply("Foydalanuvchi ID yuboring:");
});

bot.on('text', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID || !ctx.session) return;
  if (ctx.session.step === 'waiting_id') {
    ctx.session.targetId = ctx.message.text;
    ctx.session.step = 'waiting_amount';
    ctx.reply("Qancha coin?");
  } else if (ctx.session.step === 'waiting_amount') {
    const amount = parseInt(ctx.message.text);
    await User.findOneAndUpdate({ telegramId: ctx.session.targetId }, { $inc: { coins: amount } });
    ctx.reply("Bajarildi!");
    ctx.session = null;
  }
});

const axios = require('axios');

// Har 10 daqiqada serverni uyg'otib turadi
setInterval(() => {
  axios.get('https://caseforge-bot.onrender.com/')
    .then(() => console.log('Self-ping muvaffaqiyatli!'))
    .catch((err) => console.log('Self-ping xatosi:', err.message));
}, 600000); // 600,000 ms = 10 daqiqa

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
bot.launch();