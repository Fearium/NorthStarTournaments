import express = require('express');
import passport = require('passport');
var router = express.Router();

// db references
import mongoose = require('mongoose');

import tournamentModel = require('../models/tournaments');
import teamModel = require('../models/team');
import userModel = require('../models/user');

import Tournament = tournamentModel.Tournament;
import Team = teamModel.Team;
import User = userModel.User;

/* Utility Function to check if user is authenticated */
function requireAuth(req:express.Request, res:express.Response, next: any) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// GET - show main tournaments page - list all the users
router.get('/', requireAuth, (req: express.Request, res: express.Response, next: any) => {
   
    // use the tournament model to query the tournaments collection
    Tournament.find((error, tournaments) => {
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

router.get('/brackets/:id', (req: express.Request, res: express.Response, next: any) => {

    var id = req.params.id;

    Tournament.findById(id, (error, Tournament) => {
       User.find((error, users) => {
             if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('brackets/index', {
                title: 'Tournament',
                tournament: Tournament,
                users: users,
                userName: req.user ? req.user.username : ''
            });
        }
        })
       
    });
});

router.post('/brackets/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

var id = req.params.id;

Tournament.findOneAndUpdate({"_id": id},{
    round1a: req.body.round1a,
    round1b: req.body.round1b,
    round1c: req.body.round1c,
    round1d: req.body.round1d,
    round1e: req.body.round1e,
    round1f: req.body.round1f,
    round1g: req.body.round1g,
    round1h: req.body.round1h,
    round2a: req.body.round2a,
    round2b: req.body.round2b,
    round2c: req.body.round2c,
    round2d: req.body.round2d,
    round3a: req.body.round3a,
    round3b: req.body.round3b,
    round4a: req.body.round4a,
    round4b: req.body.round4b
},{new:true}, (error, tournament) =>{
    if(error){
        console.log(error);
        res.end(error);
    }
    else{
        //res.redirect('back');
    }
})
});
    

// GET add page - show the blank form
router.get('/add', requireAuth, (req: express.Request, res: express.Response, next: any) => {
   Team.find((error, teams) => {
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
router.post('/add', requireAuth, (req: express.Request, res: express.Response, next: any) => {
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
    }, (error, tournament) => {
        // did we get back an error or valid Users object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/tournaments');
        }
    }) 
});

// GET edit page - show the current user in the form
router.get('/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

    var id = req.params.id;

    Tournament.findById(id, (error, Tournament) => {
       Team.find((error, teams) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else{
            //show the edit view
            res.render('tournaments/edit', {
                title: 'Tournament Details',
                tournament: Tournament,
                teams: teams,
                userName: req.user ? req.user.userName : ''
            });     
        }
        });
    });       
     
});

// POST edit page - update the selected user
router.post('/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

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
    Tournament.update({ _id: id }, tournament, (error) => {
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
router.get('/delete/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

    // get the id from the url
    var id = req.params.id;

    // use the model and delete this record
    Tournament.remove({ _id: id }, (error) => {
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