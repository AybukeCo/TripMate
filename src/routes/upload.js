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
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

router.post("/avatar", async (req, res) => {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const sampleFile = req.files.sampleFile;
    const uploadPath = uploadDir + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded to ' + uploadPath);
    });
})

export default router;