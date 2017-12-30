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
          { $limit: 3 },
          { $project: { bowler: "$_id", wickets: "$total" } }

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

module.exports = bowlerRoutes