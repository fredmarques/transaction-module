module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('client', {
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    modelName: 'client', timestamps: true, paranoid: true, underscored: true,
  });
  return Client;
};
