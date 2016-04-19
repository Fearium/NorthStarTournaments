"use strict";
var express = require('express');
var router = express.Router();
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
// GET - show main users page - list all the users
router.get('/', requireAuth, function (req, res, next) {
    // use the Users model to query the Users collection
    Tournament.find(function (error, tournaments) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of users
            res.render('brackets/index', {
                title: 'Bracket',
                tournaments: tournaments,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});
// make this public
module.exports = router;

//# sourceMappingURL=brackets.js.map
