const express = require("express");
const { append } = require("express/lib/response");
const passport = require("passport");
const router = express.Router();

const {
  signup,
  checkAuth,
  checkNotAuth,
  logout,
} = require("../controllers/user.js");

router.get("/", checkAuth, (req, res) => {
  res.render("index.ejs", { user: `${req.user.firstname} ${req.user.lastname}` });
});

router.get("/login", checkNotAuth, (req, res) => {
  res.render("login.ejs");
});
router.post(
  "/login",
  checkNotAuth,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/signup", checkNotAuth, (req, res) => {
  res.render("signup.ejs");
});
router.post("/signup", checkNotAuth, signup);
router.get("/logout", checkAuth, logout);
module.exports = router;
