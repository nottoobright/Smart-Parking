const express = require("express");
const router = express.Router();
const passport = require('passport');

//Get routes
/*router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.get('/logout', authController.logout);
router.get('/account', authController.isLoggedIn, userController.account);

//Post routes
router.post('/login', authController.login);
// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);
router.post('/account', catchErrors(userController.updateAccount));*/

router.get("/register", function(req, res, next) {
  var messages = req.flash("error");
  res.render("register", {
    messages: messages,
    hasError: messages.length > 0
  });
});

router.get("/login", function(req, res, next) {
  var messages = req.flash("error");
  res.render("login", {
    messages: messages,
    hasError: messages.length > 0
  });
});

router.post("/register",
  passport.authenticate("local-register", {
    successRedirect: "/",
    failureRedirect: "/registter",
    failureFlash: true
  })
);

router.post("/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;