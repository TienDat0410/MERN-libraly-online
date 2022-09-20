const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//register user
router.post("/register", userController.addUser);
//loginuser
router.post("/login", userController.loginUser);
//get all user
router.get("/", userController.getAllUsers);
//GET AN user
router.get("/:id", userController.getAUser)
//update user
router.put("/:id", userController.updateUser);
//delete
router.delete("/:id", userController.deleteUser);


module.exports = router;
