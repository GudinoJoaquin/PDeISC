const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/componente1", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "componente1.html"));
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
