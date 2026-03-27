const openBtn = document.getElementById('openBtn');
const status = document.getElementById('status');
const message = document.getElementById('message');

const caseItems = [
  { name: 'Common', chance: 60, value: 15 },
  { name: 'Rare', chance: 25, value: 35 },
  { name: 'Epic', chance: 10, value: 80 },
  { name: 'Legendary', chance: 5, value: 220 },
];

function pickItem() {
  const r = Math.random() * 100;
  let acc = 0;
  for (const item of caseItems) {
    acc += item.chance;
    if (r <= acc) return item;
  }
  return caseItems[0];
}

openBtn.addEventListener('click', async () => {
  status.textContent = '🔄 Case ochilmoqda...';
  message.style.display = 'none';

  // To‘liq ekran rejimiga o‘tish
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.error('Fullscreen error:', error);
  }

  setTimeout(() => {
    const item = pickItem();
    status.textContent = '✅ Case ochilmoqda yakunlandi!';
    message.style.display = 'block';
    message.textContent = `🏆 Sizga ${item.name} tushdi (Qiymat: ${item.value} coin)`;
  }, 1200);
});

const fullscreenBtn = document.getElementById('fullscreenBtn');
fullscreenBtn.addEventListener('click', async () => {
  const elem = document.documentElement;

  try {
    if (!document.fullscreenElement) {
      await elem.requestFullscreen();
      fullscreenBtn.textContent = 'Chiqish';
    } else {
      await document.exitFullscreen();
      fullscreenBtn.textContent = 'To‘liq ekran';
    }
  } catch (error) {
    console.error('Fullscreen error:', error);
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenBtn.textContent = 'To‘liq ekran';
  }
});
