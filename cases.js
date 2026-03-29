// cases.js

const { stickers, graffiti, sticker_slabs, skins_not_grouped } = require('./collections.js');

const CASES_DATA = {
    budget: {
        name: "Budget Case",
        price: 500,
        image: "/case-img/eco-case.png"
    }
};

if (typeof module !== 'undefined') {
    module.exports = { CASES_DATA };
}