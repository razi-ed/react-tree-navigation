const matchModel = require('../../models/iplMatch')
const deliveryModel = require('../../models/iplDelivery')

const batsmanRoutes = {
  runs(req, res) {
    matchModel.aggregate([{ $match: { "season": parseInt(req.params.year) } },
        { $group: { _id: "$season", midFirst: { $first: "$matchID" }, midLast: { $last: "$matchID" } } }
      ])
      .then((data, err) => {
        let season = {};
        season['startId'] = data[0]['midFirst'];
        season['endId'] = data[0]['midLast'];
        return deliveryModel.aggregate([
          { $match: { "matchID": { $gte: parseInt(season.startId), $lte: parseInt(season.endId) } } },
          { $group: { _id: "$batsman", balls: { $sum: 1 }, runs: { $sum: "$batsmanRuns" } } },
          { $sort: { "runs": -1 } },
          { $limit: 3 },
          { $project: { batsman: "$_id", runs: "$runs" } }
        ])
      })
      .then((result, err) => {

        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}

module.exports = batsmanRoutes