const express = require('express');
const mongoose = require('mongoose');
const passDb = require('../password'); //password for database

const app = express();

//connecting string to our DB
const mongoUri = `mongodb+srv://admin:${passDb.pass}@cluster0.3omm1.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

//checking if connected to DB or not
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
    res.send('Hi there');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
