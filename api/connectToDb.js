const connect = () => {
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/iplTest', {
    useMongoClient: true,
  });
}

module.exports = connect