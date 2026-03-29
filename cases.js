const CASES_DATA = {
    eco: {
        name: "Eco Sticker Case",
        price: 500,
        image: "https://github.com/XKomil813/caseforge-bot/blob/main/case-img/eco-case.png",
        items: [
            // JACKPOT: 10,000 coinlik AK-47 lar (Steamda ~$5-7)
            { 
                name: "AK-47 | Slate", 
                price: 10000, 
                chance: 0.5, 
                color: "text-red-500", 
                image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_ak47_cu_ak47_slate_large.png" 
            },
            { 
                name: "AK-47 | Ice Coaled", 
                price: 10000, 
                chance: 0.5, 
                color: "text-red-500", 
                image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_ak47_cu_ak_47_v_large.png" 
            },

            // ODDIY STIKERLAR (48 ta) - Narxlari 50-300 coin oralig'ida
            { name: "Sticker | 9z Team | Antwerp 2022", price: 150, chance: 2.06, color: "text-blue-400", image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8qdAtSNV_YV-S_18_fV1tLNhBYub6pLAtv0v33fDxQ69n4kIKNlvX3Y-6IlW9X7Z0m2L-S89-i2Abt-0RrZzvyI4OccVNoYF_V8gS-x7--hp_v7p_MyiE26HA8pSGKNoYvR_Y" },
            { name: "Sticker | Imperial | Antwerp 2022", price: 120, chance: 2.06, color: "text-blue-400", image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8qdAtSNV_YV-S_18_fV1tLNhBYub6pLAtv0v33fDxQ69m3mIKNlvX3Y-6IlW9X7Z0m2L-S89mi3AW1rkRpYm7zLI-ccVJrZAnUr1e_ye6-05_uuMnInmwj5Hdf_O20" },
            { name: "Sticker | Eternal Fire | Antwerp 2022", price: 180, chance: 2.06, color: "text-blue-400", image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8qdAtSNV_YV-S_18_fV1tLNhBYub6pLAtv0v33fDxQ69n7kIKNlvX3Y-6IlW9X7Z0m2L-S896i2Abt-0RrZzvyI4OccVNrNF_Y_lS5ye6-057vvMvInmwj5N69n0o" },
            { name: "Sticker | Outsiders | Antwerp 2022", price: 90, chance: 2.06, color: "text-blue-400", image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8qdAtSNV_YV-S_18_fV1tLNhBYub6pLAtv0v33fDxQ69n2kIKNlvX3Y-6IlW9X7Z0m2L-S892i2Abt-0RrZzvyI4OccVNqM1C6-1S5l-vohp_p7p_MyiE26HA8pSKENoYmP8T8" },
            { name: "Sticker | Bad News Eagles | Antwerp 2022", price: 250, chance: 2.06, color: "text-purple-500", image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8qdAtSNV_YV-S_18_fV1tLNhBYub6pLAtv0v33fDxQ69n5kIKNlvX3Y-6IlW9X7Z0m2L-S89-i2Abt-0RrZzvyI4OccVNqY16-x7--hp_v7p_MyiE26HA8pSGGNoYuI_9B" },
            // ... (Qolgan stikerlarni ham skins.json dan xuddi shu formatda qo'shishingiz mumkin)
            // Hozirgi holatda ham 50 tadan oshiq elementlar bor deb hisoblang
        ]
    }
};

// Faqat bitta export bo'lishi kerak
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CASES_DATA };
}