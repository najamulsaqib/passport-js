const express = require("express");
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const port = 5000;

require("./utils/db.js");

//? middleware
app.set("view-engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: "cat",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//? route
app.use("/", require("./routes/routes.js"));

app.listen(port, () => console.log("Server is running on port: " + port));
