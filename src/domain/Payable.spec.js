const Payable = require('./Payable');

describe('Payable model', () => {
  test('model props', () => {
    const status = 'paid';
    const paymentDate = '2042-4-2';
    const fee = 5;
    const amount = 42.42;

    const payable = new Payable(status, paymentDate, fee, amount);

    expect(payable).toBeDefined();
    expect(payable.status).toEqual(status);
    expect(payable.fee).toEqual(fee);
    expect(payable.amount).toEqual(42.42);
    expect(payable.paymentDate).toStrictEqual(new Date(paymentDate));
  });

  test('model validation: fee', () => {
    const status = 'paid';
    const paymentDate = '2042-4-2';
    const fee = -5;
    const amount = 42.42;

    expect(() => new Payable(status, paymentDate, fee, amount)).toThrow();
  });

  test('model validation: status', () => {
    const status = 'random status';
    const paymentDate = '2042-4-2';
    const fee = 5;
    const amount = 42.42;

    expect(() => new Payable(status, paymentDate, fee, amount)).toThrow();
  });
});
