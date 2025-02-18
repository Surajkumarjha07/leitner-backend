const express = require("express");
const handleSignUp = require("../controllers/signUp");
const router = express.Router();

router.post("/", handleSignUp);

module.exports = router;