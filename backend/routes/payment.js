const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddlware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/process',authMiddlware, paymentController.processPayment);
router.get('/stripeapi', paymentController.sendStripApi);

module.exports = router;

