const asyncHandeler = require('express-async-handler');
const generateToken = require("../utils/generateToken");
const User = require('../model/User');
const checkemail = require('../utils/checkEmail');
const bcrypt = require('bcrypt');
// const cloudinary = require('../utils/cloudinary');
const cloudinary = require('cloudinary').v2;
// const sendToken = require('../utils/generateToken');
//


const userController = {

    //create user(register)
    addUser: asyncHandeler(async (req, res) => {
        // const newUser = new User(req.body);
        // const { username, password, email, permission } = req.body;
        const { username, password, email, permission } = req.body;


        //connect cloudinary
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 300,
            crop: "scale"
        });

        //test postman
        // const file = req.files.avatar;
        // await cloudinary.uploader.upload(file.tempFilePath,(err, result) => {
        //     console.log(result);
        // });

        // const profilePic = req.file.filename;
        try {
            const userExits = await User.findOne({ email: email });
            if (userExits) {
                throw new Error('User Exits');
            }
            const saveUser = await User.create({
                username,
                password,
                email,
                permission,
                avatar: {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            });
            // sendToken(saveUser, 200, res);
            res.status(201).json({
                success: true,
                _id: saveUser.id,
                username: saveUser.username,
                password: saveUser.password,
                email: saveUser.email,
                avatar: saveUser.avatar,
                token: generateToken(saveUser._id),
            });
        } catch (error) {
            res.status(500).send(error);

        }
    }),
    //get all user
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({
                success: true,
                users
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get a user
    getAUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json({
                success: true,
                user
            });

        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update user
    updateUser: async (req, res) => {
        try {
            // const user = await User.findById(req.params.id);
            //
            const newUserData = {
                username: req.body.username,
                email: req.body.email
            }
            // user.username = req.body.username || user.username;
            // user.email = req.body.email || user.email;
            // if (req.body.password) {
            //     const salt = await bcrypt.genSalt(10);
            //     user.password = await bcrypt.hash(req.body.password, salt);
            // }

            // Update avatar
            if (req.body.avatar !== '') {
                const user = await User.findById(req.user._id);

                const image_id = user.avatar.public_id;
                const res = await cloudinary.uploader.destroy(image_id);

                const result = await cloudinary.uploader.upload(req.body.avatar, {
                    folder: 'avatars',
                    width: 300,
                    crop: "scale"
                })

                newUserData.avatar = {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            }

            // const updateUser = await user.save();
            const updateUser = await User.findByIdAndUpdate(req.user._id, newUserData, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            res.status(200).json({
                success: true,
                updateUser
            });
            // res.send(updateUser);
            // res.status(200).json("Update successfully!");
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: 'error',
                err: "User Not found",
            });
        }
    },
    updateUserAdmin: async (req, res, next) => {
        const newUserData = {
            username: req.body.username,
            email: req.body.email,
            permission: req.body.permission
        }

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true
        })
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //login
    loginUser: asyncHandeler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });


        if (user && (await user.isPasswordMatch(password))) {
            //set status code
            res.status(200);
            res.status(201);
            res.json({
                _id: user.id,
                username: user.username,
                password: user.password,
                email: user.email,
                permission: user.permission,
                avatar: user.avatar,
                token: generateToken(user._id),

            });

        } else {
            res.status(401);
            throw new Error('Invalid login credentials');
        }
    }),
    //Profile
    profile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).populate('books');
            if (!user) throw new Error("You don't have any profile yet");
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Forgot Password   =>  //password/forgot
    forgotPassword: async (req, res, next) => {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new Error('User not found with this email', 404));
        }

        // Get reset token
        // const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset password url
        // const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

        // const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

        try {

            await checkemail({
                email: user.email,
                subject: 'Libraly-online-hutech Password Recovery',
                message,
            })

            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`
            })

        } catch (error) {
            // user.resetPasswordToken = undefined;
            // user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new Error(error.message, 500))
        }

    },
    // Update / Change password   =>  //password/update
    updatePassword: async (req, res, next) => {
        //Grab the user from the req.user
        const userId = req.user._id;
        const newPass = {
            password : req.body.newPassword,
        }
        try {
            // const user = await User.findById(userId).select('+password');

            // Check previous user password
            // const isMatched = await user.comparePassword(req.body.oldPassword)
            // if (!isMatched) {
            //     return next(new Error('Old password is incorrect'));
            // }
            

            
            const user = User.save(userId, newPass, {
                new: true,
            });

            res.status(200);
            res.json({
                status: true,
                user
            });
        } catch (error) {
            res.status(500).json(error);
        }


    },

}

module.exports = userController;