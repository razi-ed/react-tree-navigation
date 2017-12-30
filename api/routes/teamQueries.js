const matchModel = require('../../models/iplMatch')
const deliveryModel = require('../../models/iplDelivery')

const teamQueries = {
  wins: function(req, res) {
    matchModel.aggregate([{ $match: { "season": parseInt(req.params.year) } },
        { $group: { _id: "$winner", total: { $sum: 1 } } },
        { $sort: { "total": -1 } },
        { $limit: 3 },
        { $project: { team: "$_id", wins: "$total" } }
      ]).then((result) => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}
module.exports = teamQueries;