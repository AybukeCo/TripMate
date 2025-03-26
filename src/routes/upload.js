import express from 'express';
import { getDB } from "../db/db.js";

import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Set upload Directory, if not exists, create
const uploadDir = path.join(__dirname, "../../public/img/");
const photoDir = "/img/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

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
                user:user
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
                user: user
            })
        }
    } catch (err) {
        console.log("Requested session failed: ", err);
        return res.redirect("/profile");
    }

})

router.post("/avatar", async (req, res) => {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    try {
        const email = req.session.user.email;
        const db=getDB();
        const user=await db.collection('users').findOne({ email });
        // The name of the input field (i.e. "avatarImg") is used to retrieve the uploaded file
        const avatarImg = req.files.avatarImg;
        const avatarImgName = user._id.toString() + '.'+ avatarImg.name.split('.').pop();
        const uploadPath = uploadDir + avatarImgName;
        const photoPath = photoDir + avatarImgName;
        // Use the mv() method to place the file somewhere on your server
        avatarImg.mv(uploadPath, async function(err) {
            if (err)
                return res.render("profile",
                    {
                        title:"Profile Page",
                        error:err,
                        success:null,
                        user:user
                    });

            console.log('File uploaded to ' + uploadPath);
            const result = await db.collection("users").updateOne(
                { email }, // filter by email
                { $set: { photo: photoPath } }
            );

            console.log("Update user result:", result);
            console.log(user);

            return res.render("profile", {
                title: "Profile Page",
                error:null,
                success:"Upload avatar image successfully.",
                user:user
            })
        });
    } catch (err) {
        console.log("Requested session failed: ", err);
        return res.redirect("/profile");
    }

})

export default router;