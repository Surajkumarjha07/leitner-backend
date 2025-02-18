const flashCards = require("../models/flashCardModel");

async function handleLeitnerSystem(req, res) {
    try {
        let { text, cardId } = req.body;
        const { userId } = req.user;
        const id = parseInt(cardId);
        const card = await flashCards.findOne({ id, userId });

        if (card) {
            let newDaysLeft = card.daysLeftToReview;
            let newBox = card.box;

            if (text === "Got it right") {
                newDaysLeft = Math.min(25, newDaysLeft + 5);
                newBox = Math.min(5, newBox + 1);
            } else {
                newDaysLeft = Math.max(5, newDaysLeft - 5);
                newBox = Math.max(1, newBox - 1);
            }

            await flashCards.updateOne({ id, userId }, {
                $set: { daysLeftToReview: newDaysLeft, box: newBox }
            });

            return res.status(200).json({
                message: text === "Got it right" ? "You are progressing!" : "Your progress is degraded!"
            });
        }

        return res.status(404).json({ message: "Card not found!" });


    } catch (error) {
        console.log("Some Error Occured", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = handleLeitnerSystem;