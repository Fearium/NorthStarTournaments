import express = require('express');
import passport = require('passport');
var router = express.Router();

// db references
import mongoose = require('mongoose');

import tournamentModel = require('../models/tournaments');
import teamModel = require('../models/team');

import Tournament = tournamentModel.Tournament;
import Team = teamModel.Team;

/* Utility Function to check if user is authenticated */
function requireAuth(req:express.Request, res:express.Response, next: any) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

router.get('/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

    var id = req.params.id;

    Tournament.findById(id, (error, tournaments) => {
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