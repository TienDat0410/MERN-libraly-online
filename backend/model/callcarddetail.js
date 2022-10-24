const mongoose = require("mongoose");

const callcarddetailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
    },
    borrowedbook: [
        {
            book_name: {
                type: String,

            },
            quantity: {
                type: Number,
            },
            image: {
                type: String,
            },
            price: {
                type: Number,
            },
            books: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            }
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiry: {
        type: String,
        default: "3 years",
    }

});

const callCard = mongoose.model("callcard", callcarddetailSchema);

module.exports = callCard;