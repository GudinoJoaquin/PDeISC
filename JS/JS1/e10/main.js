const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const NUMEROS = [5, 12, 37, 44, 8, 19, 23, 91, 3, 60];

const PALABRAS = [
  "manzana",
  "luz",
  "teclado",
  "cielo",
  "programa",
  "lago",
  "pantalla",
  "auricular",
];

const PRECIOS = [199.99, 49.5, 1200, 15.75, 349.9, 78.2, 5, 999.95];

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

app.get("/getPrecios", (req, res) => {
  res.send(PRECIOS);
});

app.get("/getPalabras", (req, res) => {
  res.send(PALABRAS);
});

app.get("/getNumeros", (req, res) => {
  res.send(NUMEROS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
