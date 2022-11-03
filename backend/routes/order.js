const express = require('express');
const { model } = require('mongoose');
const oderController = require('../controllers/oderController');
const authMiddlware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/new/auth', authMiddlware, oderController.newOrder);

router.get('/auth/:id', authMiddlware, oderController.getSingleOrder);

router.get('/me', authMiddlware, oderController.myOrders);

router.get('/auth/', authMiddlware, oderController.allOrders);




module.exports = router;