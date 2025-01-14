const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { updateBalance } = require('../controllers/walletController');

const router = express.Router();

router.post('/transaction', authenticateToken, updateBalance);

module.exports = router;
