const flashCards = require("../models/flashCardModel");


async function handleGetCards(req, res) {
    try {
        const { userId } = req.user;
        const allCards = await flashCards.find({ userId });
        res.status(200).json({
            message: "all cards fetched",
            allCards
        })

    } catch (error) {
        console.log("Some Error Occured", error);
        return res.status(500).json({
            message: "Internal server error"
        }) 
    }
}

module.exports = handleGetCards;