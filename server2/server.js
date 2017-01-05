process.env.FORTYTWO_CLIENT_ID = "7e5a207ce085c9b43f626f8cefb4c738c6f9fb84109b16aeda3d8e240389583a";
process.env.FORTYTWO_CLIENT_SECRET = "61cf07254411223064825b0d93ded608f622c435b37db80495a372c553563373";

var passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//routes
var apiRoute = require('./routes/authApi');
var apiHome = require('./routes/home');
var apiBrowse = require('./routes/browse');
var apiMovie = require('./routes/movie');

var app = express();

passport.use(new FortyTwoStrategy({
        clientID: process.env.FORTYTWO_CLIENT_ID,
        clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:4000/login/42/return'
    },
    function (accessToken, refreshToken, profile, cb) {
        // In this example, the user's 42 profile is supplied as the user
        // record.  In a production-quality application, the 42 profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, x-requested-with, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATH, DELETE, OPTIONS');
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/movies', apiMovie);
app.use('/browse', apiBrowse);
app.use('/home', apiHome);
app.use('/auth', apiRoute);

app.get('/login/42',
    passport.authenticate('42'));

app.get('/login/42/return',
    passport.authenticate('42', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.redirect("http://localhost:3000");
});

module.exports = app;
