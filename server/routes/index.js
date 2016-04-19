"use strict";
var express = require('express');
var sendgrid = require('sendgrid')('ACCOUNT_NAME', 'PASSWORD');
var passport = require('passport');
var router = express.Router();
// db references
var userModel = require('../models/user');
var User = userModel.User;
var tournamentModel = require('../models/tournaments');
var Tournament = tournamentModel.Tournament;
/* Utility Function to check if user is authenticated */
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
/* GET landing page. */
router.get('/', function (req, res, next) {
    Tournament.find(function (error, tournaments) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of users
            res.render('index', {
                title: 'Landing Page',
                tournaments: tournaments,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});
/* GET about page. */
router.get('/about', function (req, res, next) {
    res.render('index', {
        title: 'About',
        userName: req.user ? req.user.username : '' });
});
/* GET contact page. */
router.get('/contact', function (req, res, next) {
    req.flash('successmessage', 'Thank You. Your message has been sent.');
    req.flash('errormessage', 'An Error has occurred.');
    res.render('contact', {
        title: 'Contact',
        messages: null,
        userName: req.user ? req.user.username : '' });
});
/* Email processing */
router.post('/contact', function (req, res, next) {
    sendgrid.send({
        to: 'tsiliopoulos@hotmail.com',
        from: req.body.email,
        subject: 'Contact Form Submission',
        text: "This message has been sent from the contact form at [MongoDB Demo]\r\n\r\n" +
            "Name: " + req.body.name + "\r\n\r\n" +
            "Phone: " + req.body.phone + "\r\n\r\n" +
            req.body.message,
        html: "This message has been sent from the contact form at [MongoDB Demo]<br><br>" +
            "<strong>Name:</strong> " + req.body.name + "<br><br>" +
            "<strong>Phone:</strong> " + req.body.phone + "<br><br>" +
            req.body.message
    }, function (err, json) {
        if (err) {
            res.status(500).json('error');
        }
        res.render('contact', {
            title: 'Contact',
            messages: req.flash('successmessage')
        });
    });
});
/* Render Login Page */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            userName: req.user ? req.user.username : ''
        });
        return;
    }
    else {
        return res.redirect('/');
    }
});
/* Process Login Request */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
/* Render Password Reset page */
router.get('/reset', function (req, res, next) {
    if (req.user) {
        res.render('reset', {
            title: 'Reset',
            userName: req.user ? req.user.username : ''
        });
    }
    else {
        return res.redirect('/login');
    }
});
/* Process Password Reset Request */
router.post('/reset', function (req, res, next) {
    console.log(req.user.username);
    User.findOne({ 'username': req.user.username }, function (err, user) {
        user.setPassword(req.body.password, function (err) {
            if (err) {
                console.log(err);
                next(err);
            }
            else {
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Password Changed');
                    res.redirect('/users');
                });
            }
        });
    });
});
/* Render Registration page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            userName: req.user ? req.user.username : ''
        });
        return;
    }
    else {
        return res.redirect('/');
    }
});
/* Process Registration Request */
router.post('/register', function (req, res, next) {
    // attempt to register user
    User.register(new User({ username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }), req.body.password, function (err) {
        if (err) {
            console.log('Error Inserting New Data');
            if (err.name == 'UserExistsError') {
                req.flash('registerMessage', 'Registration Error: User Already Exists!');
            }
            return res.render('register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                userName: req.user ? req.user.username : ''
            });
        }
        // if registration is successful
        return passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
});
/* Process Logout Request */
router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/login');
});
module.exports = router;

//# sourceMappingURL=index.js.map
