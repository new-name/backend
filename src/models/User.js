const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    maxlength: 40,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model("User", UserSchema);
