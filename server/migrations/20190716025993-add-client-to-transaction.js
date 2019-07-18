module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'transactions',
    'client_id',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'clients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'transactions',
    'client_id',
  ),
};
