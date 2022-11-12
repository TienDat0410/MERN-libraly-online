const express = require('express');
const { model } = require('mongoose');
const oderController = require('../controllers/oderController');
const authMiddlware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/new/auth', authMiddlware, oderController.newOrder);

router.get('/auth/:id', authMiddlware, oderController.getSingleOrder);

router.get('/me', authMiddlware, oderController.myOrders);

router.get('/auth/', authMiddlware, oderController.allOrders);

router.put('/update/:id', authMiddlware, oderController.updateOrder);

router.delete('/delete/:id', authMiddlware, oderController.deleteOrder);









module.exports = router;