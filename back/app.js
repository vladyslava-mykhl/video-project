
const express = require('express');
const path = require('path')
const cors = require('cors')
const app = express();

const port = 3000;
const hostname = 'localhost';

app.use(cors())
app.use(express.json({ extended: true}))
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/', require('./routes/routes'))

app.listen(port, hostname, () => console.log('app is running'));

module.exports = app