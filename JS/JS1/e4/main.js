const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

const ENTEROS = [1, 2, 3, 4, 6, 7];
const MENSAJES = ["Hola", "Hola", "Como estas?", "Bien y vos?"];
const CLIENTES = ["Felipe", "Facundo", "Nataniel", "Mirko"];

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

app.delete("/deleteEntero", (req, res) => {
  ENTEROS.shift();
});

app.delete("/deleteMensaje", (req, res) => {
  MENSAJES.shift();
});

app.delete("/deleteCliente", (req, res) => {
  CLIENTES.shift();
});

app.get("/getEnteros", (req, res) => {
  res.send(ENTEROS);
});

app.get("/getMensajes", (req, res) => {
  res.send(MENSAJES);
});

app.get("/getClientes", (req, res) => {
  res.send(CLIENTES);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
