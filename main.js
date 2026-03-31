const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id || "64537281";

const CASE_TYPE = 'eco';
const CASE_DATA = typeof CASES_DATA !== 'undefined' ? CASES_DATA[CASE_TYPE] : null;
const DEFAULT_STATUS = "OCHISHGA TAYYOR";

let userBalance = 0;
let isOpening = false;
const userInventory = [];

async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        if (!res.ok) throw new Error("Foydalanuvchi ma'lumotini olishda xatolik");
        const data = await res.json();
        if (!data.success) return;

        userBalance = Number(data.coins) || 0;
        updateBalanceDisplay();

        const opened = document.getElementById('stats-opened');
        if (opened) opened.innerText = data.totalOpened ?? 0;

        const userNameEl = document.getElementById('user-name');
        if (userNameEl) userNameEl.innerText = data.username || "Foydalanuvchi";

        const userIdEl = document.getElementById('user-id');
        if (userIdEl) userIdEl.innerText = `ID: ${data.id || userId}`;
    } catch (error) {
        console.error("Ma'lumot yuklashda xato:", error);
    }
}

function updateBalanceDisplay() {
    const display = document.getElementById('balance-display');
    if (display) display.innerText = Math.floor(userBalance);
}

function setButtonState(btn, disabled) {
    if (!btn) return;
    btn.disabled = disabled;
    btn.classList.toggle('opacity-50', disabled);
    btn.classList.toggle('cursor-not-allowed', disabled);
}

function resetStatusAfterDelay(statusDisplay, delay = 2400) {
    if (!statusDisplay) return;
    setTimeout(() => {
        statusDisplay.innerText = DEFAULT_STATUS;
    }, delay);
}

async function openCase() {
    if (isOpening) return;
    if (!CASE_DATA) {
        console.error("CASE_DATA mavjud emas");
        return;
    }

    const statusDisplay = document.getElementById('status-text');
    const openBtn = document.getElementById('openBtn');
    const price = CASE_DATA.price || 500;

    if (userBalance < price) {
        if (statusDisplay) {
            statusDisplay.innerHTML = '<span class="text-red-500 animate-bounce font-black text-[10px]">MABLAG\' YETARLI EMAS!</span>';
            resetStatusAfterDelay(statusDisplay);
        }
        return;
    }

    isOpening = true;
    setButtonState(openBtn, true);
    if (statusDisplay) {
        statusDisplay.innerHTML = '<span class="text-blue-400 animate-pulse italic">KEYS OCHILMOQDA...</span>';
    }

    try {
        const payload = await requestOpenCase(CASE_TYPE);
        userBalance = Math.max(Number(payload.newBalance ?? userBalance - price), 0);
        updateBalanceDisplay();

        if (payload.wonSkin) {
            userInventory.unshift(payload.wonSkin);
            startRoulette(payload.wonSkin, CASE_DATA.items, openBtn, statusDisplay);
        } else {
            throw new Error("Yutuq uchun ma'lumot yo'q");
        }

        incrementGlobalCounter();
    } catch (error) {
        console.error("openCase:", error);
        if (statusDisplay) {
            statusDisplay.innerHTML = `<span class="text-red-500 font-black text-[10px]">Xatolik: ${error.message || 'Server xatosi'}</span>`;
            resetStatusAfterDelay(statusDisplay, 3000);
        }
        setButtonState(openBtn, false);
        isOpening = false;
    }
}

async function requestOpenCase(caseType) {
    const response = await fetch(`${RENDER_URL}/api/open-case`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, caseType })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
        throw new Error(data.message || `Server holati: ${response.status}`);
    }

    return data;
}

function startRoulette(wonSkin, itemsPool, openBtn, statusDisplay) {
    const itemsContainer = document.getElementById('roulette-items');
    const parentContainer = document.getElementById('roulette-container');

    if (!itemsContainer || !parentContainer || !itemsPool?.length || !wonSkin) {
        setButtonState(openBtn, false);
        isOpening = false;
        return;
    }

    itemsContainer.innerHTML = '';
    itemsContainer.style.transition = 'none';
    itemsContainer.style.left = '0px';

    const totalItems = 60;
    const winningIndex = 50;
    const itemWidth = 112;

    for (let i = 0; i < totalItems; i++) {
        const item = i === winningIndex ? wonSkin : itemsPool[Math.floor(Math.random() * itemsPool.length)];
        const div = document.createElement('div');
        div.className = "flex-shrink-0 w-24 h-24 mx-2 bg-gradient-to-b from-white/10 to-transparent rounded-xl border-b-4 flex flex-col items-center justify-center p-2 relative";

        const color = item.price > 500 ? '#eb4b4b' : (item.price > 250 ? '#4b69ff' : '#b0c3d9');
        div.style.borderColor = color;

        div.innerHTML = `
            <img src="${item.image}" class="w-14 h-14 object-contain mb-1">
            <p class="text-[6px] text-white/40 font-bold uppercase tracking-widest w-full text-center">${item.name}</p>
        `;
        itemsContainer.appendChild(div);
    }

    setTimeout(() => {
        const parentWidth = parentContainer.offsetWidth;
        const targetOffset = (winningIndex * itemWidth) - (parentWidth / 2) + (itemWidth / 2);
        itemsContainer.style.transition = 'left 5s cubic-bezier(0.1, 0, 0.05, 1)';
        itemsContainer.style.left = `-${targetOffset}px`;
    }, 50);

    setTimeout(() => {
        if (statusDisplay) {
            statusDisplay.innerHTML = `
                <div class="flex flex-col items-center animate-bounce">
                    <span class="text-green-400 font-black text-[12px]">TABRIKLAYMIZ!</span>
                    <span class="text-[10px] text-white font-bold uppercase">${wonSkin.name}</span>
                </div>
            `;
            resetStatusAfterDelay(statusDisplay, 4000);
        }

        setButtonState(openBtn, false);
        isOpening = false;
    }, 5500);
}

async function updateGlobalCounter() {
    try {
        const response = await fetch(`${RENDER_URL}/api/cases/total`);
        if (!response.ok) return;
        const data = await response.json();
        const counterElement = document.getElementById('global-counter');
        if (counterElement) {
            counterElement.innerText = (data.total ?? 0).toLocaleString();
        }
    } catch (e) {
        console.error("Xatolik:", e);
    }
}

async function incrementGlobalCounter() {
    try {
        const response = await fetch(`${RENDER_URL}/api/cases/open-count`, { method: 'POST' });
        if (!response.ok) return;
        const data = await response.json();
        const counterElement = document.getElementById('global-counter');
        if (counterElement) {
            counterElement.innerText = (data.total ?? 0).toLocaleString();
        }
    } catch (e) {
        console.error("global counter:", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    updateGlobalCounter();

    const openBtn = document.getElementById('openBtn');
    if (openBtn) {
        openBtn.addEventListener('click', openCase);
    }
});
