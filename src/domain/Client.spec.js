const Client = require('./Client');

describe('Client model', () => {
  test('client props', () => {
    const name = 'Joseph';
    const surname = 'Nobody';
    const cpf = '12345678911';
    const client = new Client(name, surname, cpf);

    expect(client).toBeDefined();
    expect(client.name).toEqual(name);
    expect(client.surname).toEqual(surname);
    expect(client.cpf).toEqual(cpf);
  });
});
