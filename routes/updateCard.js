const express = require("express");
const handleUpdateCard = require("../controllers/updateCard");
const router = express.Router();

router.put("/flashcards/:id", handleUpdateCard);

module.exports = router;