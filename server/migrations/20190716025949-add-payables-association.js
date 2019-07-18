module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'payables',
    'transaction_id',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'transactions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'payables',
    'transaction_id',
  ),
};
