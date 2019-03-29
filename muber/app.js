const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true });
}
//ORDER MATTERS FOR EXPRESS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;
