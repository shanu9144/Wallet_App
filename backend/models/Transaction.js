module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.ENUM('deposit', 'withdraw'),
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        WalletId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Wallets',
                key: 'id',
            },
            allowNull: false,
        }
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Wallet, { foreignKey: 'WalletId' });
    };

    return Transaction;
};
