const express = require("express");
const router = express.Router();

const uuid = require("uuid");
const resData = require("../util/restaurant-data");

router.get("/restaurants", function (req, res) {
    const existingRestaurants = resData.getStoredRestaurants();

    let order = req.query.order;
    if (order !== "asc" && order !== "desc") order = "asc";

    if (order === "asc") {
        existingRestaurants.sort(function (resA, resB) {
            if (resA.name > resB.name) return 1;
            return -1;
        });
        order = "desc";
    } else {
        existingRestaurants.sort(function (resA, resB) {
            if (resA.name < resB.name) return 1;
            return -1;
        });
        order = "asc";
    }

    res.render("restaurants", {
        numberOfRestaurants: existingRestaurants.length,
        restaurants: existingRestaurants,
        nextOrder: order,
    });
});

router.get("/restaurants/:id", function (req, res) {
    const restaurantId = req.params.id;
    const existingRestaurants = resData.getStoredRestaurants();

    for (const restaurant of existingRestaurants) {
        if (restaurant.id === restaurantId)
            return res.render("restaurant-details", { restaurant: restaurant });
    }

    res.status(404).render("404");
});

router.get("/confirm", function (req, res) {
    res.render("confirm");
});

router.get("/recommend", function (req, res) {
    res.render("recommend");
});

router.post("/recommend", function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const existingRestaurants = resData.getStoredRestaurants();
    existingRestaurants.push(restaurant);

    resData.storeRestaurants(existingRestaurants);

    res.redirect("/confirm");
});

module.exports = router;
