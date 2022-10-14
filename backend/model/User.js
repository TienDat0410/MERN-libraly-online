const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

//User
const usertSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: [true, 'Please enter your password'],
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    permission: {
        type: String,
        default: 'user'
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
});

//
usertSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

usertSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(err);
    }

});

//verify password
usertSchema.methods.isPasswordMatch = async function (enteredPasword) {

    return await bcrypt.compare(enteredPasword, this.password);
}

//Populating books the user created it

usertSchema.virtual('books', {
    ref: 'Book',
    foreignField: 'createdBy',
    localField: '_id',
});

usertSchema.set('toJSON', { virtuals: true });

const User = mongoose.model("User", usertSchema);

module.exports = User;