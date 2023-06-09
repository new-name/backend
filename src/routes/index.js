const express = require("express");
const router = express.Router();

const auth = require("./auth/index");
const assets = require("./assets/index");
const users = require("./users/index");
const files = require("./files");

router.use("/auth", auth);
router.use("/assets", assets);
router.use("/files", files);
router.use("/users", users);

module.exports = router;
