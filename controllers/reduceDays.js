const flashCards = require("../models/flashCardModel");

const reduceDays = async (req, res) => {

    await flashCards.updateMany(
        { daysLeftToReview: { $gt: 0 } },
        { $inc: { daysLeftToReview: -1 } }
    )
}

module.exports = reduceDays;