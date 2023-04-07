const express = require("express");
const router = express.Router();
const assetsController = require("../controllers/assets.Controller");

router.post("/login", assetsController.getProjects);

module.exports = router;
