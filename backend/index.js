const express = require("express");
const app = express();
app.get("/", (req, resp) => {
  resp.send("App is setup in backend");
});
app.listen(5000);
