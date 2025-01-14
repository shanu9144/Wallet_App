const express = require('express');
const cors = require('cors');
const { getWallet, updateBalance } = require('../controllers/walletController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add CORS middleware
router.use(cors({
    origin: 'https://wallet-app-five-mu.vercel.app', // Frontend domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

router.get('/', authenticateToken, getWallet);
router.post('/transaction', authenticateToken, updateBalance);

module.exports = router;
