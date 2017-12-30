const express = require('express')

const app = express();
const cors = require('cors');
const connectToDB = require('./connectToDb');

app.use(cors());

connectToDB();

app.get('/seasons', (req, res) => { require('./routes/seasonQueries')(req, res) })

app.get('/:year/teams', (req, res) => { require('./routes/teamQueries').wins(req, res) })

app.get('/:year/batting', (req, res) => { require('./routes/batsmanQueries').runs(req, res) })

app.get('/:year/bowling', (req, res) => { require('./routes/bowlerQueries').wickets(req, res) })

app.listen(process.env.port || 4756, () => { console.log('Listening for requests') })