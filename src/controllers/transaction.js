const { Card, Transaction } = require('../domain');

const newTransactionHandler = ({ createTransaction }) => async (
  method, description, cardNumber, cardOwnerName, cardMonth, cardYear, cardCVV, cpf, amount,
) => {
  try {
    const card = new Card(cardNumber, cardOwnerName, cardMonth, cardYear, cardCVV);
    const transaction = new Transaction(amount, description, method);
    return createTransaction(transaction, card, `${cpf}`);
  } catch (error) {
    console.warn(error);
    return { error: error.message };
  }
};

const getTransactionsHandler = business => async (filterName, filterOp, filterValue, page, pageSize) =>
  business.getTransactions(filterName, filterOp, filterValue, page, pageSize);

module.exports = business => ({
  newTransactionHandler: newTransactionHandler(business),
  getTransactionsHandler: getTransactionsHandler(business),
});
