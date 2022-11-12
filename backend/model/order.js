const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    loanInfo: {
        address: {
            type: String,
            
        },
        city: {
            type: String,
            
        },
        phoneNo: {
            type: String,
            
        },
        country: {
            type: String,
            
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    callCardItems: [
        {
            book_name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
               
            },
            book_img: {
                type: String,
                
            },
            unitPrice: {
                type: Number,
                
            },
            book: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Book'
            }
        }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt: {
        type: Date
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    loanPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', orderSchema)