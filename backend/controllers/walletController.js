const { Wallet, Transaction } = require('../models');
const sequelize = require('../config/database');

const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ where: { userId: req.user.userId } }); // Corrected userId
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        const transactions = await Transaction.findAll({ where: { WalletId: wallet.id } });
        res.json({ balance: wallet.balance, transactions, user: req.user });
    } catch (error) {
        console.error('Error fetching wallet:', error);
        console.error('Error details:', error.message, error.stack);
        res.status(500).json({ message: 'Error fetching wallet', error: error.message });
    }
};

const updateBalance = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { type, amount, description } = req.body;
        const wallet = await Wallet.findOne({ where: { userId: req.user.userId } });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (type === 'withdraw' && wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const newBalance = type === 'deposit' ? wallet.balance + parseFloat(amount) : wallet.balance - parseFloat(amount);

        await wallet.update({ balance: newBalance }, { transaction: t });

        await Transaction.create({
            type,
            amount: parseFloat(amount),
            balance: newBalance,
            description,
            WalletId: wallet.id
        }, { transaction: t });

        await t.commit();
        res.json({
            wallet: {
                ...wallet.toJSON(),
                balance: newBalance
            }
        });
    } catch (error) {
        await t.rollback();
        console.error('Error updating balance:', error);
        console.error('Error details:', error.message, error.stack);
        res.status(500).json({ message: 'Error updating balance', error: error.message });
    }
};

module.exports = { getWallet, updateBalance };
