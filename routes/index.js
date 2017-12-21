const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const auth = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', (req, res, next) => { res.render(index) });

module.exports = router;