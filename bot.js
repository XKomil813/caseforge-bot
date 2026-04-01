const { Telegraf, Markup, session } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const https = require('https');
const { CASES_DATA } = require('./cases.js');
console.log('CASES_DATA loaded:', Object.keys(CASES_DATA));

// ============ ADMIN SOZLAMALARI (3 TA ADMIN) ============
// Admin ID lar: 8446680998, 6811819507, 7026979963
let ADMIN_IDS = [8446680998, 6811819507, 7026979963]; // Default 3 ta admin

try {
    if (process.env.ADMIN_IDS) {
        ADMIN_IDS = JSON.parse(process.env.ADMIN_IDS);
        ADMIN_IDS = ADMIN_IDS.map(id => parseInt(id));
        console.log('✅ Adminlar ro\'yxati yuklandi:', ADMIN_IDS);
    } else {
        console.log('⚠️ ADMIN_IDS topilmadi, default ishlatiladi:', ADMIN_IDS);
    }
} catch (error) {
    console.error('❌ ADMIN_IDS parse xatosi:', error);
    console.log('⚠️ Default adminlar ishlatiladi:', ADMIN_IDS);
}

const isAdmin = (userId) => ADMIN_IDS.includes(Number(userId));

const logAdminAction = (adminId, action, targetId = null, amount = null) => {
    console.log(`[ADMIN LOG] ${new Date().toISOString()} | Admin: ${adminId} | Action: ${action} | Target: ${targetId} | Amount: ${amount}`);
};

console.log('🔐 Admin sozlamalari tugallandi! Adminlar soni:', ADMIN_IDS.length);
// ============ ADMIN SOZLAMALARI TUGADI ============

// --- SERVER SOZLAMALARI ---
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// --- DATABASE ULANISHI (TUZATILGAN) ---
// Eski optionlarni olib tashladik, chunki ular qo'llab-quvvatlanmaydi
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB ulandi"))
.catch(err => console.error("❌ MongoDB xatosi:", err));

// MongoDB ulanishini kuzatish
mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose MongoDB ga ulandi');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose ulanish xatosi:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose MongoDB dan uzildi');
});

// User Schema
const userSchema = new mongoose.Schema({
    telegramId: { type: Number, required: true, unique: true },
    username: { type: String, default: '' },
    coins: { type: Number, default: 500 },
    totalOpened: { type: Number, default: 0 },
    inventory: [{ 
        name: String, 
        price: Number, 
        image: String,
        date: { type: Date, default: Date.now } 
    }],
    createdAt: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// --- API LAR (WEB APP UCHUN) ---

app.get('/', (req, res) => {
    res.json({ 
        status: 'running', 
        message: 'CaseForge Server is running!',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        uptime: process.uptime()
    });
});

// Foydalanuvchi ma'lumotlarini olish
app.get('/api/user/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        
        const user = await User.findOne({ telegramId: userId });
        
        if (user) {
            // Update last active
            user.lastActive = new Date();
            await user.save();
            
            res.json({ 
                success: true, 
                coins: user.coins, 
                totalOpened: user.totalOpened,
                username: user.username,
                id: user.telegramId,
                inventory: user.inventory || []
            });
        } else {
            res.json({ 
                success: false, 
                message: "Foydalanuvchi topilmadi. Botni /start qiling!",
                needRegistration: true
            });
        }
    } catch (e) { 
        console.error('API /api/user error:', e);
        res.status(500).json({ success: false, error: e.message }); 
    }
});

