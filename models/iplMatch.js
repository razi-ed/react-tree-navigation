const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema and model
//schema
const iplMatchesSchema = new Schema({
  matchID: Number,
  season: Number,
  city: String,
  date: String,
  team_1: String,
  team_2: String,
  tossWinner: String,
  tossDecision: String,
  result: String,
  dlApplied: Boolean,
  winner: String,
  winByRuns: Number,
  winByWickets: Number,
  manOfMatch: String,
  venue: String,
  umpire1: String,
  umpire2: String
});

//model
const iplMatchModel = mongoose.model('iplMatches', iplMatchesSchema);

//exporting
module.exports = iplMatchModel;