const db = require('../models');
const { Card, Transaction } = require('../domain');
const createTransaction = require('./createTransaction');

jest.setTimeout(3 * 60 * 1000);
describe('create transction business', () => {
  beforeAll(async (done) => {
    await db.sequelize.query('truncate table transactions cascade;');
    await db.sequelize.query('truncate table payables cascade;');
    await db.sequelize.query('truncate table cards cascade;');
    done();
  });
  test('create a simple transaction', async () => {
    const cpf = '12345678911';
    const card = new Card('123456781234', 'Joseph', 4, 2021, 123);
    const transaction = new Transaction(42.42, 'random desc', 'debit_card');

    const resp = await createTransaction(db)(transaction, card, cpf);
    expect(resp).toBeDefined();
    expect(resp.id).toBeDefined();
  });
  afterAll(async (done) => {
    await db.sequelize.query('truncate table transactions cascade;');
    await db.sequelize.query('truncate table payables cascade;');
    await db.sequelize.query('truncate table cards cascade;');
    done();
  });
});
