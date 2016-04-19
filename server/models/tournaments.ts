import mongoose = require('mongoose');
import passportLocalMongoose = require('passport-local-mongoose');

// DEFINE THE OBJECT SCHEMA
var tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Tournament name is required'
    },
    size: {
        type: Number,
        default: 16,
        trim: true,
        required: 'Size of tournament required'
    },
    //16 team variables
    team1: {
        type: String,
        trim: true,
    },
    team2: {
        type: String,
        trim: true,
    },
    team3: {
        type: String,
        trim: true,
    },
    team4: {
        type: String,
        trim: true,
    },
    team5: {
        type: String,
        trim: true,
    },
    team6: {
        type: String,
        trim: true,
    },
    team7: {
        type: String,
        trim: true,
    },
    team8: {
        type: String,
        trim: true,
    },
    team9: {
        type: String,
        trim: true,
    },
    team10: {
        type: String,
        trim: true,
    },
    team11: {
        type: String,
        trim: true,
    },
    team12: {
        type: String,
        trim: true,
    },
    team13: {
        type: String,
        trim: true,
    },
    team14: {
        type: String,
        trim: true,
    },
    team15: {
        type: String,
        trim: true,
    },
    team16: {
        type: String,
        trim: true,
    },
    //tournament round 1 progression values
    round1a: {
        type: String,
        trim: true,
    },
    round1b: {
        type: String,
        trim: true,
    },
    round1c: {
        type: String,
        trim: true,
    },
    round1d: {
        type: String,
        trim: true,
    },
    round1e: {
        type: String,
        trim: true,
    },
    round1f: {
        type: String,
        trim: true,
    },
    round1g: {
        type: String,
        trim: true,
    },
    round1h: {
        type: String,
        trim: true,
    },
    //tournament round 2 progression values
    round2a: {
        type: String,
        trim: true,
    },
    round2b: {
        type: String,
        trim: true,
    },
    round2c: {
        type: String,
        trim: true,
    },
    round2d: {
        type: String,
        trim: true,
    },
    //tournament round 3 progression values
    round3a: {
        type: String,
        trim: true,
    },
    round3b: {
        type: String,
        trim: true,
    },
    //tournament round 3 progression values
    round4a: {
        type: String,
        trim: true,
    },
    round4b: {
        type: String,
        trim: true,
    },
     description: {
        type: String,
        trim: true,
    },
    createdby: {
        type: String,
        trim: true,
        required: 'Owner required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
    { collection: 'tournamentInfo' });

// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
export var Tournament = mongoose.model('Tournament', tournamentSchema);