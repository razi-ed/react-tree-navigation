const express = require('express')

const app = express();
const cors = require('cors');
const connectToDB = require('./connectToDb');

app.use(cors());
connectToDB();
app.get('/seasons', (req, res) => { require('./routes/seasonQueries')(req, res) })
app.get('/:year/teams/wins', (req, res) => { require('./routes/teamQueries').wins(req, res) })
app.get('/:year/teams/runs', (req, res) => { require('./routes/teamQueries').runs(req, res) })

app.get('/:year/ball/wickets', (req, res) => { require('./routes/bowlerQueries').wickets(req, res) })
app.get('/:year/ball/economyRate', (req, res) => { require('./routes/bowlerQueries').economyRates(req, res) })

app.get('/:year/bat/runs', (req, res) => { require('./routes/batsmanQueries').runs(req, res) })
app.get('/:year/bat/strikeRate', (req, res) => { require('./routes/batsmanQueries').strikeRate(req, res) })


// listening for requests
app.listen(process.env.port || 4756, () => {
  console.log('Listening for requests');
})