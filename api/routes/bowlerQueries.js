const matchModel = require('../../models/iplMatch')
const deliveryModel = require('../../models/iplDelivery')

const bowlerRoutes = {
  wickets: function(req, res) {
    matchModel.aggregate([{ $match: { "season": parseInt(req.params.year) } },
        { $group: { _id: "$season", midFirst: { $first: "$matchID" }, midLast: { $last: "$matchID" } } }
      ])
      .then((data, err) => {
        let season = {};
        season['startId'] = data[0]['midFirst'];
        season['endId'] = data[0]['midLast'];
        return deliveryModel.aggregate([
          { $match: { "matchID": { $gte: parseInt(season.startId), $lte: parseInt(season.endId) } } },
          {
            $match: {
              $and: [{ dismissal: { $ne: "" } },
                { dismissal: { $ne: "run out" } }
              ]
            }
          }, { $group: { _id: "$bowler", total: { $sum: 1 } } },
          { $sort: { "total": -1 } },
          { $limit: 5 }
        ])
      })
      .then((result, err) => {
        const name = 0;
        let data = result.map(b => [b["_id"], b["total"]]);
        let names = data.map(b => b[name]);
        let bowlersData = {
          names,
          data
        }
        res.send(bowlersData);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },
  economyRates: function(req, res) {
    matchModel.aggregate([{ $match: { "season": parseInt(req.params.year) } },
        { $group: { _id: "$season", midFirst: { $first: "$matchID" }, midLast: { $last: "$matchID" } } }
      ])
      .then((data, err) => {
        let season = {};
        season['startId'] = data[0]['midFirst'];
        season['endId'] = data[0]['midLast'];
        return deliveryModel.aggregate([
          { $match: { "matchID": { $gte: parseInt(season.startId), $lte: parseInt(season.endId) } } },
          { $group: { _id: "$bowler", balls: { $sum: 1 }, runs: { $sum: "$totalRuns" } } },
          { $match: { "balls": { $gte: 75 } } },
          { $project: { economyRate: { $multiply: [{ $divide: ["$runs", "$balls"] }, 6] } } },
          { $sort: { "economyRate": 1 } },
          { $limit: 5 }
        ])
      })
      .then((result, err) => {
        const name = 0;
        let data = result.map(b => [b["_id"], b["economyRate"]]);
        let names = data.map(b => b[name]);
        let bowlersData = {
          names,
          data
        }
        res.send(bowlersData);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}

module.exports = bowlerRoutes