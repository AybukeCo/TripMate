import express from 'express';
import {getDB} from "../db/db.js";

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

router.get("/trips/", async (req, res) => {
    const email = req.session.user.email;
    const db=getDB();
    const user=await db.collection('users').findOne({ email });

    if (!user) return res.redirect('/login');

    res.render('trips/homepage', {
        title: "Trips",
        user:user
    });
});

router.get("/map", async (req, res) => {
    try {
        const email = req.session.user.email;
        const db=getDB();
        const user=await db.collection('users').findOne({ email });

        if (!user) return res.redirect('/login');

        res.render("map", {
            title: "Map page",
            user: user
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
});

router.get("/profile", async (req, res) => {

    try {
        const email = req.session.user.email;
        const db=getDB();
        const user=await db.collection('users').findOne({ email });

        if (!user) return res.redirect('/login');

        res.render("profile", {
            title: "Profile Page",
            user:user,
            error: null,
            success: null
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
});

router.get("/trips/itinerary", (req, res) => {
    const user=req.session.user;
    if (!user) return res.redirect('/login');

    res.render("trips/itinerary", {
        title: "ITINERARY",
        user: user
    });
});
router.get("/trips/finance", (req, res) => {
    const user=req.session.user;
    if (!user) return res.redirect('/login');
    res.render("trips/finance", {
        title: "FINANCE",
        user: user
    });
});

router.get("/trips/chat", (req, res) => {
    const user=req.session.user;
    if (!user) return res.redirect('/login');

    res.render("trips/chat", {
        title: "CHAT",
        user: user
    });
});
/*router.get("/trips/polls", (req, res) => {
    const user=req.session.user;
    if (!user){
        return res.redirect('/login')
    };
    res.render("trips/polls", {
        title: "POLLS",
        user: user
    });
});*/

export default router;
