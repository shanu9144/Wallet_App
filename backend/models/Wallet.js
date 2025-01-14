const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: true,
    });

    Wallet.associate = (models) => {
        Wallet.belongsTo(models.User, { foreignKey: 'userId' });
        Wallet.hasMany(models.Transaction, { foreignKey: 'WalletId' });
    };

    return Wallet;
};
