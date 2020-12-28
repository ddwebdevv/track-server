require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const passDb = require('../password'); //password for database

const app = express();

app.use(express.json());
app.use(authRoutes);

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

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
