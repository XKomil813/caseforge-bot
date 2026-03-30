const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id;

// Ruletka sozlamalari
const rouletteContainer = document.getElementById('roulette-container');
const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');

async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            document.getElementById('balance-display').innerText = data.coins.toFixed(0);
            document.getElementById('stats-opened').innerText = data.totalOpened;
            if(document.getElementById('user-name')) document.getElementById('user-name').innerText = data.username || "Foydalanuvchi";
        }
    } catch (e) { console.error("Xato: Ma'lumot yuklanmadi"); }
}

function startRoulette(wonSkin) {
    // 1. Tayyorgarlik
    const items = CASES_DATA['eco'].items; // cases.js dan barcha skinlarni olamiz
    rouletteContainer.innerHTML = '';
    rouletteContainer.style.transition = 'none';
    rouletteContainer.style.left = '0px';

    const totalItems = 60; // Ruletka uzunligi
    const winningIndex = 50; // Yutuq nechanchi bo'lib to'xtashi
    const itemWidth = 110; // Har bir skinning kengligi + margin

    // 2. Ruletka ichini skinlar bilan to'ldirish
    for (let i = 0; i < totalItems; i++) {
        const item = (i === winningIndex) ? wonSkin : items[Math.floor(Math.random() * items.length)];
        
        const div = document.createElement('div');
        div.className = "min-w-[100px] h-28 mx-1.5 bg-white/5 rounded-xl border-b-4 flex flex-col items-center justify-center p-2";
        div.style.borderColor = getRarityColor(item.price); // Narxiga qarab rang berish
        
        div.innerHTML = `
            <img src="${item.image}" class="w-16 h-16 object-contain drop-shadow-md">
            <span class="text-[7px] mt-2 text-center font-gaming truncate w-full px-1 opacity-70">${item.name}</span>
        `;
        rouletteContainer.appendChild(div);
    
        setTimeout(() => {
            // MUHIM: Bu yerda aynan serverdan kelgan wonSkin ob'ektidan foydalanamiz
            statusText.innerHTML = `
                <div class="animate-bounce flex flex-col items-center">
                    <span class="text-green-400 font-black text-[12px]">TABRIKLAYMIZ!</span>
                    <span class="text-[10px] text-white/90 font-bold uppercase tracking-tighter text-center px-4">
                        ${wonSkin.name} 
                    </span>
                </div>`;
            
            openBtn.disabled = false;
            loadUserData(); // Balansni yangilash
        }, 5500);
    }

    // 3. Animatsiyani boshlash
    setTimeout(() => {
        const viewportWidth = rouletteContainer.parentElement.offsetWidth;
        const targetOffset = (winningIndex * itemWidth) - (viewportWidth / 2) + (itemWidth / 2);
        
        rouletteContainer.style.transition = 'left 5s cubic-bezier(0.15, 0, 0.05, 1)';
        rouletteContainer.style.left = `-${targetOffset}px`;
    }, 50);

    // 4. Natijani ko'rsatish
    setTimeout(() => {
        statusText.innerHTML = `
            <div class="animate-bounce flex flex-col items-center">
                <span class="text-green-400 font-black">TABRIKLAYMIZ!</span>
                <span class="text-[9px] text-white/60">${wonSkin.name}</span>
            </div>`;
        openBtn.disabled = false;
        loadUserData(); // Balansni yangilash
    }, 5500);
}

async function openCase() {
    if (!userId) return;
    
    statusText.innerHTML = '<span class="text-blue-400 animate-pulse">SERVER BILAN ALOQA...</span>';
    openBtn.disabled = true;

    try {
        const response = await fetch(`${RENDER_URL}/api/open-case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, caseType: 'eco' })
        });
        const data = await response.json();

        if (data.success) {
            startRoulette(data.wonSkin);
        } else {
            statusText.innerHTML = `<span class="text-red-500">${data.message}</span>`;
            openBtn.disabled = false;
        }
    } catch (e) {
        statusText.innerHTML = '<span class="text-red-500">ALOQA XATOSI</span>';
        openBtn.disabled = false;
    }
}

// Narxga qarab rang qaytaruvchi yordamchi funksiya
function getRarityColor(price) {
    if (price > 10) return '#eb4b4b'; // Qizil
    if (price > 5) return '#d32ee6';  // Binafsha
    if (price > 1) return '#4b69ff';  // Ko'k
    return '#b0c3d9';                 // Kulrang
}

// Navigatsiya funksiyasi (Sizniki kabi)
window.showSection = function(sectionId, element) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });
    if (element) element.classList.add('text-orange-500');
    if (sectionId === 'inventory-section') loadInventory(); // Inventarni yuklash
};

// Start
openBtn.addEventListener('click', openCase);
loadUserData();