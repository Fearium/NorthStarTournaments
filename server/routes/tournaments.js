"use strict";
var express = require('express');
var router = express.Router();
var tournamentModel = require('../models/tournaments');
var teamModel = require('../models/team');
var Tournament = tournamentModel.Tournament;
var Team = teamModel.Team;
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
            res.render('tournaments/index', {
                title: 'Tournaments',
                tournaments: tournaments,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});
// GET add page - show the blank form
router.get('/add', requireAuth, function (req, res, next) {
    Team.find(function (error, teams) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of teams
            res.render('tournaments/add', {
                title: 'Add a New Tournament',
                teams: teams,
                userName: req.user ? req.user.userName : ''
            });
        }
    });
});
// POST add page - save the new user
router.post('/add', requireAuth, function (req, res, next) {
    Tournament.create({
        name: req.body.name,
        description: req.body.description,
        size: req.body.size,
        team1: req.body.team1,
        team2: req.body.team2,
        team3: req.body.team3,
        team4: req.body.team4,
        team5: req.body.team5,
        team6: req.body.team6,
        team7: req.body.team7,
        team8: req.body.team8,
        team9: req.body.team9,
        team10: req.body.team10,
        team11: req.body.team11,
        team12: req.body.team12,
        team13: req.body.team13,
        team14: req.body.team14,
        team15: req.body.team15,
        team16: req.body.team16,
        createdby: req.user.username
    }, function (error, tournament) {
        // did we get back an error or valid Users object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/tournaments');
        }
    });
});
// GET edit page - show the current user in the form
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Tournament.findById(id, function (error, Tournament) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('tournaments/edit', {
                title: 'Tournament Details',
                tournament: Tournament,
                userName: req.user ? req.user.userName : ''
            });
        }
    });
});
// POST edit page - update the selected user
router.post('/:id', requireAuth, function (req, res, next) {
    // grab the id from the url parameter
    var id = req.params.id;
    // create and populate a tournament object
    var tournament = new Tournament({
        _id: id,
        name: req.body.name,
        description: req.body.description,
        size: req.body.size,
        team1: req.body.team1,
        team2: req.body.team2,
        team3: req.body.team3,
        team4: req.body.team4,
        team5: req.body.team5,
        team6: req.body.team6,
        team7: req.body.team7,
        team8: req.body.team8,
        team9: req.body.team9,
        team10: req.body.team10,
        team11: req.body.team11,
        team12: req.body.team12,
        team13: req.body.team13,
        team14: req.body.team14,
        team15: req.body.team15,
        team16: req.body.team16
    });
    // run the update using mongoose and our model
    Tournament.update({ _id: id }, tournament, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // if update is successful redirect to the users page
            res.redirect('/tournaments');
        }
    });
});
// GET delete user
router.get('/delete/:id', requireAuth, function (req, res, next) {
    // get the id from the url
    var id = req.params.id;
    // use the model and delete this record
    Tournament.remove({ _id: id }, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // if removal worked redirect to users page
            res.redirect('/tournaments');
        }
    });
});
// make this public
module.exports = router;

//# sourceMappingURL=tournaments.js.map
