const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const https = require('https');
const { CASES_DATA } = require('./cases.js');

// --- SERVER SOZLAMALARI ---
const app = express();
app.use(express.json());
app.use(cors()); // Barcha originlarga ruxsat berish

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
    const userId = parseInt(req.params.id);
    const user = await User.findOne({ telegramId: userId });
    
    if (user) {
        res.json({ 
            success: true, 
            coins: user.coins, 
            totalOpened: user.totalOpened,
            username: user.username,
            id: user.telegramId
        });
    } else {
        res.json({ success: false, message: "Foydalanuvchi topilmadi. Botni /start qiling!" });
    }
  } catch (e) { 
      res.status(500).json({ success: false, error: e.message }); 
  }
});

// Keys ochish API
app.post('/api/open-case', async (req, res) => {
    try {
        const { userId, caseType, wonSkin } = req.body; 
        
        if (!userId || !caseType || !wonSkin) {
            return res.json({ success: false, message: "Ma'lumotlar to'liq emas!" });
        }

        const user = await User.findOne({ telegramId: parseInt(userId) });
        const selectedCase = CASES_DATA[caseType];

        if (!user) return res.json({ success: false, message: "Foydalanuvchi topilmadi!" });
        if (!selectedCase) return res.json({ success: false, message: "Keys topilmadi!" });
        
        if (user.coins < selectedCase.price) {
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
  const name = ctx.from.first_name + (ctx.from.last_name ? " " + ctx.from.last_name : "");
  
  const user = await User.findOneAndUpdate(
    { telegramId: ctx.from.id },
    { username: name },
    { upsert: true, new: true }
  );
  
  ctx.reply(`✨ CaseForge v1.0.4\n👤 Foydalanuvchi: ${name}\n💰 Balans: ${user.coins.toFixed(2)} coin`,
    Markup.inlineKeyboard([[
        Markup.button.webApp("🎮 O'yinni ochish", process.env.BOT_WEBAPP_URL)
    ]])
  );
});

// Admin panel (ID yuborish va Coin qo'shish qismi to'g'rilandi)
bot.command('admin', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  ctx.session = { step: 'waiting_for_id' };
  ctx.reply("Foydalanuvchi ID (Telegram ID) yuboring:");
});

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
      
      const user = await User.findOne({ telegramId: parseInt(ctx.session.targetId) });
      if (user) {
        user.coins += amount;
        await user.save();
        ctx.reply(`✅ Bajarildi! ${user.username} balansi: ${user.coins.toFixed(2)}`);
        bot.telegram.sendMessage(ctx.session.targetId, `🎁 Admin sizga ${amount} coin taqdim etdi!`);
      } else { 
        ctx.reply("❌ Foydalanuvchi bazada topilmadi."); 
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
        console.log('Self-ping status: ' + res.statusCode);
      }).on('error', (e) => {
        console.error('Self-ping error: ' + e.message);
      });
  }
}, 600000);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

bot.launch();