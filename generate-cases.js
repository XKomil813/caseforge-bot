const fs = require('fs');
const {CASES_DATA} = require('./cases.js');

// ============================================================
// KONVERTATSIYA: $1 USD = 16,000 coin
// (25,000 coin = 20,000 so'm, $1 ≈ 12,800 so'm)
// ============================================================
const USD = 16000;

// Extract Steam CDN hash from full URL
function getHash(url) {
    return url.replace('https://community.fastly.steamstatic.com/economy/image/', '').replace('/62fx62f', '');
}

// ============================================================
// REAL STEAM MARKET PRICES (USD) - 2025-2026
// ============================================================
const PRICES = {
    // === BS skins ($0.03) ===
    "P90 | Sand Spray (BS)": 0.03,
    "MAC-10 | Storm Camo (BS)": 0.03,
    "P250 | Sand Dune (BS)": 0.03,
    "Nova | Predator (BS)": 0.03,
    "SG 553 | Army Sheen (BS)": 0.03,
    "PP-Bizon | Sand Dashed (BS)": 0.03,
    "Negev | Army Sheen (BS)": 0.03,
    "Sawed-Off | Forest DDPAT (BS)": 0.03,

    // === BS skins ($0.04-0.05) ===
    "MP7 | Army Recon (BS)": 0.04,
    "UMP-45 | Mudder (BS)": 0.04,
    "MP5-SD | Dirt Drop (BS)": 0.04,
    "Galil AR | Sage Spray (BS)": 0.04,
    "Tec-9 | Ground Water (BS)": 0.04,
    "FAMAS | Colony (BS)": 0.05,
    "Glock-18 | Ground Water (BS)": 0.05,
    "UMP-45 | Oscillator (BS)": 0.05,

    // === FT cheap ($0.03-0.05) ===
    "P90 | Blue Tac (FT)": 0.03,
    "MP7 | Forest DDPAT (FT)": 0.03,
    "MAG-7 | Silver (FT)": 0.03,
    "XM1014 | Blue Spruce (FT)": 0.03,
    "Negev | Ultralight (FT)": 0.04,
    "PP-Bizon | Seabird (FT)": 0.04,
    "P90 | Straight Dimes (FT)": 0.05,
    "MP5-SD | Agent (FT)": 0.05,
    "MP7 | Sunbaked (FT)": 0.05,
    "FAMAS | Crypsis (FT)": 0.05,
    "SG 553 | Tiger Moth (FT)": 0.05,
    "Sawed-Off | Apotheosis (FT)": 0.05,
    "Nova | Wild Six (FT)": 0.05,
    "MP5-SD | Liquidation (FT)": 0.05,
    "P250 | Valence (FT)": 0.05,

    // === FT medium ($0.06-0.15) ===
    "Tec-9 | Fubar (FT)": 0.06,
    "Galil AR | Amber Fade (FT)": 0.06,
    "P250 | Visions (FT)": 0.06,
    "MAC-10 | Sakkaku (FT)": 0.08,
    "Glock-18 | Vogue (FT)": 0.08,
    "Tec-9 | Isaac (FT)": 0.10,
    "XM1014 | Incinegator (FT)": 0.10,
    "Galil AR | Connexion (FT)": 0.10,
    "MP7 | Mischief (FT)": 0.12,
    "Glock-18 | Candy Apple (FT)": 0.15,
    "P90 | Teardown (FT)": 0.10,

    // === FT/MW $0.15-0.50 ===
    "P90 | Teardown (MW)": 0.15,
    "UMP-45 | Oscillator (MW)": 0.15,
    "Galil AR | Connexion (MW)": 0.20,
    "MP7 | Motherboard (FT)": 0.20,
    "PP-Bizon | Cold Cell (FN)": 0.20,
    "USP-S | Ticket to Hell (FT)": 0.25,
    "AK-47 | Safari Mesh (FT)": 0.25,
    "M4A1-S | Night Terror (FT)": 0.30,
    "Five-SeveN | Angry Mob (FT)": 0.30,
    "AK-47 | Safari Mesh (MW)": 0.40,
    "USP-S | Ticket to Hell (MW)": 0.50,
    "USP-S | Silent Shot (FT)": 0.50,
    "MP7 | Fade (FT)": 0.50,
    "Galil AR | Cerberus (FT)": 0.50,
    "Tec-9 | Sandstorm (MW)": 0.50,
    "M4A1-S | Night Terror (MW)": 0.60,
    "PP-Bizon | Judgement of Anubis (FT)": 0.50,
    "UMP-45 | Oscillator (FN)": 0.50,
    "MP7 | Skulls (FN)": 0.50,
    "Glock-18 | Water Elemental (FT)": 0.60,
    "Tec-9 | Rebel (FT)": 0.60,

    // === $0.80-2.00 ===
    "Glock-18 | Shinobu (FT)": 0.80,
    "FAMAS | Commemoration (FT)": 0.80,
    "MAC-10 | Neon Rider (FT)": 1.00,
    "SG 553 | Darkwing (FT)": 1.00,
    "Negev | Power Loader (FT)": 1.00,
    "Nova | Koi (FN)": 1.00,
    "P250 | See Ya Later (FT)": 1.00,
    "USP-S | Silent Shot (MW)": 1.50,

    // === $2-5 ===
    "Five-SeveN | Case Hardened (FT)": 2.00,
    "M4A1-S | Electrum (MW)": 2.00,
    "Glock-18 | Shinobu (MW)": 2.00,
    "USP-S | Jawbreaker (FT)": 2.50,
    "Five-SeveN | Monkey Business (FT)": 2.50,
    "P90 | Asiimov (FT)": 2.50,
    "UMP-45 | Crime Scene (FN)": 2.50,
    "AK-47 | Slate (FT)": 3.00,
    "P250 | Kintsugi (MW)": 3.00,
    "MAC-10 | Neon Rider (FN)": 3.00,
    "M4A1-S | Night Terror (FN)": 3.00,
    "FAMAS | Meltdown (FN)": 3.00,
    "MP7 | Neon Ply (FN)": 3.00,
    "Galil AR | Chromatic Aberration (FT)": 3.00,
    "Tec-9 | Fuel Injector (FT)": 3.00,
    "SG 553 | Integrale (FT)": 3.00,
    "Glock-18 | Vogue (FN)": 3.00,
    "M4A1-S | Black Lotus (FT)": 4.00,
    "AK-47 | Aphrodite (BS)": 4.00,
    "Five-SeveN | Monkey Business (MW)": 4.00,

    // === $5-15 ===
    "AK-47 | Slate (MW)": 5.00,
    "AK-47 | Ice Coaled (FT)": 5.00,
    "M4A1-S | Solitude (FT)": 5.00,
    "USP-S | Silent Shot (FN)": 5.00,
    "MP7 | Fade (FN)": 5.00,
    "USP-S | Jawbreaker (MW)": 5.00,
    "AK-47 | Redline (FT)": 8.00,
    "AK-47 | Aphrodite (FT)": 8.00,
    "AK-47 | Crane Flight (FT)": 8.00,
    "Glock-18 | Shinobu (FN)": 8.00,
    "M4A1-S | Electrum (FN)": 8.00,
    "P250 | Kintsugi (FN)": 8.00,
    "Tec-9 | Sandstorm (FN)": 8.00,
    "M4A1-S | Black Lotus (MW)": 8.00,
    "M4A1-S | Solitude (MW)": 10.00,
    "Five-SeveN | Monkey Business (FN)": 10.00,
    "AK-47 | Ice Coaled (MW)": 12.00,
    "AK-47 | Asiimov (FT)": 12.00,
    "AWP | Chrome Cannon (BS)": 12.00,
    "AK-47 | Nightwish (FT)": 15.00,
    "USP-S | Jawbreaker (FN)": 15.00,
    "AK-47 | Slate (FN)": 15.00,
    "AWP | Chrome Cannon (FT)": 15.00,

    // === $15-50 ===
    "M4A4 | Temukau (FT)": 18.00,
    "AK-47 | Redline (MW)": 20.00,
    "AK-47 | Aphrodite (MW)": 20.00,
    "AK-47 | Nightwish (MW)": 25.00,
    "AWP | Chrome Cannon (MW)": 25.00,
    "AK-47 | Inheritance (FT)": 25.00,
    "Glock-18 | Fully Tuned (FT)": 25.00,
    "M4A4 | Temukau (MW)": 30.00,
    "Glock-18 | Fully Tuned (WW)": 30.00,
    "AK-47 | Asiimov (MW)": 30.00,
    "M4A1-S | Black Lotus (FN)": 35.00,
    "FAMAS | Bad Trip (FT)": 35.00,
    "AK-47 | Inheritance (MW)": 40.00,
    "Glock-18 | Fully Tuned (MW)": 45.00,
    "AK-47 | Ice Coaled (FN)": 50.00,
    "M4A1-S | Solitude (FN)": 50.00,
    "FAMAS | Bad Trip (MW)": 50.00,

    // === $50-500 ===
    "M4A4 | Temukau (FN)": 80.00,
    "AK-47 | Asiimov (FN)": 200.00,
    "AK-47 | Redline (FN)": 300.00,
    "Glock-18 | Fade (FN)": 300.00,

    // === Stickers ===
    "Sticker | Team Spirit": 0.04,
    "Sticker | w0nderful": 0.04,
    "Sticker | G2 Esports": 0.05,
    "Sticker | Lynn Vision": 0.03,
    "Sticker | Hydro Geyser": 0.10,
    "Sticker | Bolt Energy": 0.08,
    "Sticker | Boom Trail": 0.10,
    "Sticker | donk (Gold)": 1.50,
};

