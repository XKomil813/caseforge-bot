// 1. Telegram WebApp obyektini e'lon qilish
const tg = window.Telegram ? window.Telegram.WebApp : null;

// 2. Asosiy o'zgaruvchilar (Dastur ishlashi uchun tepada bo'lishi shart)
let balance = 0;
let totalOpenedCount = 0;
let invitedFriends = []; // Kelajakda do'stlar ro'yxati uchun

const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');
const balanceDisplay = document.getElementById('balance-display');
const topUpBtn = document.getElementById('topUpBtn');

// 3. Telegramni ishga tushirish va Profil ma'lumotlari
if (tg) {
    tg.expand();
    tg.ready();
    
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const nameElem = document.getElementById('user-name');
        const idElem = document.getElementById('user-id');
        
        if (nameElem) nameElem.innerText = (user.first_name || "Foydalanuvchi").toUpperCase();
        if (idElem) idElem.innerText = `ID: ${user.id || "00000000"}`;
    }
}

// 4. Sahifalararo o'tish (Navigation)
window.showSection = function(sectionId, element) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.add('hidden'));

    const target = document.getElementById(sectionId + '-section');
    if (target) target.classList.remove('hidden');

    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    if (element) {
        element.classList.add('text-orange-500');
        element.classList.remove('text-gray-500');
    } else if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('text-orange-500');
        window.event.currentTarget.classList.remove('text-gray-500');
    }
};

// 5. UI ni yangilash funksiyasi
function updateUI() {
    const displayVal = Math.floor(balance);
    if (balanceDisplay) balanceDisplay.innerText = displayVal;
    
    const statsOpened = document.getElementById('stats-opened');
    if (statsOpened) statsOpened.innerText = totalOpenedCount;
}

// 6. Case ochish mantiqi
if (openBtn) {
    openBtn.addEventListener('click', () => {
        if (balance < 10) {
            statusText.innerHTML = `
                <div class="text-red-500 font-bold font-gaming text-xs animate-bounce">
                    COINLAR YETARLI EMAS!
                </div>`;
            return;
        }

        balance -= 10;
        updateUI();
        openBtn.disabled = true;
        statusText.innerHTML = '<span class="material-icons-outlined animate-spin text-blue-400 text-3xl">sync</span>';

        setTimeout(() => {
            const items = [
                { name: "AK-47 | Redline", color: "text-red-500" },
                { name: "M4A4 | Howl", color: "text-orange-500" },
                { name: "AWP | Dragon Lore", color: "text-yellow-400" },
                { name: "Glock-18 | Fade", color: "text-purple-500" }
            ];
            const win = items[Math.floor(Math.random() * items.length)];
            
            statusText.innerHTML = `
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Yutdingiz:</span>
                    <span class="${win.color} font-gaming font-black text-sm uppercase">${win.name}</span>
                </div>`;
            
            totalOpenedCount++;
            openBtn.disabled = false;
            updateUI();
        }, 1500);
    });
}

// 7. Balansni to'ldirish
if (topUpBtn) {
    topUpBtn.addEventListener('click', () => {
        balance += 100;
        updateUI();
        
        const originalText = topUpBtn.innerHTML;
        topUpBtn.innerHTML = '<span>BAJARILDI!</span>';
        setTimeout(() => { topUpBtn.innerHTML = originalText; }, 1000);
    });
}

// Dasturni ilk bor ishga tushirish
updateUI();