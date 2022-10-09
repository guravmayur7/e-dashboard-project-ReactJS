const express = require("express");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/User");
const Product = require("./DB/Product");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  const userData = new User(req.body);
  const result = await userData.save();
  resp.send(result);
});
app.post("/login", async (req, resp) => {
  let user = await User.findOne(req.body).select("-pwd");
  console.log(user);
  if (user) {
    resp.send(user);
  } else {
    resp.send({ result: "No user found" });
  }
});
//product routes
app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/get-product", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  }
  {
    resp.send("No records found");
  }
});

app.listen(5000);
