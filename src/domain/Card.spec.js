const Card = require('./Card');

describe('Card Model', () => {
  test('model props', () => {
    const number = '1234123412340000';
    const ownerName = 'foo bar';
    const month = 4;
    const year = 2042;
    const CVV = 123;

    const card = new Card(number, ownerName, month, year, CVV);
    expect(card.number).toEqual('0000'); // careful with '0000'. It becomes 0 when casted to Number
    expect(card.ownerName).toEqual(ownerName);
    expect(card.month).toEqual(month);
    expect(card.year).toEqual(year);
    expect(card.CVV).toEqual(CVV);
    expect(card.cardHash).toBeDefined();
  });
});
