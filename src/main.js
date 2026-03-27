// Telegramdan foydalanuvchi ma'lumotlarini olish
if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    document.getElementById('user-name').innerText = user.first_name || "Foydalanuvchi";
    document.getElementById('user-id').innerText = `ID: ${user.id || "NOMA'LUM"}`;
}

// Statistika uchun o'zgaruvchi
let totalOpenedCount = 0;

// updateUI funksiyasini kengaytiramiz
function updateUI() {
    const displayVal = Math.floor(balance);
    if (balanceDisplay) balanceDisplay.innerText = displayVal;
    
    // Profil qismidagi statistikani yangilash
    const statsOpened = document.getElementById('stats-opened');
    if (statsOpened) statsOpened.innerText = totalOpenedCount;
}

// openBtn bosilganda statistikani oshirish
openBtn.addEventListener('click', () => {
    if (balance >= 10) {
        // ... (avvalgi kodlar: balans ayirish va h.k.)
        
        setTimeout(() => {
            // ... (yutuqni ko'rsatish)
            totalOpenedCount++; // Ochilgan keyslar sonini oshirish
            updateUI();
        }, 1500);
    }
});

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

window.showSection = function(sectionId) {
    // 1. Hamma bo'limlarni (divlarni) yashirish
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => {
        s.classList.add('hidden');
    });

    // 2. Tanlangan bo'limni ko'rsatish
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // 3. Pastki menyu tugmalarining rangini to'g'rilash
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    // 4. Bosilgan tugmani faol (to'q sariq) qilish
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