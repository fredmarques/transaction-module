const business = require('../business');

const balanceController = require('./balance');
const transactionController = require('./transaction');

module.exports = {
  balance: balanceController(business),
  transaction: transactionController(business),
};
