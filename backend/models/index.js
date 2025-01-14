const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, DataTypes);
const Wallet = require('./Wallet')(sequelize, DataTypes);
const Transaction = require('./Transaction')(sequelize, DataTypes);

User.hasOne(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId' });
Wallet.hasMany(Transaction, { foreignKey: 'WalletId' });
Transaction.belongsTo(Wallet, { foreignKey: 'WalletId' });

module.exports = {
    sequelize,
    User,
    Wallet,
    Transaction,
};