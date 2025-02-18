const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },

    question: {
        type: String,
        required: true,
    },

    answer: {
        type: String,
        required: true,
    },

    box: {
        type: String,
        required: true,
    },

    daysLeftToReview: {
        type: Number,
        required: true
    },

    createdAt: {
        type: String,
        required: false,
        default: new Date().toLocaleDateString()
    }
})

const flashCards = mongoose.model("flasCards", cardSchema);
module.exports = flashCards;