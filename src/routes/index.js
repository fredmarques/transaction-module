const express = require('express');
const transationRouter = require('./transaction');
const balanceRouter = require('./balance');

const router = express();
router.use('/transaction', transationRouter);
router.use('/balance', balanceRouter);

module.exports = router;
