const matchModel = require('../../models/iplMatch');

module.exports = (req, res) => {
  matchModel.distinct("season")
    .then((data, err) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err)
    })
}