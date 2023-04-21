const express = require("express");
const router = express.Router();
const filesController = require("../controllers/files.Controller");

router.post("/gif/new", filesController.makeGif);

module.exports = router;
