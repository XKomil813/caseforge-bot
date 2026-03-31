const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id || "64537281";

const CASE_TYPE = 'eco';
const DEFAULT_CASE_ID = CASE_TYPE;
let currentCaseId = DEFAULT_CASE_ID;
const DEFAULT_STATUS = "OCHISHGA TAYYOR";
const CURRENCY_LABEL = "coin";
const formatCoins = (value) => `${Number(value || 0).toLocaleString('en-US')} ${CURRENCY_LABEL}`;

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
        userInventory.splice(0, userInventory.length, ...(data.inventory || []));
        renderInventory();

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
    if (display) display.innerText = formatCoins(Math.floor(userBalance));
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

    const caseId = currentCaseId || DEFAULT_CASE_ID;
    const caseData = CASES_DATA?.[caseId];
    if (!caseData) {
        console.error("Case ma'lumotlari topilmadi:", caseId);
        return;
    }

    const statusDisplay = document.getElementById('status-text');
    const openBtn = document.getElementById('openBtn');
    const price = caseData.price || 500;

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
        const payload = await requestOpenCase(caseId);
        userBalance = Math.max(Number(payload.newBalance ?? userBalance - price), 0);
        updateBalanceDisplay();

        const fallbackSkin = {
            name: 'No-name skin',
            price: caseData.price || 0,
            image: 'https://via.placeholder.com/96?text=Skin'
        };

        const safeWon = payload.wonSkin && payload.wonSkin.image ? payload.wonSkin : fallbackSkin;
        if (safeWon) {
            userInventory.unshift(safeWon);
            renderInventory();
            const pool = Array.isArray(caseData.items) && caseData.items.length
                ? caseData.items
                : [safeWon];
            startRoulette(safeWon, pool, openBtn, statusDisplay);
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

    try {
        const normalize = (raw) => {
            if (raw && raw.image) return raw;
            return {
                image: raw?.image || 'https://via.placeholder.com/64?text=?',
                name: raw?.name || '???',
                price: raw?.price || 0
            };
        };

        const pool = (itemsPool || []).filter(Boolean).map(normalize);
        if (!pool.length) pool.push(normalize(wonSkin));
        const safeWin = normalize(wonSkin);

        itemsContainer.innerHTML = '';
        itemsContainer.style.transition = 'none';
        itemsContainer.style.left = '0px';

        const totalItems = 60;
        const winningIndex = 50;
        const itemWidth = 112;

        for (let i = 0; i < totalItems; i++) {
            const item = i === winningIndex ? safeWin : pool[Math.floor(Math.random() * pool.length)];
            const div = document.createElement('div');
            div.className = "flex-shrink-0 w-24 h-24 mx-2 bg-gradient-to-b from-white/10 to-transparent rounded-xl border-b-4 flex flex-col items-center justify-center p-2 relative";

            const color = item.price > 500 ? '#eb4b4b' : (item.price > 250 ? '#4b69ff' : '#b0c3d9');
            div.style.borderColor = color;

            div.innerHTML = `
                <img src="${item.image}" class="w-14 h-14 object-contain mb-1">
                <p class="text-[6px] text-white/60 font-bold uppercase tracking-widest w-full text-center">${item.name}</p>
                <p class="text-[7px] text-yellow-400 font-black mt-0.5">${formatCoins(item.price)}</p>
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
                        <span class="text-[10px] text-white font-bold uppercase">${safeWin.name}</span>
                    </div>
                `;
                resetStatusAfterDelay(statusDisplay, 4000);
            }

            setButtonState(openBtn, false);
            isOpening = false;
        }, 5500);
    } catch (err) {
        console.error('roulette', err);
        if (statusDisplay) {
            statusDisplay.innerHTML = `<span class="text-red-500 font-black text-[10px]">Xatolik: ${err.message}</span>`;
            resetStatusAfterDelay(statusDisplay, 4000);
        }
        setButtonState(openBtn, false);
        isOpening = false;
    }
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

