// 1. Telegram WebApp obyektini e'lon qilish
const tg = window.Telegram ? window.Telegram.WebApp : null;

// 2. Asosiy o'zgaruvchilar
let balance = 0;
let totalOpenedCount = 0;

// DOM elementlarini bog'lash
const openBtn = document.getElementById('openBtn');
const statusText = document.getElementById('status');
const balanceDisplay = document.getElementById('balance-display');
const topUpBtn = document.getElementById('topUpBtn');

// 3. Telegram WebApp-ni ishga tushirish va ma'lumotlarni yuklash
if (tg) {
    tg.expand();
    tg.ready();
    
    // Foydalanuvchi ma'lumotlarini profilga yozish
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        
        // Ismni o'rnatish
        const nameElem = document.getElementById('user-name');
        if (nameElem) {
            nameElem.innerText = (user.first_name + (user.last_name ? " " + user.last_name : "")).toUpperCase();
        }
        
        // ID ni o'rnatish
        const idElem = document.getElementById('user-id');
        if (idElem) {
            idElem.innerText = `ID: ${user.id}`;
        }

        // AVATAR (RASM) NI CHIQARISH
        if (user.photo_url) {
            const avatarContainer = document.querySelector('#profile-section .w-24.h-24');
            if (avatarContainer) {
                avatarContainer.innerHTML = `<img src="${user.photo_url}" class="w-full h-full rounded-full object-cover border-2 border-orange-500 shadow-lg">`;
            }
        }
    }
}

// 4. Sahifalararo o'tish (Navigation)
window.showSection = function(sectionId, element) {
    // Barcha bo'limlarni yashirish
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.add('hidden'));

    // Tanlangan bo'limni ko'rsatish
    const target = document.getElementById(sectionId + '-section');
    if (target) {
        target.classList.remove('hidden');
    }

    // Navigatsiya tugmalari rangini yangilash
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    // Bosilgan tugmani faol qilish
    if (element) {
        element.classList.add('text-orange-500');
        element.classList.remove('text-gray-500');
    }
};
// Do'stlar progressini yangilash (Home va Friends sahifalari uchun)
function updateFriendsUI() {
    const count = invitedFriends ? invitedFriends.length : 0;
    
    // 1. Friends sahifasidagi segmentlar
    const segmentsFriends = document.querySelectorAll('.friend-seg');
    if (segmentsFriends.length > 0) {
        segmentsFriends.forEach((seg, index) => {
            if (index < count) {
                seg.classList.replace('bg-gray-700', 'bg-blue-500');
                seg.classList.add('shadow-[0_0_8px_rgba(59,130,246,0.5)]');
            }
        });
    }

    // 2. Home sahifasidagi segmentlar (Yangi)
    const segmentsHome = document.querySelectorAll('.friend-seg-home');
    if (segmentsHome.length > 0) {
        segmentsHome.forEach((seg, index) => {
            if (index < count) {
                seg.classList.replace('bg-gray-700', 'bg-blue-500');
            }
        });
    }

    // 3. Matnlarni yangilash
    const homeCountText = document.getElementById('friends-count-text-home');
    if (homeCountText) homeCountText.innerText = `${count}/10`;
    
    const friendsCountText = document.getElementById('friends-count-text');
    if (friendsCountText) friendsCountText.innerText = `${count}/10`;
}

// 5. UI ni yangilash funksiyasi
function updateUI() {
    const displayVal = Math.floor(balance);
    if (balanceDisplay) balanceDisplay.innerText = displayVal;
    
    const statsOpened = document.getElementById('stats-opened');
    if (statsOpened) statsOpened.innerText = totalOpenedCount;
}

// 6. Case ochish mantiqi
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

        balance -= 10;
        updateUI();
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
            
            statusText.innerHTML = `
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Yutdingiz:</span>
                    <span class="${win.color} font-gaming font-black text-sm uppercase tracking-tighter">
                        ${win.name}
                    </span>
                </div>`;
            
            totalOpenedCount++;
            openBtn.disabled = false;
            updateUI();
        }, 1500);
    });
}

// 7. Balansni to'ldirish
if (topUpBtn) {
    topUpBtn.addEventListener('click', () => {
        balance += 100;
        updateUI();
    });
}

// Dasturni ilk bor yangilash
updateUI();