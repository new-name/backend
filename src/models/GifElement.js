const mongoose = require("mongoose");

const GifElementSchema = new mongoose.Schema({
  type: { type: String, default: "Gif" },
  x: Number,
  y: Number,
  source: Object,
  size: Number,
  zIndex: Number,
  id: Number,
});

module.exports = GifElementSchema;
