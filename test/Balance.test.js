const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');


describe('Balance', () => {
  afterAll(async () => {
    await db.sequelize.query('truncate table transactions cascade;');
    await db.sequelize.query('truncate table payables cascade;');
    await db.sequelize.query('truncate table cards cascade;');
  });

  it('it should return clients balance', async () => {
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
    // await request(app).post('/api/v1/transaction').send(data);
    const { body } = await request(app).get(`/api/v1/balance/${data.cpf}`);

    console.log({ body });
    expect(body).toBeDefined();
    expect(body.available).toBeDefined();
    expect(body.waiting_funds).toBeDefined();
  });
});
