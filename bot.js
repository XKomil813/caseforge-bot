const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const https = require('https');
const { CASES_DATA } = require('./cases.js');

// --- SERVER SOZLAMALARI ---
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

// --- DATABASE ULANISHI ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB ulandi"))
  .catch(err => console.error("❌ MongoDB xatosi:", err));

const User = mongoose.model('User', new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  coins: { type: Number, default: 500 },
  totalOpened: { type: Number, default: 0 },
  inventory: [{ 
      name: String, 
      price: Number, 
      image: String,
      date: { type: Date, default: Date.now } 
  }]
}));

// --- API LAR (WEB APP UCHUN) ---

app.get('/', (req, res) => {
  res.send('CaseForge Server is running!');
});

// Foydalanuvchi ma'lumotlarini olish
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.id });
    if (user) {
        res.json({ success: true, coins: user.coins, totalOpened: user.totalOpened });
    } else {
        res.json({ success: false, message: "Foydalanuvchi topilmadi" });
    }
  } catch (e) { 
      res.status(500).json({ success: false }); 
  }
});

// Keys ochish API
app.post('/api/open-case', async (req, res) => {
    try {
        const { userId, caseType, wonSkin } = req.body; 
        const user = await User.findOne({ telegramId: userId });

        const selectedCase = CASES_DATA[caseType]; // 'eco' yoki 'budget'

        if (!user || !selectedCase || user.coins < selectedCase.price) {
            return res.json({ success: false, message: "Mablag' yetarli emas!" });
        }

        // Balansni ayirish va inventarga qo'shish
        user.coins -= selectedCase.price;
        user.totalOpened += 1;
        user.inventory.push({
            name: wonSkin.name,
            price: wonSkin.price,
            image: wonSkin.image
        });
        
        await user.save();

        res.json({ 
            success: true, 
            newBalance: user.coins, 
            wonSkin: wonSkin 
        });
    } catch (error) {
        console.error("Open Case Error:", error);
        res.status(500).json({ success: false, error: "Server ichki xatosi" });
    }
});

// --- TELEGRAM BOT LOGIKASI ---

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

const ADMIN_ID = 8446680998;

bot.start(async (ctx) => {
  const user = await User.findOneAndUpdate(
    { telegramId: ctx.from.id },
    { username: ctx.from.first_name },
    { upsert: true, new: true }
  );
  ctx.reply(`✨ CaseForge v1.0.4\n💰 Balans: ${user.coins.toFixed(2)} coin`,
    Markup.inlineKeyboard([[
        Markup.button.webApp("🎮 O'yinni ochish", process.env.BOT_WEBAPP_URL)
    ]])
  );
});

// Admin panel buyrug'i
bot.command('admin', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  ctx.session = { step: 'waiting_for_id' };
  ctx.reply("Foydalanuvchi ID (Telegram ID) yuboring:");
});

// Admin xabarlarini qayta ishlash
bot.on('text', async (ctx) => {
  if (ctx.from.id === ADMIN_ID && ctx.session) {
    
    if (ctx.session.step === 'waiting_for_id') {
      ctx.session.targetId = ctx.message.text;
      ctx.session.step = 'waiting_for_amount';
      return ctx.reply(`ID: ${ctx.session.targetId}\nQancha coin qo'shmoqchisiz?`);
    }
    
    if (ctx.session.step === 'waiting_for_amount') {
      const amount = parseFloat(ctx.message.text);
      if (isNaN(amount)) return ctx.reply("Faqat raqam yuboring!");
      
      const user = await User.findOne({ telegramId: ctx.session.targetId });
      if (user) {
        user.coins += amount;
        await user.save();
        ctx.reply(`✅ Muvaffaqiyatli! ${user.username} balansi: ${user.coins}`);
        bot.telegram.sendMessage(ctx.session.targetId, `🎁 Admin sizga ${amount} coin taqdim etdi!`);
      } else { 
        ctx.reply("❌ Foydalanuvchi topilmadi."); 
      }
      ctx.session = null;
      return;
    }
  }
});

// --- SERVERNI UYG'OQ TUTISH ---
setInterval(() => {
  if(process.env.BOT_WEBAPP_URL) {
      https.get(process.env.BOT_WEBAPP_URL, (res) => {
        console.log('Self-ping: ' + res.statusCode);
      }).on('error', (e) => {
        console.error('Self-ping xatosi: ' + e.message);
      });
  }
}, 600000); // 10 daqiqa

// --- ISHGA TUSHIRISH ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

bot.launch();
console.log("🤖 Bot ishga tushdi!");