const Transaction = require('./Transaction');

describe('Transaction model', () => {
  test('model props', () => {
    const desc = 'random description text';
    const method = 'credit_card';
    const amount = 42;

    const trans = new Transaction(amount, desc, method);
    expect(trans).toBeDefined();
    expect(trans.description).toEqual(desc);
    expect(trans.method).toEqual(method);
    expect(trans.issueDate).toBeInstanceOf(Date);
    expect(trans.receiptHash).toBeDefined();
  });

  test('from single props', () => {
    const desc = 'random description text';
    const method = 'credit_card';
    const date = new Date().toISOString();
    const hash = 'hash';
    const amount = 42;

    const trans = Transaction.From(amount, desc, method, date, hash);
    expect(trans).toBeDefined();
    expect(trans.description).toEqual(desc);
    expect(trans.method).toEqual(method);
    expect(trans.issueDate).toEqual(new Date(date));
    expect(trans.receiptHash).toEqual(hash);
  });

  test('valid methods', () => {
    const desc = 'random description text';
    const method1 = 'credit_card';
    const method2 = 'debit_card';
    const date = new Date();
    const hash = 'hash';
    const amount = 42;

    const trans1 = new Transaction(amount, desc, method1, date, hash);
    expect(trans1).toBeDefined();

    const trans2 = new Transaction(amount, desc, method2, date, hash);
    expect(trans2).toBeDefined();

    expect(() => new Transaction(amount, desc, 'random method')).toThrow();
  });
});
