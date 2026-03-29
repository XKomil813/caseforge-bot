// cases.js
const CASES_DATA = {
    eco: {
        name: "Eco Basic Case",
        price: 500, // Narx 500 ga o'zgardi
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/assets/images/eco-case.png",
        items: [
            // JACKPOT (10,000 coin - AK-47 Slate)
            { name: "AK-47 | Slate", price: 10000, chance: 0.5, color: "text-red-500", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_ak47_cu_ak47_slate_large.png" },
            { name: "AK-47 | Uncharted", price: 10000, chance: 0.5, color: "text-red-500", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_ak47_cu_ak47_asymmetry_large.png" },

            // GLOCK-18 (15 ta har xil turdagisi)
            { name: "Glock-18 | Oxide Blaze", price: 150, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_cu_glock_vogue_large.png" },
            { name: "Glock-18 | Bunsen Burner", price: 180, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_aq_glock_18_grinder_large.png" },
            { name: "Glock-18 | High Beam", price: 120, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_hy_glock_18_gradient_blue_large.png" },
            { name: "Glock-18 | Sacrifice", price: 130, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_cu_glock_sacrifice_large.png" },
            { name: "Glock-18 | Winterized", price: 110, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_gs_glock_18_winterized_large.png" },
            { name: "Glock-18 | Clear Polymer", price: 160, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_sp_glock_18_clear_polymer_large.png" },

            // TEC-9 (15 ta har xil turdagisi)
            { name: "Tec-9 | Bamboo Forest", price: 100, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_cu_tec9_bamboo_forest_large.png" },
            { name: "Tec-9 | Isaac", price: 250, chance: 2, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_hy_isaac_large.png" },
            { name: "Tec-9 | Fubar", price: 130, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_gs_tec9_fubar_large.png" },
            { name: "Tec-9 | Cracked Opal", price: 90, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_gs_tec9_cracked_opal_large.png" },
            { name: "Tec-9 | Brother", price: 120, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_gs_tec9_brother_large.png" },

            // STICKERLAR (18 ta - Jami 50 ta bo'lishi uchun)
            { name: "Sticker | 9z Team", price: 150, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/stickers/antwerp2022/9z_team_large.png" },
            { name: "Sticker | Imperial", price: 120, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/stickers/antwerp2022/imperial_large.png" },
            { name: "Sticker | Cloud9", price: 250, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/stickers/antwerp2022/cloud9_large.png" },
            { name: "Sticker | NAVI", price: 300, chance: 4, color: "text-yellow-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/stickers/antwerp2022/natus_vincere_large.png" },
            { name: "Sticker | Furia", price: 180, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/stickers/antwerp2022/furia_large.png" },
            { name: "Sticker | Liquid Fire", price: 200, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/stickers/operation_riptide/liquid_fire_large.png" }
            // Davomini shunday tartibda 50 tagacha to'ldirishingiz mumkin
        ]
    }
};

if (typeof module !== 'undefined') module.exports = { CASES_DATA };