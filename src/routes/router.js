const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("homepage", { title: "Home Page" });
});

router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile Page" });
});

router.get("/itinerary", (req, res) => {
    res.render("itinerary", { title: "ITINERARY" });
});
router.get("/finance", (req, res) => {
    res.render("finance", { title: "FINANCE" });
});
router.get("/polls", (req, res) => {
    res.render("polls", { title: "POLLS" });
});


module.exports = router;
