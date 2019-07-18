module.exports = (sequelize, DataTypes) => {
  const Payable = sequelize.define('payable', {
    status: { type: DataTypes.STRING, allowNull: false },
    paymentDate: DataTypes.DATE,
    fee: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    transactionId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    modelName: 'payable',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
  Payable.associate = (models) => {
    Payable.belongsTo(models.transaction, { as: 'transaction', foreignKey: 'id' });
  };
  return Payable;
};
