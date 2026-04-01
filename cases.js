// Steam CDN image helper
const IMG = (hash) => `https://community.fastly.steamstatic.com/economy/image/${hash}/62fx62f`;

// ============================================================
// CASES DATA - 5 ta case, har birida 50 ta skin
// Chance tizimi: katta chance = ko'p tushadi, kichik = kam
// House edge: ~35-45% (EV < case narxi)
// ============================================================

const CASES_DATA = {

    // ==================== 1. ECO CASE (500 coin) ====================
    eco: {
        name: "Eco Case",
        price: 500,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/eco-case.jpg",
        description: "Eng arzon case | 50 ta skin",
        items: [
            // === CONSUMER GRADE (80-200 coin) - chance: 5.0-6.0 ===
            { name: "P90 | Sand Spray (BS)", price: 240, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-uGvbpt_L-WdCliYxO9gqa8xGCixxBkisGvQno77ci6WZwAmDcEmE-QNsEPrwNDiY-Lk4gKP2N1H02yg2en0l_pr") },
            { name: "MAC-10 | Storm Camo (BS)", price: 270, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "MP7 | Army Recon (BS)", price: 300, chance: 4.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk_OK8ab1SIeKeF1iYxO9gqa9vH3Cywxgk6j-DnN7_eHuXaAByDZRxELVcsUbpxtS2Purg5VGMjtlD02yg2e4m4vUr") },
            { name: "UMP-45 | Mudder (BS)", price: 290, chance: 4.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2jZ7B5LPWXMXSRz-pJuORoWTD9xEp15DjSmdj9eH2TOld0X8FxRbMMsBC9x9GxN-KxtgLb394Qyn34jjQJsHjYWoaBzQ") },
            { name: "MP5-SD | Dirt Drop (BS)", price: 320, chance: 4, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I_826abRoH-ObAXWE_vx3vO1wcCG2lAs-_TuByI6uJXqTaVJxXJAkQrII5EO8ldK2N-vh41bbjtlEmSqqjX5A6iZ1o7FV_9W_1_Q") },
            { name: "FAMAS | Colony (BS)", price: 310, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8QmewwxgmrjyGz9ytcHmValIjWZIiRLUM5RfqxdLiN7u04gaI3Y1MmX_gznQeRHyWhnd") },
            { name: "Galil AR | Sage Spray (BS)", price: 340, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8") },
            { name: "Tec-9 | Ground Water (BS)", price: 330, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o") },
            { name: "P250 | Sand Dune (BS)", price: 230, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "Nova | Predator (BS)", price: 220, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },
            { name: "Glock-18 | Ground Water (BS)", price: 280, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "SG 553 | Army Sheen (BS)", price: 260, chance: 5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "PP-Bizon | Sand Dashed (BS)", price: 250, chance: 5.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8M4-j_4o") },
            { name: "Negev | Army Sheen (BS)", price: 210, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2jZ7B5LPWXMXSRz-pJuORoWTD9xEp15DjSmdj9eH2TOld0X8FxRbMMsBC9x9GxN-KxtgLb394Qyn34jjQJsHjYWoaBzQ") },
            { name: "Sawed-Off | Forest DDPAT (BS)", price: 200, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6_a-abBSKPWSGH7elrp04uA_Sn_gwEolsWrUm96ud32TOAAhCsF0QOUN5hi-k93jN-ix4xue1dxDMjDn9w") },

            // === INDUSTRIAL GRADE (200-350 coin) - chance: 2.5-3.5 ===
            { name: "Sticker | Team Spirit", price: 390, chance: 2.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM655f9-Be_GUrymM-3qiNe7fD3OPBpcqTCXD-SlLwhtrlvHXHqlkkh42rdmdepbzvJOY6xuzgr") },
            { name: "Sticker | w0nderful", price: 380, chance: 3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6547z1U63Txn0jJD18WwJvaH_afE_JvGWCDTJlbp3s7VrSS23kU8hsT7dntyoeXiRaQFxA8N2W6dU5WVOh0b2") },
            { name: "Sticker | G2 Esports", price: 370, chance: 3.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNmpNCnHtwI689W67F_hEhijzJO1qXYIuvP2a_I4IvGXXj6SxLx0tbNsHii1lkkhsWuEysHpLyx0-_Pr6Q") },
            { name: "P90 | Blue Tac (FT)", price: 400, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-uGvbpt_L-WdCliYxO9gqa8xGCixxBkisGvQno77ci6WZwAmDcEmE-QNsEPrwNDiY-Lk4gKP2N1H02yg2en0l_pr") },
            { name: "MP7 | Forest DDPAT (FT)", price: 420, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6_a-abBSKPWSGH7elrp04uA_Sn_gwEolsWrUm96ud32TOAAhCsF0QOUN5hi-k93jN-ix4xue1dxDMjDn9w") },
            { name: "Glock-18 | Candy Apple (FT)", price: 410, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "USP-S | Ticket to Hell (FT)", price: 440, chance: 2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WG3SA_vp5j-lsQyWMmBgjuiiI1I6qdH6fbgAoApFyRrJf4xnumoDnM-7j41Pbgt8TyCT72CxK6SttsrscEf1y0Tw_DYE") },
            { name: "Sticker | Lynn Vision", price: 470, chance: 1.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6-J765BflGEmom8G3-XpdvvP9OKE6cPWXXzOTxLci57htTC3nzRgj6zyEmdj9bzvJOVtsZbZk") },
            { name: "MP5-SD | Agent (FT)", price: 460, chance: 1.7, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I_826abRoH-ObAXWE_vx3vO1wcCG2lAs-_TuByI6uJXqTaVJxXJAkQrII5EO8ldK2N-vh41bbjtlEmSqqjX5A6iZ1o7FV_9W_1_Q") },
            { name: "UMP-45 | Oscillator (BS)", price: 480, chance: 1.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha-kBkupjDLmdevcHjGbVMgWZZ3R7Rb5xXuk93iYePh4QGIiI1EmCqtjikb5ytpt_FCD_RHfTtqUQ") },
            { name: "Tec-9 | Isaac (FT)", price: 450, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o") },
            { name: "P250 | Visions (FT)", price: 430, chance: 2.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "MAG-7 | Silver (FT)", price: 360, chance: 3.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },
            { name: "XM1014 | Blue Spruce (FT)", price: 350, chance: 3.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8M4-j_4o") },

            // === MIL-SPEC (400-600 coin) - chance: 1.0-1.5 ===
            { name: "Sticker | Hydro Geyser", price: 510, chance: 0.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7cjx5lzqRBPln5rf_jBa6ebheKV9JeKsGWaExPxJpPZmASuxxR8k4zuGztqgdS6SOA8pW8Z4RbQPukG7ldXgMe3h7wbbjt5AyXrgznQemztwppk") },
            { name: "Sticker | Bolt Energy", price: 550, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7cjx5lzqRBPln5rf_jBa6ebheKV9JeKsAm6Xyfp4ue9ucCa9kFN36j6Hz9b6d3PEag4kCpIkEeUIu0S-moDvZeyw5lbe3t1CmX39jylO8G81tImGLAtH") },
            { name: "MP7 | Motherboard (FT)", price: 750, chance: 0.06, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },
            { name: "Five-SeveN | Case Hardened (FT)", price: 575, chance: 0.15, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4D7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIqtjmMj4K3InqVOlNzDsF0Redf4US4moLgMOnn4QzZg9hFxSX8iiJK5n0_6-cGAr1lpPNC5QABiQ") },
            { name: "Galil AR | Connexion (FT)", price: 525, chance: 0.25, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8") },
            { name: "MP7 | Sunbaked (FT)", price: 500, chance: 1.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk4uL5V7d5Mv-dC1iYxO9gqa87GnvgzUgk5W7Rz977cnvGawJ1DJMhQ-8J4RS5xIfkMLy2tFGP3dpD02yg2RR-mtGR") },
            { name: "Sticker | Boom Trail", price: 700, chance: 0.08, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7cjx5lzqRBPln5rf_jBa6ebheKV9JeKsC3-AzeFlue5ncC-8gA9p62nVytf7JX6Ta1QnX8MhQbMDthS8ktzlMOrjtlDd2tpFyHqtjX4a6DErvbjqMUT31w") },
            { name: "USP-S | Silent Shot (FT)", price: 650, chance: 1.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViDyOJzvvVWTSaqqhAitzSQl8pcnOVPAUgDpQiRedYt0S8xtbuZbji5QDbg4MXyCT2iXkd63w44-8CT-N7rcARrAoZ") },
            { name: "AK-47 | Safari Mesh (FT)", price: 600, chance: 1.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0Pre6xSNPGdMWqVxedjva86HSrnxkx3tTjdz42ud36fbwVxD8RyQbICtBe8kdXgZe624gCK2YhB02yg2fLyHdkl") },
            { name: "M4A1-S | Night Terror (FT)", price: 490, chance: 1.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjCAnobsLGXEPAchWcN4ReIM4Rjpk9CxN762tQXa395DyH732ylA6ilosupRWKUt5OSJ2NcRB1VD") },

            // === RESTRICTED (700-1200 coin) - chance: 0.15-0.3 ===
            { name: "Sticker | donk (Gold)", price: 800, chance: 0.05, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNmpNCnHtwI6547z1V3oTxa_yc_mqXUIvaf-a6E9cfKSDTSSk7935ONqTC_rzEUj52XdyNuucy7COBhgVMW4-Ikr3g") },
            { name: "P90 | Teardown (MW)", price: 900, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4ve9YJtlL-SsD2mU_u15vOVWQyC0nQlp5mjWy4n9cX3FZ1UiApMkQbJZ4BK8ktXnM-zrsgzeg4wQyHr3iiMc5zErvbiseXdBZA") },
            { name: "PP-Bizon | Cold Cell (FN)", price: 1000, chance: 0.03, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2x4i5G3Wytb6dH6RPAByA5tzFOQNsBK9m4K2Nrnm4lfW2t4Rny_53SNXrnE84jRZ-LA") },

            // === CLASSIFIED (1500-2500 coin) - chance: 0.03-0.05 ===
            { name: "AK-47 | Slate (FT)", price: 1200, chance: 0.02, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcGKD0ud5vuBlcCS2kRQyvnOGw4r_d3OWZ1MnCpBwR-Rc5hbumtCzP-Kw7wSIiYsRnHr2i35MvS1s_a9cBkIkkRA2") },
            { name: "Glock-18 | Shinobu (FT)", price: 1500, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },

            // === COVERT (3000-5000 coin) - chance: 0.003-0.01 ===
            { name: "AK-47 | Ice Coaled (FT)", price: 2000, chance: 0.005, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "M4A1-S | Black Lotus (FT)", price: 2500, chance: 0.003, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDCAnobsLGWTbQQnDsN3QuYOtELqkIazZeLm7lPYj9gQzyj72y8du31i6ulQA6Rx5OSJ2CPXrFUp") },
        ]
    },

    // ==================== 2. BUDGET CASE (1500 coin) ====================
    budget: {
        name: "Budget Case",
        price: 1500,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/budget-case.jpg",
        description: "O'rta darajali case | 50 ta skin",
        items: [
            // === CONSUMER GRADE (200-500 coin) - chance: 5.0-6.0 ===
            { name: "P90 | Straight Dimes (FT)", price: 276, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7XsL0OG6baFhI-KSCHOvzedxuPUnTSy3zE5w5zzXzIqodXmfbFIgCMd3ELIDskawwNXgZrvq4gDWjdpByjK-0H2Y7GSoBg") },
            { name: "MAC-10 | Sakkaku (FT)", price: 506, chance: 4.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "FAMAS | Crypsis (FT)", price: 735, chance: 3.9, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8QmewwxgmrjyGz9ytcHmValIjWZIiRLUM5RfqxdLiN7u04gaI3Y1MmX_gznQeRHyWhnd") },
            { name: "Galil AR | Amber Fade (FT)", price: 812, chance: 3.6, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8") },
            { name: "SG 553 | Tiger Moth (FT)", price: 429, chance: 5.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "Negev | Ultralight (FT)", price: 200, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2jZ7B5LPWXMXSRz-pJuORoWTD9xEp15DjSmdj9eH2TOld0X8FxRbMMsBC9x9GxN-KxtgLb394Qyn34jjQJsHjYWoaBzQ") },
            { name: "Sawed-Off | Apotheosis (FT)", price: 1041, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6_a-abBSKPWSGH7elrp04uA_Sn_gwEolsWrUm96ud32TOAAhCsF0QOUN5hi-k93jN-ix4xue1dxDMjDn9w") },
            { name: "Nova | Wild Six (FT)", price: 659, chance: 4.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },
            { name: "PP-Bizon | Seabird (FT)", price: 353, chance: 5.4, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8M4-j_4o") },
            { name: "MP5-SD | Liquidation (FT)", price: 965, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I_826abRoH-ObAXWE_vx3vO1wcCG2lAs-_TuByI6uJXqTaVJxXJAkQrII5EO8ldK2N-vh41bbjtlEmSqqjX5A6iZ1o7FV_9W_1_Q") },
            { name: "MP7 | Mischief (FT)", price: 1271, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZsI_uWGmKV09F-teB_VmfhkBxz5WzSwtyoJH7EbgFxCJN4E7ELtBS-xN22Neqw5FDWjt8WnHj5kGoXuTdhhykK") },
            { name: "P250 | Valence (FT)", price: 888, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "Tec-9 | Fubar (FT)", price: 1194, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o") },
            { name: "Glock-18 | Vogue (FT)", price: 1118, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "XM1014 | Incinegator (FT)", price: 582, chance: 4.5, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-uGvbpt_L-WdCliYxO9gqa8xGCixxBkisGvQno77ci6WZwAmDcEmE-QNsEPrwNDiY-Lk4gKP2N1H02yg2en0l_pr") },

            // === MIL-SPEC (600-1000 coin) - chance: 2.5-3.5 ===
            { name: "USP-S | Ticket to Hell (MW)", price: 1347, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WG3SA_vp5j-lsQyWMmBgjuiiI1I6qdH6fbgAoApFyRrJf4xnumoDnM-7j41Pbgt8TyCT72CxK6SttsrscEf1y0Tw_DYE") },
            { name: "AK-47 | Safari Mesh (MW)", price: 1550, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0Pre6xSNPGdMWqVxedjva86HSrnxkx3tTjdz42ud36fbwVxD8RyQbICtBe8kdXgZe624gCK2YhB02yg2fLyHdkl") },
            { name: "M4A1-S | Night Terror (MW)", price: 1500, chance: 1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjCAnobsLGXEPAchWcN4ReIM4Rjpk9CxN762tQXa395DyH732ylA6ilosupRWKUt5OSJ2NcRB1VD") },
            { name: "Five-SeveN | Angry Mob (FT)", price: 1424, chance: 1.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4D7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIqtjmMj4K3InqVOlNzDsF0Redf4US4moLgMOnn4QzZg9hFxSX8iiJK5n0_6-cGAr1lpPNC5QABiQ") },
            { name: "P90 | Teardown (FT)", price: 1600, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4ve9YJtlL-SsD2mU_u15vOVWQyC0nQlp5mjWy4n9cX3FZ1UiApMkQbJZ4BK8ktXnM-zrsgzeg4wQyHr3iiMc5zErvbiseXdBZA") },
            { name: "UMP-45 | Oscillator (MW)", price: 1575, chance: 0.25, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha-kBkupjDLmdevcHjGbVMgWZZ3R7Rb5xXuk93iYePh4QGIiI1EmCqtjikb5ytpt_FCD_RHfTtqUQ") },
            { name: "Galil AR | Cerberus (FT)", price: 1700, chance: 0.12, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8") },
            { name: "MP7 | Fade (FT)", price: 1650, chance: 2.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },

            // === RESTRICTED (1200-2000 coin) - chance: 0.8-1.5 ===
            { name: "USP-S | Silent Shot (MW)", price: 1750, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViDyOJzvvVWTSaqqhEutDWR1Nf8cn_CPAQmW8Z5Ee8P4UbuxILmMLu3tAXYj4hByyWsjCscvy89sOYcEf1yCvXTIoM") },
            { name: "AK-47 | Slate (FT)", price: 1900, chance: 1.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcGKD0ud5vuBlcCS2kRQyvnOGw4r_d3OWZ1MnCpBwR-Rc5hbumtCzP-Kw7wSIiYsRnHr2i35MvS1s_a9cBkIkkRA2") },
            { name: "PP-Bizon | Cold Cell (FN)", price: 1800, chance: 1.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2x4i5G3Wytb6dH6RPAByA5tzFOQNsBK9m4K2Nrnm4lfW2t4Rny_53SNXrnE84jRZ-LA") },
            { name: "Tec-9 | Sandstorm (MW)", price: 2000, chance: 0.05, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o") },

            // === CLASSIFIED (2500-4000 coin) - chance: 0.08-0.15 ===
            { name: "Glock-18 | Shinobu (FT)", price: 2200, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "AK-47 | Ice Coaled (FT)", price: 2500, chance: 0.03, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "M4A1-S | Black Lotus (FT)", price: 2800, chance: 0.02, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDCAnobsLGWTbQQnDsN3QuYOtELqkIazZeLm7lPYj9gQzyj72y8du31i6ulQA6Rx5OSJ2CPXrFUp") },

            // === COVERT (5000-12000 coin) - chance: 0.005-0.02 ===
            { name: "USP-S | Jawbreaker (FT)", price: 3200, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5kSi26gBBp42mDz939J32VZwFyA8FxReBesRO8wdK0ZrzitQ2K2oMTzCWviCMb5jErvbgcxKeE5g") },
            { name: "AK-47 | Redline (FT)", price: 4000, chance: 0.005, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3iFO0POlPPNSI_-RHGavzOtyufRkASq2lkxx4W-HnNyqJC3FZwYoC5p0Q7FfthW6wdWxPu-371Pdit5HnyXgznQeHYY5wyA") },
            { name: "M4A1-S | Solitude (FT)", price: 5000, chance: 0.003, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8OhLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d") },
        ]
    },

    // ==================== 3. PREMIUM CASE (7500 coin) ====================
    premium: {
        name: "Premium Case",
        price: 7500,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/premium-case.jpg",
        description: "Yuqori darajali case | 50 ta skin",
        items: [
            // === CONSUMER GRADE (1000-2500 coin) - chance: 5.0-6.0 ===
            { name: "Galil AR | Connexion (MW)", price: 721, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8") },
            { name: "P90 | Teardown (MW)", price: 2807, chance: 4.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4ve9YJtlL-SsD2mU_u15vOVWQyC0nQlp5mjWy4n9cX3FZ1UiApMkQbJZ4BK8ktXnM-zrsgzeg4wQyHr3iiMc5zErvbiseXdBZA") },
            { name: "UMP-45 | Oscillator (FN)", price: 4371, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha-kBkupjDLmdevcHjGbVMgWZZ3R7Rb5xXuk93iYePh4QGIiI1EmCqtjikb5ytpt_FCD_RHfTtqUQ") },
            { name: "MAC-10 | Neon Rider (FT)", price: 5414, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "FAMAS | Commemoration (FT)", price: 2286, chance: 4.6, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8QmewwxgmrjyGz9ytcHmValIjWZIiRLUM5RfqxdLiN7u04gaI3Y1MmX_gznQeRHyWhnd") },
            { name: "MP7 | Skulls (FN)", price: 200, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZsI_uWGmKV09F-teB_VmfhkBxz5WzSwtyoJH7EbgFxCJN4E7ELtBS-xN22Neqw5FDWjt8WnHj5kGoXuTdhhykK") },
            { name: "Negev | Power Loader (FT)", price: 3850, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2jZ7B5LPWXMXSRz-pJuORoWTD9xEp15DjSmdj9eH2TOld0X8FxRbMMsBC9x9GxN-KxtgLb394Qyn34jjQJsHjYWoaBzQ") },
            { name: "SG 553 | Darkwing (FT)", price: 5936, chance: 2.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "Tec-9 | Rebel (FT)", price: 1764, chance: 4.9, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o") },
            { name: "P250 | See Ya Later (FT)", price: 6457, chance: 1.7, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "Nova | Koi (FN)", price: 3329, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },
            { name: "Glock-18 | Water Elemental (FT)", price: 4893, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "PP-Bizon | Judgement of Anubis (FT)", price: 1243, chance: 5.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8M4-j_4o") },

            // === MIL-SPEC (3000-5000 coin) - chance: 2.0-3.5 ===
            { name: "USP-S | Jawbreaker (FT)", price: 6979, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5kSi26gBBp42mDz939J32VZwFyA8FxReBesRO8wdK0ZrzitQ2K2oMTzCWviCMb5jErvbgcxKeE5g") },
            { name: "AK-47 | Ice Coaled (FT)", price: 7600, chance: 0.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "M4A1-S | Electrum (MW)", price: 7800, chance: 0.25, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ut6eJ9XTy-qhEutDWR1Iz4cnjCag51DZQlEOIMtEa7k9TiNbmw51OP3tlBxCr8iCsY6C5t6uwcEf1y--utkZE") },
            { name: "AK-47 | Slate (MW)", price: 7500, chance: 1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcGKD0ud5vuBlcCS2kRQyvnOGw4r_d3OWZ1MnCpBwR-Rc5hbumtCzP-Kw7wSIiYsRnHr2i35MvS1s_a9cBkIkkRA2") },
            { name: "Glock-18 | Fade (FN)", price: 8000, chance: 2.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "M4A1-S | Black Lotus (FT)", price: 7900, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDCAnobsLGWTbQQnDsN3QuYOtELqkIazZeLm7lPYj9gQzyj72y8du31i6ulQA6Rx5OSJ2CPXrFUp") },
            { name: "Five-SeveN | Monkey Business (FT)", price: 8100, chance: 2.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4D7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIqtjmMj4K3InqVOlNzDsF0Redf4US4moLgMOnn4QzZg9hFxSX8iiJK5n0_6-cGAr1lpPNC5QABiQ") },

            // === RESTRICTED (6000-10000 coin) - chance: 0.3-0.8 ===
            { name: "AK-47 | Redline (FT)", price: 8200, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3iFO0POlPPNSI_-RHGavzOtyufRkASq2lkxx4W-HnNyqJC3FZwYoC5p0Q7FfthW6wdWxPu-371Pdit5HnyXgznQeHYY5wyA") },
            { name: "M4A1-S | Solitude (FT)", price: 8400, chance: 0.08, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8OhLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d") },
            { name: "Glock-18 | Shinobu (MW)", price: 8600, chance: 0.06, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "P250 | Kintsugi (MW)", price: 8800, chance: 0.05, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "USP-S | Silent Shot (FN)", price: 9000, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViDyOJzvvVWTSaqqhEutDWR1Nf8cn_CPAQmW8Z5Ee8P4UbuxILmMLu3tAXYj4hByyWsjCscvy89sOYcEf1yCvXTIoM") },

            // === CLASSIFIED (12000-20000 coin) - chance: 0.05-0.1 ===
            { name: "AK-47 | Aphrodite (BS)", price: 9500, chance: 0.03, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI7PqRaa9SJPqaB2mvyet3vgnSyrkwh4k4WqBztyoeX6RP1R2CJZyELVfs0W6kIbjM7-0sgLbjIlDxDK-0H3ID5Y8zA") },
            { name: "M4A1-S | Solitude (MW)", price: 10000, chance: 0.02, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8OhLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d") },

            // === COVERT (25000-50000 coin) - chance: 0.003-0.01 ===
            { name: "AK-47 | Nightwish (FT)", price: 12000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-xsSyCmmFMit2nVy434IHLDbwcmWcRzQrYNska_xoDjPuOx5QOPjY4RzC342itM8G81tODLUZAk") },
            { name: "AWP | Chrome Cannon (BS)", price: 15000, chance: 0.005, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMW-VwPv_uU8TH_mkEhw4G_Qz9ysIi7FPwUnWJVxQeFfs0O5kYXkZeK0tQPYit9bjXKpwExlWDc") },
            { name: "M4A4 | Temukau (FT)", price: 20000, chance: 0.003, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBzBrGWDnI0rdm_JfWxVDCJZwRuEL4US4xNflM7u04gaI3Y1MmX_8ji5Mv-1q6u1NmDpj7lPK3_kCQ") },
        ]
    },

    // ==================== 4. ELITE CASE (25000 coin) ====================
    elite: {
        name: "Elite Case",
        price: 25000,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/elite-case.jpg",
        description: "Premium qurol case | 50 ta skin",
        items: [
            // === CONSUMER GRADE (4000-8000 coin) - chance: 5.0-6.0 ===
            { name: "AK-47 | Slate (FN)", price: 200, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcGKD0ud5vuBlcCS2kRQyvnOGw4r_d3OWZ1MnCpBwR-Rc5hbumtCzP-Kw7wSIiYsRnHr2i35MvS1s_a9cBkIkkRA2") },
            { name: "USP-S | Jawbreaker (MW)", price: 1971, chance: 5.6, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5kSi26gBBp42mDz939J32VZwFyA8FxReBesRO8wdK0ZrzitQ2K2oMTzCWviCMb5jErvbgcxKeE5g") },
            { name: "M4A1-S | Night Terror (FN)", price: 9057, chance: 4.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjCAnobsLGXEPAchWcN4ReIM4Rjpk9CxN762tQXa395DyH732ylA6ilosupRWKUt5OSJ2NcRB1VD") },
            { name: "Five-SeveN | Monkey Business (MW)", price: 5514, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4D7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIqtjmMj4K3InqVOlNzDsF0Redf4US4moLgMOnn4QzZg9hFxSX8iiJK5n0_6-cGAr1lpPNC5QABiQ") },
            { name: "Glock-18 | Vogue (FN)", price: 12600, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "P90 | Asiimov (FT)", price: 7286, chance: 4.6, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7XsL0OG6baFhI-KSCHOvzedxuPUnTSy3zE5w5zzXzIqodXmfbFIgCMd3ELIDskawwNXgZrvq4gDWjdpByjK-0H2Y7GSoBg") },
            { name: "MAC-10 | Neon Rider (FN)", price: 14371, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA") },
            { name: "MP7 | Neon Ply (FN)", price: 17914, chance: 2.4, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },
            { name: "Galil AR | Chromatic Aberration (FT)", price: 19686, chance: 2.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8") },
            { name: "FAMAS | Meltdown (FN)", price: 10829, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8QmewwxgmrjyGz9ytcHmValIjWZIiRLUM5RfqxdLiN7u04gaI3Y1MmX_gznQeRHyWhnd") },
            { name: "UMP-45 | Crime Scene (FN)", price: 3743, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha-kBkupjDLmdevcHjGbVMgWZZ3R7Rb5xXuk93iYePh4QGIiI1EmCqtjikb5ytpt_FCD_RHfTtqUQ") },
            { name: "Tec-9 | Fuel Injector (FT)", price: 21457, chance: 1.7, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o") },
            { name: "SG 553 | Integrale (FT)", price: 16143, chance: 2.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk_OK8ab1SIeKeF1iYxO9gqa9vH3Cywxgk6j-DnN7_eHuXaAByDZRxELVcsUbpxtS2Purg5VGMjtlD02yg2e4m4vUr") },

            // === MIL-SPEC (10000-15000 coin) - chance: 2.0-3.5 ===
            { name: "AK-47 | Ice Coaled (MW)", price: 23229, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "M4A1-S | Black Lotus (MW)", price: 25800, chance: 0.25, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDCAnobsLGWTbQQnDsN3QuYOtELqkIazZeLm7lPYj9gQzyj72y8du31i6ulQA6Rx5OSJ2CPXrFUp") },
            { name: "Glock-18 | Shinobu (FN)", price: 25000, chance: 1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "P250 | Kintsugi (FN)", price: 26000, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "USP-S | Jawbreaker (FN)", price: 26200, chance: 2.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5kSi26gBBp42mDz939J32VZwFyA8FxReBesRO8wdK0ZrzitQ2K2oMTzCWviCMb5jErvbgcxKeE5g") },
            { name: "M4A1-S | Solitude (MW)", price: 26500, chance: 2.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8OhLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d") },
            { name: "AK-47 | Redline (MW)", price: 25500, chance: 0.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3iFO0POlPPNSI_-RHGavzOtyufRkASq2lkxx4W-HnNyqJC3FZwYoC5p0Q7FfthW6wdWxPu-371Pdit5HnyXgznQeHYY5wyA") },

            // === RESTRICTED (18000-30000 coin) - chance: 0.3-0.8 ===
            { name: "AK-47 | Aphrodite (FT)", price: 27000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI7PqRaa9SJPqaB2mvyet3vgnSyrkwh4k4WqBztyoeX6RP1R2CJZyELVfs0W6kIbjM7-0sgLbjIlDxDK-0H3ID5Y8zA") },
            { name: "AWP | Chrome Cannon (FT)", price: 27500, chance: 0.08, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMW-VwPv_uU8TH_mkEhw4G_Qz9ysIi7FPwUnWJVxQeFfs0O5kYXkZeK0tQPYit9bjXKpwExlWDc") },
            { name: "M4A4 | Temukau (FT)", price: 28000, chance: 0.06, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBzBrGWDnI0rdm_JfWxVDCJZwRuEL4US4xNflM7u04gaI3Y1MmX_8ji5Mv-1q6u1NmDpj7lPK3_kCQ") },
            { name: "AK-47 | Crane Flight (FT)", price: 29000, chance: 0.05, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRa7ZsLvWsCGuZxZij-xsSyCmmFMk4GjVwouudX-VPQB2WZZ2E7EDt0a6kYfjNe2w41DXi9gQynioiH5J8G81tL5L-Rcg") },

            // === CLASSIFIED (35000-55000 coin) - chance: 0.05-0.1 ===
            { name: "AK-47 | Nightwish (FT)", price: 30000, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-xsSyCmmFMit2nVy434IHLDbwcmWcRzQrYNska_xoDjPuOx5QOPjY4RzC342itM8G81tODLUZAk") },
            { name: "AK-47 | Asiimov (FT)", price: 32000, chance: 0.03, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaBqf19F7teVgWiT9x01x623cmd2rcXKQbw4oA8dzReEK5EK6kNO2NOO04FeIjYJCmyr4jzQJsHiu1I77Gg") },
            { name: "M4A4 | Temukau (MW)", price: 35000, chance: 0.02, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBzBrGWDnI0rdm_JfWxVDCJZwRuEL4US4xNflM7u04gaI3Y1MmX_8ji5Mv-1q6u1NmDpj7lPK3_kCQ") },

            // === COVERT (70000-150000 coin) - chance: 0.003-0.008 ===
            { name: "AK-47 | Inheritance (FT)", price: 38000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFidxOp_penSn6wl0p-4D7Ryo34cSqeOwMlWZt5QbJfuhW9koKyMO3ksgWMiY8TzDK-0H009BnnIw") },
            { name: "Glock-18 | Fully Tuned (WW)", price: 42000, chance: 0.005, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tnJOCWC2yvzOtyufRkASjklhhwtzmGyI77dCjFOAEjXsQmRuFYs0TtxNflM7u04gaI3Y1MmX_gznQeT_sZuyk") },
            { name: "FAMAS | Bad Trip (FT)", price: 50000, chance: 0.003, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8QmewwxgmrjyGz9ytcHmValIjWZIjReZe5xHqkoLjN-vgtgPdj95BzSX7kGoXuRHyWhnd") },
        ]
    },

    // ==================== 5. LEGENDARY CASE (75000 coin) ====================
    legendary: {
        name: "Legendary Case",
        price: 75000,
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/legendary-case.jpg",
        description: "Eng qimmat case | 50 ta skin",
        items: [
            // === CONSUMER GRADE (12000-25000 coin) - chance: 5.0-6.0 ===
            { name: "AK-47 | Redline (FN)", price: 23215, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3iFO0POlPPNSI_-RHGavzOtyufRkASq2lkxx4W-HnNyqJC3FZwYoC5p0Q7FfthW6wdWxPu-371Pdit5HnyXgznQeHYY5wyA") },
            { name: "M4A1-S | Black Lotus (FN)", price: 34723, chance: 3.7, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDCAnobsLGWTbQQnDsN3QuYOtELqkIazZeLm7lPYj9gQzyj72y8du31i6ulQA6Rx5OSJ2CPXrFUp") },
            { name: "USP-S | Jawbreaker (FN)", price: 46231, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5kSi26gBBp42mDz939J32VZwFyA8FxReBesRO8wdK0ZrzitQ2K2oMTzCWviCMb5jErvbgcxKeE5g") },
            { name: "Glock-18 | Shinobu (FN)", price: 17462, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5t-KPmdAWWF_uNztOh8QmflzR50sDnXzdv9I3iTOwdzAsZxE7FcsUW7xNPkMeyx4QTYiI5CnCj9kGoXuamHlTQY") },
            { name: "AK-47 | Slate (FN)", price: 5954, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcGKD0ud5vuBlcCS2kRQyvnOGw4r_d3OWZ1MnCpBwR-Rc5hbumtCzP-Kw7wSIiYsRnHr2i35MvS1s_a9cBkIkkRA2") },
            { name: "P250 | Kintsugi (FN)", price: 57738, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRY61jNOOGCW6vzedxuPUnHXrikBkh4jjXzd76I36VPQF2CJV2FOYLthC5k9DiNuOwswKLj4JHxTK-0H3jhNNozg") },
            { name: "Five-SeveN | Monkey Business (FN)", price: 28969, chance: 4.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4D7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIqtjmMj4K3InqVOlNzDsF0Redf4US4moLgMOnn4QzZg9hFxSX8iiJK5n0_6-cGAr1lpPNC5QABiQ") },
            { name: "M4A1-S | Electrum (FN)", price: 63492, chance: 1.8, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ut6eJ9XTy-qhEutDWR1Iz4cnjCag51DZQlEOIMtEa7k9TiNbmw51OP3tlBxCr8iCsY6C5t6uwcEf1y--utkZE") },
            { name: "AK-47 | Ice Coaled (FN)", price: 40477, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-xsSyCmmFMi5GrcwtivdnnCOgd2DsNxTeIJuxbqk9XuN-_i5gKI3d1BxH35iy1P8G81tKMOXOY4") },
            { name: "Tec-9 | Sandstorm (FN)", price: 51985, chance: 5.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o") },
            { name: "MP7 | Fade (FN)", price: 11708, chance: 5.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o") },
            { name: "PP-Bizon | Cold Cell (FN)", price: 200, chance: 6.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2x4i5G3Wytb6dH6RPAByA5tzFOQNsBK9m4K2Nrnm4lfW2t4Rny_53SNXrnE84jRZ-LA") },

            // === MIL-SPEC (30000-50000 coin) - chance: 2.5-3.5 ===
            { name: "AK-47 | Aphrodite (MW)", price: 75000, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI7PqRaa9SJPqaB2mvyet3vgnSyrkwh4k4WqBztyoeX6RP1R2CJZyELVfs0W6kIbjM7-0sgLbjIlDxDK-0H3ID5Y8zA") },
            { name: "AK-47 | Crane Flight (FT)", price: 76000, chance: 0.3, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRa7ZsLvWsCGuZxZij-xsSyCmmFMk4GjVwouudX-VPQB2WZZ2E7EDt0a6kYfjNe2w41DXi9gQynioiH5J8G81tL5L-Rcg") },
            { name: "AWP | Chrome Cannon (MW)", price: 77000, chance: 0.25, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMW-VwPv_uU8TH_mkEhw4G_Qz9ysIi7FPwUnWJVxQeFfs0O5kYXkZeK0tQPYit9bjXKpwExlWDc") },
            { name: "M4A4 | Temukau (FT)", price: 78000, chance: 0.2, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBzBrGWDnI0rdm_JfWxVDCJZwRuEL4US4xNflM7u04gaI3Y1MmX_8ji5Mv-1q6u1NmDpj7lPK3_kCQ") },
            { name: "M4A1-S | Solitude (FN)", price: 79000, chance: 0.15, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8OhLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d") },
            { name: "AK-47 | Nightwish (MW)", price: 80000, chance: 2.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-xsSyCmmFMit2nVy434IHLDbwcmWcRzQrYNska_xoDjPuOx5QOPjY4RzC342itM8G81tODLUZAk") },
            { name: "AK-47 | Redline (FN)", price: 69246, chance: 3.0, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3iFO0POlPPNSI_-RHGavzOtyufRkASq2lkxx4W-HnNyqJC3FZwYoC5p0Q7FfthW6wdWxPu-371Pdit5HnyXgznQeHYY5wyA") },

            // === RESTRICTED (55000-80000 coin) - chance: 0.3-0.8 ===
            { name: "AK-47 | Asiimov (MW)", price: 82000, chance: 0.1, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaBqf19F7teVgWiT9x01x623cmd2rcXKQbw4oA8dzReEK5EK6kNO2NOO04FeIjYJCmyr4jzQJsHiu1I77Gg") },
            { name: "AK-47 | Inheritance (FT)", price: 84000, chance: 0.08, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFidxOp_penSn6wl0p-4D7Ryo34cSqeOwMlWZt5QbJfuhW9koKyMO3ksgWMiY8TzDK-0H009BnnIw") },
            { name: "M4A4 | Temukau (MW)", price: 88000, chance: 0.05, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBzBrGWDnI0rdm_JfWxVDCJZwRuEL4US4xNflM7u04gaI3Y1MmX_8ji5Mv-1q6u1NmDpj7lPK3_kCQ") },
            { name: "FAMAS | Bad Trip (FT)", price: 86000, chance: 0.06, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8QmewwxgmrjyGz9ytcHmValIjWZIjReZe5xHqkoLjN-vgtgPdj95BzSX7kGoXuRHyWhnd") },

            // === CLASSIFIED (100000-180000 coin) - chance: 0.05-0.1 ===
            { name: "Glock-18 | Fully Tuned (FT)", price: 90000, chance: 0.04, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tnJOCWC2yvzOtyufRkASjklhhwtzmGyI77dCjFOAEjXsQmRuFYs0TtxNflM7u04gaI3Y1MmX_gznQeT_sZuyk") },
            { name: "AK-47 | Inheritance (MW)", price: 95000, chance: 0.03, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFidxOp_penSn6wl0p-4D7Ryo34cSqeOwMlWZt5QbJfuhW9koKyMO3ksgWMiY8TzDK-0H009BnnIw") },
            { name: "FAMAS | Bad Trip (MW)", price: 100000, chance: 0.02, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uNztOh8QmewwxgmrjyGz9ytcHmValIjWZIjReZe5xHqkoLjN-vgtgPdj95BzSX7kGoXuRHyWhnd") },

            // === COVERT (200000-500000 coin) - chance: 0.003-0.01 ===
            { name: "Glock-18 | Fully Tuned (MW)", price: 110000, chance: 0.01, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tnJOCWC2yvzedxuPUnS3HqzR9152_UyNigeSqWa1BxW8ElRLJfshfpkNHuZO_n4ADd2IxBxDK-0H3ID5Y8zA") },
            { name: "AK-47 | Asiimov (FN)", price: 130000, chance: 0.005, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaBqf19F7teVgWiT9x01x623cmd2rcXKQbw4oA8dzReEK5EK6kNO2NOO04FeIjYJCmyr4jzQJsHiu1I77Gg") },
            { name: "M4A4 | Temukau (FN)", price: 160000, chance: 0.003, image: IMG("i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBzBrGWDnI0rdm_JfWxVDCJZwRuEL4US4xNflM7u04gaI3Y1MmX_8ji5Mv-1q6u1NmDpj7lPK3_kCQ") },
        ]
    }
};

// Global qilish
if (typeof window !== 'undefined') {
    window.CASES_DATA = CASES_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CASES_DATA };
}