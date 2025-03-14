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

// setting the routes
const homepageRoutes = require("./src/routes/router");

app.use("/", homepageRoutes);

// enable to upload file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));