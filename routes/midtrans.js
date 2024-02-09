const express = require('express');
const router = express.Router();
const midtransController = require('../controller/midtrans');

// Route untuk menghasilkan token pembayaran
router.get('/generate-token', midtransController.generateToken);

// Route untuk memproses pembayaran
router.post('/process-payment', midtransController.processPayment);

module.exports = router;
