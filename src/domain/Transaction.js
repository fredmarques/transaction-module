const crypto = require('crypto');
const Joi = require('@hapi/joi');
const { CREDIT_CARD, DEBIT_CARD } = require('../commons/constants');

const schema = Joi.object().keys({
  amount: Joi.number().precision(2).required().min(0.01),
  method: Joi.string().valid(CREDIT_CARD, DEBIT_CARD).required(),
  description: Joi.string().required(),
});

class Transaction {
  constructor(amount, description, method) {
    this.amount = amount;
    this.description = description;
    this.method = method;

    this.validateSchema();

    this.issueDate = new Date();
    this.receiptHash = this.generateReceipt();
  }

  static From(amount, description, method, issueDate, receiptHash) {
    const instance = new Transaction(amount, description, method);
    instance.issueDate = issueDate instanceof Date ? issueDate : new Date(issueDate);
    instance.receiptHash = receiptHash;
    return instance;
  }

  validateSchema() {
    const { error } = Joi.validate(this, schema);
    if (error) {
      throw new Error(error);
    }
  }

  generateReceipt() {
    return crypto.createHash('md5').update(this.amounr + this.description + this.method + this.issueDate).digest('hex');
  }
}

module.exports = Transaction;
