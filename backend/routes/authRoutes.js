const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

console.log("estoy en auth");
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