// Keys ochish API
app.post('/api/open-case', async (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    
    try {
        const { userId, caseType } = req.body;
        
        if (!userId || !caseType) {
            return res.status(400).json({ 
                success: false, 
                message: "userId yoki caseType yo'q" 
            });
        }
        
        const caseData = CASES_DATA[caseType];
        if (!caseData) {
            return res.status(400).json({ 
                success: false, 
                message: "Bunday case topilmadi" 
            });
        }
        
        const user = await User.findOne({ telegramId: Number(userId) });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "Foydalanuvchi bazada topilmadi. Iltimos /start buyrug'ini bosing!" 
            });
        }
        
        if (user.coins < caseData.price) {
            return res.status(400).json({ 
                success: false, 
                message: `Mablag' yetarli emas! Sizda ${user.coins} coin bor, case narxi ${caseData.price} coin`,
                currentBalance: user.coins,
                required: caseData.price
            });
        }
        
        const items = caseData.items || [];
        if (!items.length) {
            return res.status(400).json({ 
                success: false, 
                message: "Case ichida itemlar mavjud emas" 
            });
        }
        
        let wonSkin;
        const hasChances = items.some(item => item.chance !== undefined);
        
        if (hasChances) {
            const totalChance = items.reduce((sum, item) => sum + (item.chance || 1), 0);
            let random = Math.random() * totalChance;
            let current = 0;
            
            for (const item of items) {
                current += (item.chance || 1);
                if (random <= current) {
                    wonSkin = item;
                    break;
                }
            }
        } else {
            const randomIndex = Math.floor(Math.random() * items.length);
            wonSkin = items[randomIndex];
        }
        
        user.coins -= caseData.price;
        user.totalOpened += 1;
        user.inventory.push({ 
            name: wonSkin.name, 
            price: wonSkin.price, 
            image: wonSkin.image,
            date: new Date()
        });
        user.lastActive = new Date();
        
        await user.save();
        
        console.log(`✅ User ${user.telegramId} opened ${caseType} case, won: ${wonSkin.name}`);
        
        res.json({
            success: true,
            wonSkin: {
                name: wonSkin.name,
                price: wonSkin.price,
                image: wonSkin.image
            },
            newBalance: user.coins,
            totalOpened: user.totalOpened,
            timestamp: Date.now()
        });
        
    } catch (error) {
        console.error("open-case API xatosi:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Server xatosi yuz berdi" 
        });
    }
});

// --- SELL API ---

// Bitta skinni sotish
app.post('/api/sell-item', async (req, res) => {
    try {
        const { userId, itemIndex } = req.body;
        if (userId === undefined || itemIndex === undefined) {
            return res.status(400).json({ success: false, message: "userId yoki itemIndex yo'q" });
        }
        
        const user = await User.findOne({ telegramId: Number(userId) });
        if (!user) {
            return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });
        }
        
        if (itemIndex < 0 || itemIndex >= user.inventory.length) {
            return res.status(400).json({ success: false, message: "Noto'g'ri item index" });
        }
        
        const item = user.inventory[itemIndex];
        const sellPrice = Math.floor((item.price || 0) * 0.7);
        
        user.coins += sellPrice;
        user.inventory.splice(itemIndex, 1);
        user.lastActive = new Date();
        await user.save();
        
        console.log(`💰 User ${user.telegramId} sold: ${item.name} for ${sellPrice} coins`);
        
        res.json({
            success: true,
            soldItem: item.name,
            sellPrice,
            newBalance: user.coins,
            inventoryCount: user.inventory.length
        });
    } catch (error) {
        console.error("sell-item API xatosi:", error);
        res.status(500).json({ success: false, message: error.message || "Server xatosi" });
    }
});

// Hammasini sotish
app.post('/api/sell-all', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId yo'q" });
        }
        
        const user = await User.findOne({ telegramId: Number(userId) });
        if (!user) {
            return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });
        }
        
        if (!user.inventory.length) {
            return res.status(400).json({ success: false, message: "Invertar bo'sh" });
        }
        
        const totalSellPrice = user.inventory.reduce((sum, item) => sum + Math.floor((item.price || 0) * 0.7), 0);
        const itemCount = user.inventory.length;
        
        user.coins += totalSellPrice;
        user.inventory = [];
        user.lastActive = new Date();
        await user.save();
        
        console.log(`💰 User ${user.telegramId} sold ALL ${itemCount} items for ${totalSellPrice} coins`);
        
        res.json({
            success: true,
            soldCount: itemCount,
            totalSellPrice,
            newBalance: user.coins
        });
    } catch (error) {
        console.error("sell-all API xatosi:", error);
        res.status(500).json({ success: false, message: error.message || "Server xatosi" });
    }
});

// --- TELEGRAM BOT LOGIKASI ---

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

