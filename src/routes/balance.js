const express = require('express');
const messages = require('../commons/messages');
const { balance } = require('../controllers');

const router = express();

router.get('/:cpf', async (req, res) => {
  const { cpf } = req.params; // todo: sanitaze hash param
  try {
    const resp = await balance.balanceHandler(cpf);
    return res.status(200).send(resp);
  } catch (error) {
    return res.status(500).send(messages.SERVER_ERRROR);
  }
});

module.exports = router;
