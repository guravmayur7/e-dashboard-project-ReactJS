const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  userId: String,
  company: String,
  category: String,
});

module.exports = mongoose.model("products", productSchema);
