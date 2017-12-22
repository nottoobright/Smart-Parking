const express = require('express');
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const promisify = require("es6-promisify");
const flash = require("connect-flash");
const path = require('path');
const User = require('./models/User');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const errorHandlers = require("./handlers/errorHandlers");
const LocalStrategy = require("passport-local");

const index = require('./routes/index');
const users = require('./routes/users');
require("./config/passport");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));


//Database setup
app.use(
    session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);


//Passport setup
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

//Flash middleware for messages
app.use(flash());

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);

if (app.get("env") === "development") {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;