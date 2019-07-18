module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'cards',
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
    'cards',
    'client_id',
  ),
};
