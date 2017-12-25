const matchModel = require('../../models/iplMatch')
const deliveryModel = require('../../models/iplDelivery')

const teamQueries = {
  wins: function(req, res) {
    matchModel.aggregate([{ $match: { "season": parseInt(req.params.year) } },
        { $group: { _id: "$winner", total: { $sum: 1 } } }
      ]).then((result) => {
        const name = 0;
        let data = result.filter(t => t['_id'] !== "").map(e => [e['_id'], e['total']]);
        let names = data.map(e => e[name]);
        let winsData = {
          data,
          names,
        };
        res.send(winsData);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },
  runs: function(req, res) {
    matchModel.aggregate([{ $match: { "season": parseInt(req.params.year) } },
        { $group: { _id: "$season", midFirst: { $first: "$matchID" }, midLast: { $last: "$matchID" } } }
      ])
      .then((data, err) => {
        let season = {};
        season['startId'] = data[0]['midFirst'];
        season['endId'] = data[0]['midLast'];
        return deliveryModel.aggregate([
          { $match: { "matchID": { $gte: parseInt(season.startId), $lte: parseInt(season.endId) } } },
          { $group: { _id: "$battingTeam", runs: { $sum: "$totalRuns" } } },
          { $project: { totalRuns: "$runs" } }
        ])
      })
      .then((result, err) => {
        const name = 0;
        let data = result.map(b => [b["_id"], b["totalRuns"]]);
        let names = data.map(b => b[name]);
        let teamData = {
          names,
          data
        }
        res.send(teamData);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}
module.exports = teamQueries;