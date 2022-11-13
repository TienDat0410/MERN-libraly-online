const express = require('express');
const authorController = require('../controllers/authorController');
const authMiddlware = require('../middlewares/authMiddleware');
const router = express.Router();

//ADD Author
router.post("/auth", authMiddlware, authorController.addAuthor);
//GET ALL Author
router.get("/", authMiddlware, authorController.getAllAuthors);
//GET AN AUTHOR
router.get("/auth/:id", authMiddlware, authorController.getAnAuthor)
//update author
router.put("/auth/:id",  authMiddlware,authorController.updateAuthor);
//delete
router.delete("/auth/:id", authMiddlware, authorController.deleteAuthor);



module.exports = router;