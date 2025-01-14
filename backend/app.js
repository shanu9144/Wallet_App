const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); // Ensure the new transaction route is used
require('dotenv').config(); // Ensure environment variables are loaded

const { User, Wallet, Transaction } = require('./models'); // Ensure Transaction model is imported
const sequelize = require('./config/database'); // Ensure this is correctly imported

const app = express();

// CORS configuration
app.use(cors({
    origin: ['https://wallet-app-five-mu.vercel.app', 'http://localhost:5173'], // Allow both production and development domains
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes); // Ensure this is the correct route for wallet-related endpoints
app.use('/api/transaction', transactionRoutes); // Ensure the new transaction route is used

// Sync database
sequelize.sync({ alter: true }) // Use `alter: true` to update the schema without dropping tables
    .then(() => console.log('Database synchronized!'))
    .catch((err) => console.error('Error syncing database:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
