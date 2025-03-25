import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index",{ title: "Welcome" });
})

router.get("/login", (req, res) => {
    if (req.session.user) return res.redirect('/profile');
    res.render("login", {
        title:"LOGIN",
        error: null
    });
});

router.get("/register", (req, res) => {
    if (req.session.user) return res.redirect('/profile');
    res.render("register", {
        title: "REGISTER",
        error: null,
        success: null
    });
})

router.get("/reset", (req, res) => {
    if (req.session.user) return res.redirect('/profile');
    res.render("reset", {
        title: "RESET PASSWORD",
        error: null,
        success: null
    });
})

router.get("/trips/", (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    res.render('trips/homepage', {
        title: "Trips",
        email: req.session.user.email,
        username: req.session.user.username,
        password: req.session.user.password
    });
});

router.get("/profile", (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    res.render("profile", {
        title: "Profile Page",
        email: req.session.user.email,
        username: req.session.user.username,
        password: req.session.user.password
    });
});

router.get("/trips/itinerary", (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render("trips/itinerary", {
        title: "ITINERARY",
        email: req.session.user.email,
        username: req.session.user.username,
        password: req.session.user.password
    });
});
router.get("/trips/finance", (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render("trips/finance", {
        title: "FINANCE",
        email: req.session.user.email,
        username: req.session.user.username,
        password: req.session.user.password
    });
});
router.get("/trips/polls", (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render("trips/polls", {
        title: "POLLS",
        email: req.session.user.email,
        username: req.session.user.username,
        password: req.session.user.password
    });
});

export default router;
