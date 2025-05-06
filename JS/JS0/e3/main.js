const express = require("express");
const path = require("path");
const app = express();
const personas = [];
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join());
});

app.post("/sendData", (req, res) => {
  const { jugador, nacionalidad, posicion, precio } = req.body;
  const persona = { jugador, nacionalidad, posicion, precio };
  personas.push(persona);
});

app.get("/obtener", (req, res) => {
  res.send(personas);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
