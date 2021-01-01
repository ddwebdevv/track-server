require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
//const passDb = require('../password'); //password for database
const passDb = process.env.PASSDB;

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

//connecting string to our DB
const mongoUri = `mongodb+srv://admin:${passDb}@cluster0.3omm1.mongodb.net/<dbname>?retryWrites=true&w=majority`;
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

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
