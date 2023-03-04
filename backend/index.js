const express = require("express");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/User");
const Product = require("./DB/Product");
const { request } = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require("jsonwebtoken");
const jwtKey = "ecommerce";
const path = require("path");

app.post("/register", async (req, resp) => {
  const userData = new User(req.body);
  let result = await userData.save();
  result = result.toObject();
  delete result.pwd;
  //resp.send(result);
  if (result) {
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.send({ result: "Something went wrong" });
      }

      resp.send({ result, auth: token });
    });
  } else {
    resp.send({ result: "No user found" });
  }
});
app.post("/login", async (req, resp) => {
  let user = await User.findOne(req.body).select("-pwd");
  if (user) {
    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.send({ result: "Something went wrong" });
      }
      resp.send({ user, auth: token });
    });
  } else {
    resp.send({ result: "No user found" });
  }
});
//product routes
app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/get-product", verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send("No records found");
  }
});
app.delete("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});
app.get("/edit-product/:id", verifyToken, async (req, resp) => {
  const result = await Product.findById({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No data Found" });
  }
});

app.put("/update-product/:id", verifyToken, async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No data Found" });
  }
});
app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.send({ result: "invalid token found" });
      } else {
        next();
      }
    });
  } else {
    resp.send({ result: "token not found in request header" });
  }
}

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (req, resp) {
  resp.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});
app.listen(5000);
