// ============ GLOBAL O'ZGARUVCHILAR ============
const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id || "64537281";

const DEFAULT_CASE_ID = 'eco';
let currentCaseId = DEFAULT_CASE_ID;
const DEFAULT_STATUS = "OCHISHGA TAYYOR";
const CURRENCY_LABEL = "coin";

// Formatlash funksiyalari
const formatCoins = (value) => `${Number(value || 0).toLocaleString('en-US')} ${CURRENCY_LABEL}`;

// Xavfsiz skin yaratish funksiyasi - DUPLICATNI OLDINI OLADI
const createSafeSkin = (skin) => {
    if (!skin) {
        return {
            name: "Noma'lum Skin",
            price: 0,
            image: "https://via.placeholder.com/96?text=No+Image"
        };
    }
    return {
        name: skin.name || "Noma'lum Skin",
        price: skin.price || 0,
        image: skin.image || "https://via.placeholder.com/96?text=No+Image"
    };
};

// Global state
let userBalance = 0;
let isOpening = false;
let userInventory = [];

// ============ API CALLS ============
async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        if (!res.ok) throw new Error("Foydalanuvchi ma'lumotini olishda xatolik");
        const data = await res.json();
        if (!data.success) return;

        userBalance = Number(data.coins) || 0;
        updateBalanceDisplay();
        userInventory = (data.inventory || []).map(item => createSafeSkin(item));
        renderInventory();

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
    if (disabled) {
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

function resetStatusAfterDelay(statusDisplay, delay = 2400) {
    if (!statusDisplay) return;
    setTimeout(() => {
        if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
    }, delay);
}

// ============ CASE OPENING ============
async function requestOpenCase(caseType) {
    try {
        const response = await fetch(`${RENDER_URL}/api/open-case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, caseType })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server xatosi: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message || "Case ochishda xatolik");
        }
        
        if (!data.wonSkin) {
            throw new Error("Yutilgan skin ma'lumoti yo'q");
        }
        
        return data;
    } catch (error) {
        console.error("requestOpenCase error:", error);
        throw error;
    }
}

async function openCase() {
    if (isOpening) return;

    const caseId = currentCaseId || DEFAULT_CASE_ID;
    const caseData = window.CASES_DATA?.[caseId];
    
    if (!caseData) {
        console.error("Case ma'lumotlari topilmadi:", caseId);
        const statusDisplay = document.getElementById('status-text');
        if (statusDisplay) {
            statusDisplay.innerHTML = '<span class="text-red-500">Case topilmadi!</span>';
            setTimeout(() => {
                if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
            }, 2000);
        }
        return;
    }

    const statusDisplay = document.getElementById('status-text');
    const openBtn = document.getElementById('openBtn');
    const price = caseData.price || 500;

    if (userBalance < price) {
        if (statusDisplay) {
            statusDisplay.innerHTML = '<span class="text-red-500 animate-bounce font-black text-[10px]">❌ MABLAG\' YETARLI EMAS!</span>';
            setTimeout(() => {
                if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
            }, 2500);
        }
        return;
    }

    isOpening = true;
    setButtonState(openBtn, true);
    
    if (statusDisplay) {
        statusDisplay.innerHTML = '<span class="text-blue-400 animate-pulse italic">🎲 KEYS OCHILMOQDA...</span>';
    }

    try {
        const payload = await requestOpenCase(caseId);
        
        userBalance = Math.max(Number(payload.newBalance ?? userBalance - price), 0);
        updateBalanceDisplay();

        const safeWon = createSafeSkin(payload.wonSkin);
        
        userInventory.unshift(safeWon);
        renderInventory();
        
        // Items pool ni xavfsiz holatga keltirish
        let safePool = [];
        if (Array.isArray(caseData.items)) {
            safePool = caseData.items.map(item => createSafeSkin(item));
        }
        
        if (safePool.length === 0) {
            safePool.push(safeWon);
        }
        
        startRoulette(safeWon, safePool, openBtn, statusDisplay);
        incrementGlobalCounter();
        
    } catch (error) {
        console.error("openCase xatosi:", error);
        if (statusDisplay) {
            statusDisplay.innerHTML = `<span class="text-red-500 font-black text-[10px]">❌ Xatolik: ${error.message || 'Server xatosi'}</span>`;
            setTimeout(() => {
                if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
            }, 3000);
        }
        setButtonState(openBtn, false);
        isOpening = false;
    }
}

function startRoulette(wonSkin, itemsPool, openBtn, statusDisplay) {
    const itemsContainer = document.getElementById('roulette-items');
    const parentContainer = document.getElementById('roulette-container');

    if (!itemsContainer || !parentContainer) {
        console.error("Ruletka elementlari topilmadi!");
        if (statusDisplay) {
            statusDisplay.innerHTML = '<span class="text-red-500">Xatolik: Element topilmadi</span>';
            setTimeout(() => {
                if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
            }, 2000);
        }
        setButtonState(openBtn, false);
        isOpening = false;
        return;
    }

    try {
        const safeWon = createSafeSkin(wonSkin);
        
        // ItemsPool ni xavfsiz holatga keltirish
        let safePool = [];
        if (Array.isArray(itemsPool) && itemsPool.length > 0) {
            safePool = itemsPool.filter(item => item !== null).map(item => createSafeSkin(item));
        }
        
        if (safePool.length === 0 && safeWon) {
            safePool.push(safeWon);
        }

        itemsContainer.innerHTML = '';
        itemsContainer.style.transition = 'none';
        itemsContainer.style.left = '0px';

        const totalItems = 25;
        const winningIndex = 20;
        const itemWidth = 112;

        for (let i = 0; i < totalItems; i++) {
            let item;
            if (i === winningIndex) {
                item = safeWon;
            } else {
                const randomIndex = Math.floor(Math.random() * safePool.length);
                item = safePool[randomIndex] || safeWon;
            }
            
            const safeItem = createSafeSkin(item);

            const div = document.createElement('div');
            div.className = "flex-shrink-0 w-24 h-24 mx-2 bg-gradient-to-b from-white/10 to-transparent rounded-xl border-b-4 flex flex-col items-center justify-center p-2 relative";
            
            const color = safeItem.price > 500 ? '#eb4b4b' : (safeItem.price > 250 ? '#4b69ff' : '#b0c3d9');
            div.style.borderColor = color;

            div.innerHTML = `
                <img src="${safeItem.image}" class="w-14 h-14 object-contain mb-1" onerror="this.src='https://via.placeholder.com/96?text=Error'">
                <p class="text-[6px] text-white/60 font-bold uppercase tracking-widest w-full text-center truncate">${safeItem.name.substring(0, 20)}</p>
                <p class="text-[7px] text-yellow-400 font-black mt-0.5">${formatCoins(safeItem.price)}</p>
            `;
            itemsContainer.appendChild(div);
        }

        setTimeout(() => {
            const parentWidth = parentContainer.offsetWidth;
            const targetOffset = (winningIndex * itemWidth) - (parentWidth / 2) + (itemWidth / 2);
            itemsContainer.style.transition = 'left 4s cubic-bezier(0.1, 0, 0.05, 1)';
            itemsContainer.style.left = `-${Math.max(0, targetOffset)}px`;
        }, 50);

        setTimeout(() => {
            if (statusDisplay) {
                statusDisplay.innerHTML = `
                    <div class="flex flex-col items-center animate-bounce">
                        <span class="text-green-400 font-black text-[12px]">🎉 TABRIKLAYMIZ! 🎉</span>
                        <span class="text-[11px] text-white font-bold uppercase mt-1">${safeWon.name}</span>
                        <span class="text-[10px] text-yellow-400 font-bold">${formatCoins(safeWon.price)}</span>
                    </div>
                `;
                setTimeout(() => {
                    if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
                }, 4000);
            }
            setButtonState(openBtn, false);
            isOpening = false;
        }, 4500);

    } catch (err) {
        console.error('Ruletka xatosi:', err);
        if (statusDisplay) {
            statusDisplay.innerHTML = '<span class="text-red-500">Xatolik yuz berdi</span>';
            setTimeout(() => {
                if (statusDisplay) statusDisplay.innerText = DEFAULT_STATUS;
            }, 3000);
        }
        setButtonState(openBtn, false);
        isOpening = false;
    }
}

// ============ COUNTERS ============
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

// ============ INVENTORY ============
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

    inventoryList.innerHTML = userInventory.map(item => {
        const safe = createSafeSkin(item);
        return `
            <div class="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center text-center">
                <img src="${safe.image}" class="w-16 h-16 object-contain mb-2" onerror="this.src='https://via.placeholder.com/96?text=No+Img'">
                <p class="text-[8px] text-white/70 font-bold uppercase truncate w-full">${safe.name.substring(0, 25)}</p>
                <p class="text-[10px] text-yellow-400 font-black mt-1">${formatCoins(safe.price)}</p>
            </div>
        `;
    }).join('');
}

// ============ KEYS SECTION SETUP ============
function setupKeysSection() {
    const keysSection = document.getElementById('keys-section');
    if (!keysSection) return;
    if (!window.CASES_DATA) {
        console.error("CASES_DATA yuklanmagan!");
        return;
    }

    const markup = `
        <div class="glass border border-white/10 p-6 rounded-[32px] text-center shadow-2xl space-y-6">
            <div id="keys-list" class="space-y-4">
                ${['eco', 'budget'].map(id => {
                    const c = window.CASES_DATA[id];
                    if (!c) return '';
                    return `
                        <div data-case-id="${id}" class="case-card relative overflow-hidden border border-white/10 rounded-[28px] p-4 bg-gradient-to-br from-white/5 to-transparent cursor-pointer hover:border-blue-500 transition-all">
                            <div class="flex items-center justify-between gap-4">
                                <div class="text-left">
                                    <p class="text-[10px] font-gaming uppercase tracking-[0.4em] text-blue-400">Keyslar</p>
                                    <h3 class="text-2xl font-black uppercase font-gaming tracking-tighter text-white mt-1">${c.name}</h3>
                                    <p class="text-[9px] text-gray-500 mt-1">${id === 'eco' ? 'Eng yengil case | 20+ skin' : 'Premium case | Qimmatbaho skinlar'}</p>
                                </div>
                                <div class="flex items-center gap-1 justify-end text-right">
                                    <span class="material-icons-outlined text-yellow-400 text-base align-middle">monetization_on</span>
                                    <p class="text-yellow-400 font-black text-lg">${formatCoins(c.price)}</p>
                                </div>
                            </div>
                            <div class="mt-4 flex items-center justify-center">
                                <img src="${c.image || ''}" class="h-24 object-contain" onerror="this.src='https://via.placeholder.com/96?text=Case'">
                            </div>
                            <div class="mt-2 text-[9px] uppercase text-white/70 tracking-[0.3em]">Batafsil ko'rish uchun bosing</div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div id="case-detail" class="hidden space-y-6 text-left">
                <div class="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40">
                    <div class="case-detail-hero min-h-[60vh] md:min-h-[80vh] flex items-center justify-center p-6">
                        <img id="detail-case-image" src="" class="max-h-full object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                    </div>
                    <div class="p-5 bg-gradient-to-t from-black/80 to-transparent space-y-2">
                        <div class="flex items-center justify-between">
                            <p id="detail-case-name" class="text-lg font-black uppercase font-gaming text-white">Eco Case</p>
                            <button id="back-to-list-btn" class="text-[10px] uppercase tracking-[0.4em] text-blue-400">ORQAGA</button>
                        </div>
                        <p id="detail-case-price" class="text-[12px] tracking-[0.3em] text-yellow-400 font-bold"></p>
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
                    <span class="text-yellow-400 text-xs" id="open-case-price"></span>
                </button>
            </div>
        </div>
    `;

    keysSection.innerHTML = markup;
    
    keysSection.querySelectorAll('[data-case-id]').forEach(card => {
        card.addEventListener('click', () => showCaseDetail(card.dataset.caseId));
    });
    
    const backBtn = keysSection.querySelector('#back-to-list-btn');
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
    const caseData = window.CASES_DATA?.[caseId];
    
    if (!detail || !list || !caseData) {
        console.error("showCaseDetail: elementlar topilmadi");
        return;
    }

    currentCaseId = caseId;
    list.classList.add('hidden');
    detail.classList.remove('hidden');
    
    const caseNameEl = detail.querySelector('#detail-case-name');
    if (caseNameEl) caseNameEl.innerText = caseData.name;
    
    const imageEl = detail.querySelector('#detail-case-image');
    if (imageEl) {
        imageEl.src = caseData.image || 'https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/eco-case.jpg';
        imageEl.onerror = () => { 
            imageEl.src = 'https://via.placeholder.com/200?text=Case+Image'; 
        };
    }
    
    const priceEl = detail.querySelector('#detail-case-price');
    if (priceEl) {
        priceEl.innerText = formatCoins(caseData.price);
    }
    
    const openCasePrice = detail.querySelector('#open-case-price');
    if (openCasePrice) {
        openCasePrice.innerText = `(${formatCoins(caseData.price)})`;
    }
    
    renderDetailItems(caseData);
    
    if (tg && tg.expand) tg.expand();
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
    
    detailItems.innerHTML = caseData.items.map(item => {
        const safe = createSafeSkin(item);
        return `
            <div class="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
                <img src="${safe.image}" class="w-14 h-14 object-contain mb-2" onerror="this.src='https://via.placeholder.com/96?text=No+Img'">
                <p class="text-[7px] text-white/50 font-bold uppercase text-center truncate w-full">${safe.name.substring(0, 30)}</p>
                <p class="text-[10px] text-yellow-400 font-black mt-1">${formatCoins(safe.price)}</p>
            </div>
        `;
    }).join('');
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing...");
    console.log("CASES_DATA loaded:", typeof window.CASES_DATA !== 'undefined');
    
    loadUserData();
    updateGlobalCounter();
    setupKeysSection();
    renderInventory();

    const openBtn = document.getElementById('openBtn');
    if (openBtn) {
        openBtn.addEventListener('click', openCase);
    }

    if (tg && tg.ready) {
        tg.ready(() => {
            if (tg.expand) tg.expand();
            if (tg.MainButton) tg.MainButton.hide();
        });
    } else if (tg && tg.expand) {
        tg.expand();
    }
});