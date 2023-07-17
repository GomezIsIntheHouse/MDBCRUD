const express = require('express')
const logger = require('morgan')
const mongoConnect = require('./src/services/mongo/config/connect')
const apiRouter = require('./src/routes/index')

require('dotenv').config();

const errorHandler = require('./src/middlewares/errorHandler')

const app = express();

mongoConnect();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'))

app.use('/api', apiRouter)

app.use(errorHandler);

module.exports = app