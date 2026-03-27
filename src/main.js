// Telegram WebApp API
const tg = window.Telegram.WebApp;
if (tg) {
    tg.expand();
    tg.ready();
}

// O'zgaruvchilarni e'lon qilish
let balance = 0;
const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');
const balanceDisplay = document.getElementById('balance-display');

// UI ni yangilash funksiyasi (Balansni hamma joyda bir xil ko'rsatish uchun)
function updateUI() {
    const displayVal = Math.floor(balance); // 0.00 dan qutulish uchun
    if (balanceDisplay) balanceDisplay.innerText = displayVal;
    
    // Agar headerda ham balans bo'lsa (ixtiyoriy)
    const altBalance = document.getElementById('balance');
    if (altBalance) altBalance.innerText = displayVal;
}

// Sahifalararo o'tish funksiyasi
window.showSection = function(sectionId) {
    // Hamma bo'limlarni yashirish
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    
    // Tanlangan bo'limni ko'rsatish
    const target = document.getElementById(sectionId + '-section');
    if (target) target.classList.remove('hidden');

    // Navigatsiya tugmalari rangini yangilash
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    // Bosilgan tugmani rangini o'zgartirish
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('text-orange-500');
        event.currentTarget.classList.remove('text-gray-500');
    }
};

// Case ochish logikasi
if (openBtn) {
    openBtn.addEventListener('click', () => {
        if (balance < 10) {
            statusText.innerHTML = `
                <div class="flex items-center text-red-500 font-bold font-gaming text-xs tracking-wider animate-bounce">
                    <span class="material-icons-outlined mr-1 text-sm">error</span>
                    COINLAR YETARLI EMAS!
                </div>`;
            return;
        }

        // Balansni ayirish
        balance -= 10;
        updateUI();

        // Animatsiya boshlanishi
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
            
            // Natijani ko'rsatish
            statusText.innerHTML = `
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Yutdingiz:</span>
                    <span class="${win.color} font-gaming font-black text-sm uppercase tracking-tighter drop-shadow-md">
                        ${win.name}
                    </span>
                </div>`;
            
            openBtn.disabled = false;
        }, 1500);
    });
}

// Balansni to'ldirish (Test rejimi uchun)
const topUpBtn = document.getElementById('topUpBtn');
if (topUpBtn) {
    topUpBtn.addEventListener('click', () => {
        balance += 100;
        updateUI();
        
        // Kichik vizual effekt
        const originalText = topUpBtn.innerHTML;
        topUpBtn.innerHTML = '<span>BAJARILDI!</span>';
        setTimeout(() => {
            topUpBtn.innerHTML = originalText;
        }, 1000);
    });
}

// Boshlang'ich UI yangilanishi
updateUI();