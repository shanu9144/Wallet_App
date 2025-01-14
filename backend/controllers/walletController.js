const { Wallet, Transaction } = require('../models');
const sequelize = require('../config/database');

exports.getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({
            where: { userId: req.userId },
            include: [{
                model: Transaction,
                limit: 10,
                order: [['createdAt', 'DESC']]
            }]
        });
        res.json(wallet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBalance = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { type, amount, description } = req.body;
        const wallet = await Wallet.findOne({ where: { userId: req.userId } });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (type === 'withdraw' && wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const newBalance = type === 'deposit' ?
            wallet.balance + parseFloat(amount) :
            wallet.balance - parseFloat(amount);

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
    } catch (err) {
        await t.rollback();
        res.status(500).json({ error: err.message });
    }
};
