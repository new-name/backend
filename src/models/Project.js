const mongoose = require("mongoose");

const TextElementSchema = require("./TextElement");
const ImageElementSchema = require("./ImageElement");
const GifElementSchema = require("./GifElement");
const ShapeElementSchema = require("./ShapeElement");

const ProjectSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 20,
  },
  texts: [TextElementSchema],
  images: [ImageElementSchema],
  gifs: [GifElementSchema],
  shapes: [ShapeElementSchema],
});

module.exports = mongoose.model("Project", ProjectSchema);
