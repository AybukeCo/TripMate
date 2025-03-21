const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Load users from JSON
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../user.json"))).users;

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    console.log(user);
    if (email && password) {
        if(user) {
            req.session.user = user; // Store user in session
            res.redirect("/trips"); // Redirect to homepage after login
        }
        else{
            console.log("Wrong email or password");
        }
    } else {
        console.log("Invalid email or password");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login"); // Redirect to login after logout
    });
});

module.exports = router;
