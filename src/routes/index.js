const express = require("express");
const router = express.Router();

const user = require("./user/index");
const assets = require("./assets/index");

router.use("/user", user);
router.use("/assets", assets);

module.exports = router;