function setupKeysSection() {
    const keysSection = document.getElementById('keys-section');
    if (!keysSection) return;
    if (!CASES_DATA) return;

    const markup = `
        <div class="glass border border-white/10 p-6 rounded-[32px] text-center shadow-2xl space-y-6">
            <div id="keys-list" class="space-y-4">
${['eco','budget'].map(id => {
    const c = CASES_DATA[id];
    if (!c) return '';
    return `
                <div data-case-id="${id}" class="case-card relative overflow-hidden border border-white/10 rounded-[28px] p-4 bg-gradient-to-br from-white/5 to-transparent cursor-pointer hover:border-blue-500 transition-all">
                    <div class="flex items-center justify-between gap-4">
                        <div class="text-left">
                            <p class="text-[10px] font-gaming uppercase tracking-[0.4em] text-blue-400">Keyslar</p>
                            <h3 class="text-2xl font-black uppercase font-gaming tracking-tighter text-white mt-1">${c.name}</h3>
                            <p class="text-[9px] text-gray-500 mt-1">Eng yengil case | 20+ skin</p>
                        </div>
                        <div class="flex items-center gap-1 justify-end text-right">
                            <span class="material-icons-outlined text-yellow-400 text-base align-middle">monetization_on</span>
                            <p class="text-yellow-400 font-black text-lg">${formatCoins(c.price)}</p>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center justify-center">
                        <img src="${c.image || 'https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/eco-case.jpg'}" class="h-24 object-contain">
                    </div>
                    <div class="mt-2 text-[9px] uppercase text-white/70 tracking-[0.3em]">Batafsil ko'rish uchun bosing</div>
                </div>
    `;
}).join('')}
            </div>

            <div id="case-detail" class="hidden space-y-6 text-left">
                <div class="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40">
                    <div class="case-detail-hero min-h-[60vh] md:min-h-[80vh] flex items-center justify-center p-6">
                        <img id="detail-case-image" src="${CASES_DATA.eco?.image || ''}" class="max-h-full object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                    </div>
                    <div class="p-5 bg-gradient-to-t from-black/80 to-transparent space-y-2">
                        <div class="flex items-center justify-between">
                            <p id="detail-case-name" class="text-lg font-black uppercase font-gaming text-white">Eco Case</p>
                            <button data-action="back" class="text-[10px] uppercase tracking-[0.4em] text-blue-400">ORQAGA</button>
                        </div>
                        <p id="detail-case-price" class="text-[12px] tracking-[0.3em] text-yellow-400 font-bold">${formatCoins(CASES_DATA.eco?.price ?? 0)}</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <p class="text-[10px] uppercase tracking-[0.5em] text-white/80 font-bold">Case ichidagi itemlar</p>
                        <p class="text-[8px] uppercase tracking-[0.4em] text-blue-400 font-bold">Coins qiymat</p>
                    </div>
                    <div id="detail-items" class="grid grid-cols-2 sm:grid-cols-3 gap-3"></div>
                </div>

                <div class="space-y-4">
                    <div id="roulette-container" class="relative w-full overflow-hidden bg-[#0a0a0a] h-36 rounded-2xl border-2 border-white/5 flex items-center transition-all">
                        <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-600 z-50 shadow-[0_0_15px_rgba(220,38,38,0.8)] -translate-x-1/2"></div>
                        <div id="roulette-items" class="flex flex-nowrap items-center absolute left-0 h-full whitespace-nowrap"></div>
                    </div>

                    <div id="status-text" class="h-14 flex items-center justify-center font-gaming text-[10px] tracking-widest uppercase text-white/60 text-center transition-all">
                        OCHISHGA TAYYOR
                    </div>
                </div>

                <button id="openBtn" class="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl font-gaming font-bold text-base tracking-[1px] shadow-xl shadow-blue-900/30 active:scale-95 transition-all flex items-center justify-center space-x-2">
                    <span>KEYSNI OCHISH</span>
                    <span class="text-yellow-400 text-xs" id="open-case-price">(${formatCoins(CASES_DATA.eco?.price ?? 0)})</span>
                </button>
            </div>
        </div>
    `;

    keysSection.innerHTML = markup;
    keysSection.querySelectorAll('[data-case-id]').forEach(card => {
        card.addEventListener('click', () => showCaseDetail(card.dataset.caseId));
    });

    const backBtn = keysSection.querySelector('[data-action=\"back\"]');
    if (backBtn) {
        backBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            showCaseList();
        });
    }
}

function showCaseDetail(caseId) {
    const detail = document.getElementById('case-detail');
    const list = document.getElementById('keys-list');
    const caseData = CASES_DATA?.[caseId];
    if (!detail || !list || !caseData) return;

    currentCaseId = caseId;
    list.classList.add('hidden');
    detail.classList.remove('hidden');
    detail.querySelector('#detail-case-name').innerText = caseData.name;
    const imageEl = detail.querySelector('#detail-case-image');
    if (imageEl) imageEl.src = caseData.image || '';
    const priceEl = detail.querySelector('#detail-case-price');
    if (priceEl) priceEl.innerText = formatCoins(caseData.price);
    const openCasePrice = detail.querySelector('#open-case-price');
    if (openCasePrice) openCasePrice.innerText = `(${formatCoins(caseData.price)})`;
    renderDetailItems(caseData);
    tg?.expand();
}

function showCaseList() {
    const detail = document.getElementById('case-detail');
    const list = document.getElementById('keys-list');
    if (detail && list) {
        detail.classList.add('hidden');
        list.classList.remove('hidden');
    }
    currentCaseId = DEFAULT_CASE_ID;
    const statusDisplay = document.getElementById('status-text');
    if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
}

function renderDetailItems(caseData) {
    const detailItems = document.getElementById('detail-items');
    if (!detailItems || !caseData?.items) return;
    detailItems.innerHTML = caseData.items.map(item => `
        <div class="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
            <img src="${item.image}" class="w-14 h-14 object-contain mb-2">
            <p class="text-[7px] text-white/50 font-bold uppercase text-center">${item.name}</p>
            <p class="text-[10px] text-yellow-400 font-black mt-1">${formatCoins(item.price)}</p>
        </div>
    `).join('');
}

function renderInventory() {
    const inventoryList = document.getElementById('inventory-list');
    if (!inventoryList) return;

    if (!userInventory.length) {
        inventoryList.innerHTML = `
            <div class="col-span-2 flex flex-col items-center justify-center py-20 opacity-20">
                <span class="material-icons-outlined text-5xl">inventory_2</span>
                <p class="font-gaming text-[9px] mt-2 uppercase tracking-widest">Hozircha bo'sh</p>
            </div>
        `;
        return;
    }

    inventoryList.innerHTML = userInventory.map(item => `
        <div class="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center text-center">
            <img src="${item.image}" class="w-16 h-16 object-contain mb-2">
            <p class="text-[8px] text-white/70 font-bold uppercase truncate w-full">${item.name}</p>
            <p class="text-[10px] text-yellow-400 font-black mt-1">${formatCoins(item.price)}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    updateGlobalCounter();
    setupKeysSection();
    renderInventory();

    const openBtn = document.getElementById('openBtn');
    if (openBtn) {
        openBtn.addEventListener('click', openCase);
    }

    if (tg?.ready) {
        tg.ready(() => {
            tg.expand();
            if (tg.MainButton) {
                tg.MainButton.hide();
            }
        });
    } else {
        tg?.expand();
    }
});
