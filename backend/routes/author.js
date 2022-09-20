const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

//ADD Author
router.post("/", authorController.addAuthor);
//GET ALL Author
router.get("/", authorController.getAllAuthors);
//GET AN AUTHOR
router.get("/:id", authorController.getAnAuthor)
//update author
router.put("/:id", authorController.updateAuthor);

module.exports = router;