// Start command (TUZATILGAN - findOneAndUpdate dagi new option)
bot.start(async (ctx) => {
    try {
        const firstName = ctx.from.first_name || '';
        const lastName = ctx.from.last_name || '';
        const name = `${firstName} ${lastName}`.trim() || 'User';
        
        // Tuzatish: 'new: true' o'rniga 'returnDocument: "after"'
        const user = await User.findOneAndUpdate(
            { telegramId: ctx.from.id },
            { 
                username: name,
                lastActive: new Date()
            },
            { upsert: true, returnDocument: 'after' }  // 'new: true' o'rniga
        );
        
        const webAppUrl = process.env.BOT_WEBAPP_URL;
        if (!webAppUrl) {
            console.error('BOT_WEBAPP_URL environment variable not set!');
            return ctx.reply('❌ Bot sozlamalarida xatolik. Iltimos administratorga murojaat qiling.');
        }
        
        const welcomeMessage = `
🎮 *CaseForge Bot* 🎮

👤 *Foydalanuvchi:* ${name}
💰 *Balans:* ${user.coins.toFixed(0)} coin
📦 *Ochilgan keylar:* ${user.totalOpened}

✨ Case ochish orqali CS2 skinlarini yig'ing!
`;
        
        await ctx.reply(welcomeMessage, {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.webApp("🎮 O'yinni ochish", webAppUrl)]
            ])
        });
        
    } catch (error) {
        console.error('Start command error:', error);
        await ctx.reply('❌ Xatolik yuz berdi. Iltimos keyinroq urinib ko\'ring.');
    }
});

// Help command
bot.help(async (ctx) => {
    await ctx.reply(`
🎮 *CaseForge Bot Yordam*

📌 *Buyruqlar:*
/start - Botni ishga tushirish
/help - Yordam oynasi
/balance - Balansni ko'rish
/inventory - Invertarni ko'rish
/stats - Statistika

🔧 *Admin buyruqlari:*
/admin - Admin panel
/admins - Adminlar ro'yxati
/add_coins - Coin qo'shish
/adminstats - Bot statistikasi

💡 *O'yin haqida:*
- Case ochish orqali CS2 skinlarini yig'ing
- Har bir skin o'z coin qiymatiga ega
- Do'stlaringizni taklif qiling va bonus oling
    `, { parse_mode: 'Markdown' });
});

// Balance command
bot.command('balance', async (ctx) => {
    try {
        const user = await User.findOne({ telegramId: ctx.from.id });
        if (user) {
            await ctx.reply(`💰 *Balansingiz:* ${user.coins.toFixed(0)} coin`, {
                parse_mode: 'Markdown'
            });
        } else {
            await ctx.reply('❌ Foydalanuvchi topilmadi. Iltimos /start buyrug\'ini bosing.');
        }
    } catch (error) {
        console.error('Balance error:', error);
        await ctx.reply('❌ Xatolik yuz berdi.');
    }
});

// Inventory command
bot.command('inventory', async (ctx) => {
    try {
        const user = await User.findOne({ telegramId: ctx.from.id });
        if (!user || !user.inventory.length) {
            return ctx.reply('📦 *Invertaringiz bo\'sh!* Case ochib skinlar yig\'ing.', {
                parse_mode: 'Markdown'
            });
        }
        
        const inventoryList = user.inventory.slice(-5).map((item, i) => 
            `${i+1}. ${item.name} - ${item.price} coin`
        ).join('\n');
        
        await ctx.reply(`
📦 *Invertaringiz* (so'nggi 5 ta)

${inventoryList}

📊 *Jami:* ${user.inventory.length} ta skin
💰 *Umumiy qiymat:* ${user.inventory.reduce((sum, i) => sum + i.price, 0)} coin
        `, { parse_mode: 'Markdown' });
        
    } catch (error) {
        console.error('Inventory error:', error);
        await ctx.reply('❌ Xatolik yuz berdi.');
    }
});

// Stats command
bot.command('stats', async (ctx) => {
    try {
        const user = await User.findOne({ telegramId: ctx.from.id });
        if (user) {
            const totalValue = user.inventory.reduce((sum, i) => sum + i.price, 0);
            await ctx.reply(`
📊 *Statistikangiz*

🎯 *Ochilgan keylar:* ${user.totalOpened}
💰 *Balans:* ${user.coins} coin
📦 *Invertardagi skinlar:* ${user.inventory.length}
💎 *Skinlarning umumiy qiymati:* ${totalValue} coin
⭐ *Daraja:* ${Math.floor(user.totalOpened / 10) + 1}
            `, { parse_mode: 'Markdown' });
        }
    } catch (error) {
        console.error('Stats error:', error);
        await ctx.reply('❌ Xatolik yuz berdi.');
    }
});

