var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Here we say the how the data collection will look like
var teamsSchema = new Schema({
    id: Number,
    name: String,
    logo: String,
    rank: Number,
    wins: Number,
    ties: Number,
    gamesplayed: Number,
    goalsfor: Number,
    goalsaganist: Number,
    points: Number
});

// Here we create a Model something like a "programming interface"
// that will allow us to do things like read insert update etc..
const Teams = mongoose.model('teamsSchema', teamsSchema);

module.exports = Teams;