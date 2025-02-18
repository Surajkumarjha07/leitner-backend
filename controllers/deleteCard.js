const flashCards = require("../models/flashCardModel");
const users = require("../models/userModel");

async function handleDeleteCard(req, res) {
    try {
        const { cardId } = req.params;
        const { userId } = req.user;
        const id = parseInt(cardId);

        if (!cardId) {
            return res.status(400).json({
                message: "Id is required"
            })
        }

        const card = await flashCards.findOne({ id, userId });
        await flashCards.deleteOne({ id, userId });
        await users.findByIdAndUpdate(
            userId,
            { $pull: { flashCards: card._id } }
        )
        res.status(200).json({
            message: "card deleted",
        })

    } catch (error) {
        console.log("Some Error Occured", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = handleDeleteCard;