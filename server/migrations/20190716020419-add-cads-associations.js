module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'transactions',
    'card_id',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'cards',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'transactions',
    'card_id',
  ),
};
