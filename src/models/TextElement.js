const mongoose = require("mongoose");

const TextElementSchema = new mongoose.Schema({
  type: { type: String, default: "Text" },
  text: String,
  x: Number,
  y: Number,
  size: Number,
  color: String,
  fontStyle: String,
  rotate: Number,
  zIndex: Number,
  id: Number,
});

module.exports = TextElementSchema;
