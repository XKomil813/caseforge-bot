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