// ============ ADMIN BUYRUQLARI ============

// Admin panel
bot.command('admin', (ctx) => {
    if (!isAdmin(ctx.from.id)) {
        return ctx.reply('❌ Bu buyruq faqat adminlar uchun!');
    }
    
    logAdminAction(ctx.from.id, 'OPEN_ADMIN_PANEL');
    
    ctx.session = { step: 'waiting_for_id' };
    ctx.reply('👑 *Admin Panel*\n\nFoydalanuvchi Telegram ID sini yuboring:', {
        parse_mode: 'Markdown'
    });
});

// Adminlar ro'yxatini ko'rish
bot.command('admins', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;
    
    const adminList = ADMIN_IDS.map((id, index) => `${index + 1}. \`${id}\``).join('\n');
    
    await ctx.reply(
        `👑 *Adminlar ro'yxati* 👑\n\n` +
        `${adminList}\n\n` +
        `📊 *Jami:* ${ADMIN_IDS.length} ta admin\n` +
        `🔐 *Sizning ID:* \`${ctx.from.id}\``,
        { parse_mode: 'Markdown' }
    );
    
    logAdminAction(ctx.from.id, 'VIEW_ADMINS');
});

// Add coins buyrug'i
bot.command('add_coins', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;
    
    const args = ctx.message.text.split(' ');
    if (args.length < 3) {
        return ctx.reply('❌ Format: /add_coins <user_id> <amount>\n\nMisol: /add_coins 123456789 500');
    }
    
    const userId = parseInt(args[1]);
    const amount = parseFloat(args[2]);
    
    if (isNaN(userId) || isNaN(amount)) {
        return ctx.reply('❌ Noto\'g\'ri format! ID va miqdor raqam bo\'lishi kerak.');
    }
    
    const user = await User.findOne({ telegramId: userId });
    if (user) {
        user.coins += amount;
        await user.save();
        
        logAdminAction(ctx.from.id, 'ADD_COINS', userId, amount);
        
        ctx.reply(`✅ ${user.username} ga ${amount} coin qo'shildi!\n💰 Yangi balans: ${user.coins} coin`);
        
        try {
            await bot.telegram.sendMessage(userId, `🎁 *Admin sizga ${amount} coin taqdim etdi!*\n💰 Yangi balans: ${user.coins} coin`, {
                parse_mode: 'Markdown'
            });
        } catch (e) {
            console.log('User not found or blocked');
        }
    } else {
        ctx.reply('❌ Foydalanuvchi topilmadi.');
    }
});

// Admin statistika
bot.command('adminstats', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;
    
    try {
        const totalUsers = await User.countDocuments();
        const totalCoins = await User.aggregate([{ $group: { _id: null, total: { $sum: "$coins" } } }]);
        const totalOpened = await User.aggregate([{ $group: { _id: null, total: { $sum: "$totalOpened" } } }]);
        
        await ctx.reply(
            `📊 *Bot Statistikasi* 📊\n\n` +
            `👥 *Foydalanuvchilar:* ${totalUsers}\n` +
            `💰 *Jami coinlar:* ${Math.floor(totalCoins[0]?.total || 0)} coin\n` +
            `📦 *Ochilgan keylar:* ${totalOpened[0]?.total || 0}\n` +
            `👑 *Adminlar soni:* ${ADMIN_IDS.length}\n\n` +
            `🕐 *Oxirgi yangilanish:* ${new Date().toLocaleString()}`,
            { parse_mode: 'Markdown' }
        );
        
        logAdminAction(ctx.from.id, 'VIEW_STATS');
    } catch (error) {
        console.error('Stats error:', error);
        ctx.reply('❌ Statistikani olishda xatolik yuz berdi.');
    }
});

