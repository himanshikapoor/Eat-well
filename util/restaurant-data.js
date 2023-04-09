const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {
    return JSON.parse(fs.readFileSync(filePath));
}

function storeRestaurants(existingRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(existingRestaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants,
};
