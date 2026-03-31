// 1. ASOSIY KONFIGURATSIYA VA GLOBAL O'ZGARUVCHILAR
const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id || "64537281"; 

let userBalance = 0; 
let userInventory = []; 

// 2. FOYDALANUVCHI MA'LUMOTLARI
async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            userBalance = data.coins;
            updateBalanceDisplay();
            
            if(document.getElementById('stats-opened')) 
                document.getElementById('stats-opened').innerText = data.totalOpened;
            
            if(document.getElementById('user-name')) 
                document.getElementById('user-name').innerText = data.username || "Foydalanuvchi";

            if(document.getElementById('total-friends'))
                document.getElementById('total-friends').innerText = data.referrals?.length || 0;
            
            if(document.getElementById('total-earned'))
                document.getElementById('total-earned').innerText = (data.referrals?.length * 500) + " 🪙";
        }
    } catch (e) { console.error("Ma'lumot yuklashda xato:", e); }
}

function updateBalanceDisplay() {
    const display = document.getElementById('balance-display');
    if (display) display.innerText = Math.floor(userBalance);
}

// 3. RULETKA VA KEYS OCHISH
async function openCase() {
    const statusDisplay = document.getElementById('status-text');
    const openBtn = document.getElementById('openBtn');
    
    if (userBalance < 500) {
        if (statusDisplay) {
            statusDisplay.innerHTML = '<span class="text-red-500 animate-bounce">MABLAG\' YETARLI EMAS!</span>';
            setTimeout(() => { statusDisplay.innerText = "OCHISHGA TAYYOR"; }, 2000);
        }
        return;
    }

    if (openBtn) {
        openBtn.disabled = true;
        openBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    if (statusDisplay) {
        statusDisplay.innerHTML = '<span class="text-blue-400 animate-pulse italic">KEYS OCHILMOQDA...</span>';
    }

    userBalance -= 500;
    updateBalanceDisplay();

    if (typeof CASES_DATA === 'undefined' || !CASES_DATA['eco']) {
        console.error("CASES_DATA topilmadi!");
        return;
    }
    
    const items = CASES_DATA['eco'].items;
    const wonSkin = items[Math.floor(Math.random() * items.length)];

    startRoulette(wonSkin); 
}

function startRoulette(wonSkin) {
    const itemsContainer = document.getElementById('roulette-items');
    const parentContainer = document.getElementById('roulette-container');
    
    if (!itemsContainer || !parentContainer) return;

    itemsContainer.innerHTML = ''; 
    itemsContainer.style.transition = 'none';
    itemsContainer.style.left = '0px';

    const itemsData = CASES_DATA['eco'].items;
    const totalItems = 60; 
    const winningIndex = 50; 
    const itemWidth = 112; 

    for (let i = 0; i < totalItems; i++) {
        const item = (i === winningIndex) ? wonSkin : itemsData[Math.floor(Math.random() * itemsData.length)];
        const div = document.createElement('div');
        div.className = "flex-shrink-0 w-24 h-24 mx-2 bg-gradient-to-b from-white/10 to-transparent rounded-xl border-b-4 flex flex-col items-center justify-center p-2 relative";
        
        let color = item.price > 5 ? '#eb4b4b' : (item.price > 2 ? '#4b69ff' : '#b0c3d9');
        div.style.borderColor = color;
        
        div.innerHTML = `
            <img src="${item.image}" class="w-14 h-14 object-contain mb-1">
            <p class="text-[6px] text-white/40 font-bold uppercase truncate w-full text-center">${item.name}</p>
        `;
        itemsContainer.appendChild(div);
    }

    setTimeout(() => {
        const parentWidth = parentContainer.offsetWidth;
        const targetOffset = (winningIndex * itemWidth) - (parentWidth / 2) + (itemWidth / 2);
        
        itemsContainer.style.transition = 'left 5s cubic-bezier(0.1, 0, 0.05, 1)';
        itemsContainer.style.left = `-${targetOffset}px`;
    }, 50);

    setTimeout(() => {
        const statusDisplay = document.getElementById('status-text');
        const openBtn = document.getElementById('openBtn');

        if (statusDisplay) {
            statusDisplay.innerHTML = `
                <div class="flex flex-col items-center animate-bounce">
                    <span class="text-green-400 font-black text-[12px]">TABRIKLAYMIZ!</span>
                    <span class="text-[10px] text-white font-bold uppercase">${wonSkin.name}</span>
                </div>
            `;
        }

        if (openBtn) {
            openBtn.disabled = false;
            openBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }, 5500);
}

// 4. VAZIFALAR (DAILY REWARD)
let streak = parseInt(localStorage.getItem('userStreak')) || 0;
let timerStartTime = parseInt(localStorage.getItem('timerStart')) || 0;
const rewards = [20, 50, 80, 120, 150, 180, 200];

function handleRewardClick() {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (timerStartTime === 0) {
        timerStartTime = now;
        localStorage.setItem('timerStart', timerStartTime);
        startVisualTimer('reward-btn', oneDay, timerStartTime);
        alert("Tekshirish boshlandi!");
    } else if (now - timerStartTime >= oneDay) {
        streak++;
        localStorage.setItem('userStreak', streak);
        localStorage.setItem('timerStart', 0);
        timerStartTime = 0;
        userBalance += rewards[Math.min(streak-1, 6)];
        updateBalanceDisplay();
        updateUI();
        alert("Mukofot olindi!");
    }
}

function startVisualTimer(btnId, duration, startTime) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = true;
    
    const interval = setInterval(() => {
        const now = Date.now();
        const timeLeft = duration - (now - startTime);
        if (timeLeft <= 0) {
            clearInterval(interval);
            btn.disabled = false;
            updateUI();
            return;
        }
        const h = Math.floor(timeLeft / 3600000);
        const m = Math.floor((timeLeft % 3600000) / 60000);
        const s = Math.floor((timeLeft % 60000) / 1000);
        btn.innerText = `${h}:${m}:${s}`;
    }, 1000);
}

function updateUI() {
    const btn = document.getElementById('reward-btn');
    if(btn && timerStartTime === 0) {
        btn.innerText = `+${rewards[Math.min(streak, 6)]} 🪙`;
    }
}

// 5. INITIALIZATION (TUGATILGAN QISMI)
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    updateUI();
    
    // Tugmani DOM'dan qayta qidiramiz
    const mainOpenBtn = document.getElementById('openBtn');
    if (mainOpenBtn) {
        mainOpenBtn.addEventListener('click', openCase);
    }

    if (timerStartTime !== 0) {
        const now = Date.now();
        if (now - timerStartTime < 86400000) {
            startVisualTimer('reward-btn', 86400000, timerStartTime);
        } else {
            timerStartTime = 0;
            localStorage.setItem('timerStart', 0);
        }
    }
});

