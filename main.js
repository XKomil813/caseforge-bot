const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id;
const userFirstName = tg?.initDataUnsafe?.user?.first_name || "Foydalanuvchi";

// Ma'lumotlarni yozish
if (userId) {
    document.getElementById('user-name').innerText = userFirstName;
    document.getElementById('user-id').innerText = `ID: ${userId}`;
}

async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            document.getElementById('balance-display').innerText = data.coins.toFixed(0);
            document.getElementById('stats-opened').innerText = data.totalOpened;
        }
    } catch (e) { console.log("Ma'lumot yangilashda xato."); }
}

window.showSection = function(sectionId, element) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });
    if (element) element.classList.add('text-orange-500');
    loadUserData();
};

// RULETKA MANTIQI
const rouletteContainer = document.getElementById('roulette-container');
const openBtn = document.getElementById('openBtn');

async function openCaseRequest() {
    if (!userId) return alert("Faqat Telegramda ishlaydi!");
    
    const statusText = document.getElementById('status');
    statusText.innerHTML = '<span class="text-blue-400 animate-pulse text-xs">ALOQA O\'RNATILMOQDA...</span>';

    try {
        const response = await fetch(`${RENDER_URL}/api/open-case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, caseType: 'eco' })
        });
        const data = await response.json();

        if (data.success) {
            // Serverdan hamma itemlar va yutilgan skin kelishi kerak
            // Agar bot.js da allItems yubormayotgan bo'lsangiz, cases.js dan olamiz
            const allItems = CASES_DATA['eco'].items;
            startRoulette(allItems, data.wonSkin);
            openBtn.disabled = true; // Takroriy bosishni o'chirish
        } else {
            statusText.innerHTML = `<span class="text-red-500 text-xs">${data.message}</span>`;
        }
    } catch (e) {
        statusText.innerHTML = '<span class="text-red-500 text-xs">SERVER XATOSI!</span>';
    }
}

function startRoulette(items, wonSkin) {
    rouletteContainer.innerHTML = '';
    rouletteContainer.style.transition = 'none';
    rouletteContainer.style.left = '0px';

    const totalItems = 50; // Jami aylanadigan elementlar
    const winningIndex = 40; // Yutuq nechanchi bo'lib chiqishi (ruletka oxiriga yaqin)
    const itemWidth = 110; // 100px rasm + 10px margin

    for (let i = 0; i < totalItems; i++) {
        // Agar winningIndex bo'lsa, server bergan skinni qo'yamiz, aks holda tasodifiy
        const item = (i === winningIndex) ? wonSkin : items[Math.floor(Math.random() * items.length)];
        
        const div = document.createElement('div');
        div.className = "roulette-item";
        div.innerHTML = `
            <img src="${item.image}" class="w-12 h-12 object-contain">
            <span class="text-[7px] mt-1 text-center px-1 truncate w-full uppercase">${item.name}</span>
        `;
        rouletteContainer.appendChild(div);
    }

    // Animatsiya
    setTimeout(() => {
        // O'rtaga to'xtatish uchun hisoblash
        const viewportWidth = document.querySelector('.relative.w-full.overflow-hidden').offsetWidth;
        const targetOffset = (winningIndex * itemWidth) - (viewportWidth / 2) + (itemWidth / 2);
        
        rouletteContainer.style.transition = 'left 5s cubic-bezier(0.15, 0, 0.05, 1)';
        rouletteContainer.style.left = `-${targetOffset}px`;
    }, 50);

    // Yutuqni e'lon qilish
    setTimeout(() => {
        document.getElementById('status').innerHTML = `
            <span class="text-green-400 font-bold animate-bounce text-sm">YUTUQ: ${wonSkin.name}</span>`;
        openBtn.disabled = false;
        loadUserData();
    }, 5500);
}

if (openBtn) openBtn.addEventListener('click', openCaseRequest);
loadUserData();