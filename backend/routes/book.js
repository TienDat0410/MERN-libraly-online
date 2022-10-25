const express = require('express');
const { model } = require('mongoose');
const bookController = require('../controllers/bookController');
const authMiddlware = require('../middlewares/authMiddleware');
const router = express.Router();

//ADD a book
router.post("/auth", authMiddlware, bookController.addABook);
//get all book
router.get("/", bookController.getAllBooks);
//get a book(add to call card)
router.get("/auth/:id", bookController.getABook);
//update a book
router.put("/auth/:id", authMiddlware, bookController.updateBook);
//delete book
router.delete("/auth/:id", authMiddlware, bookController.deleteBook);

module.exports = router;