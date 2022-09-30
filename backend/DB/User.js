const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
});

module.exports = mongoose.model("users", userSchema);
