const Order = require('../model/order');
const { Book } = require("../model/model");

const oderController = {
    newOrder: async (req, res) => {
        try {
            //Grab the user from the req.user
            const userId = req.user._id;
            const {
                callCardItems,
                loanInfo,
                itemsPrice,
                loanPrice,
                totalPrice,
                paymentInfo,
            } = req.body;
            console.log(req.body);

            //
            const order = await Order.create({
                callCardItems,
                loanInfo,
                itemsPrice,
                loanPrice,
                totalPrice,
                paymentInfo,
                paidAt: Date.now(),
                user: userId,
            });

            res.status(200).json({
                success: true,
                order,
            });

        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    // Get single order /order/:id
    getSingleOrder: async (req, res,) => {
        try {
            const order = await Order.findById(req.params.id).populate("user");

            if (!order) {
                throw new Error('Not order!');
            }
            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    // Get logged in user orders   =>   //orders/me
    myOrders: async (req, res, next) => {
        try {
            //Grab the user from the req.user
            const userId = req.user._id;
            const orders = await Order.find(userId);

            // orders.forEach((order) => {
            //     totalAmount += order.totalPrice;
            // });

            res.status(200).json({
                success: true,
                orders,
            });
        } catch (error) {
            res.status(500).json(err);
            console.log(err);
        }

    },
    // Get all orders - ADMIN  =>   /admin/orders/
    allOrders: async (req, res, next) => {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });
    },
    // Update / Process order - ADMIN  =>   /admin/order/:id
    updateOrder: async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("You have already delivered this order", 400));
        }

        order.callCardItems.forEach(async (item) => {
            await updateStock(item.book, item.quantity);
        });

        (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

        await order.save();

        res.status(200).json({
            success: true,
        });
    },
    // Delete order   =>   /order/delete/:id
    deleteOrder: async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("No Order found with this ID", 404));
        }

        await order.remove();

        res.status(200).json({
            success: true,
        });
    },

};

async function updateStock(id, quantity) {
    const book = await Book.findById(id);

    book.stock = book.stock - quantity;

    await book.save({ validateBeforeSave: false });
}

module.exports = oderController;