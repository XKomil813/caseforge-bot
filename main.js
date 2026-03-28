const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id;

async function loadUserData() {
    if (!userId) {
        console.log("Foydalanuvchi ID topilmadi, Telegram ichida oching.");
        return;
    }
    try {
        // Server "uyg'onishi" uchun timeoutni uzaytiramiz
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`, { 
            signal: AbortSignal.timeout(10000) // 10 soniya kutish
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById('balance-display').innerText = data.coins;
            document.getElementById('stats-opened').innerText = data.totalOpened;
        }
    } catch (e) {
        console.log("Server hali uyg'onmagan bo'lishi mumkin...");
    }
}

// main.js boshida
window.showSection = function(sectionId, element) {
    // 1. Hamma bo'limlarni yashirish
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => {
        s.classList.add('hidden');
    });

    // 2. Tanlangan bo'limni ko'rsatish
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }

    // 3. Pastki menyudagi tugmalar rangini yangilash
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    // 4. Bosilgan tugmani faol (to'q sariq) qilish
    if (element) {
        element.classList.add('text-orange-500');
        element.classList.remove('text-gray-500');
    }
};

// main.js ichida
openBtn.addEventListener('click', async () => {
    const statusText = document.getElementById('status');
    try {
        statusText.innerHTML = '<span class="animate-spin">⌛</span>';
        const response = await fetch(`${RENDER_URL}/api/open-case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId }) // Faqat ID yuboramiz
        });
        const data = await response.json();

        if (data.success) {
            document.getElementById('balance-display').innerText = data.newBalance;
            // Serverdan kelgan skin ma'lumotini ko'rsatamiz
            statusText.innerHTML = `
                <img src="${data.skin.image}" class="inline w-10 h-10 mr-2"/>
                <span class="${data.skin.color}">${data.skin.name} yutdingiz!</span>`;
            loadUserData();
        } else {
            statusText.innerText = data.message;
        }
    } catch (e) { statusText.innerText = "Server xatosi!"; }
});

loadUserData();