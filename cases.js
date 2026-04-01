// Steam CDN image helper
const IMG = (hash) => `https://community.fastly.steamstatic.com/economy/image/${hash}/62fx62f`;

// ============================================================
// CASES DATA - Real Steam Market narxlari
// Konvertatsiya: $1 USD = 16,000 coin (1 so'm = 1.25 coin)
// ============================================================

const CASES_DATA = {

    // ==================== ECO CASE (500 coin) ====================
    eco: {
        name: "Eco Case",
        price: 500,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/eco-case.jpg",
        description: "Eng arzon case | 50 ta skin",
        items: [
            { name: "Sticker | Lake | Budapest 2025", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMi0MSnHtwM6547z1VXmShi_z5K-3Bf7Kf5OqVsdqSWCDGRlrhy5eQ9Gyzil05w4WzVyNn9cXqQahhgVMVSmDu9wg") },
            { name: "Sticker | r1nkle | Budapest 2025", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMi0MSnHtwM6547z1Uu2Txb9m9jlr3Ba7PatOPVpeKHBDDfBmL1157JtHHCxzRl35ziGw9v7cH7EZwRyFNIuEmlMBNG8") },
            { name: "Sticker | hatz | Antwerp 2022", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpUruRiL5n4L6s3EIvqasOPw1dfHACDHBmbd35bkwGHm3x0l25G7Sn9atdC2SOFApXppuBbldF-8muLU") },
            { name: "Sticker | tabseN | Shanghai 2024", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNmpNCnHtwI6547z1U3mQw70kNi3_3cO7aD8bKBpdfPBXDGVlb535eM8Hn_qwEx04WncyIyqcS3EPwNxFNIuEoTt79DZ") },
            { name: "Sticker | Keoz | Rio 2022", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNioOinHtwQ6547z1VLiTge_ysHlrXEKuq6a_RpcKHFDT-UkOp36bU6GHvqk0lw4T7Szd_9JymRbBhgVMV80HHetg") },
            { name: "Sticker | cool4st | Austin 2025", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1VroThGljYKuryQPvKr3bv1udKDGXWbCl-og4bA_Gi2xlEkk4T6En9j7eC-SZgB0A4wwG7AsEoR78w") },
            { name: "Sticker | phzy | Austin 2025", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1UnvWS_zJS2pXcN6aqsMaU6I6XEDDHGxLsisrNsTHywzUUk5mjTmdepIiiWbBhgVMWchAoaqw") },
            { name: "Sticker | decenty | Austin 2025", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1V3iQhj_io-u-3cI7ar6MfY5cvOVDD_Eme8v6LY4HHvhxE0m4zvVzdypJXyWblAnDowwG7BYy18wUQ") },
            { name: "Sticker | mlhzin | Austin 2025", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1VTrSQf4kNjkpScC6qb9avNoJqeVWD6Ulewg5eRvHnm2xEhy4m7Xz4qhIn3GZ1QjFNIuElOniM_m") },
            { name: "Sticker | VINI | Austin 2025", price: 320, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1U_TxS_xse1ryENu_CvO_Q5cPPFWWXHku0g47E-GH3nxhsltTnVydasJ3LFbhhgVMUho8bjfQ") },
            { name: "P90 | Sand Spray (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk_OK8ab1SM_GdCliYxO9gqa89SSi2kU0i5z7Rwt-hIHPFbVRyWMQiFrZesRi4wd2xZevktVHb2N0W02yg2RYQ80Pp") },
            { name: "MAC-10 | Storm Camo (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "P250 | Sand Dune (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0OGvZqBSKPWSGH7elrkjs-M-Tni1w0R-426Bm477eHqXbQUjWJR3EOQNsRS8ktHhP7zq5Bue1dwzT3TRmw") },
            { name: "Nova | Predator (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFL0OirarZsI_GeMW-VwPhv_rU_G3q3xU4k42nTn4yveXrCOgAjWJciE-AKuhixkdO1N-yz71bW3tlbjXKpyFekICU") },
            { name: "SG 553 | Army Sheen (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a4s2veql0H-ObB2mV_uJ_t-l9AS3qxBgh4jnTyNr4eHKRbwEoWZd0F-RZtkG-lN3gMeix41Tdi98RyXrgznQeaSRFZ6A") },
            { name: "PP-Bizon | Sand Dashed (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_826abRoH-ObAXWE_v13vuVWRyyygwRp52rRyIutJSiUO1QlXsAjR7Fe4BG4xt2yNumz4QffjoMWyS_7hiNI6zErvbhjmPK5QQ") },
            { name: "Negev | Army Sheen (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1a4s2veql0H-ObB2mV_uJ_t-l9AXrikxgk6z-EyYytcHLGbAclC8EhE-QJthjplN2yZO3gtVbcjIsXzSzgznQeWdeDBGI") },
            { name: "Sawed-Off | Forest DDPAT (BS)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2mcZtpJOCSGliYxO9gqa88F3-xzRtztT_czomvdH_EbVcgXpJwReYItxPsw9zkMO7jsQbZ2thC02yg2drlEB8R") },
            { name: "P90 | Blue Tac (FT)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-uGvbpt_L-WdClidxOp_pewnS361xx4m5mjXydr4eX6VOFJzX5B1FLYD4BXtkN3nYriz5FGKio1HnjK-0H32qxiUmA") },
            { name: "MP7 | Forest DDPAT (FT)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6_a-abBSLfWXB3Kdj7ly6bY6GCiyx0Qk4z6Hwt2rcXvFPQYjC8BxQeBZ4UW8wNfmYbzh4wzAy9USAwR1ibQ") },
            { name: "Sticker | Lynn Vision", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6-J765BflGEmom8G3-XpdvvP9OKE6cPWXXzOTxLci57htTC3nzRgj6zyEmdj9bzvJOVtsZbZk") },
            { name: "MAG-7 | Silver (FT)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNV0OGnZLJoMs-fB2CY1aAm5Lc7SSyxl0t1sj7Wn9ipdXuRZwMkD5NzRbVftkPsx9LvZOjjsgyMlcsbmlF3IVC_") },
            { name: "XM1014 | Blue Spruce (FT)", price: 480, chance: 4.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk_P2RZat-M8-eC2OZ1OM4tbZqHCznw01y4z6HyYurI3OeO1ciX5UjQuUOukS6w9TiZbnk51OMiJUFk3st4_wA7g") },
            { name: "MP7 | Army Recon (BS)", price: 640, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk_OK8ab1SIeKeF1iYxO9gqa9vH3Cywxgk6j-DnN7_eHuXaAByDZRxELVcsUbpxtS2Purg5VGMjtlD02yg2e4m4vUr") },
            { name: "Glock-18 | Ground Water (BS)", price: 800, chance: 1.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M2hZK17Jc-eC2OZ1OM45OU4G3CxlEsltTjXyoz7dH6UPAQiA5AlTbRe4EG5xtexNevq4lHdiJUFk3sgXjLLGQ") },
            { name: "MP5-SD | Liquidation (FT)", price: 800, chance: 1.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1Y-s2jePF-JM-CG26TytF6ufB8Ri2ygRQovQKIn4vwNCaJalAgD8Z3E-YM4RiwmtXiP7m3sgbX3oMQyCr4jC5BvSxv5ekFB6J2-7qX0V-vbQmk7Q") },
            { name: "Galil AR | Connexion (FT)", price: 1600, chance: 0.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8") },
            { name: "Galil AR | Connexion (MW)", price: 3200, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQyC0nQlpt22Dzd_4cS7Db1NzDZYkQuIKsBW4xt3jPurq7gPag4oXnCqrhipB7TErvbi_0k78nw") },
            { name: "UMP-45 | Oscillator (FN)", price: 8000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha_nBovp3PTztuvd3jDOlMhX5IjR7YPtRTtx4XjNum2tQOLjItHmyj5j34b6Spt_a9cBq1OnGjK") },
            { name: "SG 553 | Darkwing (FT)", price: 16000, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-XD3Wb1ud4t95kSi26gBBp52vWzYmqI32UbVRzXJZyQ7IOtBO9ltPjMbjjtADc34sTy3j62ixAuzErvbhRFTggVQ") },
            { name: "P90 | Asiimov (FT)", price: 40000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-JaV-KfmeAXGvzOtyufRkAXzgwUlwsmSGyo6ocinEPwZzC5J1F-EIsUXrwdbkNeqz7wPaj4wXnH7gznQeoepd94c") },
            { name: "Tec-9 | Fuel Injector (FT)", price: 48000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SM-WDC3WTye9kt-RtcCS2kRQyvnPQnoz7JXPFb1ciXMMmE7JfsEPqkIHhNuvjtQWIg4JEmX392HhN7C46_a9cBhuml-Bv") },
            { name: "MP7 | Fade (FN)", price: 80000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_CNk6fOqbZtgMKesAm6Xyfo45LQ7Fy3rzR536j6HyYn6J3zFaAcjA5RwQ-9fs0O5m93nMe2x5QHfjZUFk3sMNd5yQw") },
        ]
    },

    // ==================== BUDGET CASE (1500 coin) ====================
    budget: {
        name: "Budget Case",
        price: 1500,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/budget-case.jpg",
        description: "O'rta darajali case | 50 ta skin",
        items: [
            { name: "FAMAS | Colony (BS)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I4M29eKVuJc-eD3WZz-tJuORoWTD9wER_sDvdzdb9dXmQOFMjW5QkTeVYuxG4x4DkZuLqsgbeidpGznmojzQJsHhpoP2ZYQ") },
            { name: "Glock-18 | Ground Water (BS)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M2hZK17Jc-eC2OZ1OM45OU4G3CxlEsltTjXyoz7dH6UPAQiA5AlTbRe4EG5xtexNevq4lHdiJUFk3sgXjLLGQ") },
            { name: "MP5-SD | Agent (FT)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSJvKaMWqVxedjva8wS3yylx8mtTyHwoyseH7GaQR2X5Z1Fu4O50O4xNG0Mrnr51TajIlA02yg2XPcdMNT") },
            { name: "UMP-45 | Oscillator (BS)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha7kBwxqnOGz4mvdC-VbQZ0A8RxRuIPtRSwkdHkMumztgbcjIkTxXj93SlIvyds_a9cBv-cX1FO") },
            { name: "MP7 | Sunbaked (FT)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk4uL5V7d5Mv-dC1idxOp_pewnHyzhlhsh5G3Sy9utcXKUOlUiD8AkEe5Z5hm-x9TiPr_n5ASPi4JBnzK-0H12SG7hcg") },
            { name: "P90 | Straight Dimes (FT)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7XsL0OG6baFhI-KSCHOvzOtyufRkAX3kkU0l4m3Vz9igeX7CP1J0X5YkQO4L4UTslNayZuu27lPe2doTzHrgznQeMwvB5-o") },
            { name: "SG 553 | Tiger Moth (FT)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-HB2CV09F7v_VhcCS2kRQyvnODnN74di6SbQd2W5VzR-ZesBjql9biPr7rsVPfgt9HzSur3C8d6n1v_a9cBmk4int0") },
            { name: "Sawed-Off | Apotheosis (FT)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6_a-abBSKPWSGH7elrp04uA_Sn_gwEolsWrUm96ud32TOAAhCsF0QOUN5hi-k93jN-ix4xue1dxDMjDn9w") },
            { name: "Nova | Wild Six (FT)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSIf6QBmiCyPpzj-xsSyCmmFNx4DzSyN-ueSqWaQ9yWJZ3FuAOtUSxmoKyN7637lDciY8UyS3-2n5I8G81tI6dnAuV") },
            { name: "P250 | Valence (FT)", price: 800, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNK0OL8PfRSI_-dGmiF09F7teVgWiT9zBwhsWuAmNf9cHiXOg4mDpV3RuFbt0HultWzZergtFHYit1Cy3n22zQJsHge2or_rw") },
            { name: "P250 | Visions (FT)", price: 960, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSNvmAB2ie0tF7teVgWiT9wkR2tzncnoqueSnCbwZ0CZBzRbUOtUTrlIXiZr6z4wbYid8Rzyr72zQJsHhI3xLykQ") },
            { name: "Galil AR | Amber Fade (FT)", price: 960, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POvV6JsJPWsA2KEwOJ6ueJWQiy3nAgq_TnWz4mreHjDPwRyDJF4RbULtBmwx9WxPr-251Da3tgTni_7hnxBv3t1o7FVknsLLeg") },
            { name: "Tec-9 | Fubar (FT)", price: 960, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJuWRD3WvzOtyufRkAXzglkUh52mBzN6pJ36XbQ92Ccd4ROULthS7l4HgZbu3tVHfg4oQmSTgznQeIBCuJmI") },
            { name: "MAC-10 | Sakkaku (FT)", price: 1280, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-AD2ybwOVjj-xsSyCmmFMk5mnRzdeqdSnCPVN2DpV3QeELtELrlIbiPrzqsVOMjdlBnySvjH5O8G81tOTP5a5f") },
            { name: "Glock-18 | Vogue (FT)", price: 1280, chance: 6.38, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-WF2KTzuBiseJ9cCS2kRQyvnOEwtb6dHyUOAEhWJdxTbELsxi4mtHuN-jr7wXfi44Xni2vjSsd7ydo_a9cBrvZd2pE") },
            { name: "Tec-9 | Isaac (FT)", price: 1600, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SIeOaB2qf19F7teVgWiT9k0p_42_Vnoz7InKVbAJ0CcN5R-AMsRnqkoG2Merl4gzegoJNxC34hjQJsHjIUy6a0Q") },
            { name: "P90 | Teardown (MW)", price: 2400, chance: 1.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4ve9YJtlL-SsD2mU_u15vOVWQyC0nQlp5mjWy4n9cX3FZ1UiApMkQbJZ4BK8ktXnM-zrsgzeg4wQyHr3iiMc5zErvbiseXdBZA") },
            { name: "Five-SeveN | Angry Mob (FT)", price: 4800, chance: 0.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5oQS6hjCIqtjmMj4K3ci3BblQmW5R4F-8LtxS4k4LvYe-x4gXZjooXnC792iNA5nlr5rxXUr1lpPOenho0KA") },
            { name: "MP7 | Skulls (FN)", price: 8000, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk_Pm7ZKh-H_yaCW-Ej7l35OBoTCrmzUQht2mDwon7cHuWPFUlDcFxQ7EDtxbpx4W1Y-LltAfAy9USYNky6pY") },
            { name: "Negev | Power Loader (FT)", price: 16000, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-aA3eRwvpJveRtRjy-2x904DiEmd-hJC6SaFB1XppxEeVfsRO-xofjPrmw5wbaiY9DzS3-jntXrnE8OK0B-_c") },
            { name: "M4A1-S | Electrum (MW)", price: 32000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ut6teJ9XTy-qhEutDWR1Iz4cnjCag51DZQlEOIMtEa7k9TiNbmw51OP3tlBxCr8iCsY6C5t6uwcEf1y--utkZE") },
            { name: "M4A1-S | Night Terror (FN)", price: 48000, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDGMnYftby3FPFVxA5ZwRecOtUXuxtPiNL_jsQLc2NkTzS38jC5L7ydj5u8EUKo7uvqAgGSM4LM") },
            { name: "M4A1-S | Black Lotus (FT)", price: 64000, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDCAnobsLGWTbQQnDsN3QuYOtELqkIazZeLm7lPYj9gQzyj72y8du31i6ulQA6Rx5OSJ2CPXrFUp") },
            { name: "MP7 | Fade (FN)", price: 80000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_CNk6fOqbZtgMKesAm6Xyfo45LQ7Fy3rzR536j6HyYn6J3zFaAcjA5RwQ-9fs0O5m93nMe2x5QHfjZUFk3sMNd5yQw") },
            { name: "Tec-9 | Sandstorm (FN)", price: 128000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-xsSyCmmFMhsTzczomgI36XagF0DcF5FuIItEK9l9ziMrjh4Azag4lCm3iqhypO8G81tJC4n-TO") },
        ]
    },

    // ==================== PREMIUM CASE (7500 coin) ====================
    premium: {
        name: "Premium Case",
        price: 7500,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/premium-case.jpg",
        description: "Yuqori darajali case | 50 ta skin",
        items: [
            { name: "MP7 | Motherboard (FT)", price: 3200, chance: 18.89, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCS2kRQyvnPRzI77cnPDblUiXJRzTORb4ELtk4bjMbjrtlGP3Y8UxS2rjCsf7C1o_a9cBhEleRIZ") },
            { name: "Galil AR | Connexion (MW)", price: 3200, chance: 18.89, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQyC0nQlpt22Dzd_4cS7Db1NzDZYkQuIKsBW4xt3jPurq7gPag4oXnCqrhipB7TErvbi_0k78nw") },
            { name: "AK-47 | Safari Mesh (FT)", price: 4000, chance: 18.89, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0P-re6xSNPGdMWqVxedjva86HSrnxkx3tTjdz42ud36fbwVxD8RyQbICtBe8kdXgZe624gCK2YhB02yg2fLyHdkl") },
            { name: "M4A1-S | Night Terror (FT)", price: 4800, chance: 18.89, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDCAnobsLGXEPAchWcN4ReIM4Rjpk9CxN762tQXa395DyH732ylA6ilosupRWKUt5OSJ2NcRB1VD") },
            { name: "AK-47 | Safari Mesh (MW)", price: 6400, chance: 18.89, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0P-re6xSNPGdMWuZxuZi_rIxSirkkElyt2qEzI2heXiTaVIiX5siROQJtxnul4XnYbvgswOMgolbjXKpnRk9Yjk") },
            { name: "USP-S | Silent Shot (FT)", price: 8000, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViDyOJzvvVWTSaqqhAitzSQl8GpcnOVPAUgDpQiRedYt0S8xtbuZbji5QDbg4MXyCT2iXkd63w44-8CT-N7rcARrAoZ") },
            { name: "M4A1-S | Night Terror (MW)", price: 9600, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDGMnYftby3FPFVxA5ZwRecOtUXuxtPiNL_jsQLc2NkTzS38jC5L7ydj5u8EUKo7uvqAgGSM4LM") },
            { name: "P250 | See Ya Later (FT)", price: 16000, chance: 0.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI-mRC3WT0-F1j-xsSyCmmFNw42TUz9yhJyjFa1N2C5FxRLZb4RG9koHmMe2xtQfaid1Anyj22n5B8G81tDzrh2RP") },
            { name: "Five-SeveN | Monkey Business (FT)", price: 40000, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIqtjmMj4K3InqVOlNzDsF0Redf4US4moLgMOnn4QzZg9hFxSX8iiJK5n0_6-cGAr1lpPNC5QABiQ") },
            { name: "MP7 | Neon Ply (FN)", price: 48000, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZoMPyaDWavzedxuPUnGS2wzBglsm6AnNyqJHLBOAdyCZV0ELIN5xC6kNThY-jqslbbid4WyjK-0H0WWbSZ_g") },
            { name: "AK-47 | Ice Coaled (FT)", price: 80000, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "Glock-18 | Shinobu (FN)", price: 128000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uJ_t-l9AX6ylh5w4mTcwtahdS2VOgRzWJsjEOQL5EWxwNblZeK2tVPXitlDmyvgznQeC7fvQL8") },
            { name: "AWP | Chrome Cannon (BS)", price: 192000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMW-VwPhv_uU8TH_mkEhw4G_Qz9ysIi7FPwUnWJVxQeFfs0O5kYXkZeK0tQPYit9bjXKpwExlWDc") },
            { name: "AK-47 | Redline (MW)", price: 320000, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA") },
            { name: "AK-47 | Asiimov (MW)", price: 480000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57") },
        ]
    },

    // ==================== ELITE CASE (25000 coin) ====================
    elite: {
        name: "Elite Case",
        price: 25000,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/elite-case.jpg",
        description: "Premium qurol case | 50 ta skin",
        items: [
            { name: "FAMAS | Commemoration (FT)", price: 12800, chance: 23.55, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-fC2CRwvdJt-5lSxa-kBkupjDLwoz9cXufOwdxDpUkQuANukHtx9TkMeO371Td2YlDxHio3SkbvyZusfFCD_TywHwV4g") },
            { name: "Negev | Power Loader (FT)", price: 16000, chance: 23.55, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-aA3eRwvpJveRtRjy-2x904DiEmd-hJC6SaFB1XppxEeVfsRO-xofjPrmw5wbaiY9DzS3-jntXrnE8OK0B-_c") },
            { name: "Nova | Koi (FN)", price: 16000, chance: 23.55, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSK_-aMWuZxuZi_rBqGCu3xEoksm_SzomhcHiQP1QjD8BxQuAN50TtlIK1Yri05lDeiY5bjXKpu6W3YF0") },
            { name: "USP-S | Silent Shot (MW)", price: 24000, chance: 23.55, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViDyOJzvvVWTSaqqhEutDWR1Nf8cn_CPAQmW8Z5Ee8P4UbuxILmMLu3tAXYj4hByyWsjCscvy89sOYcEf1yCvXTIoM") },
            { name: "Five-SeveN | Case Hardened (FT)", price: 32000, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSL_mfC2OvzOtyufRkAS3hlkxz5mSHzYmrd3KSPwMiWcAiFuBYsRS-lYbiNO7m5Fbej4tAzCTgznQeYJ59fyc") },
            { name: "AK-47 | Slate (FT)", price: 48000, chance: 1.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCS2kRQyvnOGw4r_d3OWZ1MnCpBwR-Rc5hbumtCzP-Kw7wSIiYsRnHr2i35MvS1s_a9cBkIkkRA2") },
            { name: "Galil AR | Chromatic Aberration (FT)", price: 48000, chance: 1.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSY0-F7sd55Rie4qhAitzSQl8GgI33FOgVyCMNyTe8OsEPrmtDuZuqw5Azf2N5Nzi382iJO6Sds4uZRT-N7rYMVaF_m") },
            { name: "AK-47 | Ice Coaled (FT)", price: 80000, chance: 0.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "M4A1-S | Black Lotus (MW)", price: 128000, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDGMnYftb3-eOgEpDcFyQuMMtRG8kIbhMuK051ba2IMQyH6r3yof5ilv4bwLWfU7uvqA7qRNHGA") },
            { name: "Tec-9 | Sandstorm (FN)", price: 128000, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-xsSyCmmFMhsTzczomgI36XagF0DcF5FuIItEK9l9ziMrjh4Azag4lCm3iqhypO8G81tJC4n-TO") },
            { name: "AK-47 | Slate (FN)", price: 240000, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCW6khUz_W3Sytb4cCqTOFUpWJtzTOUD5hPsw9a0Yrnrs1SK3ooXzy6shilM5311o7FVYrIufmI") },
            { name: "AWP | Chrome Cannon (MW)", price: 400000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4") },
            { name: "FAMAS | Bad Trip (FT)", price: 560000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8Qmewwxgm4jvVm9ytcHmValIjWZIjReZe5xHqkoLjN-vgtgPdj95BzSX7kGoXuRHyWhnd") },
            { name: "M4A4 | Temukau (FN)", price: 1280000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBtx5W6AmYv9JS6XaAV1CJEmTeUL4UTpxNzjZO3jtgaIjN9ExCuskGoXuRnyRhBA") },
        ]
    },

    // ==================== LEGENDARY CASE (75000 coin) ====================
    legendary: {
        name: "Legendary Case",
        price: 75000,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/legendary-case.jpg",
        description: "Eng qimmat case | 50 ta skin",
        items: [
            { name: "Five-SeveN | Case Hardened (FT)", price: 32000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSL_mfC2OvzOtyufRkAS3hlkxz5mSHzYmrd3KSPwMiWcAiFuBYsRS-lYbiNO7m5Fbej4tAzCTgznQeYJ59fyc") },
            { name: "Glock-18 | Shinobu (MW)", price: 32000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uJ_t-l9AX6ylh5w4mTcwtahdS2VOgRzWJsjEOQL5EWxwNblZeK2tVPXitlDmyvgznQeC7fvQL8") },
            { name: "P90 | Asiimov (FT)", price: 40000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-JaV-KfmeAXGvzOtyufRkAXzgwUlwsmSGyo6ocinEPwZzC5J1F-EIsUXrwdbkNeqz7wPaj4wXnH7gznQeoepd94c") },
            { name: "P250 | Kintsugi (MW)", price: 48000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "MAC-10 | Neon Rider (FN)", price: 48000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-dC2ie0-dytfNWQyC0nQlp5DzTntmgdC7COABxX5NxQrUOtUS5w4LgMu6zsVCK2IJCmyisjitM6DErvbicsEA0SQ") },
            { name: "Galil AR | Chromatic Aberration (FT)", price: 48000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSY0-F7sd55Rie4qhAitzSQl8GgI33FOgVyCMNyTe8OsEPrmtDuZuqw5Azf2N5Nzi382iJO6Sds4uZRT-N7rYMVaF_m") },
            { name: "SG 553 | Integrale (FT)", price: 48000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-BD2uc2NF7teVgWiT9x04j5DvTn42hcymSbFAiDppwRLEJs0KxktHlNu7l5QGMj49NnCT2jjQJsHhTElXQbQ") },
            { name: "Five-SeveN | Monkey Business (MW)", price: 64000, chance: 11.56, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIrujqNjsGheXmXPQcoWMFzEO5ZtUOwkILjY7yzsg3ci91DySiohn4buCht4eYET-N7rZVO80Su") },
            { name: "AK-47 | Ice Coaled (FT)", price: 80000, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "MP7 | Fade (FN)", price: 80000, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_CNk6fOqbZtgMKesAm6Xyfo45LQ7Fy3rzR536j6HyYn6J3zFaAcjA5RwQ-9fs0O5m93nMe2x5QHfjZUFk3sMNd5yQw") },
            { name: "AK-47 | Aphrodite (FT)", price: 128000, chance: 1.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI7PqRaa9SJPqaB2mvzOtyufRkAX2yx00ltW-GmIn_Iy-fawUjXpomFuINs0Wwmty0Mry24VSK398WnC3gznQeRN3CwSA") },
            { name: "M4A1-S | Solitude (MW)", price: 160000, chance: 0.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYPwJiPTcFIoXpslROVftRK5kYblN7zq5VbX3YtMmH_8ji5MvX1qtu1XWPFxrvLJz1aW589-peo") },
            { name: "AK-47 | Nightwish (FT)", price: 240000, chance: 0.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-xsSyCmmFMit2nVy434IHLDbwcmWcRzQrYNska_xoDjPuOx5QOPjY4RzC342itM8G81tODLUZAk") },
            { name: "AK-47 | Redline (MW)", price: 320000, chance: 0.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA") },
            { name: "Glock-18 | Fully Tuned (FT)", price: 400000, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tnJOCWC2yvzOtyufRkASjklhhwtzmGyI77dCjFOAEjXsQmRuFYs0TtxNflM7u04gaI3Y1MmX_gznQeT_sZuyk") },
            { name: "FAMAS | Bad Trip (FT)", price: 560000, chance: 0.35, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8Qmewwxgm4jvVm9ytcHmValIjWZIjReZe5xHqkoLjN-vgtgPdj95BzSX7kGoXuRHyWhnd") },
            { name: "M4A1-S | Solitude (FN)", price: 800000, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYPwJiPTcFIoXpslROVftRK5kYblN7zq5VbX3YtMmH_8ji5MvX1qtu1XWPFxrvLJz1aW589-peo") },
            { name: "AK-47 | Redline (FN)", price: 4800000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3iFO0POlPPNSI_-RHGavzOtyufRkASq2lkxx4W-HnNyqJC3FZwYoC5p0Q7FfthW6wdWxPu-371Pdit5HnyXgznQeHYY5wyA") },
        ]
    },

};

// Global qilish
if (typeof window !== 'undefined') {
    window.CASES_DATA = CASES_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CASES_DATA };
}
