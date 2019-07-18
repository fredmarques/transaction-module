module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cards', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    number: { type: Sequelize.INTEGER, allowNull: false },
    owner_name: { type: Sequelize.STRING, allowNull: false },
    month: { type: Sequelize.INTEGER, allowNull: false },
    year: { type: Sequelize.INTEGER, allowNull: false },
    CVV: { type: Sequelize.INTEGER, allowNull: false },
    card_hash: { type: Sequelize.STRING, unique: true },
    created_at: { allowNull: false, type: Sequelize.DATE },
    updated_at: { allowNull: false, type: Sequelize.DATE },
    deleted_at: { allowNull: true, type: Sequelize.DATE },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('cards'),
};
