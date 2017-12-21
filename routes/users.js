const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const auth = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");

//Get routes
router.get('/login', user.loginForm);
router.get('/register', user.register);
router.get('/logout', auth.logout);
router.get('/account', auth.isLoggedIn, user.account);

//Post routes
router.post('/login', auth.login);
// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post('/register',
    user.validateRegister,
    user.register,
    auth.login
);
router.post('/account', catchErrors(user.updateAccount));

module.exports = router;