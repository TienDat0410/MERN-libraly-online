const express = require('express');
const { model } = require('mongoose');
const callCardController = require('../controllers/callcardController');
const authMiddlware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/auth', authMiddlware, callCardController.addCallCard);

module.exports = router;