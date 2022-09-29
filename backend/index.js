const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDB = async () => {
  mongoose.connect("mongodb://localhost:27017/e-com");
  const productSchema = new mongoose.Schema({});
  const product = mongoose.model("products", productSchema);
  const data = await product.find();
  console.warn(data);
};
connectDB();
// app.get("/", (req, resp) => {
//   resp.send("App is setup in backend");
// });
app.listen(5000);
