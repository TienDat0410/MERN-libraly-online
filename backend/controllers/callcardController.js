const { model } = require("mongoose");
const callCard = require("../model/callcarddetail");

const callCardController = {
    addCallCard: async (req, res) => {
        try {
            //Grab the user from the req.user
            const userId = req.user._id;
            const {
                borrowedbook,
                expiry,
            } = req.body;
            console.log(req.body);

            //
            const callCardItem = await callCard.create({
                borrowedbook,
                expiry,
                user: userId,
            });

            res.status(200).json({
                success: true,
                callCardItem,
            });

        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
};

module.exports = callCardController;