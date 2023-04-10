const mongoose = require("mongoose");

const TextElementSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  x: Number,
  y: Number,
  fontSize: Number,
  color: String,
  fontFamily: String,
  rotate: Number,
  layer: Number,
  createdAt: Date,
});

module.exports = TextElementSchema;
