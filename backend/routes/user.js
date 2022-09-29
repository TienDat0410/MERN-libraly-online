const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddlware = require('../middlewares/authMiddleware');

//register user
router.post("/register", userController.addUser);
//loginuser
router.post("/login", userController.loginUser);
//get all user
router.get("/auth", authMiddlware, userController.getAllUsers);
//get profileuser
router.get("/profile", authMiddlware, userController.profile);
//GET AN user
router.get("/auth/:id", authMiddlware, userController.getAUser)
//update user
router.put("/auth/:id", authMiddlware, userController.updateUser);
//delete
router.delete("/auth/:id", authMiddlware, userController.deleteUser);


module.exports = router;
