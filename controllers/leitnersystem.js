const flashCards = require("../models/flashCardModel");

async function handleLeitnerSystem(req, res) {
    try {
        let { text, cardId } = req.body;
        const { userId } = req.user;
        const id = parseInt(cardId);
        const card = await flashCards.findOne({ id, userId });

        if (card) {
            let newDays = card.daysLeftToReview;
            let newBox = card.box;
            let right;

            if (text === "Got it right") {
                newDays = Math.min(25, card.daysLeftToReview + 5);
                newBox = Math.min(5, parseInt(card.box) + 1);
                right = true;
            }
            else {
                newDays = Math.max(5, card.daysLeftToReview - 5);
                newBox = Math.max(1, parseInt(card.box) - 1);
                right = false;
            }

            const newCard = await flashCards.updateOne({ id, userId }, { $set: { daysLeftToReview: newDays, box: newBox } });
            
            res.status(200).json({
                right,
                newCard
            })
            return;
        }

        return res.status(404).json({
            message: "card not found!"
        })

    } catch (error) {
        console.log("Some Error Occured", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = handleLeitnerSystem;