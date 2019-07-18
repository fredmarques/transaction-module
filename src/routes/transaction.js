/* eslint-disable camelcase */
const express = require('express');
const messages = require('../commons/messages');
const { transaction } = require('../controllers');

const router = express();

router.post('/', async (req, res) => {
  const {
    method,
    description,
    card_number,
    card_ownerName,
    card_month,
    card_year,
    card_CVV,
    cpf,
    amount,
  } = req.body;

  try {
    const resp = await transaction.newTransactionHandler(method,
      description,
      card_number,
      card_ownerName,
      card_month,
      card_year,
      card_CVV,
      cpf,
      amount);

    return res.status(200).send(resp);
  } catch (err) {
    return res.status(500).send(messages.SERVER_ERRROR);
  }
});

router.get('/', async (req, res) => {
  const {
    filterName, filterOp, filterValue, page, pageSize,
  } = req.query;

  try {
    const resp = await transaction.getTransactionsHandler(filterName, filterOp, filterValue, page || 0, pageSize || 50);
    return res.status(200).send(resp);
  } catch (error) {
    return res.status(500).send(messages.SERVER_ERRROR);
  }
});

module.exports = router;
