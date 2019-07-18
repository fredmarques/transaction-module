const db = require('../models');
const { Card, Transaction } = require('../domain');
const createTransaction = require('./createTransaction');
const clientBalance = require('./clientBalance');

jest.setTimeout(3 * 60 * 1000);
describe('client balance', () => {
  beforeAll(async (done) => {
    await db.sequelize.query('truncate table transactions cascade;');
    await db.sequelize.query('truncate table payables cascade;');
    await db.sequelize.query('truncate table cards cascade;');

    const cpf = '12345678911';
    const card = new Card('123456781234', 'Joseph', 4, 2021, 123);
    const transaction1 = new Transaction(42.42, 'random desc', 'debit_card');
    const transaction2 = new Transaction(12.12, 'random desc', 'credit_card');

    await createTransaction(db)(transaction1, card, cpf);
    await createTransaction(db)(transaction1, card, cpf);
    await createTransaction(db)(transaction2, card, cpf);
    await createTransaction(db)(transaction2, card, cpf);
    done();
  });

  test('get balance for client', async (done) => {
    const cpf = '12345678911';
    const balance = await clientBalance(db)(cpf);

    expect(balance).toBeDefined();
    expect(balance.available).toBe('82.29');
    expect(balance.waiting_funds).toBe('23.03');
    done();
  });

  afterAll(async (done) => {
    // await db.sequelize.query('truncate table transactions cascade;');
    // await db.sequelize.query('truncate table payables cascade;');
    // await db.sequelize.query('truncate table cards cascade;');
    done();
  });
});
