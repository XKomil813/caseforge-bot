const tg = window.Telegram ? window.Telegram.WebApp : null;
const RENDER_URL = 'https://caseforge-bot.onrender.com';
const userId = tg?.initDataUnsafe?.user?.id;

async function loadUserData() {
    if (!userId) return;
    try {
        const res = await fetch(`${RENDER_URL}/api/user/${userId}`);
        const data = await res.json();
        if (data.success) {
            document.getElementById('balance-display').innerText = data.coins;
            document.getElementById('stats-opened').innerText = data.totalOpened;
        }
    } catch (e) { console.error(e); }
}

const openBtn = document.getElementById('openBtn');
if (openBtn) {
    openBtn.addEventListener('click', async () => {
        const statusText = document.getElementById('status');
        try {
            openBtn.disabled = true;
            statusText.innerHTML = '<span class="animate-spin">⌛</span>';

            const response = await fetch(`${RENDER_URL}/api/open-case`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId })
            });
            const data = await response.json();

            if (data.success) {
                setTimeout(() => {
                    document.getElementById('balance-display').innerText = data.newBalance;
                    statusText.innerHTML = `<span class="${data.skin.color}">${data.skin.name} yutdingiz!</span>`;
                    openBtn.disabled = false;
                    loadUserData();
                }, 1000);
            } else {
                statusText.innerText = data.message || "Xato!";
                openBtn.disabled = false;
            }
        } catch (e) { 
            statusText.innerText = "Server ulanish xatosi!"; 
            openBtn.disabled = false;
        }
    });
}

loadUserData();