const express = require('express');
const { getWallet, updateBalance } = require('../controllers/walletController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, getWallet);
router.post('/transaction', authenticateToken, updateBalance);

module.exports = router;
