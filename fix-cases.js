const https = require('https');
const fs = require('fs');
const path = require('path');

// Load existing cases
const { CASES_DATA } = require('./cases.js');

// Cache file for fetched image hashes
const CACHE_FILE = path.join(__dirname, 'image-cache.json');
let imageCache = {};
if (fs.existsSync(CACHE_FILE)) {
    imageCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
}

// Min price thresholds per case
const MIN_PRICES = {
    eco: 0,        // keep all
    budget: 800,
    premium: 3200,
    elite: 12800,
    legendary: 32000
};

// Condition abbreviation expansion
const CONDITIONS = {
    'BS': 'Battle-Scarred',
    'WW': 'Well-Worn',
    'FT': 'Field-Tested',
    'MW': 'Minimal Wear',
    'FN': 'Factory New'
};

function expandName(name) {
    return name.replace(/\((BS|WW|FT|MW|FN)\)/, (_, cond) => `(${CONDITIONS[cond]})`);
}

function extractHash(url) {
    if (typeof url === 'string') {
        const m = url.match(/economy\/image\/([^/]+)/);
        return m ? m[1] : '';
    }
    return '';
}

function fetchSteamImage(itemName) {
    return new Promise((resolve) => {
        const fullName = expandName(itemName);
        const query = encodeURIComponent(fullName);
        const reqPath = `/market/search/render/?appid=730&norender=1&count=5&query=${query}`;

        const options = {
            hostname: 'steamcommunity.com',
            path: reqPath,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        };

        const req = https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.results && json.results.length > 0) {
                        // Try exact match first
                        for (const result of json.results) {
                            if (result.hash_name === fullName || result.name === fullName) {
                                resolve(result.asset_description.icon_url);
                                return;
                            }
                        }
                        // Fallback: first result
                        resolve(json.results[0].asset_description.icon_url);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    console.error(`  Parse error: ${e.message}`);
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`  Network error: ${e.message}`);
            resolve(null);
        });

        req.setTimeout(10000, () => {
            req.destroy();
            resolve(null);
        });
    });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
    console.log('=== CaseForge Cases Filter & Image Fix ===\n');

    // Step 1: Filter items per case
    const filtered = {};
    for (const [id, data] of Object.entries(CASES_DATA)) {
        const min = MIN_PRICES[id];
        const items = data.items.filter(i => i.price >= min);
        filtered[id] = { ...data, items: items.map(i => ({ ...i })) };
        console.log(`${id} (min ${min}): ${data.items.length} -> ${items.length} items`);
    }

    // Step 2: Collect unique skin names (skip stickers - they have correct images)
    const uniqueWeapons = new Set();
    const allOriginalHashes = {};
    for (const data of Object.values(filtered)) {
        for (const item of data.items) {
            allOriginalHashes[item.name] = extractHash(item.image);
            if (!item.name.startsWith('Sticker |')) {
                uniqueWeapons.add(item.name);
            }
        }
    }
    console.log(`\nUnique weapon skins to fetch: ${uniqueWeapons.size}`);

    // Step 3: Fetch correct images from Steam
    const weaponNames = [...uniqueWeapons];
    let fetched = 0, cached = 0, failed = 0;

    for (let i = 0; i < weaponNames.length; i++) {
        const name = weaponNames[i];

        if (imageCache[name]) {
            cached++;
            console.log(`[${i + 1}/${weaponNames.length}] ${name} (cached)`);
            continue;
        }

        console.log(`[${i + 1}/${weaponNames.length}] ${name}`);
        const hash = await fetchSteamImage(name);

        if (hash) {
            imageCache[name] = hash;
            fetched++;
            console.log(`  OK`);
        } else {
            // Fallback to original hash
            imageCache[name] = allOriginalHashes[name];
            failed++;
            console.log(`  FAILED - using original`);
        }

        // Save cache after each fetch
        fs.writeFileSync(CACHE_FILE, JSON.stringify(imageCache, null, 2));

        // Rate limit: wait 3.5 seconds between Steam API calls
        if (i < weaponNames.length - 1) {
            await sleep(3500);
        }
    }

    console.log(`\nResults: ${fetched} fetched, ${cached} cached, ${failed} failed`);

    // Step 4: Redistribute chances per case
    for (const [id, data] of Object.entries(filtered)) {
        const items = data.items;
        const casePrice = data.price;

        const cheap = items.filter(i => i.price <= casePrice);
        const expensive = items.filter(i => i.price > casePrice);

        // Assign chances to expensive items based on price ratio
        let expChance = 0;
        for (const item of expensive) {
            const ratio = item.price / casePrice;
            if (ratio > 50) item.newChance = 0.01;
            else if (ratio > 30) item.newChance = 0.04;
            else if (ratio > 15) item.newChance = 0.1;
            else if (ratio > 8) item.newChance = 0.2;
            else if (ratio > 5) item.newChance = 0.35;
            else if (ratio > 3) item.newChance = 0.5;
            else if (ratio > 2) item.newChance = 0.8;
            else if (ratio > 1.5) item.newChance = 1.2;
            else item.newChance = 1.8;
            expChance += item.newChance;
        }

        // Distribute remaining chance equally to cheap items
        const remaining = 100 - expChance;
        if (cheap.length > 0) {
            const per = Math.round((remaining / cheap.length) * 100) / 100;
            for (const item of cheap) {
                item.newChance = per;
            }
        }

        console.log(`\n${id} (${casePrice} coin): ${cheap.length} cheap + ${expensive.length} expensive = ${items.length} total`);
    }

    // Step 5: Generate new cases.js
    const caseLabels = {
        eco: 'ECO CASE',
        budget: 'BUDGET CASE',
        premium: 'PREMIUM CASE',
        elite: 'ELITE CASE',
        legendary: 'LEGENDARY CASE'
    };

    let out = `// Steam CDN image helper
const IMG = (hash) => \`https://community.fastly.steamstatic.com/economy/image/\${hash}/62fx62f\`;

// ============================================================
// CASES DATA - Real Steam Market narxlari
// Konvertatsiya: $1 USD = 16,000 coin (1 so'm = 1.25 coin)
// ============================================================

const CASES_DATA = {\n`;

    for (const [id, data] of Object.entries(filtered)) {
        out += `\n    // ==================== ${caseLabels[id]} (${data.price} coin) ====================\n`;
        out += `    ${id}: {\n`;
        out += `        name: "${data.name}",\n`;
        out += `        price: ${data.price},\n`;
        out += `        image: "${data.image}",\n`;
        out += `        description: "${data.description}",\n`;
        out += `        items: [\n`;

        for (const item of data.items) {
            // Use cached/fetched hash for weapons, original for stickers
            let hash;
            if (item.name.startsWith('Sticker |')) {
                hash = allOriginalHashes[item.name];
            } else {
                hash = imageCache[item.name] || allOriginalHashes[item.name];
            }
            const chance = item.newChance || item.chance;
            out += `            { name: "${item.name}", price: ${item.price}, chance: ${chance}, image: IMG("${hash}") },\n`;
        }

        out += `        ]\n`;
        out += `    },\n`;
    }

    out += `\n};\n\n`;
    out += `// Global qilish\n`;
    out += `if (typeof window !== 'undefined') {\n`;
    out += `    window.CASES_DATA = CASES_DATA;\n`;
    out += `}\n`;
    out += `if (typeof module !== 'undefined' && module.exports) {\n`;
    out += `    module.exports = { CASES_DATA };\n`;
    out += `}\n`;

    fs.writeFileSync(path.join(__dirname, 'cases.js'), out, 'utf-8');
    console.log('\n=== cases.js updated successfully! ===');
}

main().catch(console.error);
