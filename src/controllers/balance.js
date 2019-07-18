const balanceHandler = business => async cpf => business.clientBalance(cpf);

module.exports = business => ({
  balanceHandler: balanceHandler(business),
});
