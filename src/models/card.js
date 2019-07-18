module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    number: { type: DataTypes.STRING(4), allowNull: false },
    ownerName: { type: DataTypes.STRING, allowNull: false },
    month: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    CVV: { type: DataTypes.INTEGER, allowNull: false, field: 'CVV' },
    cardHash: { type: DataTypes.STRING, allowNull: false, unique: true },
    clientId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  }, {
    modelName: 'card',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
  Card.associate = models =>
    Card.belongsTo(models.client, { as: 'client_id', foreignKey: 'id' });
  return Card;
};
