import express from 'express';
import fs from 'fs';
import path from 'path';
import { getDB } from "../database/db.js";
const router = express.Router();

// Load users from JSON

// const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../user.json"))).users;
// Regulate the password to an expression with the length from 8 to 16, with only numbers, english letters and certain signs
const pwdReg=/^[A-Za-z0-9@#\-_.,]{8,16}$/;

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    // const user = users.find(u => u.email === email && u.password === password);
    const db = getDB();
    const user = db.collection('users').findOne({ email });

    if (email && password) {
        if(user) {
            req.session.user = {email:user.email, username:user.username,password: user.password}; // Store user in session
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

router.post("/register", async (req, res) => {
    const {email, username, password} = req.body;
    const db = getDB();
    const existingUser = db.collection('users').findOne({ email });

    // const existingUser = users.find(u => u.email === email && u.password === password);
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
            error: "There is an existing user related with this email. Please change your email or try login.",
            success: null
        });
    }
    if (email && password && username) {
        const newUser= {email, username, password};

        try {
            const insertUser = await db.collection('users').insertOne(newUser);
            console.log("User inserted:",insertUser.insertedId);
            res.render('register', {
                title: "REGISTER",
                error: null,
                success: "Registration successfully. Redirecting to login..."
            })
        } catch (err) {
            console.error("Error insert new user to MongoDB: ",err);
        }

        /*fs.writeFile(path.join(__dirname, "../user.json"), JSON.stringify(users,null,2), (err) => {
            if (err) return res.send("Error writing into user.json");

            res.render('register', {
                title: "REGISTER",
                error: null,
                success: "Registration successfully. Redirecting to login..."
            })
        })*/
    }
});

router.post("/reset", (req, res) => {
    const {email, password, passwordConfirm} = req.body;
    console.log(req.body);
    const existingUser = users.find(u => u.email === email);

    if (!pwdReg.test(password)){
        return res.render('reset', {
            title: "RESET PASSWORD",
            error: "Password must be 8-16 characters and contain only letter, numbers and @#\-_.,",
            success: null
        })
    }
    if (!existingUser) {
        return res.render('reset', {
            title: "RESET PASSWORD",
            error: "No existing account for this email",
            success: null
        })
    }
    if (password && password !== passwordConfirm) {
        return res.render('reset', {
            title: "RESET PASSWORD",
            error: "Password and confirm password are not the same.",
            success: null
        })
    }
    if (password && password === passwordConfirm) {
        existingUser.password = password;
        fs.writeFile(path.join(__dirname, "../user.json"), JSON.stringify(users,null,2), (err) => {
            if (err) return res.send("Error writing into user.json");

            res.render('reset', {
                title: "RESET PASSWORD",
                error: null,
                success: "Reset password successfully. Redirecting to login..."
            })
        })
    }
});

export default router;
