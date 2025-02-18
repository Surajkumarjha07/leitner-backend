const express = require("express");
const handleLogIn = require("../controllers/logIn");
const router = express.Router();

router.post("/", handleLogIn);

module.exports = router;