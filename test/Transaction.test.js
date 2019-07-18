const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');


describe('Transaction', () => {
  afterAll(async () => {
    await db.sequelize.query('truncate table transactions cascade;');
    await db.sequelize.query('truncate table payables cascade;');
    await db.sequelize.query('truncate table cards cascade;');
  });

  it('should create and return a new transation', async () => {
    const data = {
      method: 'credit_card',
      description: 'simple description',
      card_number: 12345678,
      card_ownerName: 'Joseph Nobody',
      card_month: 2,
      card_year: 2028,
      card_CVV: 344,
      cpf: 12345678911,
      amount: 42,
    };
    const resp = await request(app).post('/api/v1/transaction').send(data).catch(err => err);

    expect(resp.body.id).toBeDefined();
  });

  it('should list all transactions', async () => {
    const data = { };
    const { body } = await request(app).get('/api/v1/transaction').send(data).catch(err => err);

    // console.log({ body });
    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThan(0);
  });
});
