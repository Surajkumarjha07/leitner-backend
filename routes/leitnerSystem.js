const express = require("express");
const handleLeitnerSystem = require("../controllers/leitnersystem");
const router = express.Router();

router.put("/", handleLeitnerSystem);

module.exports = router;