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
        type: String,
    },
    //_Objectid
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    unitPrice: {
        type: Number
    },
    stock: {
        type: Number,
        maxLength: [100, "book name cannot exceed 5 characters"],
        default: 0,
    },
    book_img: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
            // required: true,
        },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    { timestamps: true }
);





let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);




module.exports = { Book, Author };