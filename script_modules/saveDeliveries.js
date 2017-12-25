const csv = require('csvtojson');
const mongoose = require('mongoose');
const deliveries = "./data-sets/deliveries.csv"
const DeliveryModel = require("../models/iplDelivery");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/iplTest', {
  useMongoClient: true,
});

mongoose.connection.once('open', function() {
  console.log("Connection Established")
}).on('error', function(error) {
  console.log("Connection Error :" + error);
})

csv({ workerNum: 8 }).fromFile(deliveries).on('json', (jsonObj) => {
  var delivery = new DeliveryModel({
    matchID: parseInt(jsonObj['match_id']),
    battingTeam: jsonObj['batting_team'],
    bowlingTeam: jsonObj['bowling_team'],
    over: parseInt(jsonObj['over']),
    ball: parseInt(jsonObj['ball']),
    batsman: jsonObj['batsman'],
    bowler: jsonObj['bowler'],
    wide: parseInt(jsonObj['wide_runs']),
    noBall: parseInt(jsonObj['noball_runs']),
    batsmanRuns: parseInt(jsonObj['batsman_runs']),
    totalRuns: parseInt(jsonObj['total_runs']),
    wicket: (jsonObj['player_dismissed'] != '' ? 1 : 0),
    dismissal: jsonObj['dismissal_kind'],
    fielder: jsonObj['fielder']
  });
  delivery.save();
}).on('done', function() {
  console.log("Done writing Deliveries data to DataBase")
});