const express = require('express');
const router = express.Router();
const passport = require('passport');
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', isLoggedIn , (req, res, next) => { res.render("index"), { title: "SmartParking" } });


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;