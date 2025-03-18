const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login"), {title: "Login"};
})

router.get("/trips/", (req, res) => {
    res.render("trips/homepage", { title: "Home Page" });
});

router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile Page" });
});

router.get("/trips/itinerary", (req, res) => {
    res.render("trips/itinerary", { title: "ITINERARY" });
});
router.get("/trips/finance", (req, res) => {
    res.render("trips/finance", { title: "FINANCE" });
});
router.get("/trips/polls", (req, res) => {
    res.render("trips/polls", { title: "POLLS" });
});


module.exports = router;
