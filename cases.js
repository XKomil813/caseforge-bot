const CASES_DATA = {
    // 1-KEYS: ECO CASE (Eng arzon, hamma narsa 200-800 Coin oralig'ida)
    eco: {
        name: "Eco Case",
        price: 500, // Ochish narxi
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/eco-case.png",
        items: [
            // --- STIKERLAR (200 - 500 Coin) ---
            { name: "Sticker | Team Spirit | Austin 2025", price: 200, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM655f9-Be_GUrymM-3qiNe7fD3OPBpcqTCXD-SlLwhtrlvHXHqlkkh42rdmdepbzvJOY6xuzgr/62fx62f", chance: 5 },
            { name: "Sticker | w0nderful | Copenhagen 2024", price: 200, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6547z1U63Txn0jJD18WwJvaH_afE_JvGWCDTJlbp3s7VrSS23kU8hsT7dntyoeXiRaQFxA8N2W6dU5WVOh0b2/62fx62f", chance: 5 },
            { name: "Sticker | G2 Esports | Shanghai 2024", price: 200, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNmpNCnHtwI689W67F_hEhijzJO1qXYIuvP2a_I4IvGXXj6SxLx0tbNsHii1lkkhsWuEysHpLyx0-_Pr6Q/330x192?allow_animated=1", chance: 5 },
            { name: "Sticker | Lynn Vision | Austin 2025", price: 350, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6-J765BflGEmom8G3-XpdvvP9OKE6cPWXXzOTxLci57htTC3nzRgj6zyEmdj9bzvJOVtsZbZk/62fx62f", chance: 5 },
            { name: "Sticker | Hydro Geyser", price: 450, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7cjx5lzqRBPln5rf_jBa6ebheKV9JeKsGWaExPxJpPZmASuxxR8k4zuGztqgdS6SOA8pW8Z4RbQPukG7ldXgMe3h7wbbjt5AyXrgznQemztwppk/62fx62f", chance: 5 },
            { name: "Sticker | Bolt Energy", price: 500, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7cjx5lzqRBPln5rf_jBa6ebheKV9JeKsAm6Xyfp4ue9ucCa9kFN36j6Hz9b6d3PEag4kCpIkEeUIu0S-moDvZeyw5lbe3t1CmX39jylO8G81tImGLAtH/62fx62f", chance: 5 },
            { name: "Sticker | Boom Trail", price: 600, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7cjx5lzqRBPln5rf_jBa6ebheKV9JeKsC3-AzeFlue5ncC-8gA9p62nVytf7JX6Ta1QnX8MhQbMDthS8ktzlMOrjtlDd2tpFyHqtjX4a6DErvbjqMUT31w/62fx62f", chance: 5 },
            { name: "Sticker | donk | Shanghai 2024", price: 750, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNmpNCnHtwI6547z1V3oTxa_yc_mqXUIvaf-a6E9cfKSDTSSk7935ONqTC_rzEUj52XdyNuucy7COBhgVMW4-Ikr3g/62fx62f", chance: 5 },

            // --- SKINLAR (200 - 800 Coin) ---
            { name: "P90 | Blue Tac (BS)", price: 200, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-uGvbpt_L-WdCliYxO9gqa8xGCixxBkisGvQno77ci6WZwAmDcEmE-QNsEPrwNDiY-Lk4gKP2N1H02yg2en0l_pr/62fx62f", chance: 5 },
            { name: "MAC-10 | Storm Camo (BS)", price: 200, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4P2RZaVucaCsDGuFxOxzovNwcCG2lAs-_T-Ay9_4dXOUb1InX5B5TbQPsxDqw9PjZOPr4gyPjNlEyS75jHxMun51o7FVAYwy7XA/62fx62f", chance: 5 },
            { name: "MP7 | Army Recon (BS)", price: 200, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk_OK8ab1SIeKeF1iYxO9gqa9vH3Cywxgk6j-DnN7_eHuXaAByDZRxELVcsUbpxtS2Purg5VGMjtlD02yg2e4m4vUr/62fx62f", chance: 5 },
            { name: "UMP-45 | Mudder (BS)", price: 250, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2jZ7B5LPWXMXSRz-pJuORoWTD9xEp15DjSmdj9eH2TOld0X8FxRbMMsBC9x9GxN-KxtgLb394Qyn34jjQJsHjYWoaBzQ/62fx62f", chance: 5 },
            { name: "MP5-SD | Dirt Drop (BS)", price: 300, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I_826abRoH-ObAXWE_vx3vO1wcCG2lAs-_TuByI6uJXqTaVJxXJAkQrII5EO8ldK2N-vh41bbjtlEmSqqjX5A6iZ1o7FV_9W_1_Q/62fx62f", chance: 5 },
            { name: "MP7 | Forest DDPAT (BS)", price: 400, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6_a-abBSKPWSGH7elrp04uA_Sn_gwEolsWrUm96ud32TOAAhCsF0QOUN5hi-k93jN-ix4xue1dxDMjDn9w/62fx62f", chance: 5 },
            { name: "MP7 | Motherboard (BS)", price: 700, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o/62fx62f", chance: 3 },
            { name: "MP7 | Sunbaked (BS)", price: 800, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk4uL5V7d5Mv-dC1iYxO9gqa87GnvgzUgk5W7Rz977cnvGawJ1DJMhQ-8J4RS5xIfkMLy2tFGP3dpD02yg2RR-mtGR/62fx62f", chance: 3 }
        ]
    },

    // 2-KEYS: BUDGET CASE (Qimmatroq, 1000 - 3000 Coin oralig'ida)
    budget: {
        name: "Budget Case",
        price: 1500, // Budget case qimmatroq bo'lishi mantiqan to'g'ri
        image: "https://raw.githubusercontent.com/XKomil813/caseforge-bot/main/case-img/budget-case.png",
        items: [
            { name: "P90 | Teardown (MW)", price: 3000, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4ve9YJtlL-SsD2mU_u15vOVWQyC0nQlp5mjWy4n9cX3FZ1UiApMkQbJZ4BK8ktXnM-zrsgzeg4wQyHr3iiMc5zErvbiseXdBZA/62fx62f", chance: 15 },
            { name: "UMP-45 | Oscillator (FT)", price: 2800, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha-kBkupjDLmdevcHjGbVMgWZZ3R7Rb5xXuk93iYePh4QGIiI1EmCqtjikb5ytpt_FCD_RHfTtqUQ/62fx62f", chance: 15 },
            { name: "PP-Bizon | Cold Cell (FN)", price: 2500, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_825abxSMuWRMWWZ2-F4j-1gSCGn2x4i5G3Wytb6dH6RPAByA5tzFOQNsBK9m4K2Nrnm4lfW2t4Rny_53SNXrnE84jRZ-LA/62fx62f", chance: 15 },
            { name: "MP7 | Mischief (BS)", price: 2000, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZsI_uWGmKV09F-teB_VmfhkBxz5WzSwtyoJH7EbgFxCJN4E7ELtBS-xN22Neqw5FDWjt8WnHj5kGoXuTdhhykK/62fx62f", chance: 15 },
            { name: "P90 | Straight Dimes (MW)", price: 1500, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7XsL0OG6baFhI-KSCHOvzedxuPUnTSy3zE5w5zzXzIqodXmfbFIgCMd3ELIDskawwNXgZrvq4gDWjdpByjK-0H2Y7GSoBg/62fx62f", chance: 20 },
            { name: "MP7 | Astrolabe (BS)", price: 1200, image: "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCG2lAs-_WrTn9z9dSjDO1IgWJYmEeYL4EWwx9PmZr-x5wXejo5AySSr2n9L6SZ1o7FVn2Vmj7o/62fx62f", chance: 20 }
        ]
    }
};

module.exports = { CASES_DATA };
