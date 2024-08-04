const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
