const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const NUMEROS = [4, 7, 2, 9, 1];

const ENTEROS = [3, 5, 2, 4];

const PRODUCTOS = [
  { precio: 150 },
  { precio: 299.99 },
  { precio: 50 },
  { precio: 120.5 },
];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json("Api key necesaria");
  }

  if (apiKey !== "dffjonfnovwnovwfnovfjnodfwkmofmp") {
    return res.status(403).json("Api key invalid");
  }

  next();
});

app.get("/", (req, res) => {});

app.get("/getEnteros", (req, res) => {
  res.send(ENTEROS);
});

app.get("/getPrecios", (req, res) => {
  res.send(PRODUCTOS);
});

app.get("/getNumeros", (req, res) => {
  res.send(NUMEROS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