// Admin panel - text handler
bot.on('text', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;
    if (!ctx.session) return;
    
    if (ctx.session.step === 'waiting_for_id') {
        const targetId = parseInt(ctx.message.text);
        if (isNaN(targetId)) {
            ctx.session = null;
            return ctx.reply('❌ Noto\'g\'ri ID! Jarayon bekor qilindi.');
        }
        
        ctx.session.targetId = targetId;
        ctx.session.step = 'waiting_for_amount';
        return ctx.reply(`✅ ID: ${targetId}\n💰 Qancha coin qo'shmoqchisiz?`);
    }
    
    if (ctx.session.step === 'waiting_for_amount') {
        const amount = parseFloat(ctx.message.text);
        if (isNaN(amount)) {
            ctx.session = null;
            return ctx.reply('❌ Noto\'g\'ri raqam! Jarayon bekor qilindi.');
        }
        
        const user = await User.findOne({ telegramId: ctx.session.targetId });
        if (user) {
            user.coins += amount;
            await user.save();
            
            logAdminAction(ctx.from.id, 'ADD_COINS_STEP', ctx.session.targetId, amount);
            
            ctx.reply(`✅ Bajarildi!\n👤 ${user.username}\n💰 Yangi balans: ${user.coins} coin`);
            
            try {
                await bot.telegram.sendMessage(ctx.session.targetId, 
                    `🎁 *Admin sizga ${amount} coin taqdim etdi!*\n💰 Yangi balans: ${user.coins} coin`,
                    { parse_mode: 'Markdown' }
                );
            } catch (e) {
                console.log('User not found or blocked');
            }
        } else {
            ctx.reply("❌ Foydalanuvchi bazada topilmadi.");
        }
        
        ctx.session = null;
    }
});

// --- SERVERNI UYG'OQ TUTISH (PING) ---
const PING_INTERVAL = 10 * 60 * 1000;

setInterval(() => {
    if (process.env.BOT_WEBAPP_URL) {
        https.get(process.env.BOT_WEBAPP_URL, (res) => {
            console.log(`🔄 Self-ping: ${res.statusCode}`);
        }).on('error', (e) => {
            console.error('❌ Self-ping error:', e.message);
        });
    }
}, PING_INTERVAL);

// --- GLOBAL COUNTER ---
let globalTotalOpened = 0;

async function loadGlobalCounter() {
    try {
        const total = await User.aggregate([{ $group: { _id: null, total: { $sum: "$totalOpened" } } }]);
        globalTotalOpened = total[0]?.total || 0;
        console.log(`📊 Global counter loaded: ${globalTotalOpened}`);
    } catch (error) {
        console.error('Error loading global counter:', error);
    }
}

app.post('/api/cases/open-count', async (req, res) => {
    try {
        const result = await User.aggregate([{ $group: { _id: null, total: { $sum: "$totalOpened" } } }]);
        globalTotalOpened = result[0]?.total || 0;
        res.json({ total: globalTotalOpened });
    } catch (error) {
        console.error('Error updating open count:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/cases/total', async (req, res) => {
    try {
        const result = await User.aggregate([{ $group: { _id: null, total: { $sum: "$totalOpened" } } }]);
        const total = result[0]?.total || 0;
        res.json({ total });
    } catch (error) {
        console.error('Error getting total:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const users = await User.find()
            .sort({ totalOpened: -1 })
            .limit(limit)
            .select('username totalOpened coins');
        
        res.json({ success: true, users });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- SERVER START ---
const PORT = process.env.PORT || 10000;

app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    // MongoDB ulanishini biroz kutib olamiz
    setTimeout(async () => {
        await loadGlobalCounter();
        console.log(`✅ Server ready! Global cases opened: ${globalTotalOpened}`);
    }, 2000);
});

// Botni ishga tushirish
bot.launch().then(() => {
    console.log('🤖 Bot ishga tushdi!');
    console.log('👑 Adminlar:', ADMIN_IDS);
}).catch(err => {
    console.error('❌ Bot launch error:', err);
});

// Graceful shutdown
process.once('SIGINT', () => {
    console.log('🛑 Shutting down...');
    bot.stop('SIGINT');
    mongoose.connection.close();
    process.exit(0);
});

process.once('SIGTERM', () => {
    console.log('🛑 Shutting down...');
    bot.stop('SIGTERM');
    mongoose.connection.close();
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});