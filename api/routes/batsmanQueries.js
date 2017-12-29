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
        // const name = 0;
        // let data = result.map(b => [b["_id"], b["runs"]]);
        // let names = data.map(b => b[name]);
        // let batsmanRuns = {
        //   data,
        //   names
        // }
        // res.send(batsmanRuns);
        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },

  strikeRate(req, res) {
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
          { $match: { "balls": { $gte: 60 } } },
          { $project: { strikeRate: { $multiply: [{ $divide: ["$runs", "$balls"] }, 100] } } },
          { $sort: { "strikeRate": -1 } },
          { $limit: 5 }
        ])
      })
      .then((result, err) => {
        const name = 0;
        let data = result.map(b => [b["_id"], b["strikeRate"]]);
        let names = data.map(b => b[name]);
        let batsmanData = {
          data,
          names
        }
        res.send(batsmanData);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}

module.exports = batsmanRoutes