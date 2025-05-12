const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

const ANIMALES = ["Jirafa", "Mono", "Pejelagarto"];
const COMPRAS = [
  "Lavandina",
  "Pan",
  "Leche",
  "Carne",
  "Repollo",
  "Jamon",
  "Queso",
];
const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

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

app.get("/", (req, res) => {
  res.sendFile(path.join());
});

app.delete("/deleteAnimal", (req, res) => {
  ANIMALES.pop();
});

app.delete("/deleteCompra", (req, res) => {
  const eliminado = COMPRAS[COMPRAS.length - 1];
  COMPRAS.pop();
  res.json(eliminado);
});

app.delete("/deleteArray", (req, res) => {
  while (ARRAY.length !== 0) {
    ARRAY.pop();
  }
});

app.get("/getAnimales", (req, res) => {
  res.status(200).send(ANIMALES);
});

app.get("/getCompras", (req, res) => {
  res.status(200).send(COMPRAS);
});

app.get("/getArray", (req, res) => {
  res.status(200).send(ARRAY);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
