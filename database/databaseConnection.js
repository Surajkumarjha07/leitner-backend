const mongoose = require("mongoose");

async function connectToDatabase() {
    await mongoose.connect("mongodb+srv://surajkumarjha771:leitnersystem@cluster0.su0ug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("Databse connected");
        })
        .catch((err) => {
            console.log("Error in connecting database: ", err);
        })
}

module.exports = connectToDatabase;