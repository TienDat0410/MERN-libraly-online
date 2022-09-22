const { model } = require("mongoose");
const {Author, Book, User} = require("../model/model");
const asyncHandeler = require('express-async-handler');
const generateToken = require("../utils/generateToken");

const userController = {
    
    //create user(register)
    addUser: asyncHandeler(async (req, res) => {
            // const newUser = new User(req.body);
            const {username, password, email, permission} = req.body;
            const userExits = await User.findOne({email: email});
            if(userExits) {
                throw new Error('User Exits');
            }
            const saveUser = await User.create({username, password, email, permission});
            // res.status(200).json(saveUser);
            res.json({
                _id: saveUser.id,
                username: saveUser.username,
                password: saveUser.password,
                email: saveUser.email,
                token: generateToken(saveUser._id),

            });
    }),
    //get all user
    getAllUsers: async(req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get a user
    getAUser: async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update user
    updateUser: async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async(req, res) => {
        try {           
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //login
    loginUser: asyncHandeler(async(req, res) => {
        const {email, password} = req.body;

        const user = await User.findOne({email});


        if(user && (await user.isPasswordMatch(password))) {
            //set status code
            res.status(200);
            res.status(201);
            res.json({
                _id: user.id,
                username: user.username,
                password: user.password,
                email: user.email,
                token: generateToken(user._id),

            });
            
        }else {
            res.status(401);
            throw new Error('Invalid login credentials');
        }
    }),
}

module.exports = userController;