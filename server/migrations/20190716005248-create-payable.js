module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('payables', {
    id: {
      allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER,
    },
    status: { type: Sequelize.STRING, allowNull: false },
    payment_date: { type: Sequelize.DATE, allowNull: false },
    fee: { type: Sequelize.INTEGER, allowNull: false },
    amount: { type: Sequelize.FLOAT, allowNull: false },
    created_at: { allowNull: false, type: Sequelize.DATE },
    updated_at: { allowNull: false, type: Sequelize.DATE },
    deleted_at: { allowNull: true, type: Sequelize.DATE },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('payables'),
};
