const express = require("express");
const handleCreateCard = require("../controllers/createFlashCard");
const router = express.Router();

router.post("/", handleCreateCard);

module.exports = router;