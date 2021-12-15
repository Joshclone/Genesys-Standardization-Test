const express = require("express");
const router = express.Router();
const User = require("../models/user");

const userController = require("../controllers/user/user");

router.post("/register", userController.register);
router.post("/login", userController.login);


router.post()

module.exports = router;
