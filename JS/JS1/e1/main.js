const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

const FRUTAS = [];
const AMIGOS = [];
const NUMEROS = [];

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

app.post("/sendFruta", (req, res) => {
  const fruta = req.body;
  console.log(fruta);
  FRUTAS.push(fruta);
});

app.post("/sendAmigo", (req, res) => {
  const amigo = req.body;
  console.log(amigo);
  AMIGOS.push(amigo);
});

app.post("/sendNumero", (req, res) => {
  const numero = req.body;
  console.log(numero);
  console.log(Math.max(NUMEROS));
  NUMEROS.push(numero);
});

app.get("/getFrutas", (req, res) => {
  res.send(FRUTAS);
});

app.get("/getAmigos", (req, res) => {
  res.send(AMIGOS);
});

app.get("/getNumeros", (req, res) => {
  res.send(NUMEROS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
