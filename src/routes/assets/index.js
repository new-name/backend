const express = require("express");
const router = express.Router();
const assetsController = require("../controllers/assets.Controller");

router.get("/fonts", assetsController.getFonts);
router.get("/gifs", assetsController.getGifs);

module.exports = router;
