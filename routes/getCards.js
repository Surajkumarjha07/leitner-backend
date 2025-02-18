const express = require("express");
const handleGetCards = require("../controllers/getCards");
const router = express.Router();

router.get("/", handleGetCards);

module.exports = router;