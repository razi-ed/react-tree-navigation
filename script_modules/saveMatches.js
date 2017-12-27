const csv = require('csvtojson');
const mongoose = require('mongoose');
const matches = "./data-sets/matches.csv"
const MatchModel = require("../models/iplMatch");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/iplReactDB', {
  useMongoClient: true,
});

mongoose.connection.once('open', function() {
  console.log("Connection Established")
}).on('error', function(error) {
  console.log("Connection Error :" + error);
})

csv({ workerNum: 8 }).fromFile(matches).on('json', (jsonObj) => {
  var match = new MatchModel({
    matchID: parseInt(jsonObj['id']),
    season: jsonObj['season'],
    city: jsonObj['city'],
    date: jsonObj['date'],
    team1: jsonObj['team1'],
    team2: jsonObj['team2'],
    toss_winner: jsonObj['toss_winner'],
    toss_decision: jsonObj['toss_decision'],
    result: jsonObj['result'],
    dl_applied: jsonObj['dl_applied'],
    winner: jsonObj['winner'],
    win_by_runs: jsonObj['win_by_runs'],
    win_by_wickets: jsonObj['win_by_wickets'],
    player_of_match: jsonObj['player_of_match'],
    venue: jsonObj['venue'],
    umpire1: jsonObj['umpire1'],
    umpire2: jsonObj['umpire2']
  });
  match.save();
}).on('done', function() {
  console.log("Done writing Matches data to DataBase")
});