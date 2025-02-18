const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    flashCards: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "flashCards"
    }]
})

const users = mongoose.model("users", userSchema);
module.exports = users;