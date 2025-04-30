const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join());
});

app.get("/e2", (req, res) => {
  res.sendFile(path.join(__dirname, "../e2/public/index.html"));
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
