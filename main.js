// 1. ASOSIY KONFIGURATSIYA
const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id || "64537281"; // Test uchun ID

// ELEMENTLAR
const rouletteContainer = document.getElementById('roulette-container');
const rouletteItems = document.getElementById('roulette-items');
const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');

// 2. FOYDALANUVCHI MA'LUMOTLARI
async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            if(document.getElementById('balance-display')) 
                document.getElementById('balance-display').innerText = data.coins.toFixed(0);
            
            if(document.getElementById('stats-opened')) 
                document.getElementById('stats-opened').innerText = data.totalOpened;
            
            if(document.getElementById('user-name')) 
                document.getElementById('user-name').innerText = data.username || "Foydalanuvchi";

            // Do'stlar statistikasi
            if(document.getElementById('total-friends'))
                document.getElementById('total-friends').innerText = data.referrals?.length || 0;
            
            if(document.getElementById('total-earned'))
                document.getElementById('total-earned').innerText = (data.referrals?.length * 50) || 0;
        }
    } catch (e) { console.error("Yuklashda xato"); }
}

// 3. RULETKA VA KEYS OCHISH (Optimallashgan)
async function openCase() {
    if (!userId) return;
    statusText.innerHTML = '<span class="text-blue-400 animate-pulse text-[10px]">KEYSNI OCHILMOQDA...</span>';
    openBtn.disabled = true;

    try {
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

function startRoulette(wonSkin) {
    const itemsContainer = document.getElementById('roulette-items');
    const parentContainer = document.getElementById('roulette-container');
    const openBtn = document.querySelector('button[onclick*="openCase"]'); // Tugmani topish

    if (!itemsContainer || !parentContainer) return;

    // 1. Tayyorgarlik
    itemsContainer.innerHTML = ''; 
    itemsContainer.style.transition = 'none';
    itemsContainer.style.left = '0px';

    // 2. Skinlar ro'yxatini olish (ECO case misolida)
    const itemsData = CASES_DATA['eco'].items;
    const totalItems = 60; // Ruletka uzunligi
    const winningIndex = 50; // 50-chi skin yutuq bo'ladi
    const itemWidth = 110; // Har bir skin eni 110px

    // startRoulette funksiyasi ichidagi skin yaratish qismi:
    for (let i = 0; i < totalItems; i++) {
        const item = (i === winningIndex) ? wonSkin : itemsData[Math.floor(Math.random() * itemsData.length)];
        
        const div = document.createElement('div');
        // 'w-24' va 'h-24' o'lchamini bir oz kichraytirdik, shunda sig'ishi oson bo'ladi
        div.className = "flex-shrink-0 w-24 h-24 mx-2 bg-gradient-to-b from-white/10 to-transparent rounded-xl border-b-4 flex flex-col items-center justify-center p-2 relative";
        
        let color = item.price > 10 ? '#eb4b4b' : (item.price > 2 ? '#4b69ff' : '#b0c3d9');
        div.style.borderColor = color;
        
        div.innerHTML = `
            <img src="${item.image}" class="w-14 h-14 object-contain mb-1">
            <p class="text-[6px] text-white/40 font-bold uppercase truncate w-full text-center">${item.name}</p>
        `;
        itemsContainer.appendChild(div);
    }

    setTimeout(() => {
    const itemFullWidth = 112; 
    const parentWidth = parentContainer.offsetWidth;
    const targetOffset = (winningIndex * itemFullWidth) - (parentWidth / 2) + (itemFullWidth / 2);
    
    itemsContainer.style.transition = 'left 5s cubic-bezier(0.1, 0, 0.05, 1)';
    itemsContainer.style.left = `-${targetOffset}px`;
}, 50);


    // 5. NATIJANI KORSATISH (5.5 soniyadan keyin)
    setTimeout(() => {
        // Matnni o'zgartirish uchun elementni ID orqali topamiz
        const statusDisplay = document.getElementById('status-text');
        
        if (statusDisplay) {
            statusDisplay.innerHTML = `
                <div class="flex flex-col items-center animate-bounce">
                    <span class="text-green-400 font-black text-[12px] tracking-tighter uppercase">Tabriklaymiz!</span>
                    <span class="text-[10px] text-white font-bold uppercase tracking-tight">${wonSkin.name}</span>
                </div>
            `;
        }

        // Tugmani qayta yoqish
        if (openBtn) {
            openBtn.disabled = false;
            openBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }

        // Balansni yangilash
        loadUserData(); 
    }, 5500);
}

// 4. VAZIFALAR (STREAK) MANTIQLARI
let streak = parseInt(localStorage.getItem('userStreak')) || 0;
let timerStartTime = parseInt(localStorage.getItem('timerStart')) || 0;
// Name task uchun yangi o'zgaruvchilar (OLDINGI KODINGIZDA YO'Q EDI)
let nameStreak = parseInt(localStorage.getItem('nameStreak')) || 0;
let nameTimerStart = parseInt(localStorage.getItem('nameTimerStart')) || 0;

const rewards = [20, 50, 80, 120, 150, 180, 200];

function handleRewardClick() {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (timerStartTime === 0) {
        timerStartTime = now;
        localStorage.setItem('timerStart', timerStartTime);
        startVisualTimer('reward-btn', oneDay, timerStartTime);
        alert("Tekshirish boshlandi! 24 soatdan keyin qayting.");
    } else if (now - timerStartTime >= oneDay) {
        streak++;
        localStorage.setItem('userStreak', streak);
        localStorage.setItem('timerStart', 0);
        timerStartTime = 0;
        loadUserData(); // Pulni serverga ham qo'shish kerak (Backendda endpoint bo'lsa)
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
            updateUI();
            return;
        }
        const h = Math.floor(timeLeft / 3600000);
        const m = Math.floor((timeLeft % 3600000) / 60000);
        const s = Math.floor((timeLeft % 60000) / 1000);
        btn.innerText = `${h}:${m}:${s}`;
        btn.classList.add('bg-gray-700');
    }, 1000);
}

