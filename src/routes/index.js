const express = require("express");
const router = express.Router();

const auth = require("./auth/index");
const assets = require("./assets/index");
const users = require("./users/index");

router.use("/auth", auth);
router.use("/assets", assets);
router.use("/users", users);

module.exports = router;