// NAVIGATSIYA
window.showSection = function(sectionId, element) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(sectionId);
    if(target) target.classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });
    if (element) element.classList.add('text-orange-500');
};

// Umumiy ochilgan keyslar sonini UI da yangilash funksiyasi
async function updateGlobalCounter() {
    try {
        const response = await fetch(`${RENDER_URL}/api/cases/total`);
        const data = await response.json();
        // Rasmdagi 10.2M turgan joyning ID sini 'global-counter' deb olaylik
        const counterElement = document.getElementById('global-counter');
        if (counterElement) {
            counterElement.innerText = data.total.toLocaleString(); // Masalan: 1,250
        }
    } catch (e) { console.error("Xatolik:", e); }
}

// Keys ochish tugmasi bosilganda
async function incrementGlobalCounter() {
    try {
        const response = await fetch(`${RENDER_URL}/api/cases/open-count`, { method: 'POST' });
        const data = await response.json();
        const counterElement = document.getElementById('global-counter');
        if (counterElement) {
            counterElement.innerText = data.total.toLocaleString();
        }
    } catch (e) { console.error(e); }
}

// Sahifa yuklanganda sonni olish
document.addEventListener('DOMContentLoaded', updateGlobalCounter);

// 1. KEYSLAR RO'YXATI
function showKeysMenu() {
    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="p-6 animate-fade-in">
            <h2 class="text-white font-black mb-6 uppercase tracking-widest text-xl italic">Keyslar To'plami</h2>
            
            <div onclick="showCaseDetail('eco')" 
                 class="relative overflow-hidden bg-gray-900 border border-white/10 rounded-[2rem] p-6 cursor-pointer active:scale-95 transition-all shadow-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-5">
                        <img src="img/eco_case_icon.png" class="w-16 h-16 object-contain">
                        <div>
                            <p class="text-white font-black text-xl italic">ECO CASE</p>
                            <p class="text-blue-400 font-bold text-sm uppercase tracking-tighter">Premium Collection</p>
                        </div>
                    </div>
                    <div class="text-yellow-400 font-black text-lg">500 🪙</div>
                </div>
            </div>
        </div>
    `;
}

// 2. KEYS ICHKI QISMI (100VH VA SCROLL)
function showCaseDetail(caseId) {
    const caseData = CASES_DATA[caseId];
    const container = document.getElementById('main-content');

    const itemsHTML = caseData.items.map(item => `
        <div class="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center relative">
            <img src="${item.image}" class="w-16 h-16 object-contain mb-2">
            <p class="text-[8px] text-white/40 font-bold uppercase truncate w-full text-center">${item.name}</p>
            <p class="text-[10px] text-yellow-400 font-black mt-1">${item.price} 🪙</p>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
            
            <section class="case-hero snap-start relative">
                <button onclick="showKeysMenu()" class="absolute top-6 left-6 z-50 bg-black/50 p-3 rounded-full text-white/70 text-xs font-bold backdrop-blur-md">❮ ORQAGA</button>
                
                <div class="absolute top-6 right-6 text-right">
                    <p id="global-counter" class="text-white font-black text-xl leading-none">0</p>
                    <p class="text-[8px] text-blue-400 font-bold tracking-widest uppercase">Ochildi</p>
                </div>

                <div class="mb-8 text-center">
                    <img src="img/eco_case_big.png" class="w-48 h-48 object-contain mx-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-pulse">
                    <h1 class="text-white font-black text-4xl italic mt-4 tracking-tighter uppercase">${caseData.name}</h1>
                </div>

                <div class="w-full px-10 max-w-md">
                    <button id="openBtn" onclick="handleOpenCase('${caseId}')" 
                            class="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] active:scale-95 transition-all text-lg">
                        OCHISH <span class="ml-2 opacity-50">| ${caseData.price} 🪙</span>
                    </button>
                </div>

                <div class="absolute bottom-10 flex flex-col items-center scroll-down-indicator">
                    <p class="text-white/20 text-[10px] font-bold mb-2 uppercase tracking-widest">Skinlarni ko'rish</p>
                    <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
                </div>
            </section>

            <section class="p-6 bg-black snap-start min-h-screen">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-white/30 font-black text-xs uppercase tracking-[0.3em]">Keys ichidagi buyumlar</h3>
                    <div class="h-[1px] flex-1 bg-white/10 ml-4"></div>
                </div>
                
                <div class="grid grid-cols-3 gap-3">
                    ${itemsHTML}
                </div>
            </section>
        </div>
    `;
    
    updateGlobalCounter();
}

function showCaseDetail(caseId) {
    const caseData = CASES_DATA[caseId];
    const container = document.getElementById('main-content');

    // Skinlarni HTML ko'rinishida yig'ish
    const itemsHTML = caseData.items.map(item => `
        <div class="bg-gray-900/80 border-b-2 border-white/5 rounded-xl p-2 flex flex-col items-center justify-center relative group">
            <span class="absolute top-1 right-1 text-[6px] text-white/20 font-bold">STK</span>
            <img src="${item.image}" class="w-12 h-12 object-contain mb-1 group-hover:scale-110 transition-transform">
            <p class="text-[7px] text-white/50 font-medium truncate w-full text-center uppercase">${item.name}</p>
            <p class="text-[8px] text-yellow-400 font-black mt-1">${item.price} 🪙</p>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="flex flex-col h-full animate-slide-up">
            <div class="p-4 flex items-center justify-between bg-black/40 backdrop-blur-md">
                <button onclick="showKeysMenu()" class="text-white/50 text-xs font-bold">❮ ORQAGA</button>
                <div class="flex flex-col items-end">
                    <span id="global-counter" class="text-white font-black text-sm leading-none">0</span>
                    <span class="text-[7px] text-white/30 font-bold tracking-widest uppercase">Umumiy Ochildi</span>
                </div>
            </div>

            <div id="roulette-container" class="relative w-full h-32 bg-black/20 my-4 flex items-center overflow-hidden border-y border-white/5">
                <div id="roulette-items" class="flex absolute left-0 transition-all"></div>
                <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-10 shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
            </div>

            <div class="px-6 mb-6">
                <button id="openBtn" onclick="handleOpenCase('${caseId}')" 
                        class="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-3">
                    <span>OCHISH</span>
                    <span class="bg-black/20 px-3 py-1 rounded-lg text-xs">${caseData.price} 🪙</span>
                </button>
                <div id="status-text" class="text-center mt-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">Yutuqni kutmoqda...</div>
            </div>

            <div class="px-4 pb-10">
                <p class="text-white/30 text-[9px] font-black mb-3 uppercase tracking-widest">Keys ichidagi buyumlar</p>
                <div class="grid grid-cols-4 gap-2">
                    ${itemsHTML}
                </div>
            </div>
        </div>
    `;
    
    // Global hisoblagichni serverdan yuklash
    updateGlobalCounter();
}

async function handleOpenCase(caseId) {
    if (userBalance < CASES_DATA[caseId].price) {
        alert("Mablag' yetarli emas!");
        return;
    }

    // Balansni ayirish
    userBalance -= CASES_DATA[caseId].price;
    updateBalanceDisplay();
    
    // Serverdagi global hisoblagichni oshirish
    incrementGlobalCounter();

    // Ruletka mantiqini chaqirish
    const wonSkin = getRandomSkin(caseId); // Bu funksiya sizda bor deb hisoblaymiz
    startRoulette(wonSkin);
}