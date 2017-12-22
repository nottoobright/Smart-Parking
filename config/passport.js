var passport = require("passport"),
  User = require("../models/User"),
  LocalStrategy = require("passport-local");
  bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      req.sanitizeBody("name");
      req.checkBody("name", "You must enter your name!").notEmpty();
      req
        .checkBody("license", "You must enter your license plate number!")
        .notEmpty();
      req.checkBody("email", "That Email is not valid!").isEmail();
      req
        .sanitizeBody("email")
        .normalizeEmail({
          gmail_remove_dots: false,
          remove_extension: false,
          gmail_remove_subaddress: false
        });
      req.checkBody("password", "Password Cannot be Blank!").notEmpty();
      req
        .checkBody(
          "password-confirm",
          "Confirmed Password cannot be blank!"
        )
        .notEmpty();
      req
        .checkBody(
          "password-confirm",
          "Oops! Your passwords do not match"
        )
        .equals(req.body.password);
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function(error) {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
      }
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        } else if (user) {
          return done(null, false, { message: "Email is already in use" });
        }
        var newUser = new User({
          email: req.body.email,
          name: req.body.name,
          license: req.body.license,
          aadhar: req.body.aadhar,
          mobile: req.body.mobile
        });
        newUser.password = newUser.generateHash(password);
        newUser.save(function(err, result) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);


passport.use("local-login", new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      req
        .checkBody("email", "Invalid email")
        .notEmpty()
        .isEmail();
      req
        .checkBody("password", "Password should be 4-20 characters")
        .notEmpty();
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function(error) {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
      }
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        } else if (!user) {
          return done(null, false, { message: "E-mail does not exist" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      });
    }
  )
);
