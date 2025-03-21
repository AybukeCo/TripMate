const express = require("express");
const path = require("path");
// module needed in identity verification
const session = require("express-session");
const PORT = 8000; // set port to 8000

const app = express();

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

// setting the routes
const homepageRoutes = require("./src/routes/router");
const authRoutes = require("./src/routes/auth");

app.use("/", homepageRoutes);
app.use("/", authRoutes);

// enable to upload file
app.use(express.json());