const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, config.options);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' +config.database);
}).setMaxListeners(0);

mongoose.connection.on('error', (err) => {
    console.log('Database error ' +err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

// CORS middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/user', users);

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
})