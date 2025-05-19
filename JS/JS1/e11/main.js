const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const NUMEROS = [3, 15, 8, 22, 5, 11, 30, 1];

const PALABRAS = [
  "casa",
  "computadora",
  "sol",
  "pantalla",
  "luz",
  "teclado",
  "flor",
];

const USUARIOS = [
  { nombre: "Ana", activo: true },
  { nombre: "Luis", activo: false },
  { nombre: "María", activo: true },
  { nombre: "Pedro", activo: false },
  { nombre: "Lucía", activo: true },
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

app.get("/getUsuarios", (req, res) => {
  res.send(USUARIOS);
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
