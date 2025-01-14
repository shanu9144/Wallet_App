const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
require('dotenv').config(); // Ensure environment variables are loaded

const { sequelize, User, Wallet } = require('./models');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://wallet-app-five-mu.vercel.app/', // Replace with your frontend URL
    credentials: true
}));

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', walletRoutes);
app.use('/api/wallet', walletRoutes);

// Sync database
sequelize.sync({ force: true }) // Set `force: true` to reset DB on every run
    .then(() => console.log('Database synchronized!'))
    .catch((err) => console.error('Error syncing database:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
