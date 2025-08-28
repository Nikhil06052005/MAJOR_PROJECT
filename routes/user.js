const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// SIGNUP ROUTES:
// signup page dikhata h (signup.ejs)
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

//form submit hone pr naya user create krta h
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password); //=> passport+mongoose ka method, password securely store krta h
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Wanderlust"); //SUCCESS => flash msg + /listings me redirect karega
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message); //ERROR => flash error + /signup redirect
      res.redirect("/signup");
    }
  })
);

//LOGIN ROUTES:
//login page dikhata h (login.ejs)
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    //username/pswd check krta h
    failureRedirect: "/login", //FAILURE: /login redirect + error-msg
    failureFlash: true, //SUCCESS: flash msg + /listings redirect
  }),
  async (req, res) => {
    req.flash("success", "Welcome back To Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);

//LOGOUT ROUTES:
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged-out now!");
    res.redirect("/listings");
  });
});

module.exports = router;
