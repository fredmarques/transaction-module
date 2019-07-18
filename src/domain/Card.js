const Joi = require('@hapi/joi');
const crypto = require('crypto');

const schema = Joi.object().keys({
  number: Joi.number().integer().positive().required(),
  ownerName: Joi.string().required(),
  month: Joi.number().integer().required().min(1)
    .max(12),
  year: Joi.number().integer().min(new Date().getFullYear()),
  CVV: Joi.number().integer().positive(),
});

class Card {
  constructor(number, ownerName, month, year, CVV) {
    this.number = number;
    this.ownerName = ownerName;
    this.month = month;
    this.year = year;
    this.CVV = CVV;

    this.validateSchema();
    this.normalize();
    this.cardHash = this.generateCardHash(); // !!must be called after normalize!!
  }

  validateSchema() {
    const { error } = Joi.validate(this, schema);
    if (error) {
      throw new Error(error);
    }
  }

  normalize() {
    this.number = `${this.number}`.slice(-4);
  }

  generateCardHash() {
    return crypto
      .createHash('md5')
      .update(this.number + this.ownerName + this.month + this.year + this.CVV)
      .digest('hex');
  }
}

module.exports = Card;
