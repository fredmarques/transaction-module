module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER,
    },
    description: { type: Sequelize.STRING, allowNull: false },
    method: { type: Sequelize.STRING, allowNull: false },
    issue_date: { type: Sequelize.STRING, allowNull: false },
    receipt_hash: { type: Sequelize.STRING, allowNull: false },
    created_at: { allowNull: false, type: Sequelize.DATE },
    updated_at: { allowNull: false, type: Sequelize.DATE },
    deleted_at: { allowNull: true, type: Sequelize.DATE },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('transactions'),
};
