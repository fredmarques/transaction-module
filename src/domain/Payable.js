const Joi = require('@hapi/joi');
const { PAID, WAITING_FUNDS } = require('../commons/constants');

const schema = Joi.object().keys({
  status: Joi.string().valid(PAID, WAITING_FUNDS).required(),
  paymentDate: Joi.date().min(Date.now() - (24 * 60 * 60)).required(),
  fee: Joi.number().integer().required().min(0)
    .max(100),
  amount: Joi.number().precision(2).min(0),
});

class Payable {
  constructor(status, paymentDate, fee, amount) {
    this.status = status;
    this.paymentDate = new Date(paymentDate);
    this.fee = Number(fee);
    this.amount = Number(amount);

    this.validateSchema();
  }

  validateSchema() {
    const { error } = Joi.validate(this, schema);
    if (error) {
      throw new Error(error);
    }
  }
}

module.exports = Payable;
