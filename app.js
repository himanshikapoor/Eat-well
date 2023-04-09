const path = require("path");
const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurant");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Standard middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// middlewares to outsource the routes
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

app.use(function (req, res) {
    res.status(404).render("404");
});

app.use(function (error, req, res, next) {
    res.status(500).render("500");
});

app.listen(3000);
