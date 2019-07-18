const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const { api } = require('./configs');
const router = require('./routes');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(`/api/${api.version}`, router);

module.exports = app;
