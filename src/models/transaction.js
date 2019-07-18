module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    description: { type: DataTypes.STRING, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    issueDate: { type: DataTypes.DATE, allowNull: false },
    receiptHash: { type: DataTypes.STRING, allowNull: false },
    cardId: { type: DataTypes.INTEGER, allowNull: false },
    clientId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    modelName: 'transaction',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.card, { as: 'card_id', foreignKey: 'id' });
    Transaction.belongsTo(models.client, { as: 'client_id', foreignKey: 'id' });
  };
  return Transaction;
};
