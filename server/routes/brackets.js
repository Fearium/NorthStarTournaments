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
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Tournament.findById(id, function (error, tournaments) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('brackets/index', {
                title: 'Tournament',
                name: name,
                tournaments: tournaments,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});
// make this public
module.exports = router;

//# sourceMappingURL=brackets.js.map
