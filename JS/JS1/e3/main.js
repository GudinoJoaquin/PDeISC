const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

const COLORES = [];
const TAREAS = ["limpiar", "cocinar", "hacer la cama"];
const USUARIOS = ["Felipe", "Facundo", "Nataniel", "Mirko"];

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

app.post("/sendColor", (req, res) => {
  const { color } = req.body;
  COLORES.unshift(color);
});

app.post("/sendTarea", (req, res) => {
  const { tarea } = req.body;
  TAREAS.unshift(tarea);
});

app.post("/sendUsuario", (req, res) => {
  const { usuario } = req.body;
  USUARIOS.unshift(usuario);
});

app.get("/getColores", (req, res) => {
  res.send(COLORES);
});

app.get("/getTareas", (req, res) => {
  res.send(TAREAS);
});

app.get("/getUsuarios", (req, res) => {
  res.send(USUARIOS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
