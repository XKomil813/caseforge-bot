// 1. O'zgaruvchilarni e'lon qilish
const tg = window.Telegram ? window.Telegram.WebApp : null;
let balance = 0;
let totalOpenedCount = 0;

const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');
const balanceDisplay = document.getElementById('balance-display');
const topUpBtn = document.getElementById('topUpBtn');

// 2. Telegramni ishga tushirish
if (tg) {
    tg.expand();
    tg.ready();
    
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const nameElem = document.getElementById('user-name');
        const idElem = document.getElementById('user-id');
        if (nameElem) nameElem.innerText = user.first_name || "Foydalanuvchi";
        if (idElem) idElem.innerText = `ID: ${user.id || "00000000"}`;
    }
}

// 3. BO'LIMLARNI ALMASHTIRISH (Xatosiz variant)
window.showSection = function(sectionId, element) {
    // Hamma bo'limlarni yashirish
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.add('hidden'));

    // Tanlangan bo'limni ko'rsatish
    const target = document.getElementById(sectionId + '-section');
    if (target) {
        target.classList.remove('hidden');
    }

    // Navigatsiya tugmalari rangini yangilash
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    // Bosilgan tugmani rangini o'zgartirish
    // Agar element funksiya orqali kelsa, uni rangini o'zgartiramiz
    if (element) {
        element.classList.add('text-orange-500');
        element.classList.remove('text-gray-500');
    } else if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('text-orange-500');
        window.event.currentTarget.classList.remove('text-gray-500');
    }
};

// 4. UI yangilash
function updateUI() {
    const displayVal = Math.floor(balance);
    if (balanceDisplay) balanceDisplay.innerText = displayVal;
    
    const statsOpened = document.getElementById('stats-opened');
    if (statsOpened) statsOpened.innerText = totalOpenedCount;
}

// 5. Case ochish logikasi
if (openBtn) {
    openBtn.addEventListener('click', () => {
        if (balance < 10) {
            statusText.innerHTML = `<div class="text-red-500 font-bold font-gaming text-xs animate-bounce">COINLAR YETARLI EMAS!</div>`;
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
                { name: "AWP | Dragon Lore", color: "text-yellow-400" }
            ];
            const win = items[Math.floor(Math.random() * items.length)];
            
            statusText.innerHTML = `<span class="${win.color} font-gaming font-black text-sm uppercase">${win.name}</span>`;
            
            totalOpenedCount++;
            openBtn.disabled = false;
            updateUI();
        }, 1500);
    });
}

// 6. Balansni to'ldirish
if (topUpBtn) {
    topUpBtn.addEventListener('click', () => {
        balance += 100;
        updateUI();
    });
}

// Ilk yuklanganda UI ni chizish
updateUI();