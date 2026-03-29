// cases.js
const CASES_DATA = {
    eco: {
        name: "Eco Basic Case",
        price: 200,
        image: "https://cdn.jsdelivr.net/gh/XKomil813/caseforge-bot@main/assets/images/eco-case.png",
        items: [
            // JACKPOT (10,000 coin - Steamda ~$5-7)
            { name: "AK-47 | Slate", price: 10000, chance: 0.5, color: "text-red-500", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_ak47_cu_ak47_slate_large.png" },
            { name: "AK-47 | Uncharted", price: 10000, chance: 0.5, color: "text-red-500", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_ak47_cu_ak47_asymmetry_large.png" },

            // GLOCK-18 (Arzon skinlar)
            { name: "Glock-18 | Oxide Blaze", price: 150, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_cu_glock_vogue_large.png" },
            { name: "Glock-18 | Bunsen Burner", price: 180, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_aq_glock_18_grinder_large.png" },
            { name: "Glock-18 | High Beam", price: 120, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_hy_glock_18_gradient_blue_large.png" },
            { name: "Glock-18 | Sacrifice", price: 130, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_glock_cu_glock_sacrifice_large.png" },

            // USP-S (Arzon skinlar)
            { name: "USP-S | Black Lotus", price: 400, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_usp_silencer_cu_usp_black_lotus_large.png" },
            { name: "USP-S | Flashback", price: 450, chance: 3, color: "text-purple-500", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_usp_silencer_cu_usp_flashback_large.png" },
            { name: "USP-S | Lead Conduit", price: 300, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_usp_silencer_gs_usp_blueprint_large.png" },
            { name: "USP-S | Torque", price: 320, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_usp_silencer_cu_usp_torque_large.png" },

            // TEC-9 (Arzon skinlar)
            { name: "Tec-9 | Bamboo Forest", price: 100, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_cu_tec9_bamboo_forest_large.png" },
            { name: "Tec-9 | Isaac", price: 250, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_hy_isaac_large.png" },
            { name: "Tec-9 | Fubar", price: 130, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_gs_tec9_fubar_large.png" },
            { name: "Tec-9 | Cracked Opal", price: 90, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_tec9_gs_tec9_cracked_opal_large.png" },

            // P250 va Boshqa Pistoletlar
            { name: "P250 | Valence", price: 90, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_p250_cu_p250_valence_large.png" },
            { name: "P250 | Cassette", price: 100, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_p250_cu_p250_cassette_large.png" },
            { name: "Desert Eagle | Blue Ply", price: 220, chance: 3, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_deagle_gs_deagle_blue_ply_large.png" },
            { name: "Dual Berettas | Colony IV", price: 110, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_elite_gs_dual_berettas_combined_large.png" },

            // SMG va Arzon Avtomatlar (Jami 50 ta bo'lishi uchun davomi)
            { name: "MP9 | Modest Threat", price: 80, chance: 6, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_mp9_gs_mp9_black_sand_large.png" },
            { name: "MAC-10 | Oceanic", price: 70, chance: 6, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_mac10_hy_oceanic_large.png" },
            { name: "FAMAS | Mecha Industries", price: 350, chance: 3, color: "text-pink-500", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_famas_gs_famas_mecha_large.png" },
            { name: "Galil AR | Black Sand", price: 95, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_galilar_cu_galil_black_sand_large.png" },
            { name: "M4A4 | Magnesium", price: 180, chance: 4, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_m4a1_gs_m4a4_unobtanium_large.png" },
            { name: "SG 553 | Aerial", price: 110, chance: 5, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_sg556_gs_sg553_aerial_large.png" },
            { name: "MP7 | Cirrus", price: 85, chance: 6, color: "text-blue-400", image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-api/main/images/econ/default_generated/weapon_mp7_gs_mp7_cirrus_large.png" }
            // ... Ro'yxatni jami 50 ta bo'lguncha shunday davom ettirishingiz mumkin.
        ]
    }
};

if (typeof module !== 'undefined') module.exports = { CASES_DATA };