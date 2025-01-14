const { Wallet, Transaction } = require('../models');

exports.createTransaction = async (req, res) => {
    const { type, amount, description } = req.body;
    const userId = req.userId;

    try {
        const wallet = await Wallet.findOne({ where: { userId } });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        let newBalance = wallet.balance;
        if (type === 'deposit') {
            newBalance += amount;
        } else if (type === 'withdraw') {
            if (amount > wallet.balance) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }
            newBalance -= amount;
        } else {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        const transaction = await Transaction.create({
            type,
            amount,
            balance: newBalance,
            description,
            WalletId: wallet.id
        });

        wallet.balance = newBalance;
        await wallet.save();

        res.status(201).json({ message: 'Transaction successful', wallet, transaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: error.message });
    }
};
