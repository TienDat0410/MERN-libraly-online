const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
//author
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
});
//Popuplating this field of books to author 
// authorSchema.virtual('books', {
//     ref: 'Book',
//     foreignField: 'author',
//     localField: '_id',
// });
//book
const bookSchema = new mongoose.Schema({
    book_name: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date
    },
    genres: {
        type: [String]
    },
    //_Objectid
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    unitPrice: {
        type: Number
    },
    quantity: {
        type: Number
    },
    book_img: {
        type: String
    },
},
    { timestamps: true }
);
//User
const usertSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    permission: {
        type: String
    }
});


usertSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//verify password
usertSchema.methods.isPasswordMatch = async function (enteredPasword) {

    return await bcrypt.compare(enteredPasword, this.password);
}

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);
let User = mongoose.model("User", usertSchema);

module.exports = { Book, Author, User };