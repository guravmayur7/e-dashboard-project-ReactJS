const express = require("express");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/User");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  const userData = new User(req.body);
  const result = await userData.save();
  resp.send(result);
});
app.post("/login", async (req, resp) => {
  const user = await User.findOne(req.body).select("-pwd");
  if (user) {
    resp.send(user);
  } else {
    resp.send({ result: "No user found" });
  }
});

// const connectDB = async () => {
//   mongoose.connect("mongodb://0.0.0.0:27017/e-commerce");
//   const productSchema = new mongoose.Schema({});
//   const product = mongoose.model("products", productSchema);
//   const data = await product.find();
//   console.warn(data);
// };
// connectDB();
// app.get("/", (req, resp) => {
//   resp.send("App is setup in backend");
// });
app.listen(5000);
