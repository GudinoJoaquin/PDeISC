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

app.get("/componente2", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "componente2.html"));
});

app.get("/componente3", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "componente3.html"));
});

app.get("/componente4", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "componente4.html"));
});

app.get("/componente5", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "componente5.html"));
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
