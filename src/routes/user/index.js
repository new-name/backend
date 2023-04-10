const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);

module.exports = router;
