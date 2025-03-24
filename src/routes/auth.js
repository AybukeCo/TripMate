const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Load users from JSON
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../user.json"))).users;
// Regulate the password to an expression with the length from 8 to 16, with only numbers, english letters and certain signs
const pwdReg=/^[A-Za-z0-9@#\-_.,]{8,16}$/;

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
            res.render('login',{title:"LOGIN",error:"Wrong email or password"});
        }
    } else {
        res.render('login',{title:"LOGIN",error:"Invalid email or password"});
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login"); // Redirect to login after logout
    });
});

router.post("/register", (req, res) => {
    const {email, username, password} = req.body;
    const existingUser = users.find(u => u.email === email && u.password === password);
    console.log(req.body);

    // Password format error
    if (!pwdReg.test(password)) {
        res.render('register', {
            title: "REGISTER",
            error: "Password must be 8-16 characters and contain only letter, numbers and @#\-_.,",
            success: null
        });
    }

    // Existing user error
    if (existingUser) {
        res.render('register', {
            title: "REGISTER",
            error: "There's an existing user related with this email. Please change your email or try login.",
            success: null
        });
    }
    if (email && password && username) {
        const newUser= {email, username, password};
        users.push(newUser);

        fs.writeFile(path.join(__dirname, "../user.json"), JSON.stringify(users,null,2), (err) => {
            if (err) return res.send("Error writing into user.json");

            res.render('register', {
                title: "REGISTER",
                error: null,
                success: "Registration successfully. Redirecting to login..."
            })
        })
    }
});

/*router.post("/reset", (req, res) => {

})*/

module.exports = router;
