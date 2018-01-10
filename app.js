const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./models/config')
const routes = require('./routes/index')

const users = require('./controllers/users')

const app = express();

mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, { server: { socketOptions: { keepAlive: 120 }}})

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', routes)

app.use((req, res, next) => {
	const err = new Error('Not found')
	err.status = 404
	next(err)
})

app.use((err, req, res, next) => {
	console.log(err)
	res.sendStatus(err.status || 500)
})

app.listen(config.port, function() {
	console.log('Example app listening on port 3000!')
})