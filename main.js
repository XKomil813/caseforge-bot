const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com'; // O'zingizning Render manzilingiz
const userId = tg?.initDataUnsafe?.user?.id;

// 1. Foydalanuvchi ma'lumotlarini yuklash
async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            if(document.getElementById('balance-display')) document.getElementById('balance-display').innerText = data.coins;
            if(document.getElementById('stats-opened')) document.getElementById('stats-opened').innerText = data.totalOpened;
            if(document.getElementById('user-name')) document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name.toUpperCase();
            if(document.getElementById('user-id')) document.getElementById('user-id').innerText = `ID: ${userId}`;
        }
    } catch (e) { console.error("Ma'lumot yuklashda xato:", e); }
}

// 2. Sahifalararo o'tish (Navigatsiya) - BU QISMI NAVIGATSIYANI ISHLATADI
window.showSection = function(sectionId, element) {
    // Barcha bo'limlarni yashirish
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.add('hidden'));

    // Tanlangan bo'limni ko'rsatish
    const target = document.getElementById(sectionId + '-section');
    if (target) target.classList.remove('hidden');

    // Navigatsiya tugmalari rangini yangilash
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    // Bosilgan tugmani faollashtirish
    if (element && typeof element !== 'string') {
        element.classList.add('text-orange-500');
        element.classList.remove('text-gray-500');
    }
};

// 3. Case ochish mantiqi
const openBtn = document.getElementById('openBtn');
if (openBtn) {
    openBtn.addEventListener('click', async () => {
        const statusText = document.getElementById('status');
        try {
            const response = await fetch(`${RENDER_URL}/api/open-case`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, cost: 10 })
            });
            const data = await response.json();

            if (data.success) {
                openBtn.disabled = true;
                statusText.innerHTML = '<span class="material-icons-outlined animate-spin text-blue-400 text-3xl">sync</span>';
                
                setTimeout(() => {
                    document.getElementById('balance-display').innerText = data.newBalance;
                    statusText.innerHTML = `<span class="text-yellow-400 font-gaming">AWP | Dragon Lore yutdingiz!</span>`;
                    openBtn.disabled = false;
                    loadUserData();
                }, 1500);
            } else {
                alert("Mablag' yetarli emas!");
            }
        } catch (e) { alert("Server bilan ulanish xatosi!"); }
    });
}

// Telegram WebApp-ni ishga tushirish
if (tg) { tg.expand(); tg.ready(); }
loadUserData();