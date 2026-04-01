const fs = require('fs');
const path = require('path');
const { CASES_DATA } = require('./cases.js');

const CDN_PREFIX = 'https://community.fastly.steamstatic.com/economy/image/';

function getHash(url) {
    return url.replace(CDN_PREFIX, '').replace('/62fx62f', '');
}

// ========== Barcha unique itemlarni yig'ish ==========
const itemMap = new Map();
for (const caseData of Object.values(CASES_DATA)) {
    for (const item of caseData.items) {
        if (!itemMap.has(item.name)) {
            itemMap.set(item.name, {
                name: item.name,
                price: item.price,
                hash: getHash(item.image)
            });
        }
    }
}
const allItems = [...itemMap.values()].sort((a, b) => a.price - b.price);
console.log(`Total unique items in pool: ${allItems.length}`);

// ========== Helper: N ta itemni tekis tanlash ==========
function pickSpread(arr, n) {
    if (arr.length <= n) return arr.slice();
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(arr[Math.round(i * (arr.length - 1) / (n - 1))]);
    }
    return result;
}

// ========== Expensive 10 ta item uchun chance taqsimoti ==========
// Eng arzoni yuqori chance, eng qimmati eng kam chance
const EXP_CHANCES = [2.5, 1.8, 1.2, 0.8, 0.5, 0.35, 0.2, 0.1, 0.04, 0.01];

// ========== Har bir case uchun expensive item max narx chegarasi ==========
const MAX_EXPENSIVE = {
    eco: 80000,       // max 80k coin ($5)
    budget: 128000,   // max 128k coin ($8)
    premium: 480000,  // max 480k coin ($30)
    elite: 1280000,   // max 1.28M coin ($80)
    legendary: 4800000 // max 4.8M coin ($300)
};

const TARGET_CHEAP = 40;
const TARGET_EXPENSIVE = 10;

// ========== Har bir case ni qayta tuzish ==========
const newCases = {};

for (const [key, caseData] of Object.entries(CASES_DATA)) {
    const cp = caseData.price;
    const maxExp = MAX_EXPENSIVE[key];

    // Arzon = case narxidan kam yoki teng
    const cheapPool = allItems.filter(i => i.price <= cp);
    // Qimmat = case narxidan qimmat, lekin max chegaradan oshmasin
    const expensivePool = allItems.filter(i => i.price > cp && i.price <= maxExp);

    const selectedCheap = pickSpread(cheapPool, TARGET_CHEAP);
    const selectedExpensive = pickSpread(expensivePool, TARGET_EXPENSIVE);

    // Cheap itemlar uchun chance: 90% ni teng bo'lish
    const cheapChanceEach = selectedCheap.length > 0
        ? +(90 / selectedCheap.length).toFixed(2)
        : 0;

    const items = [
        ...selectedCheap.map(i => ({
            name: i.name,
            price: i.price,
            chance: cheapChanceEach,
            hash: i.hash
        })),
        ...selectedExpensive.map((i, idx) => ({
            name: i.name,
            price: i.price,
            chance: EXP_CHANCES[idx] || 0.01,
            hash: i.hash
        }))
    ].sort((a, b) => a.price - b.price);

    newCases[key] = {
        name: caseData.name,
        price: caseData.price,
        image: caseData.image,
        description: caseData.description,
        items
    };
}

// ========== cases.js faylini generatsiya qilish ==========
let out = `// Steam CDN image helper
const IMG = (hash) => \`https://community.fastly.steamstatic.com/economy/image/\${hash}/62fx62f\`;

// ============================================================
// CASES DATA - Real Steam Market narxlari
// Konvertatsiya: $1 USD = 16,000 coin (25,000 coin = 20,000 so'm)
// Har bir caseda ~40 ta arzon skin (yuqori chance) + 10 ta qimmat skin (kam chance)
// ============================================================

const CASES_DATA = {\n`;

for (const [key, c] of Object.entries(newCases)) {
    out += `\n    // ==================== ${c.name.toUpperCase()} (${c.price} coin) ====================\n`;
    out += `    ${key}: {\n`;
    out += `        name: "${c.name}",\n`;
    out += `        price: ${c.price},\n`;
    out += `        image: "${c.image}",\n`;
    out += `        description: "${c.description}",\n`;
    out += `        items: [\n`;

    for (const item of c.items) {
        out += `            { name: "${item.name}", price: ${item.price}, chance: ${item.chance}, image: IMG("${item.hash}") },\n`;
    }

    out += `        ]\n`;
    out += `    },\n`;
}

out += `\n};\n\n`;
out += `// Global qilish\n`;
out += `if (typeof window !== 'undefined') {\n    window.CASES_DATA = CASES_DATA;\n}\n`;
out += `if (typeof module !== 'undefined' && module.exports) {\n    module.exports = { CASES_DATA };\n}\n`;

fs.writeFileSync(path.join(__dirname, 'cases.js'), out);
console.log(`\n✅ cases.js yangilandi! (${out.length} bytes)\n`);

// ========== Statistika ==========
for (const [key, c] of Object.entries(newCases)) {
    const cheap = c.items.filter(i => i.price <= c.price);
    const exp = c.items.filter(i => i.price > c.price);
    const totalChance = c.items.reduce((s, i) => s + i.chance, 0);
    console.log(`${key} (${c.price} coin): ${c.items.length} items = ${cheap.length} arzon + ${exp.length} qimmat | chance total: ${totalChance.toFixed(1)}%`);
    console.log(`  Narx: ${c.items[0]?.price} — ${c.items[c.items.length - 1]?.price} coin`);
}
