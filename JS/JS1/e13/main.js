const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const NUMEROS = [23, 5, 87, 12, 1, 45];
const PALABRAS = ["manzana", "banana", "cereza", "aguacate", "pera"];
const PERSONAS = [
  { nombre: "Ana", edad: 30 },
  { nombre: "Luis", edad: 22 },
  { nombre: "Marta", edad: 35 },
  { nombre: "Jorge", edad: 28 },
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

app.get("/getPersonas", (req, res) => {
  res.send(PERSONAS);
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
