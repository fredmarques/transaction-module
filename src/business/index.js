const db = require('../models');
const createTransaction = require('./createTransaction');
const getTransactions = require('./getTransactions');
const clientBalance = require('./clientBalance');


module.exports = ({
  createTransaction: createTransaction(db),
  getTransactions: getTransactions(db),
  clientBalance: clientBalance(db),
});
