const mongoose = require("mongoose");

const ShapeElementSchema = new mongoose.Schema({
  type: { type: String, default: "Shape" },
  shapeType: String,
  name: String,
  size: Number,
  color: String,
  x: Number,
  y: Number,
  zIndex: Number,
  id: Number,
  width: Number,
  height: Number,
  stroke: String,
  strokeWidth: Number,
  rotation: Number,
  x1: Number,
  y1: Number,
  x2: Number,
  y2: Number,
});

module.exports = ShapeElementSchema;
