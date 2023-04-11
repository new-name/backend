const express = require("express");
const router = express.Router();
const assetsController = require("../controllers/assets.Controller");

router.get("/images", assetsController.getImages);
router.get("/gifs", assetsController.getGifs);

module.exports = router;
