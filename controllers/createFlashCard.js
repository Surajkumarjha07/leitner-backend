const flashCards = require("../models/flashCardModel");
const users = require("../models/userModel");

async function handleCreateCard(req, res) {
    try {
        let { id, question, answer, box, daysLeftToReview } = req.body;
        const { userId } = req.user;

        if (!question || !answer || !box || !daysLeftToReview) {
            res.status(400).json({
                message: "enter all details"
            });
            return;
        }

        const newCard = new flashCards({ id, userId, question, answer, box, daysLeftToReview });
        await users.findByIdAndUpdate(
            userId,
            { $push: { flashCards: newCard._id } },
            { new: true }
        )
        await newCard.save();
        res.status(200).json({
            message: "card created"
        })

    } catch (error) {
        console.log("Some Error Occured", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = handleCreateCard;