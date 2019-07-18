const db = require('../models');
const { Card, Transaction } = require('../domain');
const createTransaction = require('./createTransaction');
const getTransaction = require('./getTransactions');

jest.setTimeout(3 * 60 * 1000);

describe('get transactions', () => {
  beforeAll(async (done) => {
    await db.sequelize.query('truncate table transactions cascade;');
    await db.sequelize.query('truncate table payables cascade;');
    await db.sequelize.query('truncate table cards cascade;');

    const cpf = '12345678911';
    const card = new Card('123456781234', 'Joseph', 4, 2021, 123);
    const transaction1 = new Transaction(42.42, 'random desc', 'debit_card');
    const transaction2 = new Transaction(42.42, 'random desc', 'credit_card');

    await createTransaction(db)(transaction1, card, cpf);
    await createTransaction(db)(transaction1, card, cpf);
    await createTransaction(db)(transaction2, card, cpf);
    await createTransaction(db)(transaction2, card, cpf);
    done();
  });

  test('list all transactions', async () => {
    const transactions = await getTransaction(db)();
    expect(transactions).toBeDefined();
    expect(transactions.length).toBe(4);
  });

  test('filtering transactions', async () => {
    const transactions = await getTransaction(db)('method', 'eq', 'debit_card');

    expect(transactions).toBeDefined();
    expect(transactions.length).toBe(2);
  });

  test('transactions pagination', async () => {
    const transactions = await getTransaction(db)(null, null, null, 0, 2);

    expect(transactions).toBeDefined();
    expect(transactions.length).toBe(2);
  });

  afterAll(async (done) => {
    await db.sequelize.query('truncate table transactions cascade;');
    await db.sequelize.query('truncate table payables cascade;');
    await db.sequelize.query('truncate table cards cascade;');
    done();
  });
});