// ============================================================
// NEW STICKERS FROM STEAM (real images from Steam Market API)
// ============================================================
const NEW_STICKERS = [
    { name: "Sticker | Lake | Budapest 2025", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMi0MSnHtwM6547z1VXmShi_z5K-3Bf7Kf5OqVsdqSWCDGRlrhy5eQ9Gyzil05w4WzVyNn9cXqQahhgVMVSmDu9wg" },
    { name: "Sticker | r1nkle | Budapest 2025", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMi0MSnHtwM6547z1Uu2Txb9m9jlr3Ba7PatOPVpeKHBDDfBmL1157JtHHCxzRl35ziGw9v7cH7EZwRyFNIuEmlMBNG8" },
    { name: "Sticker | hatz | Antwerp 2022", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpUruRiL5n4L6s3EIvqasOPw1dfHACDHBmbd35bkwGHm3x0l25G7Sn9atdC2SOFApXppuBbldF-8muLU" },
    { name: "Sticker | tabseN | Shanghai 2024", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNmpNCnHtwI6547z1U3mQw70kNi3_3cO7aD8bKBpdfPBXDGVlb535eM8Hn_qwEx04WncyIyqcS3EPwNxFNIuEoTt79DZ" },
    { name: "Sticker | Keoz | Rio 2022", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNioOinHtwQ6547z1VLiTge_ysHlrXEKuq6a_RpcKHFDT-UkOp36bU6GHvqk0lw4T7Szd_9JymRbBhgVMV80HHetg" },
    { name: "Sticker | cool4st | Austin 2025", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1VroThGljYKuryQPvKr3bv1udKDGXWbCl-og4bA_Gi2xlEkk4T6En9j7eC-SZgB0A4wwG7AsEoR78w" },
    { name: "Sticker | phzy | Austin 2025", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1UnvWS_zJS2pXcN6aqsMaU6I6XEDDHGxLsisrNsTHywzUUk5mjTmdepIiiWbBhgVMWchAoaqw" },
    { name: "Sticker | decenty | Austin 2025", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1V3iQhj_io-u-3cI7ar6MfY5cvOVDD_Eme8v6LY4HHvhxE0m4zvVzdypJXyWblAnDowwG7BYy18wUQ" },
    { name: "Sticker | mlhzin | Austin 2025", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1VTrSQf4kNjkpScC6qb9avNoJqeVWD6Ulewg5eRvHnm2xEhy4m7Xz4qhIn3GZ1QjFNIuElOniM_m" },
    { name: "Sticker | VINI | Austin 2025", usd: 0.02, hash: "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1U_TxS_xse1ryENu_CvO_Q5cPPFWWXHku0g47E-GH3nxhsltTnVydasJ3LFbhhgVMUho8bjfQ" },
];

// ============================================================
// CHANCE CALCULATION - based on price/case price ratio
// ============================================================
function calcChance(coinPrice, casePrice) {
    const ratio = coinPrice / casePrice;
    if (ratio <= 0.3) return 8.0;
    if (ratio <= 0.6) return 6.0;
    if (ratio <= 1.0) return 4.0;
    if (ratio <= 2.0) return 2.0;
    if (ratio <= 5.0) return 1.0;
    if (ratio <= 15) return 0.3;
    if (ratio <= 50) return 0.08;
    if (ratio <= 200) return 0.02;
    return 0.005;
}

// ============================================================
// BUILD NEW CASES DATA
// ============================================================

// Collect all image hashes from existing items
const hashMap = {};
for (const c of Object.values(CASES_DATA)) {
    for (const item of c.items) {
        hashMap[item.name] = getHash(item.image);
    }
}

// Add new sticker hashes
for (const s of NEW_STICKERS) {
    hashMap[s.name] = s.hash;
}

function makeItem(name, coinPrice, casePrice) {
    const h = hashMap[name];
    if (!h) throw new Error(`No hash for: ${name}`);
    return {
        name,
        price: coinPrice,
        chance: calcChance(coinPrice, casePrice),
        hash: h
    };
}

function coinPrice(name) {
    const usd = PRICES[name];
    if (usd !== undefined) return Math.max(200, Math.round(usd * USD));
    // Check new stickers
    const sticker = NEW_STICKERS.find(s => s.name === name);
    if (sticker) return Math.max(200, Math.round(sticker.usd * USD));
    console.warn(`No price for: ${name}, using 200`);
    return 200;
}

// Build each case
const cases = {};
const caseKeys = ['eco', 'budget', 'premium', 'elite', 'legendary'];

for (const key of caseKeys) {
    const old = CASES_DATA[key];
    const cp = old.price;

    // Convert existing items with real prices
    const seen = new Set();
    const items = [];
    for (const item of old.items) {
        if (seen.has(item.name)) continue; // remove duplicates
        seen.add(item.name);
        const cp2 = coinPrice(item.name);
        items.push(makeItem(item.name, cp2, cp));
    }

    // Add stickers to eco and budget
    if (key === 'eco') {
        for (const s of NEW_STICKERS.slice(0, 10)) {
            if (!seen.has(s.name)) {
                seen.add(s.name);
                const p = Math.max(200, Math.round(s.usd * USD));
                items.push(makeItem(s.name, p, cp));
            }
        }
    }
    if (key === 'budget') {
        for (const s of NEW_STICKERS) {
            if (!seen.has(s.name)) {
                seen.add(s.name);
                const p = Math.max(200, Math.round(s.usd * USD));
                items.push(makeItem(s.name, p, cp));
            }
        }
    }

    // Sort: cheapest first
    items.sort((a, b) => a.price - b.price);

    cases[key] = {
        name: old.name,
        price: old.price,
        image: old.image,
        description: old.description,
        items
    };
}

// ============================================================
// GENERATE cases.js FILE
// ============================================================
function escStr(s) {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

let out = '';
out += '// Steam CDN image helper\n';
out += 'const IMG = (hash) => `https://community.fastly.steamstatic.com/economy/image/${hash}/62fx62f`;\n\n';
out += '// ============================================================\n';
out += '// CASES DATA - Real Steam Market narxlari\n';
out += '// Konvertatsiya: $1 USD = 16,000 coin (25,000 coin = 20,000 so\'m)\n';
out += '// ============================================================\n\n';
out += 'const CASES_DATA = {\n\n';

for (const key of caseKeys) {
    const c = cases[key];
    const above = c.items.filter(i => i.price > c.price).length;
    const below = c.items.filter(i => i.price <= c.price).length;

    out += `    // ==================== ${c.name.toUpperCase()} (${c.price} coin) ====================\n`;
    out += `    ${key}: {\n`;
    out += `        name: "${escStr(c.name)}",\n`;
    out += `        price: ${c.price},\n`;
    out += `        image: "${escStr(c.image)}",\n`;
    out += `        description: "${escStr(c.description)}",\n`;
    out += `        items: [\n`;

    for (let i = 0; i < c.items.length; i++) {
        const item = c.items[i];
        const comma = i < c.items.length - 1 ? ',' : '';
        out += `            { name: "${escStr(item.name)}", price: ${item.price}, chance: ${item.chance}, image: IMG("${item.hash}") }${comma}\n`;
    }

    out += '        ]\n';
    out += '    },\n\n';

    console.log(`${key}: ${c.items.length} items, ${below} <= ${c.price}, ${above} > ${c.price}, min=${Math.min(...c.items.map(i=>i.price))}, max=${Math.max(...c.items.map(i=>i.price))}`);
}

out += '};\n\n';
out += '// Global qilish\n';
out += 'if (typeof window !== \'undefined\') {\n';
out += '    window.CASES_DATA = CASES_DATA;\n';
out += '}\n';
out += 'if (typeof module !== \'undefined\' && module.exports) {\n';
out += '    module.exports = { CASES_DATA };\n';
out += '}\n';

fs.writeFileSync('cases.js', out);
console.log(`\n✅ cases.js generated! (${out.length} bytes)`);
