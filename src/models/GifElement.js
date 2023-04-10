const mongoose = require("mongoose");

const GifElementSchema = new mongoose.Schema({
  data: Buffer,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  rotate: Number,
  layer: Number,
  createdAt: Date,
});

module.exports = GifElementSchema;
