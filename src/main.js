// Telegram WebApp API ni ishga tushirish
const tg = window.Telegram.WebApp;
if (tg) {
    tg.expand(); // WebAppni to'liq ekranga yoyish
    tg.ready();
}

const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');
const balanceText = document.getElementById('balance');
const totalOpenedText = document.getElementById('total-opened');

let balance = 0;
let totalOpened = 0;

// Case ochish logikasi
openBtn.addEventListener('click', () => {
    // Balansni tekshirish
    if (balance < 10) {
        statusText.innerHTML = '<span class="material-icons-outlined text-red-500 mr-1 text-sm">error_outline</span> Mablag\' yetarli emas (Kamida 10$)';
        return;
    }

    // Jarayon boshlanishi
    openBtn.disabled = true;
    balance -= 10; // 10$ ayirish
    balanceText.innerText = balance.toFixed(2);
    
    statusText.innerHTML = '<span class="material-icons-outlined animate-spin mr-2 text-sm text-blue-400">sync</span> Keys aylanmoqda...';

    // Case ochish animatsiyasi simulyatsiyasi (2 soniya)
    setTimeout(() => {
        const items = [
            {name: "AK-47 | Redline", color: "text-red-500", icon: "local_fire_department"},
            {name: "M4A4 | Howl", color: "text-orange-500", icon: "auto_awesome"},
            {name: "AWP | Dragon Lore", color: "text-yellow-400", icon: "military_tech"},
            {name: "Glock-18 | Fade", color: "text-purple-500", icon: "palette"}
        ];
        
        // Tasodifiy yutuqni tanlash
        const win = items[Math.floor(Math.random() * items.length)];
        
        // Natijani chiqarish
        statusText.innerHTML = `
            <span class="material-icons-outlined ${win.color} mr-1 text-sm">${win.icon}</span> 
            Yutuq: <span class="${win.color} font-bold">${win.name}</span>
        `;
        
        // Statistika yangilash
        totalOpened++;
        if (totalOpenedText) {
            totalOpenedText.innerText = totalOpened;
        }

        openBtn.disabled = false;

        // Telegramga ma'lumot yuborish (agar kerak bo'lsa)
        // tg.sendData(JSON.stringify({item: win.name, price: 10}));
        
    }, 2000);
});

// Balansni to'ldirish tugmasi (Test uchun)
const topUpBtn = document.getElementById('topUpBtn');
if (topUpBtn) {
    topUpBtn.addEventListener('click', () => {
        balance += 100;
        balanceText.innerText = balance.toFixed(2);
        statusText.innerHTML = '<span class="material-icons-outlined text-green-400 mr-1 text-sm">check_circle</span> Balans +100$ ga to\'ldirildi!';
    });
}

// Navigatsiya funksiyasi (Sahifalararo o'tish)
window.showSection = function(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(sectionId + '-section');
    if (target) {
        target.classList.remove('hidden');
    }

    // Menyudagi faol tugmani belgilash
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('text-blue-500');
        btn.classList.add('text-gray-400');
    });
    event.currentTarget.classList.add('text-blue-500');
    event.currentTarget.classList.remove('text-gray-400');
};