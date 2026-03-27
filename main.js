const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com'; // O'zingiznikiga almashtiring
const userId = tg?.initDataUnsafe?.user?.id;

async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            document.getElementById('balance-display').innerText = data.coins;
            document.getElementById('stats-opened').innerText = data.totalOpened;
            document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name.toUpperCase();
            document.getElementById('user-id').innerText = `ID: ${userId}`;
        }
    } catch (e) { console.error("Yuklashda xato"); }
}

document.getElementById('openBtn').addEventListener('click', async () => {
    const statusText = document.getElementById('status');
    const openBtn = document.getElementById('openBtn');

    try {
        const response = await fetch(`${RENDER_URL}/api/open-case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, cost: 10 })
        });
        const data = await response.json();

        if (data.success) {
            openBtn.disabled = true;
            statusText.innerHTML = '<span class="animate-spin text-blue-400 text-3xl">sync</span>';
            
            setTimeout(() => {
                document.getElementById('balance-display').innerText = data.newBalance;
                statusText.innerHTML = `<span class="text-yellow-400 font-gaming">AWP | Dragon Lore yutdingiz!</span>`;
                openBtn.disabled = false;
                loadUserData(); // Statiskani yangilash
            }, 1500);
        } else {
            alert("Mablag' yetarli emas!");
        }
    } catch (e) { alert("Server bilan ulanish xatosi!"); }
});

if (tg) { tg.expand(); tg.ready(); }
loadUserData();