const express = require('express');
const { model } = require('mongoose');
const bookController = require('../controllers/bookController');
const router = express.Router();

//ADD a book
router.post("/", bookController.addABook);
//get all book
router.get("/", bookController.getAllBooks);
//get a book
router.get("/:id", bookController.getABook);
//update a book
router.put("/:id", bookController.updateBook);
//delete book
router.delete("/:id", bookController.deleteBook);

module.exports = router;