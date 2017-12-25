const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema and model
//schema
const iplDeliverySchema = new Schema({
  matchID: Number,
  battingTeam: String,
  bowlingTeam: String,
  over: Number,
  ball: Number,
  batsman: String,
  bowler: String,
  wide: Number,
  noBall: Number,
  batsmanRuns: Number,
  totalRuns: Number,
  wicket: String,
  dismissal: String,
  fielder: String
});

//model
const iplDeliveryModel = mongoose.model('iplDelivery', iplDeliverySchema);

//exporting
module.exports = iplDeliveryModel;