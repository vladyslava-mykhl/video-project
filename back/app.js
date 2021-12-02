const express = require('express');
const path = require('path');
const mongoose  = require("mongoose");
const cors = require('cors');
const app = express();
const port = 3000;
const hostname = 'localhost';
const error = require('./middleware/error');
require('./models/User');
require('./models/Video');
require('./models/Category');

app.use(cors());
app.use(express.json({ extended: true}));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/', require('./routes/routes'));
app.use(error);

mongoose.connect("mongodb+srv://vladyslava:Qwerty123@cluster0.8xllq.mongodb.net/VideoProject", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err =>
    console.error(`Database connection error: ${err.message}`)
);

app.listen(port, hostname, () => console.log('app is running'));

module.exports = app;