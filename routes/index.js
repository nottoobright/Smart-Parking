const express = require('express');
const router = express.Router();
const passport = require('passport');
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/',  (req, res, next) => { res.render("index"), { title: "SmartParking" } });

module.exports = router;
