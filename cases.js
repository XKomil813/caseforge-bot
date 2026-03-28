// cases.js

const { stickers, graffiti, sticker_slabs, skins_not_grouped } = require('./collections.js');

const CASES_DATA = {
    budget: {
        name: "Budget Case",
        price: 500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:AANd9GcRRPdSGg78g5WNQd_7sNsTbaXlrjT-rXBsmKg&s",
        items: [
            ...stickers,
            ...graffiti,
            ...sticker_slabs,
            ...skins_not_grouped
        ]
    }
};

if (typeof module !== 'undefined') {
    module.exports = { CASES_DATA };
}