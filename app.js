import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
// module needed in identity verification
import session from "express-session";
import {connectToMongoClient} from "./src/database/db.js";

const PORT = 8000; // set port to 8000
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// enable to upload file
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // To handle form data

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

// listen
app.listen( PORT, () => {
    console.log( "App running on http://localhost:" + PORT );
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// initialize session
app.use(session({
    secret: "secret_key", // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set `true` for HTTPS
}));


//////////// connect to MongoDB ///////////
connectToMongoClient();

/////////////// set the routes /////////////////
import homepageRoutes from "./src/routes/router.js";
import authRoutes from "./src/routes/auth.js";

app.use("/", homepageRoutes);
app.use("/", authRoutes);
