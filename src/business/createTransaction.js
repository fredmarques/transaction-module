const messages = require('../commons/messages');
const { Payable } = require('../domain');
const { CREDIT_CARD, PAID, WAITING_FUNDS } = require('../commons/constants');
const { DPlusN } = require('../commons/helpers.js');

const processDebitCardOperation = amount =>
  new Payable(PAID, Date.now(), 3, amount * 0.97);

const processCreditCardOperation = amount =>
  new Payable(WAITING_FUNDS, DPlusN(Date.now(), 30), 5, amount * 0.95);

const createTransaction = db => async (transaction, card, cpf) => {
  const clientEntity = await db.client.findAll({
    where: {
      cpf,
    },
  }).then(data => data.pop());
  if (!clientEntity) {
    return { error: 'Client doesn\'t exists' };
  }
  const cardInserted = await db.card.findAll({
    attributes: ['id'],
    where: {
      card_hash: card.cardHash,
    },
    limit: 1,
  }).then(data => data.pop());


  const payable = transaction.method === CREDIT_CARD
    ? processCreditCardOperation(transaction.amount)
    : processDebitCardOperation(transaction.amount);

  const t = await db.sequelize.transaction();
  try {
    let c;
    if (cardInserted) {
      c = cardInserted;
    } else {
      c = await db.card.create({ ...card, clientId: clientEntity.id }, { transaction: t });
    }

    const trans = await db.transaction.create({
      ...transaction, cardId: c.id, clientId: clientEntity.id,
    }, { transaction: t });

    const resp = await db.payable
      .create({ ...payable, clientId: clientEntity.id, transactionId: trans.id }, { transaction: t });

    await t.commit();
    return resp;
  } catch (err) {
    console.error(err);
    t.rollback();
    return { fatal: messages.SERVER_ERRROR };
  }
};

module.exports = db => createTransaction(db);
