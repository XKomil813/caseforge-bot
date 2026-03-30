const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id;
const userFirstName = tg?.initDataUnsafe?.user?.first_name || "Foydalanuvchi";

// 1. Sahifa yuklanganda Telegram ma'lumotlarini profilga yozish
if (userId) {
    const nameElem = document.getElementById('user-name');
    const idElem = document.getElementById('user-id');
    if (nameElem) nameElem.innerText = userFirstName;
    if (idElem) idElem.innerText = `ID: ${userId}`;
}

// 2. Serverdan ma'lumotlarni yuklash (Balans va Statistika)
async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`, { 
            signal: AbortSignal.timeout(10000) 
        });
        const data = await res.json();
        if (data.success) {
            // Asosiy sahifa va profildagi balansni yangilash
            document.getElementById('balance-display').innerText = data.coins.toFixed(0);
            document.getElementById('stats-opened').innerText = data.totalOpened;
        }
    } catch (e) {
        console.log("Ma'lumot yuklashda xato yoki server o'chiq.");
    }
}

// 3. Bo'limlarni almashtirish funksiyasi
window.showSection = function(sectionId, element) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.add('hidden'));

    const target = document.getElementById(sectionId);
    if (target) target.classList.remove('hidden');

    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('text-orange-500');
        btn.classList.add('text-gray-500');
    });

    if (element) {
        element.classList.add('text-orange-500');
        element.classList.remove('text-gray-500');
    }
    
    // Har gal bo'lim almashganda ma'lumotlarni yangilab turish
    loadUserData();
};

// 4. Keys ochish logikasi
const openBtn = document.getElementById('openBtn'); // HTML dagi id ga moslandi
if (openBtn) {
    openBtn.addEventListener('click', async () => {
        const statusText = document.getElementById('status');
        
        try {
            statusText.innerHTML = '<span class="text-blue-400 animate-pulse font-gaming text-xs">KEYSNI OCHILMOQDA...</span>';
            
            // Random skin tanlash (Client-side)
            // Aslida serverda tanlash yaxshi, lekin bot.js hozir shuni kutyapti
            const wonSkin = {
                name: "Sticker | Spirit | 2025",
                price: 0.05,
                image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM655f9-Be_GUrymM-3qiNe7fD3OPBpcqTCXD-SlLwhtrlvHXHqlkkh42rdmdepbzvJOY6xuzgr/62fx62f"
            };

            const response = await fetch(`${RENDER_URL}/api/open-case`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: userId,
                    caseType: 'eco', 
                    wonSkin: wonSkin
                })
            });
            
            const data = await response.json();

            if (data.success) {
                document.getElementById('balance-display').innerText = data.newBalance.toFixed(0);
                statusText.innerHTML = `
                    <div class="flex items-center space-x-2 animate-bounce">
                        <img src="${data.wonSkin.image}" class="w-8 h-8 rounded shadow-lg shadow-blue-500/50"/>
                        <span class="text-green-400 font-bold text-sm tracking-tighter">${data.wonSkin.name}!</span>
                    </div>`;
                
                // 2 soniyadan keyin statusni tozalash
                setTimeout(() => { statusText.innerHTML = ''; }, 5000);
            } else {
                statusText.innerHTML = `<span class="text-red-500 font-gaming text-[10px]">${data.message}</span>`;
            }
        } catch (e) { 
            statusText.innerHTML = `<span class="text-red-500 text-[10px]">SERVER XATOSI!</span>`; 
        }
    });
}

// Birinchi marta yuklash
loadUserData();