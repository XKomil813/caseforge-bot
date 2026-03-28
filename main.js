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