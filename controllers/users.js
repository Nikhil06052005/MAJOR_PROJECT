const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
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
  };

exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
  

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back To Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged-out now!");
    res.redirect("/listings");
    });
  };
  