const express = require("express");
const router = express.Router();

const auth = require("./auth/index");
const assets = require("./assets/index");

router.use("/auth", auth);
router.use("/assets", assets);

module.exports = router;
