module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('clients', {
    id: {
      allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false },
    cpf: { type: Sequelize.STRING, allowNull: false, unique: true },
    created_at: { allowNull: false, type: Sequelize.DATE },
    updated_at: { allowNull: false, type: Sequelize.DATE },
    deleted_at: { allowNull: true, type: Sequelize.DATE },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('clients'),
};
