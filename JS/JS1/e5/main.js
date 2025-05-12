const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

const LETRAS = ["A", "B", "C", "D", "E"];
const NOMBRES = ["Felipe", "Facundo", "Nataniel", "Mirko"];
const ELEMENTOS = ["E1", "E2", "E3", "E4"];

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

app.delete("/deleteLetras", (req, res) => {
  LETRAS.splice(1, 2);
});

app.post("/sendNombre", (req, res) => {
  const { nombre } = req.body;
  NOMBRES.splice(1, 0, nombre);
});

app.post("/sendElemento", (req, res) => {
  const { elemento, posicion } = req.body;
  ELEMENTOS.splice(posicion, 2, elemento, elemento);
});

app.get("/getLetras", (req, res) => {
  res.send(LETRAS);
});

app.get("/getNombres", (req, res) => {
  res.send(NOMBRES);
});

app.get("/getElementos", (req, res) => {
  res.send(ELEMENTOS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
