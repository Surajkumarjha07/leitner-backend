const express = require("express");
const connectToDatabase = require("./database/databaseConnection");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const signUp = require("./routes/signUp");
const logIn = require("./routes/logIn");
const createFlashCard = require("./routes/createCard");
const getCards = require("./routes/getCards");
const handleDeleteCard = require("./controllers/deleteCard");
const cors = require("cors");
const authenticate = require("./middlewares/authenticate");
const handleUpdateCard = require("./controllers/updateCard");
const leitnersystem = require("./routes/leitnerSystem")

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

connectToDatabase();

app.get("/", (req, res) => {
    res.send("Hello Mr. Wayne!");
});

//routes
app.use("/signUp", signUp);
app.use("/logIn", logIn);
app.use("/flashcards", authenticate, createFlashCard);
app.use("/flashcards", authenticate, getCards);
app.use("/flashcards/:cardId", authenticate, handleUpdateCard);
app.delete("/flashcards/:cardId", authenticate, handleDeleteCard)
app.use("/leitnerSystem", authenticate, leitnersystem)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running");
});