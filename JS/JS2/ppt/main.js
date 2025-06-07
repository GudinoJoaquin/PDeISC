const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const USERS = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public"));
});

app.post("/signin", (req, res) => {
  const { nombre } = req.body;
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ msg: "Nombre inválido" });
  }

  const nombreNormalized = nombre.trim().toLowerCase();

  const usuarioExiste = USERS.some(
    (u) => u.nombre.trim().toLowerCase() === nombreNormalized
  );

  if (usuarioExiste) {
    return res.status(406).json({ msg: "Usuario existente" });
  }

  USERS.push({ nombre: nombre.trim(), victorias: 0 });
  console.log(`Usuario agregado: ${nombre}`);
  res.status(200).json({ msg: "Usuario agregado" });
});

app.get("/usuarios", (req, res) => {
  res.send(USERS);
});

app.post("/agregarVictoria", (req, res) => {
  const { nombre } = req.body;
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ msg: "Nombre inválido" });
  }

  const nombreNormalized = nombre.trim().toLowerCase();

  const usuario = USERS.find(
    (u) => u.nombre.trim().toLowerCase() === nombreNormalized
  );

  if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

  usuario.victorias++;
  console.log(
    `Victoria agregada a ${usuario.nombre}: ahora tiene ${usuario.victorias} victorias`
  );
  console.log("Estado actual de usuarios:", USERS);

  res.status(200).json({
    msg: `Victoria agregada a ${usuario.nombre}`,
    victorias: usuario.victorias,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en: http://localhost:${PORT}`);
});
