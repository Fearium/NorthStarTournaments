"use strict";
var express = require('express');
var router = express.Router();
var teamModel = require('../models/team');
var Team = teamModel.Team;
/* Utility Function to check if user is authenticated */
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
// GET - show main teams page - list all the teams
router.get('/', requireAuth, function (req, res, next) {
    // use the team model to query the teams collection
    Team.find(function (error, teams) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of teams
            res.render('teams/index', {
                title: 'Teams',
                teams: teams,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});
// GET add page - show the blank form
router.get('/add', requireAuth, function (req, res, next) {
    res.render('teams/add', {
        title: 'Add a Team',
        userName: req.user ? req.user.username : ''
    });
});
// POST add page - save the new team
router.post('/add', requireAuth, function (req, res, next) {
    Team.create({
        teamname: req.body.teamname,
        player1: req.body.player1,
        player2: req.body.player2,
        player3: req.body.player3,
        player4: req.body.player4,
        player5: req.body.player5,
        player6: req.body.player6,
        createdby: req.user.username
    }, function (error, team) {
        // did we get back an error or valid teams object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/teams');
        }
    });
});
// GET edit page - show the current team in the form
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Team.findById(id, function (error, Team) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('team/edit', {
                title: 'Team Details',
                team: Team,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});
// POST edit page - update the selected team
router.post('/:id', requireAuth, function (req, res, next) {
    // grab the id from the url parameter
    var id = req.params.id;
    // create and populate a team object
    var team = new Team({
        _id: id,
        teamname: req.body.teamname,
        player1: req.body.player1,
        player2: req.body.player2,
        player3: req.body.player3,
        player4: req.body.player4,
        player5: req.body.player5,
        player6: req.body.player6,
        userName: req.body.userName
    });
    // run the update using mongoose and our model
    Team.update({ _id: id }, team, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // if update is successful redirect to the teams page
            res.redirect('/teams');
        }
    });
});
// GET delete team
router.get('/delete/:id', requireAuth, function (req, res, next) {
    // get the id from the url
    var id = req.params.id;
    // use the model and delete this record
    Team.remove({ _id: id }, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // if removal worked redirect to teams page
            res.redirect('/teams');
        }
    });
});
module.exports = router;

//# sourceMappingURL=teams.js.map
