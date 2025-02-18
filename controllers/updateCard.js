const flashCards = require("../models/flashCardModel");

async function handleUpdateCard(req, res) {
    try {
        let { cardId } = req.params;
        let { question, answer, box, daysLeftToReview } = req.body;

        if (!cardId) {
            return res.status(400).json({
                message: "Id is required"
            })
        }

        const id = parseInt(cardId);

        const updatedCard = await flashCards.updateOne({ id, $set: { question, answer, box, daysLeftToReview } })

        res.status(200).json({
            message: "flashcard updated",
            updatedCard
        })

    } catch (error) {
        console.log("Some Error Occured", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = handleUpdateCard;