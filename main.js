const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id;

// Elementlarni olish
const rouletteContainer = document.getElementById('roulette-container');
const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');

// Foydalanuvchi ma'lumotlarini yangilash
async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            document.getElementById('balance-display').innerText = data.coins.toFixed(0);
            document.getElementById('stats-opened').innerText = data.totalOpened;
            if(document.getElementById('user-name')) {
                document.getElementById('user-name').innerText = data.username || "Foydalanuvchi";
            }
        }
    } catch (e) { console.error("Yuklashda xato"); }
}

// RULETKA MANTIQI
function startRoulette(wonSkin) {
    // cases.js dan barcha itemlarni olish
    const items = CASES_DATA['eco'].items; 
    
    rouletteContainer.innerHTML = '';
    rouletteContainer.style.transition = 'none';
    rouletteContainer.style.left = '0px';

    const totalItems = 60; 
    const winningIndex = 50; 
    const itemWidth = 110; 

    for (let i = 0; i < totalItems; i++) {
        // Har safar boshqa itemlarni tasodifiy aralashtiramiz
        const item = (i === winningIndex) ? wonSkin : items[Math.floor(Math.random() * items.length)];
        
        const div = document.createElement('div');
        div.className = "min-w-[100px] h-28 mx-1.5 bg-white/5 rounded-xl border-b-4 flex flex-col items-center justify-center p-2";
        
        // Narxiga qarab rang berish
        const borderColor = item.price > 10 ? '#eb4b4b' : (item.price > 2 ? '#4b69ff' : '#b0c3d9');
        div.style.borderColor = borderColor;
        
        div.innerHTML = `
            <img src="${item.image}" class="w-16 h-16 object-contain">
            <span class="text-[7px] mt-2 text-center font-gaming truncate w-full px-1 opacity-70">${item.name}</span>
        `;
        rouletteContainer.appendChild(div);
    }

    // Animatsiyani boshlash
    setTimeout(() => {
        const viewportWidth = rouletteContainer.parentElement.offsetWidth;
        const targetOffset = (winningIndex * itemWidth) - (viewportWidth / 2) + (itemWidth / 2);
        
        rouletteContainer.style.transition = 'left 5s cubic-bezier(0.15, 0, 0.05, 1)';
        rouletteContainer.style.left = `-${targetOffset}px`;
    }, 50);

    // Natijani ko'rsatish (Ruletka to'xtaganda)
    setTimeout(() => {
        // MUHIM: Aynan serverdan kelgan wonSkin nomini chiqaramiz
        statusText.innerHTML = `
            <div class="animate-bounce flex flex-col items-center">
                <span class="text-green-400 font-black text-[12px]">TABRIKLAYMIZ!</span>
                <span class="text-[10px] text-white/90 font-bold uppercase text-center tracking-tighter">
                    ${wonSkin.name}
                </span>
            </div>`;
        openBtn.disabled = false;
        loadUserData();
    }, 5500);
}

// ASOSIY FUNKSIYA (openBtn shuni chaqiradi)
async function openCase() {
    if (!userId) return;
    
    // Eski natijani tozalash
    statusText.innerHTML = '<span class="text-blue-400 animate-pulse text-[10px]">KEYSNI OCHILMOQDA...</span>';
    openBtn.disabled = true;

    try {
        // Cache bo'lib qolmasligi uchun URL oxiriga vaqtni qo'shamiz
        const response = await fetch(`${RENDER_URL}/api/open-case?t=${Date.now()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, caseType: 'eco' })
        });
        const data = await response.json();

        if (data.success) {
            startRoulette(data.wonSkin);
        } else {
            statusText.innerHTML = `<span class="text-red-500 text-[10px]">${data.message}</span>`;
            openBtn.disabled = false;
        }
    } catch (e) {
        statusText.innerHTML = '<span class="text-red-500 text-[10px]">ALOQA XATOSI</span>';
        openBtn.disabled = false;
    }
}

// Navigatsiya
window.showSection = function(sectionId, element) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });
    if (element) element.classList.add('text-orange-500');
    loadUserData();
};

let taskData = {
    bioStatus: false, // Bio-da havola bormi?
    currentStreak: 0, // Necha kun ketma-ket kirgan
    lastEntryDate: null, // Oxirgi kirgan sanasi
    rewards: [20, 50, 80, 120, 150, 180, 200] // Kunlik mukofotlar jadvali
};

function calculateTaskStatus() {
    const now = new Date();
    if (!taskData.lastEntryDate) {
        taskData.currentStreak = 0;
    } else {
        const lastDate = new Date(taskData.lastEntryDate);
        const diffTime = Math.abs(now - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 3) {
            // 3 kundan ko'p kirmasa - 0 dan boshlanadi
            taskData.currentStreak = 0;
        } else if (diffDays === 1) {
            // Har kuni kirsa streak oshadi
            taskData.currentStreak++;
        }
    }
}

function updateTasksUI() {
    const container = document.getElementById('tasks-container');
    if (!container) return;

    // Streak bo'yicha mukofotni aniqlash
    const dayIndex = taskData.currentStreak >= 7 ? 6 : taskData.currentStreak;
    const currentReward = taskData.rewards[dayIndex];

    // HTML-ni qayta shakllantirish (0 kundan boshlangan holat)
    container.innerHTML = `
        <div class="bg-[#11141d] border border-white/5 p-4 rounded-2xl flex flex-col group">
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <p class="text-[11px] font-black font-gaming uppercase text-white tracking-tight">Bio-da referal havolasi</p>
                    <p class="text-[9px] text-gray-500 mt-1">${taskData.currentStreak}/7 Kun • Bugungi: +${currentReward} 🪙</p>
                </div>
                <button class="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-xl text-[10px] font-black font-gaming uppercase">
                    Tekshirish
                </button>
            </div>
            
            <div class="flex space-x-1 h-1 w-full">
                ${Array.from({length: 10}).map((_, i) => `
                    <div class="flex-1 ${i < taskData.currentStreak ? 'bg-blue-500' : 'bg-gray-800'} rounded-full"></div>
                `).join('')}
            </div>
        </div>
    `;
}

// Hodisani bog'lash
if (openBtn) openBtn.addEventListener('click', openCase);

// Birinchi marta yuklash
loadUserData();