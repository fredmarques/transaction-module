const messages = require('../commons/messages');

const clientBalance = db => async (cpf) => {
  const client = await db.client.findAll({
    where: {
      cpf,
    },
  }).then(data => data.pop());

  // select sum(p.amount) AS "balance", p.status from transactions t
  // LEFT JOIN payables p ON t.id = p.transaction_id
  // WHERE t.client_id = 2
  // GROUP BY  p.status;
  const resp = await db.payable.findAll({
    attributes: ['status', [db.sequelize.fn('sum', db.sequelize.col('amount')), 'balance']],
    include: [{
      as: 'transaction',
      model: db.transaction,
      attributes: [],
      where: { clientId: client.id },
    }],
    group: ['status'],
    raw: true,
  })
    .then((data) => {
      console.log({ data });
      const resp = (data.length === 0
        ? ({ error: messages.USER_NOT_FOUND })
        : data);
      return resp;
    })
    .then(data => (!data.error
      ? ({
        available: Number(data.filter(d => d.status === 'paid').pop().balance || 0).toFixed(2),
        waiting_funds: Number(data.filter(d => d.status === 'waiting_funds').pop().balance || 0).toFixed(2),
      })
      : data))
    .catch((err) => {
      console.error(err);
      return { fatal: messages.SERVER_ERRROR };
    });


  return resp;
};
module.exports = db => clientBalance(db);
