const mongoose = require("mongoose");

const ImageElementSchema = new mongoose.Schema({
  type: { type: String, default: "Image" },
  uri: String,
  width: Number,
  height: Number,
  x: Number,
  y: Number,
  zIndex: Number,
  id: Number,
});

module.exports = ImageElementSchema;
