const express = require('express');
const path = require('path')
const mongoose  = require("mongoose");
const cors = require('cors')
const app = express();
const port = 3000;
const hostname = 'localhost';
require('./models/User');

app.use(cors())
app.use(express.json({ extended: true}))
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/', require('./routes/routes'))

mongoose.connect("mongodb+srv://vladyslava:Qwerty123@cluster0.8xllq.mongodb.net/VideoProject", { useNewUrlParser: true });
mongoose.connection.on('error', err =>
    console.error(`Database connection error: ${err.message}`)
)

app.listen(port, hostname, () => console.log('app is running'));

module.exports = app