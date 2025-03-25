import express from 'express';
import { getDB } from "../db/db.js";
import { resetGoogleIdIndex } from "../db/cleanGoogleID.js";

import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Set upload Directory, if not exists, create
const uploadDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Regulate the password to an expression with the length from 8 to 16, with only numbers, english letters and certain signs
const pwdReg=/^[A-Za-z0-9@#\-_.,]{8,16}$/;

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // const user = users.find(u => u.email === email && u.password === password);
    const db = getDB();
    const user = await db.collection('users').findOne({ email });

    if (email && password) {
        if(user && user.password === password) {
            req.session.user = {email:user.email, username:user.username,password: user.password}; // Store user in session
            return res.redirect("/trips"); // Redirect to homepage after login
        }
        else{
            return res.render('login',{title:"LOGIN",error:"Wrong email or password"});
        }
    } else {
        return res.render('login',{title:"LOGIN",error:"Invalid email or password"});
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
    const existingUser = await db.collection('users').findOne({ email });

    // const existingUser = users.find(u => u.email === email && u.password === password);
    console.log(req.body);
    console.log(existingUser);

    // Password format error
    if (!pwdReg.test(password)) {
        return res.render('register', {
            title: "REGISTER",
            error: "Password must be 8-16 characters and contain only letter, numbers and @#\-_.,",
            success: null
        });
    }

    // Existing user error
    if (existingUser) {
        return res.render('register', {
            title: "REGISTER",
            error: "There is an existing user related with this email. Please change your email or try login.",
            success: null
        });
    }
    if (email && password && username) {
        const newUser= {email, username, password};

        try {
            await resetGoogleIdIndex();
            const insertUser = await db.collection('users').insertOne(newUser);
            console.log("User inserted:",insertUser.insertedId);
            req.session.user = {email,username,password};
            return res.render('register', {
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

router.post("/profile", async (req, res) => {
    const { username } = req.body;
    try {
        const email = req.session.user.email;
        const db=getDB();
        const user=await db.collection('users').findOne({ email });
        if (username===user.username){
            return res.render('profile',{
                title:"profile page",
                error:"There is no change to make!",
                success:null,
                username: user.username,
                email: email,
                password: user.password
            })
        }
        else {
            const result = await db.collection("users").updateOne(
                { email }, // filter by email
                { $set: { username: username } }
            );
            req.session.user.username=username;
            console.log("Update user result:", result);
            return res.render("profile",{
                title:"profile page",
                error:null,
                success:"Username successfully changed!",
                username: username,
                email: email,
                password: user.password
            })
        }
    } catch (err) {
        console.log("Requested session failed: ", err);
        return res.redirect("/profile");
    }

})

router.post("/reset", async (req, res) => {
    const {email, password, passwordConfirm} = req.body;
    const db = getDB();
    const existingUser = await db.collection('users').findOne({ email });

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
        const result = await db.collection("users").updateOne(
            { email }, // filter by email
            { $set: { password: password } }
        );
        console.log("Update user result:", result);
        res.render('reset', {
            title: "RESET PASSWORD",
            error: null,
            success: "Reset password successfully. Redirecting to login..."
        })

        /*
        fs.writeFile(path.join(__dirname, "../user.json"), JSON.stringify(users,null,2), (err) => {
            if (err) return res.send("Error writing into user.json");

            res.render('reset', {
                title: "RESET PASSWORD",
                error: null,
                success: "Reset password successfully. Redirecting to login..."
            })
        })*/
    }
});
export default router;
