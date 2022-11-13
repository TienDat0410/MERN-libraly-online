const express = require('express');
const upload = require('../controllers/upload');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddlware = require('../middlewares/authMiddleware');
const checkemail = require('../utils/checkEmail');

//register user
// router.post("/register",(upload.single('profilePic')), userController.addUser);
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
router.put("/auth/update", authMiddlware, userController.updateUser);
//delete
router.delete("/auth/:id", authMiddlware, userController.deleteUser);
//update user admin
router.put("/update/admin/:id", authMiddlware, userController.updateUserAdmin);
//update pass
router.put("/password/update", authMiddlware, userController.updatePassword);
//
router.post("/password/forgot", authMiddlware, userController.forgotPassword);

router.post("/email", checkemail);

module.exports = router;