function updateUI() {
    const btn = document.getElementById('reward-btn');
    if(btn) {
        btn.innerText = `+${rewards[Math.min(streak, 6)]} 🪙`;
        btn.classList.remove('bg-gray-700');
    }
    // Progress bar chizish
    const progress = document.getElementById('streak-progress');
    if(progress) {
        progress.innerHTML = '';
        for(let i=0; i<7; i++) {
            const d = document.createElement('div');
            d.className = `flex-1 h-full rounded-full ${i < streak ? 'bg-blue-500' : 'bg-gray-800'}`;
            progress.appendChild(d);
        }
    }
}

// 5. DO'STLAR VA REFERAL FUNKSIYALARI
function shareToTelegram() {
    const link = `https://t.me/CaseForgeUZBot?start=${userId}`;
    const text = "🔥 CaseForge: Zo'r skinlar yutib olamiz! +200 tanga bonus👇";
    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, '_blank');
}

function copyRefLink() {
    const link = `https://t.me/CaseForgeUZBot?start=${userId}`;
    navigator.clipboard.writeText(link).then(() => {
        alert("Havola nusxalandi!");
    });
}

// 6. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    loadUserData();
    
    if (openBtn) openBtn.addEventListener('click', openCase);

    // Timerni qayta tiklash
    const now = Date.now();
    if (timerStartTime !== 0 && (now - timerStartTime < 86400000)) {
        startVisualTimer('reward-btn', 86400000, timerStartTime);
    }

    // Havola ko'rinishini yangilash
    const refDisplay = document.getElementById('display-ref-link');
    if(refDisplay) refDisplay.innerText = `t.me/CaseForgeUZBot?start=${userId}`;
});
// Har bir do'st uchun 500 coin berish mantiqi
function updateBalance(friendsCount) {
    const rewardPerFriend = 500; // Miqdor: 500 coin
    const totalEarnedFromFriends = friendsCount * rewardPerFriend;

    // 1. Do'stlar bo'limidagi "Jami do'stlar" sonini yangilash
    const totalFriendsElem = document.getElementById('total-friends');
    if (totalFriendsElem) {
        totalFriendsElem.innerText = friendsCount;
    }

    // 2. Do'stlar bo'limidagi "Sizning foydangiz" (500 dan hisoblaganda)
    const totalEarnedElem = document.getElementById('total-earned');
    if (totalEarnedElem) {
        totalEarnedElem.innerText = totalEarnedFromFriends + " 🪙";
    }

    // 3. ASOSIY BALANSNI YANGILASH (Tepadagi katta raqam)
    // Diqqat: Bu yerda 'balance-display' ID-li element bo'lishi shart
    const mainBalanceElem = document.getElementById('balance-display');
    if (mainBalanceElem) {
        // Hozirgi balansni olib, unga do'stlardan kelgan pulni qo'shish mantiqi
        // (Agar bazadan kelayotgan bo'lsa, to'g'ridan-to'g'ri o'shani yozasiz)
        mainBalanceElem.innerText = totalEarnedFromFriends; 
    }
    
    console.log("Balans yangilandi: " + totalEarnedFromFriends + " coin");
}

// MODAL FUNKSIYALARI
window.openTaskModal = () => document.getElementById('taskModal')?.classList.remove('hidden');
window.closeTaskModal = () => document.getElementById('taskModal')?.classList.add('hidden');
window.openNameModal = () => document.getElementById('nameModal')?.classList.remove('hidden');
window.closeNameModal = () => document.getElementById('nameModal')?.classList.add('hidden');

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
    loadUserData();
};