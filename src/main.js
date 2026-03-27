// Telegram WebApp API ni ishga tushirish
const tg = window.Telegram.WebApp;
tg.expand(); // WebAppni to'liq ekranga yoyish

const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');
const balanceText = document.getElementById('balance');

let balance = 0;

openBtn.addEventListener('click', () => {
    if (balance < 10) {
        statusText.innerText = "Mablag' yetarli emas (Kamida 10$)";
        statusText.classList.add('text-red-500');
        return;
    }

    // Case ochish animatsiyasi simulyatsiyasi
    openBtn.disabled = true;
    statusText.innerText = "Case ochilmoqda...";
    
    setTimeout(() => {
        const items = [
            {name: "AK-47 | Redline", color: "text-red-500"},
            {name: "M4A4 | Howl", color: "text-orange-500"},
            {name: "AWP | Dragon Lore", color: "text-yellow-400"},
            {name: "Glock-18 | Fade", color: "text-purple-500"}
        ];
        const win = items[Math.floor(Math.random() * items.length)];
        
        statusText.innerHTML = `Siz yutdingiz: <span class="${win.color}">${win.name}</span>`;
        openBtn.disabled = false;
        
        // Telegramga ma'lumot yuborish (ixtiyoriy)
        // tg.sendData(JSON.stringify({item: win.name}));
    }, 2000);
});

// To'ldirish tugmasi uchun vaqtincha funksiya
document.getElementById('topUpBtn').addEventListener('click', () => {
    balance += 100;
    balanceText.innerText = balance.toFixed(2);
    statusText.innerText = "Balans to'ldirildi!";
    statusText.classList.remove('text-red-500');
});