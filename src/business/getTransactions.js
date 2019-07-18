const Sequelize = require('sequelize');
const messages = require('../commons/messages');

const getLimitAndOffset = ({ page, pageSize }) =>
  ((page >= 0 && pageSize > 0)
    ? ({ limit: (page * pageSize) + pageSize, offset: (page * pageSize) })
    : ({}));
// ==> {limit: 10, offset: 15}

const getWhere = ({ filterName, filterValue, filterOp }) =>
  ((!!filterName && !!filterValue && !!filterOp)
    ? ({ where: { [filterName]: { [Sequelize.Op[filterOp]]: filterValue } } })
    : {});
// ==> {where: {fieldName: {op: value}}}
// ==> {where: {id: {gt: 4}}}

const getTransactions = db => async (filterName, filterOp, filterValue, page, pageSize) =>
  db.transaction.findAll({
    ...getWhere({ filterName, filterValue, filterOp }),
    ...getLimitAndOffset({ page, pageSize: pageSize || 10 }), // defaults pageSize to 10
  })
    .catch((err) => {
      console.error(err);
      return { fatal: messages.SERVER_ERRROR };
    });


module.exports = db => getTransactions(db);
